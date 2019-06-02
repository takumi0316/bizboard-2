##
# Companies Controller
#
class CompaniesController < ApplicationController

  #----------------------------------------
  #  ** Includes **
  #----------------------------------------

  #----------------------------------------
  #  ** Instance variables **
  #----------------------------------------

  # 取引先一覧
  expose_with_pagination(:companies) {
    params[:name] ? Company.search(params[:name]).all.reverse_order : Company.search(params[:search]).all.reverse_order
  }
  # 取引先
  expose(:company) { Company.find_or_initialize_by id: params[:id] || params[:company_id] }

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

      add_breadcrumb '取引先一覧'
    end
  end

  ##
  # 新規作成
  # @version 2018/06/10
  #
  def new

    add_breadcrumb '取引先一覧', path: companies_path
    add_breadcrumb '新規作成'
  end

  ##
  # 編集
  # @version 2018/06/10
  #
  def edit

    add_breadcrumb '取引先一覧', path: companies_path
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
    company.update! company_params

    mf_client = MfCloud::Invoice::Client.new(access_token: current_user.mf_access_token)

    result = mf_client.partners.update(company.mf_company_id, {
      name: company.name,
      name_kana: company.kana,
      memo: company.note,
    })

    redirect_back fallback_location: url_for({action: :index}), flash: {notice: {message: '取引先情報を更新しました'}}
  rescue => e

    redirect_back fallback_location: url_for({action: :index}), flash: {notice: {message: e.message}}
  end

  ##
  # 新規作成
  # @version 2018/06/10
  #
  def create

    # 取引先情報更新
    company.update! company_params

    mf_client = MfCloud::Invoice::Client.new(access_token: current_user.mf_access_token)

    result = mf_client.partners.create({
      name: company.name,
      name_kana: company.kana,
      memo: company.note,
    })

    company.update!({mf_company_id: result.id})

    redirect_to edit_company_path(company), flash: {notice: {message: '取引先情報を更新しました'}}
  rescue => e

    redirect_back fallback_location: url_for({action: :index}), flash: {notice: {message: e.message}}
  end

  ##
  # 削除
  # @version 2018/06/10
  #
  def destroy

    raise '対象の会社には部署情報が登録されているため削除できません' if company.divisions.exists?

    company.destroy!
  rescue => e

    flash[:warning] = { message: e.message }
  ensure
    redirect_to action: :index
  end

  ##
  # 一括作成
  #
  #
  def bulk

    newSub = Company.find_or_initialize_by(:name => params[:companyName])
    newSubDivision = nil

    if newSub.id.nil?

      newSub.save!
      newSubDivision = newSub.divisions.create! :name => params[:companyDivisionName], :zip => params[:companyPost], :prefecture_id => params[:companyPrefecture], :address1 => params[:companyAddress1]

      mf_client = MfCloud::Invoice::Client.new(access_token: current_user.mf_access_token)

      newSubDivision.clients.create! :name => params[:companyClientName], :user_id => params[:currentClientName], :tel => params[:companyClientTel], :email => params[:companyClientEmail]
    else

      newSubDivisions = newSub.divisions
      newSubDivision = newSubDivisions.find_or_initialize_by(:name => params[:companyDivisionName])
      if newSubDivision.id.nil?

        newSubDivision.save! :zip => params[:companyPost], :prefecture_id => params[:companyPrefecture], :address1 => params[:companyAddress1]
        newSubDivision.clients.create! :name => params[:companyClientName], :user_id => params[:currentClientName], :tel => params[:companyClientTel], :email => params[:companyClientEmail]
      else

        newSubDivision.clients.create! :name => params[:companyClientName], :user_id => params[:currentClientName], :tel => params[:companyClientTel], :email => params[:companyClientEmail]
      end
    end

    partners_params = {
      name: newSubDivision.company.name,
      name_kana: newSubDivision.company.kana,
      memo: newSubDivision.company.note,
      zip: newSubDivision.zip,
      tel: newSubDivision.tel,
      prefecture: newSubDivision.prefecture.name,
      address1: newSubDivision.address1,
      address2: newSubDivision.address2,
      department_name: newSubDivision.name,
    }

    if newSubDivision.company.mf_company_id?

      result = mf_client.partners.update(newSubDivision.company.mf_company_id, partners_params)
    else

      result = mf_client.partners.create(partners_params)
      newSubDivision.company.update!(mf_company_id: result.id)
      newSubDivision.update!(mf_company_division_id: result.departments.first.id)
    end

    client = CompanyDivisionClient.find_or_initialize_by(:name => params[:companyClientName])
    render json: { status: :success, client: client, division: client.company_division, company: client.company_division.company }

  rescue => e

    render json: { status: :error }
  end

  #----------------------------------------
  #  ** Methods **
  #----------------------------------------

  private

    ##
    # パラメータの取得
    # @version 2018/06/10
    #
    def company_params

      params.require(:company).permit :name, :kana, :note
    end
end
