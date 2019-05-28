class QuoteProjectsController < ApplicationController

  def destroy

    findQuoteProject = QuoteProject.find(params[:id])
    findQuoteProject.destroy!
    render json: { status: :success }
  end
end
