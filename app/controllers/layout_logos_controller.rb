class LayoutLogosController < ApplicationController

  #----------------------------------------
  #  ** Includes **
  #----------------------------------------

  #----------------------------------------
  #  ** Instance variables **
  #----------------------------------------

  expose_with_pagination(:layout_logos) { LayoutLogo.search(params[:name]).all.reverse_order }

  expose(:layout_logo) { LayoutLogo.find_or_initialize_by(id: params[:id]) }

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

    def layout_logo_params

      params.require(:layout_logo).permit :name
    end
end
