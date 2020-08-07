class CardLayoutsController < ApplicationController

  #----------------------------------------
  #  ** Includes **
  #----------------------------------------

  #----------------------------------------
  #  ** Instance variables **
  #----------------------------------------

  expose_with_pagination(:card_layouts) { CardLayout.search(params[:name]).all.reverse_order }

  expose(:card_layout) { CardLayout.find_or_initialize_by(id: params[:id]) }

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

    add_breadcrumb '一覧', path: card_layouts_path
    add_breadcrumb '新規作成'
  end

  def create

    card_layout.update! card_layout_params

    render json: { status: :success }
  rescue => e

    render json: { status: :error, message: e.message }
  end

  def edit

    add_breadcrumb '一覧', path: card_layouts_path
    add_breadcrumb '編集'
  end

  def update

    render json: { status: :error, message: e.message }
  end

  #----------------------------------------
  #  ** Methods **
  #----------------------------------------

  private

    def card_layout_params

      params.require(:card_layout).permit :name
    end

end
