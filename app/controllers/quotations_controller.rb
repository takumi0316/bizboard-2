##
# Quotations Controller
#
class QuotationsController < ApplicationController

  #----------------------------------------
  #  ** Includes **
  #----------------------------------------

  #----------------------------------------
  #  ** Instance variables **
  #----------------------------------------

  # 見積もり
  expose_with_pagination(:quotes) {

    Quote
    .all
    .search(name: params[:name], status: params[:status], date1: params[:date1], date2: params[:date2])
    .order(date: :desc)
  }

  # 見積もり
  expose(:quote) { Quote.find_or_initialize_by id: params[:id] }

  #----------------------------------------
  #  ** Layouts **
  #----------------------------------------

  #----------------------------------------
  #  ** Request cycles **
  #----------------------------------------

  #----------------------------------------
  #  ** Actions **
  #----------------------------------------

  ##
  # 一覧
  # @version 2019/03/12
  #
  def index

    add_breadcrumb '見積書一覧'
  end

	##
	# 詳細
	# @version 2020/02/18
	def show

    add_breadcrumb '見積書一覧', path: quotations_path
    add_breadcrumb '詳細'
	end

  def pdf

    respond_to do |format|
      format.html do
        render  pdf: "見積書_#{quote.id}",
                encoding: 'UTF-8',
                layout: 'layouts/pdf.html.slim',
                template: 'quotations/pdf.html.slim',
                show_as_html: params.key?('debug')
      end
    end
  end

  #----------------------------------------
  #  ** Methods **
  #----------------------------------------

end
