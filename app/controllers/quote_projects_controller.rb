class QuoteProjectsController < ApplicationController

	#----------------------------------------
	#  ** Includes **
	#----------------------------------------

	#----------------------------------------
	#  ** Instance variables **
	#----------------------------------------

	# 見積もり
	expose(:quote_project) { QuoteProject.find_or_initialize_by id: params[:id] }

	#----------------------------------------
	#  ** Layouts **
	#----------------------------------------

	#----------------------------------------
	#  ** Request cycles **
	#----------------------------------------

	#----------------------------------------
	#  ** Actions **
	#----------------------------------------

  def destroy

    quote_project.destroy!

    render json: { status: :success }

  rescue => e

    render json: { status: :error, message: e.message }
  end

	#----------------------------------------
	#  ** Methods **
	#----------------------------------------

end
