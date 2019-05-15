class SubcontractorDivisionsController < ApplicationController

  #----------------------------------------
  #  ** Includes **
  #----------------------------------------

  #----------------------------------------
  #  ** Instance variables **
  #----------------------------------------

  # 外注先
  expose(:subcontractor) { params[:subcontractor_id] ? Subcontractor.find(params[:subcontractor_id]) : nil }
  # 部署一覧
  expose_with_pagination(:divisions) { params[:subcontractor_id] ? subcontractor.divisions : SubcontractorDivision.all }
  # 部署
  expose(:division) { SubcontractorDivision.find_or_initialize_by id: params[:id] }

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

    add_breadcrumb '外注先一覧', path: subcontractors_path
    add_breadcrumb '部署一覧'
  end

  ##
  # 新規作成
  # @version
  #
  def new

    add_breadcrumb '外注先一覧', path: subcontractors_path
    add_breadcrumb '部署一覧', path: subcontractor_divisions_path(subcontractor_id: subcontractor&.id)
    add_breadcrumb '新規作成'
  rescue => e
    redirect_back fallback_location: url_for({action: :index}), flash: {notice: {message: e.message}}
  end

  ##
  # 編集
  # @version
  #
  def edit

    self.subcontractor = division.subcontractor

    add_breadcrumb '外注先一覧', path: subcontractors_path
    add_breadcrumb '部署一覧', path: subcontractor_divisions_path(subcontractor_id: self.subcontractor.id)
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
    division.update! division_params

    redirect_back fallback_location: url_for({action: :index}), flash: {notice: {message: '外注先部署情報を更新しました'}}
  rescue => e

    redirect_back fallback_location: url_for({action: :index}), flash: {notice: {message: e.message}}
  end

  ##
  # 新規作成
  # @version
  #
  def create

    # 外注先情報更新
    division.update! division_params

    redirect_to edit_subcontractor_division_path(division), flash: {notice: {message: '外注先部署情報を更新しました'}}
  rescue => e

    redirect_back fallback_location: url_for({action: :index}), flash: {notice: {message: e.message}}
  end

  ##
  # 削除
  # @version
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
    # @version
    #
    def division_params

      params.require(:subcontractor_division).permit :subcontractor_id, :name, :kana, :zip, :prefecture_id, :address1, :address2, :note
    end

end
