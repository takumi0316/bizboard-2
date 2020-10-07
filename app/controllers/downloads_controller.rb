class DownloadsController < ApplicationController

  #----------------------------------------
  #  ** Includes **
  #----------------------------------------

  #----------------------------------------
  #  ** Instance variables **
  #----------------------------------------

  # 見積もり
  expose_with_pagination(:quotes) {

    Quote
    .all
    .search(name: params[:name], status: params[:status], date1: params[:date1], date2: params[:date2])
    .order(date: :desc)
  }

  # 見積もり
  expose(:quote) { Quote.find_or_initialize_by id: params[:id] }

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
  def delivery_note

    #ec-factoryからのアクセスの場合は拒否する処理
    add_breadcrumb 'テスト'
    #暗号化されたパラメーターを復号する処理(できる？)
    #ecユーザーID->部署IDと案件のID->部署IDを検証して違う部署なら拒否する
    #pdfダウンロード
  end

  #----------------------------------------
  #  ** Methods **
  #----------------------------------------
end
