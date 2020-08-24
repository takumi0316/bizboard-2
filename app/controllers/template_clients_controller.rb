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

    add_breadcrumb '一覧'
  end

  def new

    add_breadcrumb '一覧', path: template_clients_path
    add_breadcrumb '新規作成'
  end

  def create


    render json: { status: :success }
  rescue => e

    render json: { status: :error, message: e.message }
  end

  ##
  # 編集(表面)
  # @version 2020/08/14
  #
  def head

    add_breadcrumb '一覧', path: template_clients_path(id: params[:id])
    add_breadcrumb '編集(表面)'
  end

  ##
  # 編集(裏面)
  # @version 2020/08/14
  #
  def tail

    add_breadcrumb '一覧', path: template_clients_path(id: params[:id])
    add_breadcrumb '編集(裏面)'
  end

  def update

    render json: { status: :success }
  rescue => e

    render json: { status: :error, message: e.message }
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
      headers << ''
      headers << 'テンプレートID'
      headers << 'デフォルトレイアウトID(表)'
      headers << 'デフォルトレイアウトID(裏)'
      headers << '会社ID'
      headers << '会社名'
      headers << '部署ID'
      headers << '部署名'
      headers << '担当者ID'
      headers << '担当者名'

      # flagをuniqにするため
      flags = []
      card_template.card_layouts.map do |r| r.contents.map { |c| flags << c.content_flag_id } end

      flags.uniq!
      flags.map { |f| headers << ContentFlag.find(f).name }
      csv << headers

      card_template.company.divisions.each do |division|
        division.clients.each_with_index do |client, index|

          values = []
          values << ''
          values << card_template.id
          values << client.head_layout_id || access_template_layouts(:head).card_layouts.first.id
          values << client.tail_layout_id || access_template_layouts(:tail).card_layouts.first.id
          values << card_template.company.name
          values << division.id
          values << division.name
          values << client.id
          values << client.name
          flags.map do |f|

            layout_value = LayoutValue.find_or_initialize_by(company_division_client_id: client.id, content_flag_id: f)
            values << layout_value.text_value if layout_value.layout_type == 'text'
            values << layout_value.textarea_value if layout_value.layout_type == 'text_area'
          end

          csv << values
        end
      end

    end

    send_data download_csv, filename: '担当者情報ダウンロード.csv', type: :csv
  end

  def upload

    add_breadcrumb '一覧', path: template_clients_path(id: params[:id])
    add_breadcrumb 'CSVアップロード'
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

    def access_contents

      if cast_action == :head

        default_layout = company_division_client.head_layout_id.nil? ? CardLayout.find(@layouts[0][:id]) : company_division_client.head_layout if params[:action] != 'set_layout'
        default_layout = CardLayout.find(params[:layout_id]) if params[:action] == 'set_layout'
        default_layout.contents.map do |r|

          layout_value = LayoutValue.find_or_initialize_by(company_division_client_id: company_division_client.id, content_flag_id: r.content_flag_id) if r.layout_type != 'image'
          layout_value = LayoutValue.find_or_initialize_by(company_division_client_id: company_division_client.id, content_flag_id: r.content_flag_id, layout_content_id: r.id) if r.layout_type == 'image'
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
            layout_type: r.layout_type,
            font_family: r.font_family,
            font_color: r.font_color,
            logo_height: r.logo_height,
            logo_width: r.logo_width,
            flag_id: r.content_flag_id,
            flag_name: r.content_flag.name,
            layout_value_id: layout_value.id,
            text_value: layout_value.text_value,
            textarea_value: layout_value.textarea_value,
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
        end
      elsif cast_action == :tail

        default_layout = company_division_client.tail_layout_id.nil? ? CardLayout.find(@layouts[0][:id]) : company_division_client.tail_layout
        default_layout = CardLayout.find(params[:layout_id]) if params[:action] == 'set_layout'
        default_layout.contents.map do |r|

          layout_value = LayoutValue.find_or_initialize_by(company_division_client_id: company_division_client.id, content_flag_id: r.content_flag_id) if r.layout_type != 'image'
          layout_value = LayoutValue.find_or_initialize_by(company_division_client_id: company_division_client.id, content_flag_id: r.content_flag_id, layout_content_id: r.id) if r.layout_type == 'image'
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
            layout_type: r.layout_type,
            font_family: r.font_family,
            font_color: r.font_color,
            logo_height: r.logo_height,
            logo_width: r.logo_width,
            flag_id: r.content_flag_id,
            flag_name: r.content_flag.name,
            layout_value_id: layout_value.id,
            text_value: layout_value.text_value,
            textarea_value: layout_value.textarea_value,
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
        end
      end

    end

    def format_contents

      result = access_template_layouts(cast_action).blank?
      @contents = result ? [] : access_contents
    end
end