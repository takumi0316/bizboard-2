class DownloadsController < ApplicationController

  #----------------------------------------
  #  ** Includes **
  #----------------------------------------
    require 'base64'
  #----------------------------------------
  #  ** Instance variables **
  #----------------------------------------

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
    #暗号化されたパラメーターを復号する処理(ecからparamsで送ったデータを復号できるか不明)
    quote_id = Base64.decode64(params[:encoded_quote_id])
    @quote = Quote.find(quote_id)
    respond_to do |format|
      format.html do
        render  pdf: "納品書_#{@quote.id}", # pdfファイルの名前。これがないとエラーが出ます
                encoding: 'UTF-8',
                layout: 'layouts/pdf.html.slim',
                template: 'downloads/delivery_note.html.slim', # テンプレートファイルの指定。viewsフォルダが読み込まれます。
                show_as_html: params.key?('debug')
      end
    end
  end

  #----------------------------------------
  #  ** Methods **
  #----------------------------------------
end
