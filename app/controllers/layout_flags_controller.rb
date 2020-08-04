class LayoutFlagsController < ApplicationController

  #----------------------------------------
  #  ** Includes **
  #----------------------------------------

  #----------------------------------------
  #  ** Instance variables **
  #----------------------------------------

  expose_with_pagination(:layout_flags) { LayoutFlag.search(params[:name]).all.reverse_order }

  expose(:layout_flag) { LayoutFlag.find_or_initialize_by(id: params[:id]) }

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

    def layout_flog_params

      params.require(:layout_flag).permit :name, :template_type, :status
    end

end
