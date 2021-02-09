class InventoriesController < ApplicationController
  #----------------------------------------
  #  ** Includes **
  #----------------------------------------

  #----------------------------------------
  #  ** Instance variables **
  #----------------------------------------

  expose(:companies) { Company.all.order(:id) }

  # 活動履歴
  expose(:inventories) { Inventory.all }

  # 活動履歴
  expose(:inventory) { Inventory.find_or_initialize_by id: params[:id] || params[:Catalog_id] }


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

    add_breadcrumb '在庫管理'
  end

  ##
  # 新規作成
  # @version 2018/06/10
  #
  def new

    add_breadcrumb '在庫管理', path: inventories_path
    add_breadcrumb '新規作成'
  end

  ##
  # 新規作成
  # @version 2018/06/10
  #
  def create

    inventory.update! inventory_params

    redirect_to edit_inventory_path(inventory), flash: { notice: { message: '在庫管理を作成しました' } }
  rescue => e

    redirect_back fallback_location: url_for({action: :index}), flash: {notice: {message: e.message}}
  end

  ##
  # 編集
  # @version 2018/06/10
  #
  def edit

    add_breadcrumb '在庫管理', path: inventories_path
    add_breadcrumb '編集'
  rescue => e

    redirect_back fallback_location: url_for({action: :index}), flash: {notice: {message: e.message}}
  end

  ##
  # 更新処理
  # @version 2018/06/10
  #
  def update

    inventory.update! inventory_params

    redirect_to inventories_path, flash: { notice: { message: '在庫管理を更新しました' } }
  rescue => e

    redirect_back fallback_location: url_for({action: :index}), flash: {notice: {message: e.message}}
  end


  ##
  # 削除
  # @version 2018/06/10
  #
  def destroy

    inventory.destroy
  rescue => e

    flash[:warning] = { message: e.message }
  ensure
    redirect_to action: :index
  end

  #----------------------------------------
  #  ** Methods **
  #----------------------------------------

  private

  def inventory_params

    params.require(:inventory).permit :company_division_id, :remarks
  end

end
