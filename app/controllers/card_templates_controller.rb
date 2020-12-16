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

  after_action :set_default_layout, only: [:create, :update]

  after_action :release_default_layout, only: [:update]

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
    add_breadcrumb '編集'
  end

  def update

    card_template.update! card_template_params

    render json: { status: :success, card_template: card_template }
  rescue => e

    render json: { status: :error, message: e.message }
  end

  def destroy

    card_template.destroy!

    redirect_to card_templates_path, flash: { show: true, icon: 'success', message: 'テンプレートを削除しました。' }
  rescue => e

    redirect_to card_templates_path, flash: { show: true, icon: 'info', message: e.message }
  end

  ##
  #　複製
  #  @version 2020/08/14
  def copy

    dup_card_template = card_template.deep_clone(:template_layouts)

    dup_card_template.update! name: "#{ card_template.name}＿複製＿#{ Time.zone.now.strftime("%Y年 %m月 %d日") }"

    redirect_to edit_card_template_path(dup_card_template), flash: { show: true, icon: 'success', message: '案件を複製しました' }
  rescue => e

    redirect_back fallback_location: url_for({ action: :index }), flash: { show: true, icon: 'info', message: e.message }
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

    def set_default_layout
  
      return if card_template.template_layouts.where(status: :head).blank? && card_template.template_layouts.where(status: :head).blank?
      card_template.company.divisions.each do |r|

        r.clients.each do |c|
 
          head_layout_id = c.head_layout_id
          tail_layout_id = c.tail_layout_id
          head_layout_id = head_layout_id == card_template.template_layouts.where(status: :head).first&.card_layout_id ? head_layout_id : card_template.template_layouts.where(status: :head).first&.card_layout_id
          tail_layout_id = tail_layout_id == card_template.template_layouts.where(status: :tail).first&.card_layout_id ? tail_layout_id : card_template.template_layouts.where(status: :tail).first&.card_layout_id

          c.update! head_layout_id: head_layout_id, tail_layout_id: tail_layout_id

        end
      end
    end

    def release_default_layout
  
      return if card_template.template_layouts.where(status: :head).present? && card_template.template_layouts.where(status: :tail).present?
      card_template.company.divisions.each do |r|
        r.clients.each do |c|
 
          head_layout_id = nil
          tail_layout_id = nil
          head_layout_id = card_template.template_layouts.where(status: :head).present? ? c.head_layout_id : head_layout_id
          tail_layout_id = card_template.template_layouts.where(status: :tail).present? ? c.tail_layout_id : tail_layout_id
  
          c.update! head_layout_id: head_layout_id  , tail_layout_id: tail_layout_id

        end
      end
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
