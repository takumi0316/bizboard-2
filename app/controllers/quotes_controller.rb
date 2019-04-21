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
    .order(date: 'DESC')
  }

  # 見積もり
  expose(:quote) { Quote.find_or_initialize_by id: params[:id] || params[:quote_id] }


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
  # @version 2019/03/12
  #
  def index

    add_breadcrumb '見積もり'
    @id = params[:name]
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

    redirect_back fallback_location: url_for({action: :index}), flash: {notice: {message: '取引先情報を更新しました'}}
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

    token = '7061804ec577bd26fc171ffb12d739d110872f13d4c0504b7709449468ab6310'

    uri = URI.parse("https://invoice.moneyforward.com/api/v2/quotes.json")
    request = Net::HTTP::Post.new(uri)
    request.content_type = "application/json"
    request["Authorization"] = "BEARER {{#{token}}}"
    request.body = JSON.dump({
      "quote" => {
        "department_id" => "asdfghjkl",
        "items" => [
          {
            "name" => "商品A",
            "quantity" => 1,
            "unit_price" => 100
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

    response.code
    response.body

    # ここで見積もり金額の合計値(※税抜き)を出し、Quoteテーブルのpriceを更新してください
    # また、その際に見積もり金額と同じ値で、Projectテーブルのpriceを更新してください。
    # あとこれは重要なのですが、現状だと見積もりデータを作成するたびに見積書がMFクラウド上に生成されてしまうので、
    # 更新するたびではなく、見積書を発行するボタンを作成し、そのボタンが押された場合に発行してください。
    # 見積書の発行が完了した際に、Projectモデルを下記のコードでステータスを更新してください
    #    quote.proect.estimated!
    # また、見積もり書を作成した際にAPIから返ってくるURL(pdf_url)をQuoteテーブルに保存し、一覧画面からリンクできるようにしてください。

    redirect_to fallback_location: url_for({action: :index}), flash: {notice: {message: '取引先情報を更新しました'}}
  rescue => e

    redirect_back fallback_location: url_for({action: :index}), flash: {notice: {message: e.message}}
  end

  ##
  # 削除
  # @version 2018/06/10
  #
  def destroy

    quote.destroy
  rescue => e

    flash[:warning] = { message: e.message }
  ensure
    redirect_to action: :index
  end


  #----------------------------------------
  #  ** Methods **
  #----------------------------------------

  private

  def quote_params

    params.require(:quote).permit :id, :project_id, :date, :expiration, :subject, :remarks, :memo,
      quote_items_attributes: [:cost, :gross_profit, :detail]
  end

end
