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
  end

  def create

    card_layout.update! card_layout_params

    redirect_back action: :edit, flash: { notice: { message: 'レイアウトを作成しました。' } }
  rescue => e

    render json: { status: :error, message: e.message }
  end

  def edit

    add_breadcrumb '一覧', path: card_layouts_path
    add_breadcrumb '編集'
  end

  def update

  end

  #----------------------------------------
  #  ** Methods **
  #----------------------------------------

  private

    def card_layout_params

      params.require(:card_layout).permit :card_template_id, layout_id
    end

end
