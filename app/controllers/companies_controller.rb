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

  expose_with_pagination(:companies) { Company.search(params[:name]).all.reverse_order }

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
  # 新規作成
  # @version 2018/06/10
  #
  def create

    company.update! company_params
    division = CompanyDivision.create division_params.merge(company_id: company.id) if !division_params.nil?
    client = CompanyDivisionClient.create client_params.merge(company_division_id: division.id, confirmation_token: 'FactoryToken', confirmed_at: Time.zone.now, confirmation_sent_at: Time.zone.now) if !client_params.nil?

  
    redirect_to edit_company_path(company), flash: { show: true, icon: 'success', message: '取引先会社情報を作成しました' }
  rescue => e
  
    redirect_back fallback_location: url_for({ action: :index }), flash: { show: true, icon: 'info', message: e.message }
  end

  ##
  # 編集
  # @version 2018/06/10
  #
  def edit

    add_breadcrumb '取引先一覧', path: companies_path
    add_breadcrumb '編集'
  rescue => e
    
    redirect_back fallback_location: url_for({ action: :index }), flash: { show: true, icon: 'info', message: e.message }
  end

  ##
  # 更新処理
  # @version 2018/06/10
  #
  def update

    company.update! company_params
    
    redirect_back fallback_location: url_for({ action: :index }), flash: { show: true, icon: 'success', message: '取引先会社情報を更新しました' }
  rescue => e
    
    redirect_back fallback_location: url_for({ action: :index }), flash: { show: true, icon: 'info', message: e.message }
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

  def import_client

    result = Company.import_client(params[:file], params[:company_id])
    if result.present?
      redirect_to companies_path, flash: { show: true, icon: 'info', message: "#{result.join(',')}が登録できませんでした。" }
    else
      redirect_to companies_path, flash: { show: true, icon: 'success', message: '登録完了しました。' }
    end
  end

  #----------------------------------------
  #  ** Methods **
  #----------------------------------------

  private

  ##
  # 会社パラメータの取得
  # @version 2018/06/10
  #
  def company_params

    params.require(:company).permit :name, :kana, :note, :approval_status, :online_web_business_card
  end

  ##
  # 部署パラメータの取得
  # @version 2018/06/10
  #
  def division_params
    
    params.require(:company_division).permit :company_id, :name, :kana, :zip, :prefecture_id, :address1, :address2, :note
  end

  ##
  # 担当者パラメータの取得
  # @version 2018/06/10
  #
  def client_params
    
    params.require(:company_division_client).permit :company_division_id, :user_id, :name, :kana, :title, :tel, :email, :password, :password_confirmation, :user_type, :note, :confirmation_token, :confirmed_at, :confirmation_sent_at
  end



end
