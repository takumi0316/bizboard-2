class CardsController < ApplicationController

  #----------------------------------------
  #  ** Includes **
  #----------------------------------------

  #----------------------------------------
  #  ** Instance variables **
  #----------------------------------------

  # 名刺マスタ
  expose_with_pagination(:cards) {
    Card.all
  }

  # 名刺マスタ
  expose(:card) { Card.find_or_initialize_by id: params[:id] }

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
  end

  ##
  # 削除
  # @version 2020/03/23
  #
  def destroy
  end

  private

  def card_params

    params.require(:card).permit! :id, :company_division_id, :name, {
      card_template_attributes: [:id, :card_id, :status, :file,
        { template_details_attributes: [:id, :card_template_id, :name, :font, :font_size, :font_color, :length, :line_space] }
      ]
    }
  end
end
