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

  end

  def new

  end

  def create

  end

  def edit

  end

  def update

  end

  #----------------------------------------
  #  ** Methods **
  #----------------------------------------

  private

    def card_layout_params

      params.require(:card_layout).permit :name, :template_type, :status
    end

end
