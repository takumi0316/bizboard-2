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
  expose(:company) { params[:company_id] ? Company.find(params[:company_id]) : nil }
  # 部署一覧
  expose_with_pagination(:divisions) { params[:company_id] ? company.divisions : CompanyDivision.all }
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
    add_breadcrumb '部署一覧'
  end

  ##
  # 新規作成
  # @version 2018/06/10
  #
  def new

    add_breadcrumb '取引先一覧', path: companies_path
    add_breadcrumb '部署一覧', path: company_divisions_path(company_id: company&.id)
    add_breadcrumb '新規作成'
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
    add_breadcrumb '部署一覧', path: company_divisions_path(company_id: self.company.id)
    add_breadcrumb '編集'
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

    mf_client = MfCloud::Invoice::Client.new(access_token: current_user.mf_access_token)

    # 部署更新用
    divisions_params = division.company.divisions.each_with_object([]) do |r, result|
      result.push({
        name: r.name,
        id: r.mf_company_division_id,
        zip: r.zip,
        tel: r.tel,
        prefecture: r.prefecture&.name,
        address1: r.address1,
        address2: r.address2,
      })
    end

    # 会社情報更新用
    partners_params = {
      name: division.company.name,
      name_kana: division.company.kana,
      memo: division.company.note,
      departments: divisions_params,
    }

    if division.company.mf_company_id?

      result = mf_client.partners.update(division.company.mf_company_id, partners_params)
    else

      result = mf_client.partners.create(partners_params)
      division.company.update!(mf_company_id: result.id)
    end

    # MFのIDを登録する
    result.departments.each do |r|
      division.update!(mf_company_division_id: r.id) if division.name == r.name
    end

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

    mf_client = MfCloud::Invoice::Client.new(access_token: current_user.mf_access_token)

    # 部署更新用
    divisions_params = division.company.divisions.each_with_object([]) do |r, result|
      result.push({
        name: r.name,
        id: r.mf_company_division_id,
        zip: r.zip,
        tel: r.tel,
        prefecture: r.prefecture&.name,
        address1: r.address1,
        address2: r.address2,
      })
    end

    # 会社情報更新用
    partners_params = {
      name: division.company.name,
      name_kana: division.company.kana,
      memo: division.company.note,
      departments: divisions_params,
    }

    if division.company.mf_company_id?

      result = mf_client.partners.update(division.company.mf_company_id, partners_params)
    else

      result = mf_client.partners.create(partners_params)
      division.company.update!(mf_company_id: result.id)
    end

    # MFのIDを登録する
    result.departments.each do |r|
      division.update!(mf_company_division_id: r.id) if division.name == r.name
    end

    redirect_to edit_company_division_path(division), flash: {notice: {message: '取引先部署情報を更新しました'}}
  rescue => e

    redirect_back fallback_location: url_for({action: :index}), flash: {notice: {message: e.message}}
  end

  ##
  # 削除
  # @version 2018/06/10
  #
  def destroy

    raise '対象の部署にはクライアントが情報が登録されているため削除できません' if division.clients.exists?

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
