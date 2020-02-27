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

  # 取引先
  expose(:companies) { Company.all.order(:id) }
  # 担当者一覧
  expose_with_pagination(:clients) { CompanyDivisionClient.search(params[:search]).all.reverse_order }
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

     # @clients = Array.new
     # division_ids = clients.pluck(:company_division_id).uniq
     # client_ids = CompanyDivision.where(id: division_ids).pluck(:company_id).uniq
     # companies = Company.where(id: client_ids)
     # companies.each do |r|
     #   r.divisions.each do |d|
     #     d.clients.each do |c|

     #       @clients = @clients + [c]
     #     end
     #   end
     # end

      @clients = CompanyDivisionClient.all.where(company_division_id: nil)
      add_breadcrumb '担当者一覧'
    end
  end

  ##
  # 新規作成
  # @version 2018/06/10
  #
  def new

    add_breadcrumb '担当者一覧', path: company_division_clients_path(company_division_id: division&.id)
    add_breadcrumb '新規作成'
  rescue => e

    redirect_back fallback_location: url_for({ action: :index }), flash: { notice: { message: e.message } }
  end

  ##
  # 編集
  # @version 2018/06/10
  #
  def edit

    self.division = client.company_division

    add_breadcrumb '担当者一覧', path: company_division_clients_path(company_division_id: self.division.id)
    add_breadcrumb '編集'
  rescue => e

    redirect_back fallback_location: url_for({ action: :index }), flash: { notice: { message: e.message } }
  end

  ##
  # 更新処理
  # @version 2018/06/10
  #
  def update

    # 担当者情報更新
    client.update! client_params

    redirect_back fallback_location: url_for({ action: :index }), flash: { notice: { message: '担当者情報を更新しました' } }
  rescue => e

    redirect_back fallback_location: url_for({ action: :index }), flash: { notice: { message: e.message } }
  end

  ##
  # 新規作成
  # @version 2018/06/10
  #
  def create

    # 担当者情報更新
    client.update! client_params

    redirect_to edit_company_division_client_path(client), flash: { notice: { message: '担当者情報を更新しました' } }
  rescue => e

    redirect_back fallback_location: url_for({ action: :index }), flash: { notice: { message: e.message } }
  end

  ##
  # 削除
  # @version 2018/06/10
  #
  def destroy

    raise '対象のクライアントは見積り情報とのひも付きがあるため削除できません' if client.quotes.exists?

    client.destroy!

    redirect_back fallback_location: url_for({ action: :index }), flash: { notice: { message: '担当者情報を削除しました' } }
  rescue => e

    redirect_back fallback_location: url_for({ action: :index }), flash: { notice: { message: e.message } }
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
