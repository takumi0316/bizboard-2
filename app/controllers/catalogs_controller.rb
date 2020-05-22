class CatalogsController < ApplicationController
  #----------------------------------------
  #  ** Includes **
  #----------------------------------------

  #----------------------------------------
  #  ** Instance variables **
  #----------------------------------------

  # 活動履歴
  expose(:catalogs) {
    Catalog
    .all
  }

  # 活動履歴
  expose(:catalog) { Catalog.find_or_initialize_by id: params[:id] || params[:Catalog_id] }


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

    add_breadcrumb 'カタログ一覧'
  end

  ##
  # 新規作成
  # @version 2018/06/10
  #
  def new

    add_breadcrumb 'カタログ一覧', path: catalogs_path
    add_breadcrumb '新規作成'
  end

  ##
  # 編集
  # @version 2018/06/10
  #
  def edit
    add_breadcrumb 'カタログ一覧', path: catalogs_path
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
    catalog.update! catalog_params

    redirect_to catalogs_path, flash: {notice: {message: 'カタログを更新しました'}}
  rescue => e

    redirect_back fallback_location: url_for({action: :index}), flash: {notice: {message: e.message}}
  end

  ##
  # 新規作成
  # @version 2018/06/10
  #
  def create

    # 取引先情報更新
    catalog.update! catalog_params

    redirect_to catalogs_path, flash: {notice: {message: 'カタログを作成しました'}}
  rescue => e

    redirect_back fallback_location: url_for({action: :index}), flash: {notice: {message: e.message}}
  end

  ##
  # 削除
  # @version 2018/06/10
  #
  def destroy

    catalog.destroy
  rescue => e

    flash[:warning] = { message: e.message }
  ensure
    redirect_to action: :index
  end

  #----------------------------------------
  #  ** Methods **
  #----------------------------------------

  private

  def catalog_params

    params.require(:catalog).permit :name, :description, :price, :turn, :deliver_at, :image, :category_id
  end

end
