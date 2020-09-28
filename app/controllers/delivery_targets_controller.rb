class DeliveryTargetsController < ApplicationController

  #----------------------------------------
  #  ** Includes **
  #----------------------------------------

  #----------------------------------------
  #  ** Instance variables **
  #----------------------------------------

  # 配送先
  expose(:delivery_targets) { DeliveryTarget.all.where(card_template_id: params[:card_template_id])  }

  # 配送先
  expose(:delivery_target) { DeliveryTarget.find_or_initialize_by id: params[:id] }

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

    add_breadcrumb '一覧', path: card_templates_path
    add_breadcrumb '配送先一覧'
  end

  ##
  # 新規作成
  # @version 2018/06/10
  #
  def new

    add_breadcrumb '一覧', path: card_templates_path
    add_breadcrumb '配送先一覧', path: delivery_targets_path(card_template_id: params[:card_template_id])
    add_breadcrumb '新規作成'
  end

  ##
  # 新規作成
  # @version 2018/06/10
  #
  def create

    delivery_target.update! delivery_target_params

    redirect_to edit_delivery_target_path(delivery_target), flash: { notice: { message: '配送先を作成しました' } }
  rescue => e

    redirect_back fallback_location: url_for({ action: :index }), flash: { notice: { message: e.message } }
  end

  ##
  # 編集
  # @version 2018/06/10
  #
  def edit
  
    add_breadcrumb '一覧', path: card_templates_path
    add_breadcrumb '配送先一覧', path: delivery_targets_path(card_template_id: params[:card_template_id])
    add_breadcrumb '編集'
  rescue => e

    redirect_back fallback_location: url_for({ action: :index }), flash: { notice: { message: e.message } }
  end

  ##
  # 更新処理
  # @version 2018/06/10
  #
  def update

    delivery_target.update! delivery_target_params

    redirect_back fallback_location: url_for({ action: :index }), flash: { notice: { message: '配送先を更新しました' } }
  rescue => e

    redirect_back fallback_location: url_for({ action: :index }), flash: { notice: { message: e.message } }
  end

  ##
  # 削除
  # @version 2018/06/10
  #
  def destroy

    delivery_target.destroy!
 
    redirect_back fallback_location: url_for({ action: :index }), flash: { notice: { message: '配送先を削除しました' } }
  rescue => e

    redirect_back fallback_location: url_for({ action: :index }), flash: { notice: { message: e.message } }
  end

  #----------------------------------------
  #  ** Methods **
  #----------------------------------------

  private

    ##
    # パラメータの取得
    # @version 2018/06/10
    #
    def delivery_target_params

      params.require(:delivery_target).permit :card_template_id, :name, :address1, :address2
    end
end
