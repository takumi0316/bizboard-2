##
# Profits Controller
#
class ProfitsController < ApplicationController
  #----------------------------------------
  #  ** Includes **
  #----------------------------------------

  # 支払い情報
  expose_with_pagination(:profit) { Profit.all }

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

    @date1 = Time.zone.strptime(params[:date1] || Time.zone.now.strftime('%Y-%m-%d'), '%Y-%m-%d').beginning_of_month.strftime('%Y-%m-%d')
    @date2 = Time.zone.strptime(params[:date2] || Time.zone.now.strftime('%Y-%m-%d'), '%Y-%m-%d').end_of_month.strftime('%Y-%m-%d')

    @company = Quote.where(status: :invoicing).joins({ client: { company_division: :company } }).joins(:invoice).merge(Invoice.date_in(@date1, @date2)).merge(Quote.order(price: :desc)).group_by{ |u| u.client.company_division.company.name }

    respond_to do |format|

      format.html do
      end
      format.csv do

        @csv_data = Quote.invoicing.joins(:invoice).merge(Invoice.date_in(@date1, @date2))
        send_data render_to_string, filename: "MF会計取り込み用データ#{@date1.to_datetime.month}月分.csv", type: :csv
      rescue => e

        redirect_to error_message_profits_path(date1: @date1, date2: @date2)
      end
    end

    add_breadcrumb '請求情報'
  end

  def error_message

    csv_data = Quote.invoicing.joins(:invoice).merge(Invoice.date_in(params[:date1], params[:date2]))
    @nil_client = csv_data.where(company_division_client_id: nil)
    @nil_division = csv_data.where(division_id: nil)
    add_breadcrumb '請求情報', path: profits_path(date1: params[:date1], date2: params[:date2])
    add_breadcrumb '請求情報エラーメッセージ'
  end

  #----------------------------------------
  #  ** Methods **
  #----------------------------------------

  private

    def payment_params

      params.require(:profits).permit :id, :company_id, :quote_id, :price, :date
    end

end
