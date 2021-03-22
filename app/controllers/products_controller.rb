class ProductsController < ApplicationController

  #----------------------------------------
  #  ** Includes **
  #----------------------------------------

  #----------------------------------------
  #  ** Instance variables **
  #----------------------------------------

  expose_with_pagination(:products) { Product.all.where(inventory_id: params[:inventory_id]) }

  expose(:product) { Product.find_or_initialize_by id: params[:id] }

  expose(:inventory) { Inventory.find(params[:inveontory_id]) }

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

    add_breadcrumb '在庫管理', path: inventories_path
    add_breadcrumb '商品一覧'
    if params[:inventory_id].nil?
      @product = Product.all
    else
      @product = Product.all.where(inventory_id: params[:inventory_id])
    end
  end

  ##
  # 新規作成
  # @version 2018/06/10
  #
  def new

    add_breadcrumb '在庫管理', path: inventories_path
    add_breadcrumb '商品一覧', path: products_path(inventory_id: params[:inventory_id])
    add_breadcrumb '新規作成'
  rescue => e

    redirect_back fallback_location: url_for({ action: :index }), flash: { show: true, icon: 'info', message: e.message }
  end

  ##
  # 新規作成
  # @version 2018/06/10
  #
  def create

    product.update! product_params
    ProductHistory.create! product_id: product.id, date: Time.zone.now, status: 0, quantity: product.quantity

    redirect_back fallback_location: url_for({ action: :index }), flash: { show: true, icon: 'success', message: '商品を作成しました' }
  rescue => e

    redirect_back fallback_location: url_for({ action: :index }), flash: { show: true, icon: 'info', message: e.message }
  end

  ##
  # 編集
  # @version 2018/06/10
  #
  def edit

    add_breadcrumb '在庫管理', path: inventories_path
    add_breadcrumb '商品一覧', path: products_path(inventory_id: product.inventory.id)
    add_breadcrumb '編集'
  rescue => e

    redirect_back fallback_location: url_for({ action: :index }), flash: { show: true, icon: 'info', message: e.message }
  end

  ##
  # 更新
  # @version 2018/06/10
  #
  def update

    # 取引先情報更新
    product.update! product_params

    redirect_back fallback_location: url_for({ action: :index }), flash: { show: true, icon: 'success', message: '商品を更新しました' }
  rescue => e

    redirect_back fallback_location: url_for({ action: :index }), flash: { show: true, icon: 'info', message: e.message }
  end

  ##
  # 削除
  # @version 2018/06/10
  #
  def destroy

    product.destroy!

    redirect_back fallback_location: url_for({ action: :index }), flash: { show: true, icon: 'success', message: '商品を削除しました' }
  rescue => e

    redirect_back fallback_location: url_for({ action: :index }), flash: { show: true, icon: 'info', message: e.message }
  end

  #----------------------------------------
  #  ** Methods **
  #----------------------------------------

  private

    ##
    # パラメータの取得
    # @version 2018/06/10
    #
    def product_params

      params.require(:product).permit :inventory_id, :delivery_target_id, :name, :quantity, :max_unit, :min_unit, :issue_quantity, :remarks, :fixed_additions
    end
end
