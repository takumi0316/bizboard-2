require 'csv'
require 'zip'

##
# quotes Controller
#
class QuotesController < ApplicationController

  #----------------------------------------
  #  ** Includes **
  #----------------------------------------

  #----------------------------------------
  #  ** Instance variables **
  #----------------------------------------

  expose(:quote) { Quote.find_or_initialize_by id: params[:id] || params[:quote_id] }

  expose(:client) { CompanyDivisionClient.find(params[:quote][:company_division_client_id]) }

  expose_with_pagination(:quotes) {
    Quote
    .all
    .search(name: params[:name], status: params[:status], date1: params[:date1], date2: params[:date2])
    .order(date: :desc)
  }

  #----------------------------------------
  #  ** Layouts **
  #----------------------------------------

  #----------------------------------------
  #  ** Request cycles **
  #----------------------------------------

  #----------------------------------------
  #  ** Actions **
  #----------------------------------------

  ##
  # 一覧
  # @version 2019/03/12
  #
  def index

    add_breadcrumb '案件'
  end

  ##
  # 新規作成
  # @version 2018/06/10
  #
  def new

    add_breadcrumb '案件', path: quotes_path
    add_breadcrumb '新規作成'
  end

  ##
  # 新規作成
  # @version 2018/06/10
  def create

    register_google_drive

    quote.update! quote_params

    # slack通知
    if quote.advance?

      Slack.chat_postMessage(text: "<!here>料金先払いの案件が作成されました 案件番号[#{quote.quote_number}] お客様情報[#{quote.client.company_division.company.name} #{quote.client.name}] 担当者[#{quote.user.name}] 入金を確認したら担当者にSlackで入金された事を伝えてください", username: '入金確認bot', channel: '#入金確認')
    end

    render json: { status: :success, quote: quote }
  rescue => e

    render json: { status: :error, message: e.message }
  end

  ##
  # 編集
  # @version 2018/06/10
  #
  def edit

    add_breadcrumb '案件', path: quotes_path
    add_breadcrumb '編集'
  end

  ##
  # 更新
  # @version 2018/06/10
  #
  def update

    register_google_drive

    # 情報更新
    quote.update! quote_params

    # taskが存在していたらtaskの納期も更新する
    quote.task.update! date: quote.deliver_at if quote.task.present?

    render json: { status: :success, drive_folder_id: quote.drive_folder_id }
  rescue => e

    render json: { status: :error, message: e.message }
  end

  ##
  # 削除
  # @version 2018/06/10
  def destroy

    quote.destroy!
  rescue => e

    flash[:warning] = { message: e.message }
  ensure

    redirect_to action: :index
  end

  ##
  # ステータスを更新する
  # @version 2018/06/10
  def status

    if quote.unworked? && quote.work.blank? || quote.draft? && quote.work.blank?

      quote.build_work(division_id: current_user.division_id).save!

      quote.unworked!

      redirect_to work_path(quote.work), flash: { show: true, icon: 'success', message: '作業書を作成しました' } and return
    end

    if quote.advance? && quote.invoicing? && quote.work.blank?

      quote.build_work(division_id: current_user.division_id).save!

      redirect_to work_path(quote.work), flash: { show: true, icon: 'success', message: '作業書を作成しました' } and return
    end

    redirect_to :back, flash: { show: true, icon: 'success', message: 'ステータスを更新しました' }
  end

  ##
  # 見積書を複製する
  # @version 2018/06/10
  # 複製に必要な機能
  # 複製時に、複製元の以下の情報をもとに案件を作成する。
  # 複製先は元とは紐づかない。
  # 複製したい情報
  # ・案件タイトル（コピー）
  # ・お客様情報
  # ・売上部署
  # ・品目内容
  # ・合計金額
  # ・値引き
  # ・支払方法
  # ・備考
  # ・メモ
  # ・作業部署（作業書）
  # ・作業情報（作業書）
  # ・外注情報（作業書）
  #
  def copy

    cl_quote = quote.deep_clone(:quote_projects)

    cl_quote.update!(
      subject: "#{quote.subject}（複製： 案件番号）#{quote.id}",
      date: Time.zone.now,
      expiration: '',
      attention: '',
      pdf_url: '',
      status: :unworked,
      quote_type: quote.quote_type,
      user_id: current_user.id,
      deliver_at: Time.zone.now,
      deliver_type: quote.deliver_type,
      issues_date: '',
      delivery_note_date: '',
      lock: false,
      tax: 1.1,
      drive_folder_id: '')

    if quote.work.present?

      cl_work = quote.work.deep_clone(:work_details)

      cl_work.update! quote_id: cl_quote.id, status: :draft

      quote.work.work_subcontractors.each do  |r|

        cl_work_subcontractor = WorkSubcontractor.find(r.id).deep_clone(:details)
        cl_work_subcontractor.update! work_id: cl_work.id
        cl_work_subcontractor.details.each { |d| d.update! work_id: cl_work.id, actual_cost: 0 }
      end
    end

    redirect_to edit_quote_path(cl_quote), flash: { show: true, icon: 'success', message: '案件を複製しました' }
  rescue => e

    redirect_back fallback_location: url_for({ action: :index }), flash: { show: true, icon: 'info', message: e.message }
  end

  ##
  # PDFダウンロード
  # @version 2020/04/23
  def pdf

    respond_to do |format|
      format.html do
        render  pdf: "見積書_#{quote.id}", # pdfファイルの名前。これがないとエラーが出ます
                encoding: 'UTF-8',
                layout: 'layouts/pdf.html.slim',
                template: 'quotes/pdf.html.slim', # テンプレートファイルの指定。viewsフォルダが読み込まれます。
                show_as_html: params.key?('debug')
      end
    end
  end

  ##
  # CSV一括ダウンロード
  # @version 2020/04/23
  #
  def bulk_download

    filename = "#{quote.quote_number}_#{quote.subject}.zip"
    fullpath = "#{Rails.root}/tmp/#{filename}"

    Zip::File.open(fullpath, Zip::File::CREATE) do |zipfile|
      card_template = CardTemplate.find_by(company_id: quote.client.company_division.company_id)
      zipfile.get_output_stream("#{quote.quote_number}_#{quote.subject}.csv") do |f|

        bom = "\uFEFF"
        f.puts(
          CSV.generate(bom) do |csv|

            headers = []
            headers << 'テンプレート名'
            headers << '箱数'
            headers << '申込日'
            headers << '申込者名'
            headers << '配送先'
            headers << '表面レイアウト名'
            headers << '裏面レイアウト名'
            flag_ids = []
            card_template.card_layouts.each { |cl| cl.contents.each { |ct| flag_ids << ct.content_flag_id } }
            flag_ids.uniq!
            flag_ids.each { |flag| headers << ContentFlag.find(flag).name }
            csv << headers
            create_csv_row_data_from_master(flag_ids, card_template, csv) if quote.task.cart.nil?
            create_csv_row_data_from_archive(flag_ids, card_template, csv, headers) if quote.task.cart.present?
          end
        )
      end
    end

    # 新規ダウンロードの場合は、作業書作成 && 案件ステータスを作業中
    if quote.unworked? && quote.work.blank? || quote.draft? && quote.work.blank?
      quote.build_work(division_id: current_user.division_id, status: :working).save!
      quote.working!
    end

    quote.build_work(division_id: current_user.division_id, status: :working).save! if quote.advance? && quote.invoicing? && quote.work.blank?

    # zipをダウンロードして、直後に削除する
    send_data File.read(fullpath), filename: filename, type: 'application/zip'
    File.delete(fullpath)
  end

  def lock

    quote.update! lock: !quote.lock

    # 成功したら編集ページに飛ぶ
    redirect_to quotes_path
  rescue => e

    # エラー時は直前のページへ
    redirect_back fallback_location: url_for({action: :new}), flash: { show: true, icon: 'info', message: e.message }
  end

  def all_lock

    raise '管理者以外は案件の一括ロックは出来ません' unless current_user.admin?
    Quote.all_lock(params[:name], params[:status], params[:date1], params[:date2])
    redirect_to quotes_path, flash: { show: true, icon: 'success', message: '案件を一括ロックしました' }
  rescue => e
    # エラー時は直前のページへ
    redirect_back fallback_location: url_for({action: :new}), flash: { show: true, icon: 'info', message: e.message }
  end


  #----------------------------------------
  #  ** Methods **
  #----------------------------------------

  private

    def quote_params

      params.require(:quote).permit :id, :company_division_client_id, :date, :expiration, :subject, :remarks, :memo, :drive_folder_id, :pdf_url, :price, :user_id, :status, :quote_number,
        :quote_type, :channel, :deliver_at, :reception, :deliver_type, :deliver_type_note, :division_id, :discount, :tax_type, :payment_terms, :tax, :quote_number, :temporary_price,
        :issues_date, :delivery_note_date, :profit_price, :drive_folder_id, :destination,
        quote_projects_attributes: [:id, :quote_id, :project_id, :unit, :price, :name, :unit_price, :project_name, :remarks, :_destroy]
    end

    def register_google_drive

      return if params[:quote][:google_drive_exist].nil? || params[:quote][:google_drive_exist] == 'false'

      require 'google_drive'
      session = GoogleDrive::Session.from_config('config.json')
      root_folder = session.collection_by_id('0AMp2Ot6o6NNAUk9PVA')
      params[:quote][:drive_folder_id] = root_folder.create_subfolder("#{ Rails.env == :development ? '開発環境(デバッグ): ' : '' }#{params[:quote][:quote_number]} #{params[:quote][:subject]} #{client.name}").id
    end

    def create_csv_row_data_from_master(flag_ids, card_template, csv)

      quote.card_clients.each do |r|
        values = []
        values << card_template.name
        values << TaskCardClient.find_by(quote_id: quote.id, card_client_id: r.id).count
        values << quote.created_at.strftime('%Y年 %m月 %d日')
        values << "#{ quote.task.client_name }様"
        values << "#{ quote.task&.delivery_target&.address1 }#{ quote.task&.delivery_target&.address2 }"
        values << r.head_layout.name
        values << r.tail_layout.name
        flag_ids.each do |flag_id|
          flag = ContentFlag.find(flag_id)
          if r.head_layout.contents.pluck(:content_flag_id).include?(flag_id)
            layout_content = r.head_layout.contents.where(content_flag_id: flag_id).first
            layout_value = LayoutValue.find_or_initialize_by(company_division_client_id: r.company_division_client, content_flag_id: flag_id) unless flag.image?
            layout_value = LayoutValue.find_or_initialize_by(company_division_client_id: r.company_division_client, content_flag_id: flag_id, layout_content_id: layout_content.id) if flag.image?
            values << layout_value.text_value if flag.text?
            values << layout_value.textarea_value if flag.text_area?
            if flag.image?
              if layout_value.new_record?
                values << r.head_layout.contents.where(content_flag_id: flag_id).first.content_uploads.first.upload.name
              else
                if layout_value.upload_id.nil?
                  values << ''
                else
                  values << layout_value.upload.name
                end
              end
            end
          elsif r.tail_layout.contents.pluck(:content_flag_id).include?(flag_id)
            layout_content = r.tail_layout.contents.where(content_flag_id: flag_id).first
            layout_value = LayoutValue.find_or_initialize_by(company_division_client_id: r.company_division_client, content_flag_id: flag_id) unless flag.image?
            layout_value = LayoutValue.find_or_initialize_by(company_division_client_id: r.company_division_client, content_flag_id: flag_id, layout_content_id: layout_content.id) if flag.image?
            values << layout_value.text_value if flag.text?
            values << layout_value.textarea_value if flag.text_area?
            if flag.image?
              if layout_value.new_record?
                values << r.head_layout.contents.where(content_flag_id: flag_id).first.content_uploads.first.upload.name
              else
                if layout_value.upload_id.nil?
                  values << ''
                else
                  values << layout_value.upload.name
                end
              end
            end
          else
            values << ''
          end
        end
        csv << values
      end
      csv
    end

    def create_csv_row_data_from_archive(flag_ids, card_template, csv, headers)

      require 'nkf'
      quote.task.cart.cart_items.each do |r|
        values = []
        values << card_template.name
        values << r.quantity
        values << quote.created_at.strftime('%Y年 %m月 %d日')
        values << "#{ quote.task.client_name }様"
        values << "#{ quote.task&.delivery_target&.address1 }#{ quote.task&.delivery_target&.address2 }"
        values << r.card_client.head_layout.name
        values << r.card_client.tail_layout.name
        parse_csv_data = CSV.parse(r.csv_file.download.force_encoding(Encoding.find('UTF-8')), liberal_parsing: true)
        head_hash, tail_hash, dup_hash = {}, {}, {}
        head_content_flag_ids,
        tail_content_flag_ids,
        dup_head_content_flag_ids,
        dup_tail_content_flag_ids = convert_to_content_flag_ids(parse_csv_data[1]), convert_to_content_flag_ids(parse_csv_data[4]), [], []
        head_content_flag_ids & tail_content_flag_ids.each do |d|
          head_content_flag_ids.each_with_index do |h, i|
            if h == d
              next unless ContentFlag.find(h).image?
              dup_hash[h] = NKF.nkf('-w', parse_csv_data[0][i] || '')
              dup_head_content_flag_ids << h
            end
          end
          tail_content_flag_ids.each_with_index do |t, i|
            if t == d
              next unless ContentFlag.find(t).image?
              next if dup_hash.select { |k, v| k == t }.empty?
              dup_hash[t] = NKF.nkf('-w', parse_csv_data[3][i] || '')
              dup_tail_content_flag_ids << t
            end
          end
        end
        head_content_flag_ids.each_with_index { |p, i| head_hash[p] = NKF.nkf('-w', parse_csv_data[0][i] || '') }
        tail_content_flag_ids.each_with_index { |p, i| tail_hash[p] = NKF.nkf('-w', parse_csv_data[3][i] || '') }
        flag_ids.each do |f|
          if head_hash[f].present?
            values << head_hash[f]
          elsif tail_hash[f].present?
            values << tail_hash[f]
          else
            values << ''
          end
        end
        csv << values
      end
      csv
    end

    def convert_to_content_flag_ids(layout_content_ids)

      layout_content_ids.map { |r| LayoutContent.find(r).content_flag_id }
    end

end
