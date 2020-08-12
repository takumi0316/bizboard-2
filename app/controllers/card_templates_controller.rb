class CardTemplatesController < ApplicationController

  #----------------------------------------
  #  ** Includes **
  #----------------------------------------

  #----------------------------------------
  #  ** Instance variables **
  #----------------------------------------

  expose_with_pagination(:card_templates) { CardTemplate.search(params[:name]).all.reverse_order }


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

    card_template.update! card_template_params

    render json: { status: :success, card_template: card_template}
  rescue => e

    render json: { status: :error, message: e.message }
  end

  def edit

    add_breadcrumb '一覧', path: card_templates_path
    add_breadcrumb '新規作成'
  end

  def update

    card_template.update! card_template_params

    render json: { status: :success, card_template: card_template}
  rescue => e

    render json: { status: :error, message: e.message }
  end

  def destroy

    card_template.destroy!

    redirect_to card_templates_path, flash: { notice: { message: 'テンプレートを削除しました。' } }
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

    def card_template_params

      params.require(:card_template).permit :name, :company_id
    end
end
