class CardClientsController < ApplicationController

  #----------------------------------------
  #  ** Includes **
  #----------------------------------------

  #----------------------------------------
  #  ** Instance variables **
  #----------------------------------------

  # 名刺マスタ
  expose_with_pagination(:card_clients) {
    CardClient.all.search(company_division_id: params[:company_division_id])
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

    card_client.update! card_client_params

    render json: { status: :success, card_client: card_client }
  rescue => e

    render json: { status: :error, message: e.message }
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

    card_client.update! card_client_params

    render json: { status: :success, card_client: card_client }

  rescue => e

    render json: { status: :error, message: e.message }
  end

  ##
  # 削除
  # @version 2020/03/23
  #
  def destroy
  end

  ##
  # CSVアップロード
  # @version 2020/04/11
  #
  def upload

    add_breadcrumb '名刺情報一覧', path: card_clients_path
    add_breadcrumb 'アップロード'
  end

  ##
  # CSVダウンロード
  # @version 2020/04/11
  #
  def download

    @divisions = []
    card_clients.each do |r|

      obj = {
        division: r.company_division,
        company: r.company_division.company
      }
      @divisions.append(obj)
    end

    add_breadcrumb '名刺情報一覧', path: card_clients_path
    add_breadcrumb 'ダウンロード'
  end

  private

  def card_client_params

    params.require(:card_client).permit :company_division_id, :company_division_client_id, {
      templates_attributes: [:id, :card_client_id, :card_template_id,
        {
          values_attributes: [:id, :client_template_id, :template_detail_id, :value]
        }
      ]
    }
  end

end
