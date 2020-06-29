##
# payments Controller
#
class PaymentsController < ApplicationController
  #----------------------------------------
  #  ** Includes **
  #----------------------------------------

  # 支払い情報
  expose_with_pagination(:payments) { Payment.all.where(accouting_status: :active) }


  # 支払い情報
  expose(:payment) { Payment.find_or_initialize_by id: params[:id] || params[:payment_id] }


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

    @start_date = params[:begginning].present? ? Time.zone.strptime(params[:begginning], '%Y-%m-%d').beginning_of_month : Time.zone.now.beginning_of_month
    @end_date = params[:begginning].present? ? Time.zone.strptime(params[:end], '%Y-%m-%d').end_of_month : Time.zone.now.end_of_month

    @subcontractor = Subcontractor.eager_load(:payments).where.not(payments: { price: 0 })

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
