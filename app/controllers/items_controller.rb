##
# Items Controller
#
class ItemsController < ApplicationController

  #----------------------------------------
  #  ** Includes **
  #----------------------------------------

  #----------------------------------------
  #  ** Instance variables **
  #----------------------------------------

  # 品目一覧
  expose_with_pagination(:items) {
    Item
      .search(params[:name])
      .all
      .reverse_order
  }
  # 品目
  expose(:item) { Item.find_or_initialize_by id: params[:id] || params[:item_id] }

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

    add_breadcrumb '品目一覧'
  end

  ##
  # 新規作成
  # @version 2018/06/10
  #
  def new

    add_breadcrumb '品目一覧', path: items_path
    add_breadcrumb '品目作成'
  end

  ##
  # 編集
  # @version 2018/06/10
  #
  def edit

    add_breadcrumb '品目一覧', path: items_path
    add_breadcrumb '品目編集'
  rescue => e
    redirect_back fallback_location: url_for({action: :index}), flash: {notice: {message: e.message}}
  end

  ##
  # 更新処理
  # @version 2018/06/10
  #
  def update

    # 品目情報更新
    item.update! item_params

    if request.xhr?
      render json: item_params
    else
      redirect_back fallback_location: url_for({action: :index}), flash: {notice: {message: '品目情報を更新しました'}}
    end

  rescue => e
    
    redirect_back fallback_location: url_for({action: :index}), flash: {notice: {message: e.message}}
  end

  ##
  # 新規作成
  # @version 2018/06/10
  #
  def create

    # 品目情報更新
    item.update! item_params

    redirect_to edit_item_path(item), flash: {notice: {message: '品目情報を更新しました'}}
  rescue => e
    
    redirect_back fallback_location: url_for({action: :index}), flash: {notice: {message: e.message}}
  end

  ##
  # 削除
  # @version 2018/06/10
  #
  def destroy

    item.destroy!
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
    def item_params

      params.require(:item).permit :name, :mf_item_id, :code, :note, :unit_price, :unit, :excise, :division_id
    end
end
