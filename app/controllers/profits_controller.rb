##
# payments Controller
#
class ProfitsController < ApplicationController
  #----------------------------------------
  #  ** Includes **
  #----------------------------------------

  # 支払い情報
  expose_with_pagination(:profit) {
    Profit
    .all
  }


  # 支払い情報
  expose(:profits) { Profit.find_or_initialize_by id: params[:id] || params[:profit_id]}


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

    add_breadcrumb '請求情報'

    if params[:date1].present?
      @date1 = params[:date1].to_time.beginning_of_day
      @date2 = params[:date2].to_time.end_of_day
    else
      @date1 = Time.current.beginning_of_month
      @date2 = Time.current.end_of_month
    end
    @company = Company.joins(:profits).eager_load(:profits).where(profits: {date: @date1..@date2}).where.not(profits: {price: 0})
  end


  #----------------------------------------
  #  ** Methods **
  #----------------------------------------

  private

  def payment_params

    params.require(:profits).permit :id, :company_id, :quote_id, :price, :date
  end

end
