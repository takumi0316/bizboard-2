require 'csv'

class CardClientsController < ApplicationController

  #----------------------------------------
  #  ** Includes **
  #----------------------------------------

  #----------------------------------------
  #  ** Instance variables **
  #----------------------------------------

  # 名刺マスタ
  expose_with_pagination(:card_clients) { CardClient.search(params[:name]).all.reverse_order }

  # 名刺マスタ
  expose(:card_client) { CardClient.find_or_initialize_by id: params[:id] || params[:card_client_id] }

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

    @divisions = card_client.division_search

    add_breadcrumb '名刺情報一覧', path: card_clients_path
    add_breadcrumb '新規作成'
  end

  ##
  # 作成
  # @version 2020/03/23
  #
  def create

    card_client.update! card_client_params

    CardClient.where(company_division_client_id: card_client.company_division_client_id).where(status: 10).each { |r| r.custom! if r.id != card_client.id } if card_client.default?

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

    CardClient.where(company_division_client_id: card_client.company_division_client_id).where(status: 10).each { |r| r.custom! if r.id != card_client.id } if card_client.default?

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
  # CSV Bulk Upload
  #
  def bulk

    required_params = card_client_params
    count = 0
    required_params[:templates_attributes].each_with_index do |r, index|

      CardClient.create! card_id: required_params[:card_id], company_division_id: required_params[:company_division_id], company_division_client_id: params[:company_division_client_ids][index], templates_attributes: r if index == 0
      if index != 0

        CardClient.last.templates.create! card_template_id: r[:card_template_id], values_attributes: r[:values_attributes] if params[:company_division_client_ids][index - 1] == params[:company_division_client_ids][index]
        CardClient.create! card_id: required_params[:card_id], company_division_id: required_params[:company_division_id], company_division_client_id: params[:company_division_client_ids][index], templates_attributes: r if params[:company_division_client_ids][index - 1] != params[:company_division_client_ids][index]
      end
      count += 1
    end

    render json: { status: :success }
  rescue => e

    (1..count).each { |r| CardClient.last.destroy! if r != 1 }

    render json: { status: :error, message: e.message }
  end

  def front_preview

    add_breadcrumb '名刺情報一覧', path: card_clients_path
    add_breadcrumb '編集（表面）'
  end

  def reverse_preview

    add_breadcrumb '名刺情報一覧', path: card_clients_path
    add_breadcrumb '編集（裏面）'
  end

  ##
  # CSVアップロード
  # @version 2020/04/11
  #
  def upload

    @divisions = card_client.division_search

    add_breadcrumb '名刺情報一覧', path: card_clients_path
    add_breadcrumb 'アップロード'
  end

  ##
  # CSVダウンロード
  # @version 2020/04/11
  #
  def download

    @divisions = card_client.division_search

    add_breadcrumb '名刺情報一覧', path: card_clients_path
    add_breadcrumb 'ダウンロード'
  end

  ##
  # CSV Download
  # @version 2020/04/30
  #
  def csv_download

    bom = "\uFEFF"
    card = Card.find(params[:card_id])
    headers = []
    headers << ''
    headers << '名刺ID'
    headers << '会社ID'
    headers << '担当者ID'
    headers << '担当者名'

    card.templates.each { |t| t.details.each { |d| headers << d.name } }

    download_csv = CSV.generate(bom) do |csv|
      csv << headers
      params[:card_clients].each do |c|
        values = []
        values << ''
        values << card.id
        values << card.company_id
        values << c[:id]
        values << c[:name]

        # 既に名刺情報登録されている場合
        if CardClient.where(card_id: card.id).where(company_division_client_id: c[:id]).present?
          CardClient.where(card_id: card.id).where(company_division_client_id: c[:id]).first.templates.each do |ct|
            ct.values.each { |v| values << v.value }
          end
        end

        # まだ名刺情報登録されていない場合
        card.templates.each { |t| t.details.each { |d| values << '' } } if CardClient.where(card_id: card.id).where(company_division_client_id: c[:id]).blank?
        csv << values
      end
    end

    send_data download_csv, filename: '担当者情報ダウンロード.csv', type: :csv
  rescue => e

    render json: { status: :error, message: e.message }
  end

  private

    ##
    # Strong Parameters
    #
    def card_client_params

      params.require(:card_client).permit :card_id, :company_division_id, :company_division_client_id, :status, {
        templates_attributes: [:id, :card_client_id, :card_template_id,
          {
            values_attributes: [:id, :client_template_id, :template_detail_id, :value]
          }
        ]
      }
    end
end
