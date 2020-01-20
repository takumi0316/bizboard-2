class QuoteProjectsController < ApplicationController

	# 見積もり
	expose(:quote_project) { QuoteProject.find_or_initialize_by id: params[:id] }

	def create

		quote = Quote.find(params[:quote_id])
		array = []
		params.require(:projects).each do |project|
			parse_json = JSON.parse(project)
			quote_project = QuoteProject.create!(quote_id: parse_json['quote_id'], name: parse_json['name'], remarks: '', unit_price: parse_json['unit_price'], unit: parse_json['unit'], price: parse_json['unit_price'], project_id: parse_json['unit_price'], project_name: parse_json['project_name'])
			array.push(quote_project)
		end
		render json: { status: :success, projects: array }
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
