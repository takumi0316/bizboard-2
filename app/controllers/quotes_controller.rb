##
# quotes Controller
#
class QuotesController < ApplicationController

  #----------------------------------------
  #  ** Includes **
  #----------------------------------------

  #----------------------------------------
  #  ** Instance variables **
  #----------------------------------------

  # 見積もり
  expose(:quotes) {
    Quote
    .search(params[:name])
    .all
    .includes(:quote_items)
    .order(date: 'DESC')
  }

  # 見積もりアイテム
  expose(:quote_items) {
    QuoteItem
    .all
  }

  # 見積もりアイテム
  expose(:quote_item) { QuoteItem.find_or_initialize_by id: params[:id] || params[:quote_item_id]}

  # 見積もり
  expose(:quote) { Quote.find_or_initialize_by id: params[:id] || params[:quote_id]}


  #----------------------------------------
  #  ** Layouts **
  #----------------------------------------

  #----------------------------------------
  #  ** Request cycles **
  #----------------------------------------

  # MFクラウド認証
  before_action :authenticate_mfcloud

  #----------------------------------------
  #  ** Actions **
  #----------------------------------------

  ##
  # 一覧
  # @version 2019/03/12
  #
  def index

    add_breadcrumb '見積もり'
  end

  ##
  # 新規作成
  # @version 2018/06/10
  #
  def new

    add_breadcrumb '見積もり', path: quotes_path
    add_breadcrumb '新規作成'
    @quote = Quote.new(project_id: params[:project_id])
    quote.quote_items.build
  end

  ##
  # 編集
  # @version 2018/06/10
  #
  def edit

    add_breadcrumb '見積もり', path: quotes_path
    add_breadcrumb '編集'
  rescue => e
    redirect_back fallback_location: url_for({action: :index}), flash: {notice: {message: e.message}}
  end

  ##
  # 更新処理
  # @version 2018/06/10
  #
  def update

    # 情報更新
    quote.update! quote_params

    token = current_user.mf_access_token
    delete_id = quote.mf_quote_id
    uri = URI.parse("https://invoice.moneyforward.com/api/v2/quotes/#{delete_id}.json")
    request = Net::HTTP::Delete.new(uri)
    request["Authorization"] = "BEARER #{token}"

    req_options = {
      use_ssl: uri.scheme == "https",
    }

    response = Net::HTTP.start(uri.hostname, uri.port, req_options) do |http|
      http.request(request)
    end


    uri = URI.parse("https://invoice.moneyforward.com/api/v2/quotes.json")
    request = Net::HTTP::Post.new(uri)
    request.content_type = "application/json"
    request["Authorization"] = "BEARER #{token}"

    request.body = JSON.dump({
      "quote": {
        "department_id": quote.project.client.company_division.mf_company_division_id,
        "quote_number": quote.project.project_number,
        "quote_date": quote.date.strftime('%Y-%m-%d'),
        "expired_date": quote.expiration.strftime('%Y-%m-%d'),
        "title": quote.subject,
        "note": quote.remarks,
        "memo": quote.memo,
        "items": [
          quote.quote_items.pluck(*[:name, :quantity, :unit_price]).map {
            |tm| [:name, :quantity, :unit_price].zip(tm).to_h
          }
        ]
      }
    })


    req_options = {
      use_ssl: uri.scheme == "https",
    }

    response = Net::HTTP.start(uri.hostname, uri.port, req_options) do |http|
      http.request(request)
    end

    data = JSON.parse(response.body)

    quote.update_columns(:pdf_url => data['data']['attributes']['pdf_url'])
    quote.update_columns(:mf_quote_id => data['data']['id'])


    redirect_back fallback_location: url_for({action: :index}), flash: {notice: {message: '見積もりを更新しました'}}
  rescue => e

    redirect_back fallback_location: url_for({action: :index}), flash: {notice: {message: e.message}}
  end

  ##
  # 新規作成
  # @version 2018/06/10
  #
  def create

    # 情報更新
    quote.update! quote_params

    # デバックの時に使う為ここに書いてるだけです
    quote.project.estimated!

    token = current_user.mf_access_token
    uri = URI.parse("https://invoice.moneyforward.com/api/v2/quotes.json")
    request = Net::HTTP::Post.new(uri)
    request.content_type = "application/json"
    request["Authorization"] = "BEARER #{token}"

    request.body = JSON.dump({
      "quote": {
        "department_id": quote.project.client.company_division.mf_company_division_id,
        "quote_number": quote.project.project_number,
        "quote_date": quote.date.strftime('%Y-%m-%d'),
        "expired_date": quote.expiration.strftime('%Y-%m-%d'),
        "title": quote.subject,
        "note": quote.remarks,
        "memo": quote.memo,
        “items”: [
          {
            “name”: "商品A",
            “quantity”: 10,
            “unit_price”: 100,
          },
          {
            “name”: "商品B",
            “quantity”: 10,
            “unit_price”: 100,
          },
        ]
      }
    })

    req_options = {
      use_ssl: uri.scheme == "https",
    }

    response = Net::HTTP.start(uri.hostname, uri.port, req_options) do |http|
      http.request(request)
    end

    data = JSON.parse(response.body)

    quote.update_columns(:pdf_url => data['data']['attributes']['pdf_url'])
    quote.update_columns(:mf_quote_id => data['data']['id'])

    quote.project.estimated!


    redirect_to fallback_location: url_for({action: :index}), flash: {notice: {message: '見積もりを作成しました'}}
  rescue => e

    redirect_back fallback_location: url_for({action: :index}), flash: {notice: {message: e.message}}
  end

  ##
  # 削除
  # @version 2018/06/10
  #
  def destroy

    quote.destroy

    token = current_user.mf_access_token
    delete_id = quote.mf_quote_id
    uri = URI.parse("https://invoice.moneyforward.com/api/v2/quotes/#{delete_id}.json")
    request = Net::HTTP::Delete.new(uri)
    request["Authorization"] = "BEARER #{token}"

    req_options = {
      use_ssl: uri.scheme == "https",
    }

    response = Net::HTTP.start(uri.hostname, uri.port, req_options) do |http|
      http.request(request)
    end

  rescue => e

    flash[:warning] = { message: e.message }
  ensure
    redirect_to action: :index
  end

  def pdf_dl

    token = current_user.mf_access_token
    pdf_url = quote.pdf_url

    uri = URI.parse("#{pdf_url}")
    request = Net::HTTP::Get.new(uri)
    request["Authorization"] = "BEARER #{token}"
    req_options = {
      use_ssl: uri.scheme == "https",
    }

    response = Net::HTTP.start(uri.hostname, uri.port, req_options) do |http|
      http.request(request)
    end

    send_data response.body

  end

  #----------------------------------------
  #  ** Methods **
  #----------------------------------------

  private

  def quote_params

    params.require(:quote).permit :id, :project_id, :date, :expiration, :subject, :remarks, :memo, :pdf_url, :mf_quote_id,
      quote_items_attributes: [:id, :name, :unit_price, :quantity, :cost, :gross_profit, :detail]
  end

end
