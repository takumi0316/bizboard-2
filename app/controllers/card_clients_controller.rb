class CardClientsController < ApplicationController

  #----------------------------------------
  #  ** Includes **
  #----------------------------------------

  #----------------------------------------
  #  ** Instance variables **
  #----------------------------------------

  # 名刺マスタ
  expose_with_pagination(:card_clients) {
    CardClient.search(company_division_id: params[:company_division_id]).all
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

    @divisions = []
    Card.all.pluck(:company_division_id).uniq.each do |r|

      division = CompanyDivision.find(r)

      obj = {
        division: division,
        company: division.company
      }
      @divisions.append(obj)
    end

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

    card_client.destroy!

    redirect_to action: :index, flash: { icon: :success, message: '削除しました。' }
  end

  ##
  #
  #
  #
  def bulk

    required_params = card_client_params
    required_params[:templates_attributes].each_with_index do |r, index|

      CardClient.create! card_id: required_params[:card_id], company_division_id: required_params[:company_division_id], company_division_client_id: params[:company_division_client_ids][index], templates_attributes: r
    end

    redirect_to action: 'index', flash: { icon: :success }
  end

  ##
  #
  #
  #
  def bulk_download

  end

  ##
  # CSVアップロード
  # @version 2020/04/11
  #
  def upload

    @divisions = []
    Card.all.pluck(:company_division_id).uniq.each do |r|

      division = CompanyDivision.find(r)

      obj = {
        division: division,
        company: division.company
      }
      @divisions.append(obj)
    end

    add_breadcrumb '名刺情報一覧', path: card_clients_path
    add_breadcrumb 'アップロード'
  end

  ##
  # CSVダウンロード
  # @version 2020/04/11
  #
  def download

    @divisions = []
    Card.all.pluck(:company_division_id).uniq.each do |r|

      division = CompanyDivision.find(r)

      obj = {
        division: division,
        company: division.company
      }
      @divisions.append(obj)
    end

    add_breadcrumb '名刺情報一覧', path: card_clients_path
    add_breadcrumb 'ダウンロード'
  end

  private

  def card_client_params

    params.require(:card_client).permit :card_id, :company_division_id, :company_division_client_id, {
      templates_attributes: [:id, :card_client_id, :card_template_id,
        {
          values_attributes: [:id, :client_template_id, :template_detail_id, :value]
        }
      ]
    }
  end

end