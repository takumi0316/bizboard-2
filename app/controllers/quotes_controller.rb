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
    @quote = Quote.new
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
    quote.update! quote_params.merge(division_id: current_user.division_id)

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

  def api_post

    token = current_user.mf_access_token
    uri = URI.parse("https://invoice.moneyforward.com/api/v2/quotes.json")
    request = Net::HTTP::Post.new(uri)
    request.content_type = "application/json"
    request["Authorization"] = "BEARER #{token}"

    # 品目を整形する
    items = quote.quote_projects.each_with_object([]) do |r, result|
      result.push({
        name: r.project.name,
        quantity: r.unit,
        unit_price: r.price,
      })
    end

    discount = quote.discount

    request.body = JSON.dump({
      "quote": {
        "department_id": quote.client.company_division.mf_company_division_id,
        "quote_number": quote.quote_number,
        "quote_date": quote.date.strftime('%Y-%m-%d'),
        "expired_date": quote.expiration.strftime('%Y-%m-%d'),
        "title": quote.subject,
        "note": quote.remarks,
        "memo": quote.memo,
        "items": items,
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

    redirect_to fallback_location: url_for({action: :index}), flash: {notice: {message: 'MFに見積もりを作成しました'}}
  rescue => e

    redirect_back fallback_location: url_for({action: :index}), flash: {notice: {message: e.message}}

  end

  def api_update

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

      # 品目を整形する
      items = quote.quote_projects.each_with_object([]) do |r, result|
        result.push({
          name: r.project.name,
          quantity: r.unit,
          unit_price: r.price,
        })
      end

      request.body = JSON.dump({
        "quote": {
          "department_id": quote.client.company_division.mf_company_division_id,
          "quote_number": quote.quote_number,
          "quote_date": quote.date.strftime('%Y-%m-%d'),
          "expired_date": quote.expiration.strftime('%Y-%m-%d'),
          "title": quote.subject,
          "note": quote.remarks,
          "memo": quote.memo,
          "items": items,
        }
      })


      req_options = {
        use_ssl: uri.scheme == "https",
      }

      response = Net::HTTP.start(uri.hostname, uri.port, req_options) do |http|
        http.request(request)
      end

      quote.update_columns(:pdf_url => data['data']['attributes']['pdf_url'])
      quote.update_columns(:mf_quote_id => data['data']['id'])

      redirect_to fallback_location: url_for({action: :index}), flash: {notice: {message: 'MFの見積もりを更新しました'}}
    rescue => e

      redirect_back fallback_location: url_for({action: :index}), flash: {notice: {message: e.message}}

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

    redirect_to fallback_location: url_for({action: :index}), flash: {notice: {message: '見積もり書をダウンロードしました'}}
  rescue => e

    redirect_back fallback_location: url_for({action: :index}), flash: {notice: {message: e.message}}

  end


  ##
  # ステータスを更新する
  # @version 2018/06/10
  #
  def status

    quote.update!(status: params[:status].to_sym)

    if quote.working? && quote.work.blank?

      quote.build_work(division_id: current_user.division_id).save!

      redirect_to work_path(quote.work), flash: {notice: {message: '作業書を作成しました'}} and return
    end

    redirect_to quotes_path, flash: {notice: {message: 'ステータスを更新しました'}}
  end

  #----------------------------------------
  #  ** Methods **
  #----------------------------------------

  private

  def quote_params

    params.require(:quote).permit :id, :company_division_client_id, :date, :expiration, :subject, :remarks, :memo, :pdf_url, :price, :mf_quote_id, :user_id, :status, :quote_number,
      :quote_type, :channel, :deliver_at, :deliver_type, :deliver_type_note, :division_id, :discount,
      quote_items_attributes: [:id, :name, :unit_price, :quantity, :cost, :gross_profit, :detail]
  end

end
