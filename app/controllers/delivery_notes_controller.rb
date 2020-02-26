##
# DeliveryNotes Controller
#
class DeliveryNotesController < ApplicationController

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
  def index

    add_breadcrumb '納品書一覧'
  end

  ##

  # 詳細
  # @version 2020/01/29
  #
  def show

    add_breadcrumb '納品書一覧', path: delivery_notes_path
    add_breadcrumb '詳細'
  end

  def pdf

    respond_to do |format|
      format.html do
        render  pdf: "納品書_#{quote.id}", # pdfファイルの名前。これがないとエラーが出ます
                encoding: 'UTF-8',
                layout: 'layouts/pdf.html.slim',
                template: 'delivery_notes/pdf.html.slim', # テンプレートファイルの指定。viewsフォルダが読み込まれます。
                show_as_html: params.key?('debug')
      end
    end
  end

  #----------------------------------------
  #  ** Methods **
  #----------------------------------------

end
