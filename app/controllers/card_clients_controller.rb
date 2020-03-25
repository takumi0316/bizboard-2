class CardClientsController < ApplicationController

  #----------------------------------------
  #  ** Includes **
  #----------------------------------------

  #----------------------------------------
  #  ** Instance variables **
  #----------------------------------------

  # 名刺マスタ
  expose_with_pagination(:card_clients) {
    CardClient.all
  }

  # 名刺マスタ
  expose(:card_client) { CardClient.find_or_initialize_by id: params[:id] }

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
  # @version 2020/03/23
  #
  def index

    add_breadcrumb '名刺情報一覧'
  end

  ##
  # 新規
  # @version 2020/03/23
  #
  def new

    add_breadcrumb '名刺情報一覧', path: card_clients_path
    add_breadcrumb '新規作成'
  end

  ##
  # 作成
  # @version 2020/03/23
  #
  def create
  end

  ##
  # 編集
  # @version 2020/03/23
  #
  def edit

    add_breadcrumb '名刺情報一覧', path: card_clients_path
    add_breadcrumb '編集'
  end

  ##
  # 更新
  # @version 2020/03/23
  #
  def update
  end

  ##
  # 削除
  # @version 2020/03/23
  #
  def destroy
  end

  private

  def card_client_params

    params.require(:card_client).permit! :id, :company_division_client_id, {
      client_template_attributes: [:id, :card_client_id, :card_teimplate_id,
        { template_details_attributes: [:id, :client_template_id, :template_detail_id, :value] }
      ]
		}
	end
end