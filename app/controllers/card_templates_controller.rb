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

  before_action :set_the_required_data, only: [:new, :edit]

  def index

    add_breadcrumb '一覧'
  end

  def new

    add_breadcrumb '一覧', path: card_templates_path
    add_breadcrumb '新規作成'
  end

  def create

    card_template.update! card_template_params

    render json: { status: :success, card_template: card_template }
  rescue => e

    render json: { status: :error, message: e.message }
  end

  def edit

    add_breadcrumb '一覧', path: card_templates_path
    add_breadcrumb '新規作成'
  end

  def update

    card_template.update! card_template_params

    render json: { status: :success, card_template: card_template }
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

      params.require(:card_template).permit :name, :company_id, template_layouts_attributes: [
        :id, :card_template_id, :card_layout_id, :status, :_destroy
      ]
    end

    def set_the_required_data

      @heads = []
      @tails = []

      if card_template.persisted?

        @heads = TemplateLayout.where(card_template_id: card_template.id).where(status: :head).map do |r|
          {
            id: r.id,
            card_template_id: r.card_template_id,
            card_layout_id: r.card_layout_id,
            layout_name: r.card_layout.name,
            status: r.status
          }
        end

        @tails = TemplateLayout.where(card_template_id: card_template.id).where(status: :tail).map do |r|
          {
            id: r.id,
            card_template_id: r.card_template_id,
            card_layout_id: r.card_layout_id,
            layout_name: r.card_layout.name,
            status: r.status
          }
        end

      end
    end
end
