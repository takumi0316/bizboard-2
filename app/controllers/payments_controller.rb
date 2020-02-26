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

    @start_date = Time.current.beginning_of_month
    @end_date = Time.current.end_of_month

    if params[:begginning].present?
      @start_date = params[:begginning].to_time.beginning_of_month
      @end_date = params[:end].to_time.end_of_month
    end

    @subcontractor = Subcontractor.eager_load(:payments).where.not(payments: {price: 0})

    add_breadcrumb '支払い管理'
  end


  #----------------------------------------
  #  ** Methods **
  #----------------------------------------

  private

  def payment_params

    params.require(:payment).permit :id, :subcontractor_id, :work_subcontractor_detail_id, :price, :date
  end

end
