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
  expose_with_pagination(:invoices) { Invoice.all.order(date: :desc) }

  # 請求書
  expose(:invoice) { params[:project_id].present?? Invoice.new(project_id: params[:project_id]) : Invoice.find_or_initialize_by(id: params[:id] || params[:invoice_id]) }

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

    client = MfCloud::Invoice::Client.new(access_token: current_user.mf_access_token)

    request_params = {
      department_id: invoice.project.client.company_division.mf_company_division_id,
      title: invoice.subject,
      billing_number: invoice.project.project_number,
      payment_condition: SiteConfig.payment_condition,
      note: invoice.memo,
      billing_date: invoice.date.to_s(:system),
      due_date: invoice.expiration.to_s(:system),
      memo: invoice.free_word,
      document_name: invoice.project.project_number,
    }

    # 請求書の発行
    result = client.billings.update(invoice.mf_invoice_id, request_params)

    invoice.update!(pdf_url: result.pdf_url)

    # 情報更新
    invoice.update! invoice_params

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

    request_params = {
      department_id: invoice.project.client.company_division.mf_company_division_id,
      title: invoice.subject,
      billing_number: invoice.project.project_number,
      payment_condition: SiteConfig.payment_condition,
      note: invoice.memo,
      billing_date: invoice.date.to_s(:system),
      due_date: invoice.expiration.to_s(:system),
      memo: invoice.free_word,
      document_name: invoice.project.project_number,
    }

    # 請求書の発行
    result = client.billings.create(request_params)

    invoice.update!(mf_invoice_id: result.id, pdf_url: result.pdf_url)

    invoice.project.invoicing! unless invoice.project.invoicing?

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


  #----------------------------------------
  #  ** Methods **
  #----------------------------------------

  private

  def invoice_params

    params.require(:invoice).permit :project_id, :date, :expiration, :subject, :remarks, :memo
  end

end
