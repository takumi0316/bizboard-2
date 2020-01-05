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
    @inquirie = inquiries.where(division_id: current_user.division_id).where(created_at: Date.today.to_datetime.beginning_of_day..Date.today.to_datetime.end_of_day)
  end


  def import_bpr
    # fileはtmpに自動で一時保存される
    Inquiry.import_bpr(params[:file])
    redirect_to inquiries_path, notice: 'テスト'
  end

  def import_erp
    # fileはtmpに自動で一時保存される
    Inquiry.import_bpr(params[:file])
    redirect_to inquiries_path, notice: 'テスト'
  end


  #----------------------------------------
  #  ** Methods **
  #----------------------------------------

end
