##
# Invoices Controller
#
class DeliveryNotesController < ApplicationController

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
    .includes(:quote_items)
    .order(date: 'DESC')
  }

  # 見積もり
  expose_with_pagination(:quote_manager) {

    Quote
    .search(name: params[:name], status: params[:status], date1: params[:date1], date2: params[:date2])
    .where(division_id: current_user.division.id)
    .order(date: 'DESC')
  }

  # 見積もり
  expose_with_pagination(:quote_general) {

    Quote
    .search(name: params[:name], status: params[:status], date1: params[:date1], date2: params[:date2])
    .where(division_id: current_user.division.id)
    .where.not(status: 'invoicing')
    .where.not(status: 'lost')
    .order(date: 'DESC')
  }

  # 見積もり
  expose_with_pagination(:quote_operator) {

    Quote
    .search(name: params[:name], status: params[:status], date1: params[:date1], date2: params[:date2])
    .joins(:task)
    .where.not(status: 'invoicing')
    .where.not(status: 'lost')
    .order(created_at: 'DESC')
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

		add_breadcrumb '納品書一覧'

		@division = current_user.division&.id
    @user_type = current_user.user_type
    @count = params[:count]
    if @user_type == 'general' && @count.present? || @user_type == 'manager' && @count.present?
      @quotes = quotes
    elsif @user_type == 'manager'
      @quotes = quote_manager
    elsif @user_type == 'general'
      @quotes = quote_general
    elsif @user_type == 'operator'
      @quotes = quote_operator
    elsif @user_type != 'general'
      @quotes = quotes
    end
    @count_number = @quotes.size
  end

	##
	# 編集
	# @version 2020/01/29
	#
	def edit

    add_breadcrumb '納品書一覧', path: delivery_notes_path
    add_breadcrumb '編集'
	end

	def pdf

    respond_to do |format|
      format.html do
        render  pdf: "納品書_#{quote.id}", # pdfファイルの名前。これがないとエラーが出ます
                encoding: 'UTF-8',
                layout: 'layouts/pdf.html.slim',
                template: 'delivery_notes/pdf.html.slim', # テンプレートファイルの指定。viewsフォルダが読み込まれます。
                show_as_html: params.key?('debug')
      end
    end
  end

  #----------------------------------------
  #  ** Methods **
  #----------------------------------------

  private

end
