##
# Targets Controller
#
class TargetsController < ApplicationController

  #----------------------------------------
  #  ** Includes **
  #----------------------------------------

  #----------------------------------------
  #  ** Instance variables **
  #----------------------------------------

  # 目標一覧
  expose(:targets) { Target.all }

  # 目標
  expose(:target) { Target.find_or_initialize_by id: params[:id] || params[:target_id] }

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

    add_breadcrumb '目標一覧'
  end

  ##
  # 新規作成
  # @version 2018/06/10
  #
  def new

    add_breadcrumb '目標一覧', path: targets_path
    add_breadcrumb '目標作成'
  end

  ##
  # 編集
  # @version 2018/06/10
  #
  def edit

    add_breadcrumb '目標一覧', path: targets_path
    add_breadcrumb '目標編集'
  rescue => e
    redirect_back fallback_location: url_for({action: :index}), flash: {notice: {message: e.message}}
  end

  ##
  # 更新処理
  # @version 2018/06/10
  #
  def update

    # 目標情報更新
    target.update! target_params

    redirect_back fallback_location: url_for({action: :index}), flash: {notice: {message: '目標情報を更新しました'}}
  rescue => e

    redirect_back fallback_location: url_for({action: :index}), flash: {notice: {message: e.message}}
  end

  ##
  # 新規作成
  # @version 2018/06/10
  #
  def create

    # 目標情報更新
    target.update! target_params

    redirect_to edit_target_path(target), flash: {notice: {message: '目標情報を更新しました'}}
  rescue => e

    redirect_back fallback_location: url_for({action: :index}), flash: {notice: {message: e.message}}
  end

  ##
  # 削除
  # @version 2018/06/10
  #
  def destroy

    target.destroy!
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
    def target_params

      params.require(:target).permit :division_id, :target_year, :target_month, :sales, :profit, :cost
    end
end
