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
  expose_with_pagination(:invoices) { Invoice.search(params[:free_word]).all.order(date: :desc) }

  # 請求書
  expose(:invoice) { params[:quote_id].present?? Invoice.new(quote_id: params[:quote_id]) : Invoice.find_or_initialize_by(id: params[:id] || params[:invoice_id]) }

  #----------------------------------------
  #  ** Layouts **
  #----------------------------------------

  #----------------------------------------
  #  ** Request cycles **
  #----------------------------------------

  # MFクラウド認証
  before_action :authenticate_mfcloud

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

    self.invoice = Invoice.find(params[:id])

    # 情報更新
    self.invoice.update! invoice_params

    client = MfCloud::Invoice::Client.new(access_token: current_user.mf_access_token)

    # 品目を整形する
    items_params = self.invoice.quote.quote_projects.each_with_object([]) do |r, result|
      result.push({
        name: r.name,
        quantity: r.unit,
        unit_price: r.price,
      })
    end

    #値引きが０より大きければ品目に値引き追加
    if self.invoice.quote.discount > 0
      items_params << {
        name: '値引き',
        quantity: 1,
        unit_price: "-#{self.invoice.quote.discount}",
      }
    end

    request_params = {
      department_id: self.invoice.quote.client.company_division.mf_company_division_id,
      title: self.invoice.attention,
      billing_number: self.invoice.quote.quote_number,
      payment_condition: SiteConfig.payment_condition,
      note: self.invoice.remarks,
      billing_date: self.invoice.date.to_s(:system),
      due_date: self.invoice.expiration.to_s(:system),
      document_name: invoice.attention,
      items: items_params,
    }

    # MF側の請求書を削除する
    client.billings.delete self.invoice.mf_invoice_id

    # 請求書の発行
    result = client.billings.create(request_params)

    self.invoice.update!(pdf_url: result.pdf_url)

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

    client = MfCloud::Invoice::Client.new(access_token: current_user.mf_access_token)

    # 品目を整形する
    items_params = invoice.quote.quote_projects.each_with_object([]) do |r, result|
      result.push({
        name: r.name,
        quantity: r.unit,
        unit_price: r.price,
      })
    end

    #値引きが０より大きければ品目に値引き追加
    if invoice.quote.discount > 0
      items_params << {
        name: '値引き',
        quantity: 1,
        unit_price: "-#{invoice.quote.discount}",
      }
    end

    request_params = {
      department_id: invoice.quote.client.company_division.mf_company_division_id,
      title: invoice.attention,
      billing_number: invoice.quote.quote_number,
      payment_condition: SiteConfig.payment_condition,
      note: invoice.remarks,
      billing_date: invoice.date.to_s(:system),
      due_date: invoice.expiration.to_s(:system),
      document_name: invoice.attention,
      items: items_params,
    }

    # 請求書の発行
    result = client.billings.create(request_params)

    invoice.update!(mf_invoice_id: result.id, pdf_url: result.pdf_url)

    invoice.quote.invoicing! unless invoice.quote.invoicing?

    redirect_to fallback_location: url_for({action: :index}), flash: {notice: {message: '請求書情報を更新しました'}}
  rescue => e

    redirect_back fallback_location: url_for({action: :index}), flash: {notice: {message: e.message}}
  end

  ##
  # 削除
  # @version 2018/06/10
  #
  def destroy

    invoice.destroy
  rescue => e

    flash[:warning] = { message: e.message }
  ensure
    redirect_to action: :index
  end

  def pdf_dl

    token = current_user.mf_access_token
    pdf_url = invoice.pdf_url

    filename = "請求書_#{invoice.quote.quote_number}"

    uri = URI.parse("#{pdf_url}")
    request = Net::HTTP::Get.new(uri)
    request["Authorization"] = "BEARER #{token}"
    req_options = {
      use_ssl: uri.scheme == "https",
    }

    response = Net::HTTP.start(uri.hostname, uri.port, req_options) do |http|
      http.request(request)
    end

    send_data response.body, filename: "#{filename}.pdf"
  end


  #----------------------------------------
  #  ** Methods **
  #----------------------------------------

  private

  def invoice_params

    params.require(:invoice).permit :quote_id, :date, :expiration, :attention, :subject, :remarks, :memo
  end

end
