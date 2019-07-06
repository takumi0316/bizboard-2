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

  # 見積もり
  expose_with_pagination(:quotes) {
    Quote
    .search(name: params[:name], status: params[:status], date1: params[:date1], date2: params[:date2])
    .all
    .includes(:quote_items)
    .order(date: 'DESC')
  }


  # 見積もり
  expose(:quote) { Quote.find_or_initialize_by id: params[:id] || params[:quote_id]}


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

    @division = current_user.division&.id
    @user_type = current_user.user_type
    @count = params[:count]
  end

  ##
  # 新規作成
  # @version 2018/06/10
  #
  def new

    add_breadcrumb '案件', path: quotes_path
    add_breadcrumb '新規作成'
    @quote = Quote.new
  end

  ##
  # 編集
  # @version 2018/06/10
  #
  def edit

    add_breadcrumb '案件', path: quotes_path
    add_breadcrumb '編集'
  rescue => e
    redirect_back fallback_location: url_for({action: :index}), flash: {notice: {message: e.message}}
  end

  ##
  # 更新処理
  # @version 2018/06/10
  #
  def update

    # 情報更新
    quote.update! quote_params

    redirect_back fallback_location: url_for({action: :index}), flash: {notice: {message: '見積もりを更新しました'}}
  rescue => e

    redirect_back fallback_location: url_for({action: :index}), flash: {notice: {message: e.message}}
  end

  ##
  # 新規作成 / 更新
  # @version 2018/06/10
  #
  def create

    # 情報更新
    # quote.update! quote_params.merge(division_id: current_user.division_id)

    if params[:id] == 'null'
      new_quote = Quote.create!(user_id: params[:quote][:user_id], division_id: params[:quote][:division_id], date: params[:quote][:date], expiration: params[:quote][:expiration], subject: params[:quote][:subject], remarks: params[:quote][:remarks], memo: params[:quote][:memo], price: params[:quote][:total_cost], attention: params[:quote][:attention], company_division_client_id: params[:quote][:company_division_client_id], quote_type: params[:quote][:quote_type], channel: params[:quote][:channel], deliver_at: params[:quote][:deliver_at], deliver_type: params[:quote][:deliver_type], deliver_type_note: params[:quote][:deliver_type_note], discount: params[:quote][:discount])
      unless params[:specifications].nil?
        params[:specifications].each do |specification|

          parse_json = JSON.parse(specification)
          createQuote = new_quote
          createQuote.quote_projects.create!(name: parse_json['projectSpecificationName'], remarks: parse_json['projectSpecificationRemarks'], unit_price: parse_json['projectSpecificationUnitPrice'], unit: parse_json['projectSpecificationUnit'].to_i, price: parse_json['projectSpecificationPrice'], project_id: parse_json['projectSpecificationId'], project_name: parse_json['projectName'], project_id: parse_json['projectId'].to_i)
        end
      end
      render json: { status: :success, quote: Quote.last, quote_projects: Quote.last.quote_projects }
    else

      findQuote = Quote.find(params[:id])
      findQuote.update!(user_id: params[:quote][:user_id], division_id: params[:quote][:division_id] == 'null' ? nil : params[:quote][:division_id], date: params[:quote][:date], expiration: params[:quote][:expiration], subject: params[:quote][:subject], remarks: params[:quote][:remarks], memo: params[:quote][:memo], price: params[:quote][:total_cost], attention: params[:quote][:attention], company_division_client_id: params[:quote][:company_division_client_id], quote_type: params[:quote][:quote_type], channel: params[:quote][:channel], deliver_at: params[:quote][:deliver_at], deliver_type: params[:quote][:deliver_type], deliver_type_note: params[:quote][:deliver_type_note], discount: params[:quote][:discount])
      unless params[:specifications].nil?
        params[:specifications].each do |specification|

          parse_json = JSON.parse(specification)
          findQuoteProject = QuoteProject.find_or_initialize_by(id: parse_json['projectSpecificationId'])
          if findQuoteProject.id == 0

            QuoteProject.create!(name: parse_json['projectSpecificationName'], remarks: parse_json['projectSpecificationRemarks'], unit_price: parse_json['projectSpecificationUnitPrice'], unit: parse_json['projectSpecificationUnit'].to_i, price: parse_json['projectSpecificationPrice'], quote_id: params[:id], project_id: parse_json['projectSpecificationId'], project_name: parse_json['projectName'], project_id: parse_json['projectId'])
          else

            findQuoteProject.update!(name: parse_json['projectSpecificationName'], remarks: parse_json['projectSpecificationRemarks'], unit_price: parse_json['projectSpecificationUnitPrice'], unit: parse_json['projectSpecificationUnit'].to_i, price: parse_json['projectSpecificationPrice'], project_id: parse_json['projectSpecificationId'], project_name: parse_json['projectName'], project_id: parse_json['projectId'])
          end
        end
      end
      render json: { status: :success, quote: Quote.find(params[:id]), quote_projects: Quote.find(params[:id]).quote_projects }
    end
  rescue => e

    if params[:id] == 'null'

      render json: { status: :error, quote: Quote.new, quote_projects: [] }
    else

      render json: { status: :error, quote: Quote.find(params[:id].to_i), quote_projects: Quote.find(params[:id].to_i).quote_projects }
    end
  end

  ##
  # 削除
  # @version 2018/06/10
  #
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
  #
  def status

    quote.update!(status: params[:status].to_sym)

    if quote.working? && quote.work.blank?

      quote.build_work(division_id: current_user.division_id).save!

      redirect_to work_path(quote.work), flash: {notice: {message: '作業書を作成しました'}} and return
    end

    redirect_to :back, flash: {notice: {message: 'ステータスを更新しました'}}
  end

  ##
  # 見積書を複製する
  # @version 2018/06/10
  #
  def copy

    # deep_quote = quote.fake_deep_clone

    # deep_quote.save!

    # if quote.quote_projects.present?

      # quote.quote_projects.each do |r|

        # deep_quote.quote_projects.create!(quote_id: deep_quote.id, project_id: r.project_id, price: r.price, unit: r.unit, name: r.name, unit_price: r.unit_price, project_name: r.project_name, remarks: r.remarks)
      # end
    # end

    # if quote.quote_items.present?

      # quote.quote_items.each do |r|

        # deep_clone.quote_items.create!(quote_id: deep_quote.id, cost: r.cost, gross_profit: r.gross_profit, detail: r.detail, name: r.name, unit_price: r.unit_price, quantity: r.quantity)
      # end
    # end


    clone_quote = quote.deep_clone(:quote_projects)

    clone_quote.save

    clone_quote.update_columns(pdf_url: nil, user_id: current_user.id)

    clone_quote.draft!

    if quote.work.present?
      # , :subcontractor, :subcontractor_detail
      clone_work = quote.work.deep_clone(:work_details)
      clone_work.quote_id = clone_quote.id
      clone_work.save!
      clone_work.working!
      quote.work.subcontractor.each do |subcontractor|

        deep_subcontractor = subcontractor.deep_dup
        deep_subcontractor.work_id = clone_work.id
        deep_subcontractor.save!
        quote.work.subcontractor_detail.each do |sub_detail|

          if subcontractor.id == sub_detail.work_subcontractor_id

            deep_sub_detail = sub_detail.deep_dup
            deep_sub_detail.work_id = clone_work.id
            deep_sub_detail.work_subcontractor_id = deep_subcontractor.id
            deep_sub_detail.save!
          end
        end
      end
    end

    redirect_to edit_quote_path(clone_quote), flash: {notice: {message: '見積書を複製しました'}}
  end

  #----------------------------------------
  #  ** Methods **
  #----------------------------------------

  private

  def quote_params

    params.require(:quote).permit :id, :company_division_client_id, :date, :expiration, :subject, :remarks, :memo, :pdf_url, :price, :user_id, :status, :quote_number,
      :quote_type, :channel, :deliver_at, :deliver_type, :deliver_type_note, :division_id, :discount,
      quote_items_attributes: [:id, :name, :unit_price, :quantity, :cost, :gross_profit, :detail]
  end

  def count_params

    params :count
  end

end
