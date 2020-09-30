require 'csv'

class TemplateClientsController < ApplicationController

  #----------------------------------------
  #  ** Includes **
  #----------------------------------------

  #----------------------------------------
  #  ** Instance variables **
  #----------------------------------------

  expose_with_pagination(:card_templates) { CardTemplate.search(params[:name]).all.reverse_order }

  expose(:card_template) { CardTemplate.find(params[:id]) }

  expose(:card_layout) { CardLayout.find(params[:card_layout_id]) }

  expose(:company_division_client) { CompanyDivisionClient.find(params[:client_id]) }

  #----------------------------------------
  #  ** Layouts **
  #----------------------------------------

  #----------------------------------------
  #  ** Request cycles **
  #----------------------------------------

  #----------------------------------------
  #  ** Actions **
  #----------------------------------------

  before_action :format_layouts, only: [:head, :tail, :set_layout]

  before_action :format_contents, only: [:head, :tail, :set_layout]

  def index

    add_breadcrumb '一覧', path: card_templates_path
    add_breadcrumb 'ユーザー一覧'
  end

  ##
  # 編集(表面)
  # @version 2020/08/14
  #
  def head

    add_breadcrumb '一覧', path: card_templates_path
    add_breadcrumb 'ユーザー一覧', path: template_clients_path(id: params[:id])
    add_breadcrumb '編集(表面)'
  end

  ##
  # 編集(裏面)
  # @version 2020/08/14
  #
  def tail

    add_breadcrumb '一覧', path: card_templates_path
    add_breadcrumb 'ユーザー一覧', path: template_clients_path(id: params[:id])
    add_breadcrumb '編集(裏面)'
  end

  def destroy

    redirect_to card_templates_path, flash: { notice: { message: '' } }
  rescue => e

    redirect_to card_templates_path, flash: { notice: { message: e.message } }
  end

  def download

    bom = "\uFEFF"
    download_csv = CSV.generate(bom) do |csv|

      # ヘッダー情報
      headers = []
      headers << 'No.'
      headers << 'テンプレートID'
      headers << 'デフォルトレイアウトID(表)'
      headers << 'デフォルトレイアウトID(裏)'
      headers << 'ID'
      headers << '会社名'
      headers << '部署ID'
      headers << '部署名'
      headers << '担当者ID'
      headers << '担当者名'

      # flagをuniqにするため
      flags = []
      card_template.card_layouts.map { |r| r.contents.map { |c| flags << c.content_flag_id } }

      flags.uniq!
      flags.map { |f| headers << ContentFlag.find(f).name }
      csv << headers

      card_template.company.divisions.each do |division|
        division.clients.each_with_index do |client, index|

          head_layout_id = ''
          head_result = card_template.template_layouts.where(status: :head).map { |head| client.head_layout_id == head.card_layout_id ? true : false }

          if head_result.include?(true)

            head_layout_id = client.head_layout_id
          else

            head_layout_id = card_template.template_layouts.where(status: :head).first.card_layout_id
          end

          tail_layout_id = ''
          tail_result = card_template.template_layouts.where(status: :tail).map { |tail| client.tail_layout_id == tail.card_layout_id ? true : false }

          if tail_result.include?(true)

            tail_layout_id = client.tail_layout_id
          else

            tail_layout_id = card_template.template_layouts.where(status: :tail).first.card_layout_id
          end

          values = []
          values << index + 1
          values << card_template.id
          values << head_layout_id
          values << tail_layout_id
          values << card_template.company.id
          values << card_template.company.name
          values << division.id
          values << division.name
          values << client.id
          values << client.name
          flags.map do |f|

            flag = ContentFlag.find(f)
            layout_value = LayoutValue.find_or_initialize_by(company_division_client_id: client.id, content_flag_id: f)
            values << layout_value.text_value if flag.content_type == 'text'
            values << layout_value.textarea_value if flag.content_type == 'text_area'
            values << layout_value.upload_id if flag.content_type == 'image'
          end

          csv << values
        end
      end

    end

    send_data download_csv, filename: '担当者情報ダウンロード.csv', type: :csv
  end

  def upload

    flag_ids = []
    @flag_names = []
    card_template.card_layouts.map do |r| r.contents.map { |c| flag_ids << c.content_flag_id if c.layout_type != 'image' } end

    flag_ids.uniq!
    flag_ids.map { |f| @flag_names << ContentFlag.find(f).name }

    add_breadcrumb '一覧', path: template_clients_path(id: params[:id])
    add_breadcrumb 'CSVアップロード'
  end

  def import_csv

    clients = []
    params[:template_clients].map do |template_client|

      client = CompanyDivisionClient.find(template_client['担当者ID'])
      card_template = CardTemplate.find_by(company_id: client.company_division.company_id)
      head_layout_id = template_client['デフォルトレイアウトID(表)']
      tail_layout_id = template_client['デフォルトレイアウトID(裏)']

      if head_layout_id.blank?

        raise 'テンプレートに表のレイアウトが登録されていません。' if access_template_layouts(:head).blank?

        head_layout_id = access_template_layouts(:head).first.card_layout_id
      else

        raise 'テンプレートに表のレイアウトが登録されていません。' if access_template_layouts(:head).blank?

        head_layout_id = template_client['デフォルトレイアウトID(表)']
        result = access_template_layouts(:head).map { |template_layout| template_layout.card_layout_id == head_layout_id.to_i }

        raise "テンプレートに登録されていないレイアウト(表ID: #{ head_layout_id })が指定されています。" if !result.include?(true)
      end

      if tail_layout_id.blank?

        raise 'テンプレートに裏のレイアウトが登録されていません。' if access_template_layouts(:tail).blank?

        tail_layout_id = access_template_layouts(:tail).first.card_layout_id
      else

        raise 'テンプレートに裏のレイアウトが登録されていません。' if access_template_layouts(:tail).blank?

        tail_layout_id = template_client['デフォルトレイアウトID(裏)']
        result = access_template_layouts(:tail).map { |template_layout| template_layout.card_layout_id == tail_layout_id.to_i }

        raise "テンプレートに登録されていないレイアウト(裏ID: #{ tail_layout_id })が指定されています。" if !result.include?(true)
      end

      client.update! head_layout_id: head_layout_id, tail_layout_id: tail_layout_id

      clients.push(client)

      access_template_layouts(:head).map do |head_layout|
        head_layout.card_layout.contents.map do |content|

          flag = content.content_flag
          if flag.content_type != 'image'

            layout_value = LayoutValue.find_or_initialize_by(company_division_client_id: client.id, content_flag_id: flag.id)
            layout_value.update! text_value: template_client[flag.name] if flag.content_type == 'text'
            layout_value.update! textarea_value: template_client[flag.name] if flag.content_type == 'text_area'
          end

          if flag.content_type == 'image'

            raise "コンテンツに登録されていない画像IDです。(画像ID: #{ template_client[flag.name] })"  if content.uploads.pluck(:id).include?(template_client[flag.name])

            layout_value = LayoutValue.find_or_initialize_by(company_division_client_id: client.id, content_flag_id: flag.id, layout_content_id: content.id)
            layout_value.update! upload_id: template_client[flag.name]
          end
        end
      end

      access_template_layouts(:tail).map do |tail_layout|
        tail_layout.card_layout.contents.map do |content|

          flag = content.content_flag
          if flag.content_type != 'image'

            layout_value = LayoutValue.find_or_initialize_by(company_division_client_id: client.id, content_flag_id: flag.id)
            layout_value.update! text_value: template_client[flag.name] if flag.content_type == 'text'
            layout_value.update! textarea_value: template_client[flag.name] if flag.content_type == 'text_area'
          end

          if flag.content_type == 'image'

            raise "コンテンツに登録されていない画像IDです。(画像ID: #{ template_client[flag.name] })"  if content.uploads.pluck(:id).include?(template_client[flag.name])

            layout_value = LayoutValue.find_or_initialize_by(company_division_client_id: client.id, content_flag_id: flag.id, layout_content_id: content.id)
            layout_value.update! upload_id: template_client[flag.name]
          end
        end
      end
    end

    format_clients = clients.map do |client|

      head_layout = client.head_layout
      tail_layout = client.tail_layout
      head_layout_contents = access_contents(head_layout, client.id)
      tail_layout_contents = access_contents(tail_layout, client.id)

      {
        client_id: client.id,
        client_name: client.name,
        default_head_layout: access_card_layouts(client.head_layout),
        default_tail_layout: access_card_layouts(client.tail_layout),
        head_layout_contents: head_layout_contents,
        tail_layout_contents: tail_layout_contents
      }
    end

    head_layouts =  access_template_layouts(:head).map { |r| access_card_layouts(r.card_layout) }
    tail_layouts =  access_template_layouts(:tail).map { |r| access_card_layouts(r.card_layout) }

    render json: { status: :success, head_layouts: head_layouts, tail_layouts: tail_layouts, clients: format_clients }
  rescue => e

    render json: { status: :error, message: e }
  end

  def set_layout

    company_division_client.update! head_layout_id: params[:layout_id] if params[:layout_type] == 'head'
    company_division_client.update! tail_layout_id: params[:layout_id] if params[:layout_type] == 'tail'

    render json: { status: :success, contents: @contents }
  end

  ##
  # PDF引用参照
  # @version 2018/06/10
  #
  def transfer

    raise if params[:card_layout_id].blank?
    url = card_layout.file.service_url
    content = open url
    send_data content.read, type: content.content_type, disposition: 'inline'
  rescue

    render_json_404
  end

  ##
  # PDF引用参照
  # @version 2018/06/10
  #
  def image_transfer

    url = params[:url]
    raise if url.blank?
    content = open url
    send_data content.read, type: content.content_type, disposition: 'inline'
  rescue

    render_json_404
  end

  #----------------------------------------
  #  ** Methods **
  #----------------------------------------

  private

    def template_clients_params

    end

    def cast_action

      sym = params[:layout_type].blank? ? params[:action].to_sym : params[:layout_type].to_sym
    end

    def access_template_layouts sym

      card_template.template_layouts.where(status: sym)
    end

    def access_card_layouts layout

      {
        id: layout.id,
        name: layout.name,
        url: layout.file.preview(resize: '3000x3000').processed.service_url
      }
    end

    def format_layouts

      result = access_template_layouts(cast_action).blank?
      @layouts = result ? [] : access_template_layouts(cast_action).map do |r| access_card_layouts(r.card_layout) end
    end

    def access_contents layout, client_id=nil

      layout.contents.map { |r|
        flag = ContentFlag.find(r.content_flag_id)
        layout_value = LayoutValue.find_or_initialize_by(company_division_client_id: client_id ? client_id : company_division_client.id, content_flag_id: flag.id) if flag.content_type != 'image'
        layout_value = LayoutValue.find_or_initialize_by(company_division_client_id: client_id ? client_id : company_division_client.id, content_flag_id: flag.id, layout_content_id: r.id) if flag.content_type == 'image'
        {
          id: r.id,
          name: r.name,
          x_coordinate: r.x_coordinate,
          y_coordinate: r.y_coordinate,
          font_size: r.font_size,
          layout_length: r.layout_length,
          letter_spacing: r.letter_spacing,
          reduction_rate: r.reduction_rate,
          is_reduction_rated: r.is_reduction_rated,
          font_family: r.font_family,
          font_color: r.font_color,
          logo_height: r.logo_height,
          logo_width: r.logo_width,
          flag_id: r.content_flag_id,
          flag_name: r.content_flag.name,
          content_type: r.content_flag.content_type,
          layout_value_id: layout_value.id,
          text_value: layout_value.text_value,
          textarea_value: layout_value.textarea_value,
          no_image: r.no_image,
          upload_id: layout_value.upload_id,
          uploads: r.content_uploads.map do |c|
            {
              id: c.id,
              upload_id: c.upload_id,
              name: c.upload.name,
              url: c.upload.image.service_url
            }
          end
        }
      }
    end

    def format_contents

      result = access_template_layouts(cast_action).blank?
      default_layout = ''

      if cast_action == :head

        default_layout = company_division_client.head_layout_id.nil? ? CardLayout.find(@layouts[0][:id]) : company_division_client.head_layout if params[:action] != 'set_layout'
        default_layout = CardLayout.find(params[:layout_id]) if params[:action] == 'set_layout'
      elsif cast_action == :tail

        default_layout = company_division_client.tail_layout_id.nil? ? CardLayout.find(@layouts[0][:id]) : company_division_client.tail_layout
        default_layout = CardLayout.find(params[:layout_id]) if params[:action] == 'set_layout'
      end

      @contents = result ? [] : access_contents(default_layout)
    end
end
