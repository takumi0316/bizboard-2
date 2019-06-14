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
    .order(date: 'DESC')
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
    @subcontractor = Subcontractor.all
    if params[:date1].present?
      @date1 = params[:date1]
      @date2 = params[:date2]
    else
      @date1 = Time.current.beginning_of_month
      @date2 = Time.current.end_of_month
    end
  end


  #----------------------------------------
  #  ** Methods **
  #----------------------------------------

  private

  def payment_params

    params.require(:payment).permit :id, :subcontractor_id, :work_subcontractor_detail_id, :price, :date
  end

end
