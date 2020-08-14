class TemplateClientsController < ApplicationController

  #----------------------------------------
  #  ** Includes **
  #----------------------------------------

  #----------------------------------------
  #  ** Instance variables **
  #----------------------------------------

  expose_with_pagination(:card_templates) { CardTemplate.search(params[:name]).all.reverse_order }


  expose(:card_template) { CardTemplate.find(params[:card_template_id]) }

  #----------------------------------------
  #  ** Layouts **
  #----------------------------------------

  #----------------------------------------
  #  ** Request cycles **
  #----------------------------------------

  #----------------------------------------
  #  ** Actions **
  #----------------------------------------

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
  def edit_head

    add_breadcrumb '一覧', path: template_clients_path
    add_breadcrumb '編集(表面)'
  end

  ##
  # 編集(裏面)
  # @version 2020/08/14
  #
  def edit_tail

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

    raise if params[:url].blank?
    content = open params[:url]
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

end
