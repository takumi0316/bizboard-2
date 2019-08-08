##
# Invoices Controller
#
class InvoicesController < ApplicationController

  #----------------------------------------
  #  ** Includes **
  #----------------------------------------

  #----------------------------------------
  #  ** Instance variables **
  #----------------------------------------

  # 請求書一覧
  expose_with_pagination(:invoices) { Invoice.search(name: params[:name], date1: params[:date1], date2: params[:date2]).all.order(date: :desc) }

  # 請求書
  expose(:invoice) { params[:quote_id].present?? Invoice.new(quote_id: params[:quote_id]) : Invoice.find_or_initialize_by(id: params[:id] || params[:invoice_id]) }

  #----------------------------------------
  #  ** Layouts **
  #----------------------------------------

  #layout 'layouts/pdf'

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

    add_breadcrumb '請求書一覧'
  end

  ##
  # 新規作成
  # @version 2018/06/10
  #
  def new

    add_breadcrumb '請求書一覧', path: invoices_path
    add_breadcrumb '新規作成'
  end

  ##
  # 編集
  # @version 2018/06/10
  #
  def edit

    add_breadcrumb '請求書一覧', path: invoices_path
    add_breadcrumb '編集'
    @tax = 1.08
  rescue => e
    redirect_back fallback_location: url_for({action: :index}), flash: {notice: {message: e.message}}
  end

  ##
  # 更新処理
  # @version 2018/06/10
  #
  def update

    self.invoice = Invoice.find(params[:id])

    # 情報更新
    self.invoice.update! invoice_params

    #請求情報上書き
    profit = Profit.find_by(quote_id: invoice&.quote_id)&.update(price: invoice&.quote&.price, date: invoice&.date)

    redirect_back fallback_location: url_for({action: :index}), flash: {notice: {message: '請求書情報を更新しました'}}
  rescue => e

    redirect_back fallback_location: url_for({action: :index}), flash: {notice: {message: e.message}}
  end

  ##
  # 新規作成
  # @version 2018/06/10
  #
  def create

    # 情報更新
    invoice.update! invoice_params

    invoice.quote.invoicing! unless invoice.quote.invoicing?

    #請求情報保存
    profit = Profit.create!(company_id: invoice&.quote&.client&.company_division&.company&.id, quote_id: invoice&.quote_id, price: invoice&.quote&.price, date: invoice&.date)

    redirect_to edit_invoice_path(invoice.id), flash: {notice: {message: '請求書情報を作成しました'}}

  rescue => e

    redirect_back fallback_location: url_for({action: :index}), flash: {notice: {message: e.message}}
  end

  ##
  # 削除
  # @version 2018/06/10
  #
  def destroy

    Profit.find_by(quote_id: invoice.quote_id).destroy! if Profit.find_by(quote_id: invoice.quote_id).present?

    invoice.destroy
  rescue => e

    flash[:warning] = { message: e.message }
  ensure
    redirect_to action: :index
  end

  def wicked_pdf
    @tax = 1.08

    respond_to do |format|
      format.html do
        render  pdf: "請求書_#{invoice.quote.id}", #pdfファイルの名前。これがないとエラーが出ます
                encoding: 'UTF-8',
                layout: 'layouts/pdf.html.slim',
                template: 'invoices/wicked_pdf.html.slim', #テンプレートファイルの指定。viewsフォルダが読み込まれます。
                show_as_html: params.key?('debug')
      end
    end
  end

  #----------------------------------------
  #  ** Methods **
  #----------------------------------------

  private

  def invoice_params

    params.require(:invoice).permit :quote_id, :date, :expiration, :attention, :subject, :remarks, :memo
  end

end
