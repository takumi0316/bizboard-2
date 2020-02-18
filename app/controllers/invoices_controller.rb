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

  rescue => e
    redirect_back fallback_location: url_for({action: :index}), flash: {notice: {message: e.message}}
  end

  ##
  # 更新処理
  # @version 2018/06/10
  #
  def update

    # 情報更新
    invoice.update! invoice_params

    # 会社探し
    co = Company.joins(divisions: [clients: :quotes]).merge(Quote.where(id: invoice&.quote_id))
    # profit見つける
    profit = Profit.find_by(quote_id: invoice&.quote_id)
    # 配列で会社のidを取り出す
    co_id = co.pluck(:id)
    # 案件の会社のidとprofitの会社のidが違っていたら実行
    if co_id[0] != profit.company_id
      # 請求情報上書き(会社のidも)
      profit&.update(price: invoice&.quote&.price, date: invoice&.date, company_id: co_id[0])
    else
      # 請求情報上書き
      profit&.update(price: invoice&.quote&.price, date: invoice&.date)
    end

    render json: { status: true }
  rescue => e

    render json: { status: false, message: e.message }
  end

  ##
  # 新規作成
  # @version 2018/06/10
  #
  def create

    # 情報更新
    invoice.update! invoice_params

    invoice.quote.invoicing! unless invoice.quote.invoicing?

    # 請求情報保存
    Profit.create!(company_id: invoice&.quote&.client&.company_division&.company&.id, quote_id: invoice&.quote_id, price: invoice&.quote&.price, date: invoice&.date)

    render json: { status: true, invoice: invoice }
  rescue => e

    render json: { status: false, message: e.message }
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

  def pdf

    respond_to do |format|
      format.html do
        render  pdf: "請求書_#{invoice.quote.id}", #pdfファイルの名前。これがないとエラーが出ます
                encoding: 'UTF-8',
                layout: 'layouts/pdf.html.slim',
                template: 'invoices/pdf.html.slim', #テンプレートファイルの指定。viewsフォルダが読み込まれます。
                show_as_html: params.key?('debug')
      end
    end
  end

	def roundup

    if params[:name].blank? && params[:date1].blank? && params[:date2].blank?
      redirect_to action: :index
		else

      _self = Invoice.date_in(params[:date1].to_datetime.beginning_of_day..params[:date2].to_datetime.end_of_day)
      terms = params[:name].to_s.gsub(/(?:[[:space:]%_])+/, ' ').split(' ')[0..1]
      query = (['free_word like ?'] * terms.size).join(' and ')
      @invoice = _self.where(query, *terms.map { |term| "%#{term}%" })
      @quote = Quote.where(id: @invoice.pluck(:quote_id))
      respond_to do |format|
        format.html do
          render  pdf: "#{@invoice.last.quote&.client&.company_division&.company&.name}_請求書鏡", #pdfファイルの名前。これがないとエラーが出ます
                  encoding: 'UTF-8',
                  layout: 'layouts/pdf.html.slim',
                  template: 'invoices/roundup_pdf.html.slim', #テンプレートファイルの指定。viewsフォルダが読み込まれます。
                  show_as_html: params.key?('debug')
        end
      end
    end
  end

  #----------------------------------------
  #  ** Methods **
  #----------------------------------------

  private

  def invoice_params

    params.require(:invoice).permit :quote_id, :date, :expiration, :subject, :remarks, :memo
  end

end
