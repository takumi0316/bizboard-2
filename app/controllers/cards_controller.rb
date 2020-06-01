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
  # 表面
  # @version
  #
  def front_preview

    add_breadcrumb '名刺マスタ一覧', path: cards_path
    add_breadcrumb '表面'
  end

  ##
  # 裏面
  # @version 2020/06/01
  #
  def reverse_preview

    add_breadcrumb '名刺マスタ一覧', path: cards_path
    add_breadcrumb '裏面'
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
            details_attributes: [:id, :card_template_id, :name, :font, :font_size, :font_color, :coord_x, :coord_y, :length, :line_space]
          }
        ]
      }
    end
end
