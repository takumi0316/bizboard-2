class ProductHistoriesController < ApplicationController

  #----------------------------------------
  #  ** Includes **
  #----------------------------------------

  #----------------------------------------
  #  ** Instance variables **
  #----------------------------------------

  expose_with_pagination(:product_histories) { ProductHistory.where(product_id: params[:product_id] || '') }

  expose(:product_history) { ProductHistory.find_or_initialize_by id: params[:id] }

  expose(:product) { Product.find_or_initialize_by id: params[:product_id] }

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
    add_breadcrumb '商品一覧', path: products_path(inventory_id: Product.all.where(id: params[:product_id]).pluck(:inventory_id))
    add_breadcrumb '商品履歴'
  end

  ##
  # 新規作成
  # @version 2018/06/10
  #
  def new

    add_breadcrumb '在庫管理', path: inventories_path
    add_breadcrumb '商品一覧', path: products_path(inventory_id: Product.all.where(id: params[:product_id]).pluck(:inventory_id))
    add_breadcrumb '商品履歴', path: product_histories_path(product_id: params[:product_id])
    add_breadcrumb '新規作成'
  rescue => e

    redirect_back fallback_location: url_for({ action: :index }), flash: { show: true, icon: 'info', message: e.message }
  end

  ##
  # 新規作成
  # @version 2018/06/10
  #
  def create

    product_history.update! product_history_params


    if product_history.delivery_stock?

      total_stock = product_history.product.quantity - product_history.quantity

      product_history.product.update! quantity: total_stock
    end

    redirect_back fallback_location: url_for({ action: :index }), flash: { show: true, icon: 'success', message: '履歴を作成しました' }
  rescue => e

    redirect_back fallback_location: url_for({ action: :index }), flash: { show: true, icon: 'info', message: e.message }
  end

  ##
  # 編集
  # @version 2018/06/10
  #
  def edit

    add_breadcrumb '在庫管理', path: inventories_path
    add_breadcrumb '商品一覧', path: products_path(inventory_id: Product.all.where(id: params[:product_id]).pluck(:inventory_id))
    add_breadcrumb '商品履歴', path: product_histories_path(product_id: params[:product_id])
    add_breadcrumb '編集'
  rescue => e

    redirect_back fallback_location: url_for({ action: :index }), flash: { show: true, icon: 'info', message: e.message }
  end

  ##
  # 更新処理
  # @version 2018/06/10
  #
  def update

    # 取引先情報更新
    product_history.update! product_history_params

    if product_history.delivery_stock?

      total_stock = product_history.product.quantity - product_history.quantity

      product_history.product.update! quantity: total_stock
    end

    redirect_back fallback_location: url_for({ action: :index }), flash: { show: true, icon: 'success', message: '履歴を更新しました' }
  rescue => e

    redirect_back fallback_location: url_for({ action: :index }), flash: { show: true, icon: 'info', message: e.message }
  end

  ##
  # 削除
  # @version 2018/06/10
  #
  def destroy

    product_history.destroy!

    redirect_back fallback_location: url_for({ action: :index }), flash: { show: true, icon: 'success', message: '履歴を削除しました' }
  rescue => e

    redirect_back fallback_location: url_for({ action: :index }), flash: { show: true, icon: 'info', message: e.message }
  end

  def apply

    product_history.already!

    product = product_history.product
    product.update! quantity: (product.quantity + product_history.quantity)

    # 成功したら編集ページに飛ぶ
    redirect_to product_histories_path(product_id: product.id), flash: { show: true, icon: 'info', message: '在庫を追加しました' }
  rescue => e

    # エラー時は直前のページへ
    redirect_back fallback_location: url_for({action: :new}), flash: { show: true, icon: 'info', message: e.message }
  end

  #----------------------------------------
  #  ** Methods **
  #----------------------------------------

  private

    ##
    # パラメータの取得
    # @version 2018/06/10
    #
    def product_history_params

      params.require(:product_history).permit :product_id, :date, :status, :quantity
    end
end
