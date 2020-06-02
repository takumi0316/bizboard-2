class CardTemplatesController < ApplicationController

  #----------------------------------------
  #  ** Includes **
  #----------------------------------------

  #----------------------------------------
  #  ** Instance variables **
  #----------------------------------------

  expose_with_pagination(:card_templates) { CardTemplate.search(params[:name]).all.reverse_order }

  expose(:card) { Card.find_or_initialize_by(company_id: params[:company_id]) }

  expose(:card_template) { CardTemplate.find_or_initialize_by(id: params[:id]) }

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

    add_breadcrumb '一覧', path: card_templates_path
    add_breadcrumb '新規作成'
  end

  def create

    card.update! card_params

    redirect_to action: edit, flash: { notice: { message: '名刺テンプレートを作成しました' } }
  rescue => e

    render json: { status: :error, message: e.message }
  end

  def edit

    add_breadcrumb '一覧', path: card_templates_path
    add_breadcrumb '新規作成'
  end

  def update

    card_template.update! card_template_params

    redirect

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

    def card_template_params

      params.require(:card_template).permit :name, :template_type, :status
    end
end
