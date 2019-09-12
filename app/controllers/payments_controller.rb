##
# payments Controller
#
class PaymentsController < ApplicationController
  #----------------------------------------
  #  ** Includes **
  #----------------------------------------

  # 支払い情報
  expose_with_pagination(:payments) {
    Payment
    .all
  }


  # 支払い情報
  expose(:payment) { Payment.find_or_initialize_by id: params[:id] || params[:payment_id]}


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
  def index

    add_breadcrumb '支払い管理'

    if params[:date1].present?
      @date1 = params[:date1].to_time.beginning_of_day
      @date2 = params[:date2].to_time.end_of_day
    else
      @date1 = Time.current.beginning_of_month
      @date2 = Time.current.end_of_month
    end
    @subcontractor = Subcontractor.joins(:payments).eager_load(:payments).where.not(payments: {price: 0}).where(payments: {date: @date1..@date2})
  end


  #----------------------------------------
  #  ** Methods **
  #----------------------------------------

  private

  def payment_params

    params.require(:payment).permit :id, :subcontractor_id, :work_subcontractor_detail_id, :price, :date
  end

end
