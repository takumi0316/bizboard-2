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
    #ここからdelivery_note_controllerに飛ばして処理をしたい。
    #ecからのアクセスの為ログインしなくてもサイトを覗けるようにしているが、
    #delivery_note_controllerもログインしなくても覗けるようにするのとURLの案件案件番号を暗号化する処理を別途追加する必要がある。
    #上記を行なうより同じviewではあるがログインをしないでも覗けるのとURLを暗号化できているdownloadsコントローラーで全て処理した方がいいと思う。
  
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
