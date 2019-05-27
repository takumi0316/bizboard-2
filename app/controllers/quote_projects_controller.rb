class QuoteProjectsController < ApplicationController

  def destroy

    QuoteProject.find(params[:id]).destroy!
    render json: { status: :success, quote_projects: Quote.find(params[:quote_id]).quote_projects, quote: Quote.find(params[:quote_id]) }
  end
end
