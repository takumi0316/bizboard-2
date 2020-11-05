##
# payments Controller
#
#
class PaymentsController < ApplicationController

  #----------------------------------------
  #  ** Includes **
  #----------------------------------------

  #----------------------------------------
  #  ** Instance variables **
  #----------------------------------------

  expose_with_pagination(:payments) { Subcontractor.eager_load(:payments).where.not(payments: { price: 0 }) }

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

    @start_date = params[:begginning].present? ? arrange_formatting_date(params[:begginning]).beginning_of_month : Time.zone.now.beginning_of_month
    @end_date = params[:begginning].present? ? arrange_formatting_date(params[:end]).end_of_month : Time.zone.now.end_of_month

    add_breadcrumb '支払い管理'
  end

  #----------------------------------------
  #  ** Methods **
  #----------------------------------------

  private

    ##
    # 日付を整形
    # @version 2020/07/14
    #
    def arrange_formatting_date date

      Time.zone.strptime(date, '%Y-%m-%d')
    end

end
