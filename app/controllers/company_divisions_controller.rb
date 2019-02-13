##
# Companies Controller
#
class CompanyDivisionsController < ApplicationController

  #----------------------------------------
  #  ** Includes **
  #----------------------------------------

  #----------------------------------------
  #  ** Instance variables **
  #----------------------------------------

  # 取引先
  expose(:company) { Company.find params[:company_id] }
  # 部署一覧
  expose_with_pagination(:divisions) { company.divisions }
  # 部署
  expose(:division) { CompanyDivision.find_or_initialize_by id: params[:id] }

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

    add_breadcrumb '取引先一覧', path: companies_path
    add_breadcrumb '取引先 - 部署 一覧'
  end

  ##
  # 新規作成
  # @version 2018/06/10
  #
  def new

    raise '会社を指定して下さい' if params[:company_id].blank?

    add_breadcrumb '取引先一覧', path: companies_path
    add_breadcrumb '取引先 - 部署 一覧', path: company_divisions_path(company_id: company.id)
    add_breadcrumb '取引先 - 部署 新規作成'
  rescue => e
    redirect_back fallback_location: url_for({action: :index}), flash: {notice: {message: e.message}}
  end

  ##
  # 編集
  # @version 2018/06/10
  #
  def edit

    self.company = division.company

    add_breadcrumb '取引先一覧', path: companies_path
    add_breadcrumb '取引先 - 部署 一覧', path: company_divisions_path(company_id: self.company.id)
    add_breadcrumb '取引先 - 部署 編集'
  rescue => e
    redirect_back fallback_location: url_for({action: :index}), flash: {notice: {message: e.message}}
  end

  ##
  # 更新処理
  # @version 2018/06/10
  #
  def update

    # 取引先情報更新
    division.update! division_params

    redirect_back fallback_location: url_for({action: :index}), flash: {notice: {message: '取引先部署情報を更新しました'}}
  rescue => e
    
    redirect_back fallback_location: url_for({action: :index}), flash: {notice: {message: e.message}}
  end

  ##
  # 新規作成
  # @version 2018/06/10
  #
  def create

    # 取引先情報更新
    division.update! division_params

    redirect_to edit_company_division_path(division), flash: {notice: {message: '取引先部署情報を更新しました'}}
  rescue => e
    
    redirect_back fallback_location: url_for({action: :index}), flash: {notice: {message: e.message}}
  end

  ##
  # 削除
  # @version 2018/06/10
  #
  def destroy

    division.destroy!
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
    def division_params

      params.require(:company_division).permit :company_id, :name, :kana, :zip, :prefecture_id, :address1, :address2, :note
    end
end
