##
# SubcontractorDivisionClients Controller
#
class SubcontractorDivisionClientsController < ApplicationController

  #----------------------------------------
  #  ** Includes **
  #----------------------------------------

  #----------------------------------------
  #  ** Instance variables **
  #----------------------------------------

  # 部署
  expose(:division) { params[:subcontractor_division_id] ? SubcontractorDivision.find(params[:subcontractor_division_id]) : nil }
  # 担当者一覧
  expose_with_pagination(:clients) {
    params[:subcontractor_division_id] ? division.clients : SubcontractorDivisionClient.search(params[:search]).all.reverse_order
  }
  # 担当者
  expose(:client) { SubcontractorDivisionClient.find_or_initialize_by id: params[:id] }

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
  # @version
  #
  def index

    unless request.xhr?

      add_breadcrumb '外注先一覧', path: subcontractors_path
      add_breadcrumb '部署一覧', path: subcontractor_divisions_path(subcontractor_id: division&.subcontractor&.id)
      add_breadcrumb '担当者一覧'
    end
  end

  ##
  # 新規作成
  # @version
  #
  def new

    add_breadcrumb '外注先一覧', path: subcontractors_path
    add_breadcrumb '部署一覧', path: subcontractor_divisions_path(subcontractor_id: division&.subcontractor&.id)
    add_breadcrumb '担当者一覧', path: subcontractor_division_clients_path(subcontractor_division_id: division&.id)
    add_breadcrumb '新規作成'
  rescue => e
    redirect_back fallback_location: url_for({action: :index}), flash: {notice: {message: e.message}}
  end

  ##
  # 編集
  # @version
  #
  def edit

    self.division = client.subcontractor_division

    add_breadcrumb '外注先一覧', path: subcontractors_path
    add_breadcrumb '部署一覧', path: subcontractor_divisions_path(subcontractor_id: division&.subcontractor&.id)
    add_breadcrumb '担当者一覧', path: subcontractor_division_clients_path(subcontractor_division_id: division&.id)
    add_breadcrumb '新規作成'
  rescue => e
    redirect_back fallback_location: url_for({action: :index}), flash: {notice: {message: e.message}}
  end

  ##
  # 更新処理
  # @version
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
  # @version
  #
  def create

    # 担当者情報更新
    client.update! client_params

    redirect_to edit_subcontractor_division_client_path(client), flash: {notice: {message: '担当者情報を更新しました'}}
  rescue => e

    redirect_back fallback_location: url_for({action: :index}), flash: {notice: {message: e.message}}
  end

  ##
  # 削除
  # @version
  #
  def destroy

    client.destroy!
  rescue => e

    flash[:warning] = { message: e.message }
  ensure
    redirect_to action: :index
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

      params.require(:subcontractor_division_client).permit :subcontractor_division_id, :user_id, :name, :kana, :title, :tel, :email, :note
    end

end
