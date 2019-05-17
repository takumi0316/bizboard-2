class SubcontractorsController < ApplicationController

  #----------------------------------------
  #  ** Includes **
  #----------------------------------------

  #----------------------------------------
  #  ** Instance variables **
  #----------------------------------------

  # 外注先一覧
  expose_with_pagination(:subcontractors) {
    Subcontractor
      .search(params[:name])
      .all
      .reverse_order
  }
  # 外注先
  expose(:subcontractor) { Subcontractor.find_or_initialize_by id: params[:id] || params[:subcontractor_id] }

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

    add_breadcrumb '外注先一覧'
  end

  ##
  # 新規作成
  # @version
  #
  def new

    add_breadcrumb '外注先一覧', path: subcontractors_path
    add_breadcrumb '新規作成'
  end

  ##
  # 編集
  # @version
  #
  def edit

    add_breadcrumb '外注先一覧', path: subcontractors_path
    add_breadcrumb '編集'
  rescue => e
    redirect_back fallback_location: url_for({action: :index}), flash: {notice: {message: e.message}}
  end

  ##
  # 更新処理
  # @version
  #
  def update

    # 外注先情報更新
    subcontractor.update! subcontractor_params

    redirect_back fallback_location: url_for({action: :index}), flash: {notice: {message: '外注先情報を更新しました'}}
  rescue => e

    redirect_back fallback_location: url_for({action: :index}), flash: {notice: {message: e.message}}
  end

  ##
  # 新規作成
  # @version
  #
  def create

    # 外注先情報更新
    subcontractor.update! subcontractor_params

    redirect_to edit_subcontractor_path(subcontractor), flash: {notice: {message: '外注先情報を更新しました'}}
  rescue => e

    redirect_back fallback_location: url_for({action: :index}), flash: {notice: {message: e.message}}
  end

  ##
  # 削除
  # @version 2018/06/10
  #
  def destroy

    subcontractor.destroy!
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

    newSub = Subcontractor.find_or_initialize_by(:name => params[:companyName])
    if newSub.id.nil?

      newSub.save!
      newSubDivision = newSub.divisions.create! :name => params[:companyDivisionName], :zip => params[:companyPost], :prefecture_id => params[:companyPrefecture], :address1 => params[:companyAddress1]
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

    client = SubcontractorDivisionClient.find_or_initialize_by(:name => params[:companyClientName])
    render json: { status: :success, client: client }

    rescue => e

      render json: { status: :error }
  end

  #----------------------------------------
  #  ** Methods **
  #----------------------------------------

  private

    ##
    # パラメータの取得
    # @version
    #
    def subcontractor_params

      params.require(:subcontractor).permit :name, :kana, :note
    end
end
