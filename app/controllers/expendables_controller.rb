##
# Errors Controller
#
class ExpendablesController < ApplicationController

  #----------------------------------------
  #  ** Includes **
  #----------------------------------------

  #----------------------------------------
  #  ** Instance variables **
  #----------------------------------------

  expose_with_pagination(:expendables) {
    Expendable.search(status: params[:status], subcontractor: params[:subcontractor], division: params[:division], date1: params[:date1], date2: params[:date2]).where(accouting_status: :active).all.order(date: :desc)
  }

  expose(:expendable) { Expendable.find_or_initialize_by id: params[:id] || params[:expendable_id]}

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

    add_breadcrumb '製造経費入力'
    respond_to do |format|
      format.html do end
      format.csv do

        current_time = Time.now
        start_time = params[:date1] || current_time.beginning_of_month.months_ago(1)
        end_time =  params[:date2] || current_time.beginning_of_month.months_since(2)
        @csv_data = Expendable.where(date: start_time..end_time).order(:subcontractor_id).order(:division_id)

        start_year = params[:date1].nil? ? current_time.year : params[:date1].to_time.year
        start_month = params[:date1].nil? ? current_time.month - 1 : params[:date1].to_time.month
        end_month = params[:date2].nil? ? current_time.month + 2 : params[:date2].to_time.month
        end_year = params[:date2].nil? ? current_time.year : params[:date2].to_time.year
        send_data render_to_string, filename: "製造経費データ#{start_year}年#{start_month}月〜#{end_year}年#{end_month}月分.csv", type: :csv
      end
    end
  end

  ##
  # 新規作成
  # @version 2018/06/10
  #
  def new

    add_breadcrumb '製造経費入力', path: expendables_path
    add_breadcrumb '新規作成'
  end

  ##
  # 新規作成
  # @version 2018/06/10
  #
  def create

    expendable.update! expendable_params

    payment = expendable.build_payment
    payment.update! subcontractor_id: expendable.subcontractor_id, price: expendable.price, date: expendable.date

    redirect_to expendables_path, flash: { show: true, icon: 'success', message: '製造経費を登録しました' }
  rescue => e

    redirect_back fallback_location: url_for({ action: :index }), flash: { show: true, icon: 'info', message: e.message }
  end

  ##
  # 編集
  # @version 2018/06/10
  #
  def edit

    add_breadcrumb '製造経費入力', path: expendables_path
    add_breadcrumb '編集'
  rescue => e

    redirect_back fallback_location: url_for({ action: :index }), flash: { show: true, icon: 'info', message: e.message }
  end

  ##
  # 更新処理
  # @version 2018/06/10
  #
  def update

    expendable.update! expendable_params

    expendable.payment.update! subcontractor_id: expendable.subcontractor_id, price: expendable.price, date: expendable.date

    redirect_to expendables_path, flash: { show: true, icon: 'success', message: '製造経費を更新しました' }
  rescue => e

    redirect_back fallback_location: url_for({ action: :index }), flash: { show: true, icon: 'info', message: e.message }
  end

  ##
  # 削除
  # @version 2018/06/10
  #
  def destroy

    expendable.destroy!

    redirect_to expendables_path, flash: { show: true, icon: 'success', message: '製造経費を削除しました' }
  rescue => e

    redirect_back fallback_location: url_for({ action: :index }), flash: { show: true, icon: 'success', message: e.message }
  end


  #----------------------------------------
  #  ** Methods **
  #----------------------------------------

  private

  def expendable_params

    params.require(:expendable).permit :name, :date, :status, :memo, :price, :subcontractor_id, :division_id, :user_id
  end

end
