class TemplateClientsController < ApplicationController

  #----------------------------------------
  #  ** Includes **
  #----------------------------------------

  #----------------------------------------
  #  ** Instance variables **
  #----------------------------------------

  expose_with_pagination(:card_templates) { CardTemplate.search(params[:name]).all.reverse_order }

  expose(:card_template) { CardTemplate.find(params[:id]) }

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

  before_action :format_layouts, only: [:head, :tail]
  before_action :format_layouts, only: [:head, :tail]

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

    add_breadcrumb '一覧', path: template_clients_path
    add_breadcrumb '編集(表面)'
  end

  ##
  # 編集(裏面)
  # @version 2020/08/14
  #
  def tail

    add_breadcrumb '一覧', path: template_clients_path
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

  ##
  # 画像引用参照
  # @version 2018/06/10
  #
  def transfer

    raise if params[:card_layout_id].blank?
    url = CardLayout.find(params[:card_layout_id]).file.service_url
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

      params[:action].to_sym
    end

    def access_template_layouts option

      card_template.template_layouts.where(status: option)
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

    def format_contents layouts

      contents = []
      layouts.map { |layout|
        layout.card_layout.contents.map { |content|
          contents.push({
            flag_id: content.content_flag_id,
            flag_name: content.content_flag.name,
          })
        }
      }
    end

    def format_contents

      result = access_template_layouts(cast_action).blank?
      @contents = result ? [] : format_contents(access_template_layouts(cast_action))
    end
end
