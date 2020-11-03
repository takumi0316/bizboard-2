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

  def edit
  
    add_breadcrumb '納品書一覧', path: delivery_notes_path
    add_breadcrumb '詳細'
  end

  #
  # 詳細
  # @version 2020/01/29
  #
  def show

    blob = ActiveStorage::Blob.find_by(filename: "納品書＿#{quote.id}.pdf")
    delivery_note_pdf = ActiveStorage::Attachment.find_by(blob_id: blob.id)
    send_data delivery_note_pdf.download, filename: delivery_note_pdf.name, disposition: 'inline', type: 'application/pdf'
  end

  def generate_pdf
  
    filename = "納品書＿#{quote.id}.pdf"
    pdf_html = render_to_string template: 'delivery_notes/generate_pdf.html.slim', layout: 'layouts/pdf.html.slim'
    pdf_string = WickedPdf.new.pdf_from_string(pdf_html)
    pdf_string.force_encoding('UTF-8')
  
    quote.files.attach io: StringIO.new(pdf_string), filename: filename, content_type: 'application/pdf'
    quote.save!
 
    redirect_to delivery_note_path(quote)
  end

  #----------------------------------------
  #  ** Methods **
  #----------------------------------------

end
