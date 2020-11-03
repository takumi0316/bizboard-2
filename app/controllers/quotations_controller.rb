##
# Quotations Controller
#
class QuotationsController < ApplicationController

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

    add_breadcrumb '見積書一覧'
  end

  def edit
  
    add_breadcrumb '見積書一覧', path: quotations_path
    add_breadcrumb '詳細'
  end

	##
	# 詳細
	# @version 2020/02/18
  def show
  
    blob = ActiveStorage::Blob.find_by(filename: "見積書＿#{quote.id}.pdf")
    quotation_pdf = ActiveStorage::Attachment.find_by(blob_id: blob.id)
    send_data quotation_pdf.download, filename: quotation_pdf.name, disposition: 'inline', type: 'application/pdf'
  end

  def generate_pdf
  
    filename = "見積書＿#{quote.id}.pdf"
    pdf_html = render_to_string template: 'quotations/generate_pdf.html.slim', layout: 'layouts/pdf.html.slim'
    pdf_string = WickedPdf.new.pdf_from_string(pdf_html)
    pdf_string.force_encoding('UTF-8')
  
    quote.files.attach io: StringIO.new(pdf_string), filename: filename, content_type: 'application/pdf'
    quote.save!
 
    redirect_to quotation_path(quote)
  end

  #----------------------------------------
  #  ** Methods **
  #----------------------------------------

end
