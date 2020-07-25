class CardsController < ApplicationController

  #----------------------------------------
  #  ** Includes **
  #----------------------------------------

  #----------------------------------------
  #  ** Instance variables **
  #----------------------------------------

  # 名刺マスタ
  expose_with_pagination(:cards) { Card.search(params[:name]).all.reverse_order }

  # 名刺マスタ
  expose(:card) { Card.find_or_initialize_by id: params[:id] || params[:card_id] }

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
  # @version 2020/03/23
  #
  def index

    add_breadcrumb '名刺マスタ一覧'
  end

  ##
  # 新規
  # @version 2020/03/23
  #
  def new

    add_breadcrumb '名刺マスタ一覧', path: cards_path
    add_breadcrumb '新規作成'
  end

  ##
  # 作成
  # @version 2020/03/23
  #
  def create

    card.update! card_params

    render json: { status: :success, card: card }
  rescue => e

    render json: { status: :error, message: e.message }
  end

  ##
  # 編集
  # @version 2020/03/23
  #
  def edit

    add_breadcrumb '名刺マスタ一覧', path: cards_path
    add_breadcrumb '編集'
  end

  def show
  end

  ##
  # 更新
  # @version 2020/03/23
  #
  def update

    card.update! card_params
    front_details_count = card.templates.first.details.count
    reverse_details_count = card.templates.last.details.count
    card.card_clients.each do |card_client|

      card_client.templates.each_with_index do |template, index|

        value_count = template.values.count
        if index == 0

          if front_details_count != value_count
            new_details = card.templates.first.details.where(created_at: Time.zone.now.beginning_of_day..Time.zone.now.end_of_day)
            # nilだったら脱出
            return if new_details.nil?
            new_details.each { |detail| ClientTemplateValue.create! client_template_id: template.id, template_detail_id: detail.id }
          end
        end
        if index == 1

          if reverse_details_count != value_count
            new_details = card.templates.first.details.where(created_at: Time.zone.now.begging_of_day..Time.zone.now.end_of_day)
            # nilだったら脱出
            return if new_details.nil?
            new_details.each { |detail| ClientTemplateValue.create! client_template_id: template.id, template_detail_id: detail.id }
          end
        end
      end
    end

    render json: { status: :success, card: card }
  rescue => e

    render json: { status: :error, message: e.message }
  end

  ##
  # 削除
  # @version 2020/03/23
  #
  def destroy

    card.destroy!

    redirect_to action: :index, flash: { type: :success, message: '削除しました。' }
  rescue => e

    render json: { status: :error, message: e.message }
  end

  ##
  # 複製
  # @version 2020/06/01
  #
  def copy

    clone_card = card.deep_clone(:templates)
    clone_card.name = "#{card.name}（名刺ID#{card.id}: コピー）"
    clone_card.save!

    card.templates.each do |r|
      r.details.each do |d|
        deep_detail = d.deep_dup
        deep_detail.card_template_id = clone_card.templates.find_by(status: r.status).id
        deep_detail.save!
      end
    end

    redirect_to card_front_preview_path(clone_card), flash: { notice: { message: '名刺マスタを複製しました' } }
  end

  ##
  # 表面
  # @version
  #
  def front_preview

    add_breadcrumb '名刺マスタ一覧', path: cards_path
    add_breadcrumb '編集（表面）'
  end

  ##
  # 裏面
  # @version 2020/06/01
  #
  def reverse_preview

    add_breadcrumb '名刺マスタ一覧', path: cards_path
    add_breadcrumb '編集（裏面）'
  end

  ##
  # 画像引用参照
  # @version 2018/06/10
  #
  def transfer

    raise if params[:url].blank?
    content = open params[:url]
    send_data content.read, type: :pdf, disposition: 'inline'
  rescue => e

    render json: { status: :error, message: e.message }
  end

  private

    def card_params

      params.require(:card).permit :company_id, :name, {
        templates_attributes: [:id, :card_id, :status, :file,
          {
            details_attributes: [:id, :card_template_id, :name, :font, :font_size, :font_color, :coord_x, :coord_y, :length, :line_space, :item_type]
          }
        ]
      }
    end
end
