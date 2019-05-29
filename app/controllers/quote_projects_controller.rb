class QuoteProjectsController < ApplicationController

  def destroy

    Quote.find(params[:quote_id]).update!(:price => params[:quote_price])
    findQuoteProject = QuoteProject.find(params[:id])
    findQuoteProject.destroy!
    render json: { status: :success, quote_projects: Quote.find(params[:quote_id]).quote_projects }
  end
end
