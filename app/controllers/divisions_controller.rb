##
# Divisions Controller
#
class DivisionsController < ApplicationController

  #----------------------------------------
  #  ** Includes **
  #----------------------------------------

  #----------------------------------------
  #  ** Instance variables **
  #----------------------------------------

  # 自社部署
  expose(:divisions) { Division.all }

  # 自社部署
  expose(:division) { Division.find_or_initialize_by id: params[:id] || params[:division_id] }

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

    add_breadcrumb '自社部署一覧'
  end

  ##
  # 新規作成
  # @version 2018/06/10
  #
  def new

    add_breadcrumb '自社部署一覧', path: divisions_path
    add_breadcrumb '自社部署作成'
  end

  ##
  # 編集
  # @version 2018/06/10
  #
  def edit

    add_breadcrumb '自社部署一覧', path: divisions_path
    add_breadcrumb '自社部署編集'
  rescue => e
    redirect_back fallback_location: url_for({action: :index}), flash: {notice: {message: e.message}}
  end

  ##
  # 更新処理
  # @version 2018/06/10
  #
  def update

    # 自社部署情報更新
    division.update! division_params

    redirect_back fallback_location: url_for({action: :index}), flash: {notice: {message: '自社部署情報を更新しました'}}
  rescue => e
    
    redirect_back fallback_location: url_for({action: :index}), flash: {notice: {message: e.message}}
  end

  ##
  # 新規作成
  # @version 2018/06/10
  #
  def create

    # 自社部署情報更新
    division.update! division_params

    redirect_to edit_division_path(division), flash: {notice: {message: '自社部署情報を更新しました'}}
  rescue => e
    
    redirect_back fallback_location: url_for({action: :index}), flash: {notice: {message: e.message}}
  end

  ##
  # 削除
  # @version 2018/06/10
  #
  def destroy

    raise '対象の部署にはユーザーとのひも付きがあるため削除できません' if division.users.exists?

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

      params.require(:division).permit :name, :kana, :note, :zip, :prefecture_id, :address1, :address2
    end
end
