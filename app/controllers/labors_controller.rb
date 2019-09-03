class LaborsController < ApplicationController
  #----------------------------------------
  #  ** Includes **
  #----------------------------------------

  #----------------------------------------
  #  ** Instance variables **
  #----------------------------------------

  # 見積もり
  expose_with_pagination(:labors) {
    Labor
    .all
    .order(date: 'DESC')
  }


  # 見積もり
  expose(:labor) { Labor.find_or_initialize_by id: params[:id] || params[:labor_id]}


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
  # @version 2019/03/12
  #
  def index

    add_breadcrumb '労務費費入力'
  end

  ##
  # 新規作成
  # @version 2018/06/10
  #
  def new

    add_breadcrumb '労務費入力', path: labors_path
    add_breadcrumb '新規作成'
    @user = current_user

  end

  ##
  # 編集
  # @version 2018/06/10
  #
  def edit
    add_breadcrumb '労務費入力', path: labors_path
    add_breadcrumb '編集'
    @user = current_user
  rescue => e
    redirect_back fallback_location: url_for({action: :index}), flash: {notice: {message: e.message}}
  end

  ##
  # 更新処理
  # @version 2018/06/10
  #
  def update

    # 取引先情報更新
    labor.update! labor_params
    #　労務費がNULLなら0を入れる
    labor.update(price: 0) if labor.price.nil?

    redirect_to labors_path, flash: {notice: {message: '労務費を更新しました'}}
  rescue => e

    redirect_back fallback_location: url_for({action: :index}), flash: {notice: {message: e.message}}
  end

  ##
  # 新規作成
  # @version 2018/06/10
  #
  def create

    # 取引先情報更新
    labor.update! labor_params
    #　労務費がNULLなら0を入れる
    labor.update(price: 0) if labor.price.nil?

    redirect_to labors_path, flash: {notice: {message: '労務費を登録しました'}}
  rescue => e

    redirect_back fallback_location: url_for({action: :index}), flash: {notice: {message: e.message}}
  end

  ##
  # 削除
  # @version 2018/06/10
  #
  def destroy

    labor.destroy
  rescue => e

    flash[:warning] = { message: e.message }
  ensure
    redirect_to action: :index
  end


  #----------------------------------------
  #  ** Methods **
  #----------------------------------------

  private

  def labor_params

    params.require(:labor).permit :date, :memo, :price, :division_id
  end
end
