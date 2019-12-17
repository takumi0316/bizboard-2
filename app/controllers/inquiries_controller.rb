class InquiriesController < ApplicationController

  #----------------------------------------
  #  ** Includes **
  #----------------------------------------

  #----------------------------------------
  #  ** Instance variables **
  #----------------------------------------
  # タスク
  expose(:inquiries) {
    Inquiry
    .all
    .joins(:quote)
  }

  # タスク
  expose(:inquiry) { Inquiry.find_or_initialize_by id: params[:id]}

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

    add_breadcrumb '紐付け結果'
  end


  def import_bpr
    # fileはtmpに自動で一時保存される
    Inquiry.import(params[:file])
    redirect_to inquiries_path, notice: 'テスト'
  end

  #----------------------------------------
  #  ** Methods **
  #----------------------------------------

end
