##
# CompanieDivisionClients Controller
#
class CompanyDivisionClientsController < ApplicationController

  #----------------------------------------
  #  ** Includes **
  #----------------------------------------

  #----------------------------------------
  #  ** Instance variables **
  #----------------------------------------

  # 部署
  expose(:division) { params[:company_division_id] ? CompanyDivision.find(params[:company_division_id]) : nil }
  # 担当者一覧
  expose_with_pagination(:clients) {
    params[:company_division_id] ? division.clients : CompanyDivisionClient.search(params[:search]).all.reverse_order
  }
  # 担当者
  expose(:client) { CompanyDivisionClient.find_or_initialize_by id: params[:id] }

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
  # @version 2018/06/10
  #
  def index

    unless request.xhr?

      add_breadcrumb '取引先一覧', path: companies_path
      add_breadcrumb '部署一覧', path: company_divisions_path(company_id: division&.company&.id)
      add_breadcrumb '担当者一覧'
    end
  end

  ##
  # 新規作成
  # @version 2018/06/10
  #
  def new

    add_breadcrumb '取引先一覧', path: companies_path
    add_breadcrumb '部署一覧', path: company_divisions_path(company_id: division&.company&.id)
    add_breadcrumb '担当者一覧', path: company_division_clients_path(company_division_id: division&.id)
    add_breadcrumb '新規作成'
  rescue => e
    redirect_back fallback_location: url_for({action: :index}), flash: {notice: {message: e.message}}
  end

  ##
  # 編集
  # @version 2018/06/10
  #
  def edit

    self.division = client.company_division

    add_breadcrumb '取引先一覧', path: companies_path
    add_breadcrumb '部署一覧', path: company_divisions_path(company_id: self.division.company.id)
    add_breadcrumb '担当者一覧', path: company_division_clients_path(company_division_id: self.division.id)
    add_breadcrumb '編集'
  rescue => e
    redirect_back fallback_location: url_for({action: :index}), flash: {notice: {message: e.message}}
  end

  ##
  # 更新処理
  # @version 2018/06/10
  #
  def update

    # 担当者情報更新
    client.update! client_params

    redirect_back fallback_location: url_for({action: :index}), flash: {notice: {message: '担当者情報を更新しました'}}
  rescue => e

    redirect_back fallback_location: url_for({action: :index}), flash: {notice: {message: e.message}}
  end

  ##
  # 新規作成
  # @version 2018/06/10
  #
  def create

    # 担当者情報更新
    client.update! client_params

    redirect_to edit_company_division_client_path(client), flash: {notice: {message: '担当者情報を更新しました'}}
  rescue => e

    redirect_back fallback_location: url_for({action: :index}), flash: {notice: {message: e.message}}
  end

  ##
  # 削除
  # @version 2018/06/10
  #
  def destroy
    binding.pry

    raise '対象のクライアントは見積り情報とのひも付きがあるため削除できません' if client.quotes.exists?

    client.destroy!

    redirect_back fallback_location: url_for({action: :index}), flash: {notice: {message: '担当者情報を削除しました'}}
  rescue => e

    redirect_back fallback_location: url_for({action: :index}), flash: {notice: {message: e.message}}
  end

  #----------------------------------------
  #  ** Methods **
  #----------------------------------------

  private

    ##
    # パラメータの取得
    # @version 2018/06/10
    #
    def client_params

      params.require(:company_division_client).permit :company_division_id, :user_id, :name, :kana, :title, :tel, :email, :note
    end
end
