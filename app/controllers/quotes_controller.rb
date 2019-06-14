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
  expose_with_pagination(:quotes) {
    Quote
    .search(name: params[:name], date1: params[:date1], date2: params[:date2])
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

    add_breadcrumb '案件'

    @division = current_user.division&.id
    @user_type = current_user.user_type
    @count = params[:count]
  end

  ##
  # 新規作成
  # @version 2018/06/10
  #
  def new

    add_breadcrumb '案件', path: quotes_path
    add_breadcrumb '新規作成'
    @quote = Quote.new
  end

  ##
  # 編集
  # @version 2018/06/10
  #
  def edit

    add_breadcrumb '案件', path: quotes_path
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
  # 新規作成 / 更新
  # @version 2018/06/10
  #
  def create

    # 情報更新
    # quote.update! quote_params.merge(division_id: current_user.division_id)

    if params[:id] == 'null'
      Quote.create!(user_id: params[:quote][:user_id], division_id: params[:quote][:division_id] == 'null' ? nil : params[:quote][:division_id], date: params[:quote][:date], expiration: params[:quote][:expiration], subject: params[:quote][:subject], remarks: params[:quote][:remarks], memo: params[:quote][:memo], price: params[:quote][:total_cost], attention: params[:quote][:attention], company_division_client_id: params[:quote][:company_division_client_id], quote_type: params[:quote][:quote_type], channel: params[:quote][:channel], deliver_at: params[:quote][:deliver_at], deliver_type: params[:quote][:deliver_type], deliver_type_note: params[:quote][:deliver_type_note], discount: params[:quote][:discount])
      unless params[:specifications].nil?
        params[:specifications].each do |specification|

          parse_json = JSON.parse(specification)
          createQuote = Quote.last
          createQuote.quote_projects.create!(name: parse_json['projectSpecificationName'], remarks: parse_json['projectSpecificationRemarks'], unit_price: parse_json['projectSpecificationUnitPrice'], unit: parse_json['projectSpecificationUnit'].to_i, price: parse_json['projectSpecificationPrice'], project_id: parse_json['projectSpecificationId'], project_name: parse_json['projectName'], project_id: parse_json['projectId'].to_i)
        end
      end
      render json: { status: :success, quote: Quote.last, quote_projects: Quote.last.quote_projects }
    else

      findQuote = Quote.find(params[:id])
      findQuote.update!(user_id: params[:quote][:user_id], division_id: params[:quote][:division_id] == 'null' ? nil : params[:quote][:division_id], date: params[:quote][:date], expiration: params[:quote][:expiration], subject: params[:quote][:subject], remarks: params[:quote][:remarks], memo: params[:quote][:memo], price: params[:quote][:total_cost], attention: params[:quote][:attention], company_division_client_id: params[:quote][:company_division_client_id], quote_type: params[:quote][:quote_type], channel: params[:quote][:channel], deliver_at: params[:quote][:deliver_at], deliver_type: params[:quote][:deliver_type], deliver_type_note: params[:quote][:deliver_type_note], discount: params[:quote][:discount])
      unless params[:specifications].nil?
        params[:specifications].each do |specification|

          parse_json = JSON.parse(specification)
          findQuoteProject = QuoteProject.find_or_initialize_by(id: parse_json['projectSpecificationId'])
          if findQuoteProject.id == 0

            QuoteProject.create!(name: parse_json['projectSpecificationName'], remarks: parse_json['projectSpecificationRemarks'], unit_price: parse_json['projectSpecificationUnitPrice'], unit: parse_json['projectSpecificationUnit'].to_i, price: parse_json['projectSpecificationPrice'], quote_id: params[:id], project_id: parse_json['projectSpecificationId'], project_name: parse_json['projectName'], project_id: parse_json['projectId'])
          else

            findQuoteProject.update!(name: parse_json['projectSpecificationName'], remarks: parse_json['projectSpecificationRemarks'], unit_price: parse_json['projectSpecificationUnitPrice'], unit: parse_json['projectSpecificationUnit'].to_i, price: parse_json['projectSpecificationPrice'], project_id: parse_json['projectSpecificationId'], project_name: parse_json['projectName'], project_id: parse_json['projectId'])
          end
        end
      end
      render json: { status: :success, quote: Quote.find(params[:id]), quote_projects: Quote.find(params[:id]).quote_projects }
    end
  rescue => e

    if params[:id] == 'null'

      Quote.last.destroy!
      render json: { status: :error, quote: Quote.new, quote_projects: [] }
    else

      render json: { status: :error, quote: Quote.find(params[:id].to_i), quote_projects: Quote.find(params[:id].to_i).quote_projects }
    end
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

    if quote.quote_projects.present?
      begin
        if quote.company_division_client_id.present?
          begin
            if quote.date.present?
              begin
                if quote.expiration.present?
                  begin
                    token = current_user.mf_access_token
                    uri = URI.parse("https://invoice.moneyforward.com/api/v2/quotes.json")
                    request = Net::HTTP::Post.new(uri)
                    request.content_type = "application/json"
                    request["Authorization"] = "BEARER #{token}"

                    # 品目を整形する
                    items = quote.quote_projects.each_with_object([]) do |r, result|
                      result.push({
                        name: r.name,
                        quantity: r.unit,
                        unit_price: r.unit_price,
                        detail: r.remarks,
                      })
                    end

                    #値引きが０より大きければ品目に値引き追加
                    if quote.discount > 0
                      items << {
                        name: '値引き',
                        quantity: 1,
                        unit_price: "-#{quote.discount}",
                      }
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

                    data = JSON.parse(response.body)

                    quote.update_columns(:pdf_url => data['data']['attributes']['pdf_url'])
                    quote.update_columns(:mf_quote_id => data['data']['id'])

                    redirect_to quotes_path, flash: {notice: {message: 'MFに見積もりを作成しました'}}
                  rescue => e
                    redirect_back fallback_location: url_for({action: :index}), flash: {notice: {message: e.message}}
                  end
                else
                  redirect_to quotes_path, flash: {notice: {message: '見積もり有効期限が選択されていません'}}
                end
              end
            else
              redirect_to quotes_path, flash: {notice: {message: '見積もりの日付が選択されていません'}}
            end
          end
        else
          redirect_to quotes_path, flash: {notice: {message: 'お客様情報が選択されていません'}}
        end
      end
    else
      redirect_to quotes_path, flash: {notice: {message: '品目が紐づいていない為MFに保存ができません'}}
    end
  end

  def api_update

    if quote.quote_projects.present?

      begin
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
            name: r.name,
            quantity: r.unit,
            unit_price: r.unit_price,
            detail: r.remarks,
          })
        end

        #値引きが０より大きければ品目に値引き追加
        if quote.discount > 0
          items << {
            name: '値引き',
            quantity: 1,
            unit_price: "-#{quote.discount}",
          }
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

        data = JSON.parse(response.body)

        quote.update_columns(:pdf_url => data['data']['attributes']['pdf_url'])
        quote.update_columns(:mf_quote_id => data['data']['id'])

        redirect_to quotes_path, flash: {notice: {message: 'MFの見積もりを更新しました'}}
      rescue => e
        redirect_back fallback_location: url_for({action: :index}), flash: {notice: {message: e.message}}
      end

    else
      redirect_to quotes_path, flash: {notice: {message: '品目が紐づいていない為MFの見積もり更新ができません'}}
    end
  end

  def pdf_dl

    token = current_user.mf_access_token
    pdf_url = quote.pdf_url

    filename = "見積書_#{quote.quote_number}"

    uri = URI.parse("#{pdf_url}")
    request = Net::HTTP::Get.new(uri)
    request["Authorization"] = "BEARER #{token}"
    req_options = {
      use_ssl: uri.scheme == "https",
    }

    response = Net::HTTP.start(uri.hostname, uri.port, req_options) do |http|
      http.request(request)
    end

    send_data response.body, filename: "#{filename}.pdf"
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

  ##
  # 見積書を複製する
  # @version 2018/06/10
  #
  def copy

    clone_quote = quote.deep_clone(:quote_projects, :quote_items)

    clone_quote.save

    clone_quote.update_columns(pdf_url: nil, mf_quote_id: nil)

    clone_quote.draft!

    redirect_to edit_quote_path(clone_quote), flash: {notice: {message: '見積書を複製しました'}}
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

  def count_params

    params :count
  end

end
