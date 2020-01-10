class QuoteProjectsController < ApplicationController

	# 見積もり
	expose(:quote_project) { QuoteProject.find_or_initialize_by id: params[:id] }

	def create

		quote_project.update!(name: params[:name], remarks: params[:remarks], unit_price: params[:unit_price], unit: params[:unit], price: params[:price], quote_id: params[:quote_id], project_id: params[:project_id], project_name: params[:project_name])
		project = Quote.find(params[:quote_id]).quote_projects.last
		render json: { status: :success, project: project }
	rescue => e

		render json: { status: :error, message: e.message }
	end

  def destroy

    Quote.find(params[:quote_id]).update!(:price => params[:quote_price])
    findQuoteProject = QuoteProject.find(params[:id])
    findQuoteProject.destroy!
    render json: { status: :success, quote_projects: Quote.find(params[:quote_id]).quote_projects }
  end
end
