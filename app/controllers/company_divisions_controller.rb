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
  
  expose_with_pagination(:divisions) { CompanyDivision.search(params[:search]).all.order(company_id: :desc) }
  
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
    
    add_breadcrumb '部署一覧'
  end
  
  ##
  # 新規作成
  # @version 2018/06/10
  #
  def new
    
    add_breadcrumb '部署一覧', path: company_divisions_path
    add_breadcrumb '新規作成'
  rescue => e
    
    redirect_back fallback_location: url_for({ action: :index }), flash: { show: true, icon: 'info', message: e.message }
  end

  ##
  # 新規作成
  # @version 2018/06/10
  #
  def create
  
    division.update! division_params
    CompanyDivisionClient.create client_params.merge(company_division_id: division.id, confirmation_token: 'FactoryToken', confirmed_at: Time.zone.now, confirmation_sent_at: Time.zone.now) if !client_params.nil?

    redirect_to edit_company_division_path(division), flash: { show: true, icon: 'info', message: '取引先部署を作成しました' }
  rescue => e
  
    redirect_back fallback_location: url_for({ action: :index }), flash: { show: true, icon: 'info', message: e.message }
  end

  ##
  # 編集
  # @version 2018/06/10
  #
  def edit
    
    add_breadcrumb '部署一覧', path: company_divisions_path
    add_breadcrumb '編集'
  rescue => e
    
    redirect_back fallback_location: url_for({ action: :index }), flash: { show: true, icon: 'info', message: e.message }
  end
  
  ##
  # 更新処理
  # @version 2018/06/10
  #
  def update
    
    division.update! division_params
    
    redirect_back fallback_location: url_for({ action: :index }), flash: { show: true, icon: 'success', message: '取引先部署情報を更新しました' }
  rescue => e
    
    redirect_back fallback_location: url_for({ action: :index }), flash: { show: true, icon: 'info', message: e.message }
  end
 
  ##
  # 削除
  # @version 2018/06/10
  #
  def destroy
    
    raise '対象の部署にはクライアントが情報が登録されているため削除できません' if division.clients.exists?
    
    division.destroy!
    
    redirect_back fallback_location: url_for({ action: :index }), flash: { show: true, icon: 'success', message: '取引先部署情報を削除しました' }
  rescue => e
    
    redirect_back fallback_location: url_for({ action: :index }), flash: { show: true, icon: 'info', message: e.message }
  end
  
  #----------------------------------------
  #  ** Methods **
  #----------------------------------------
  
  private
  
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
