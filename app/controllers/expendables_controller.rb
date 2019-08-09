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

  # 見積もり
  expose_with_pagination(:expendables) {
    Expendable
    .search(status: params[:status], subcontractor: params[:subcontractor], division: params[:division], date1: params[:date1], date2: params[:date2])
    .all
    .order(date: 'DESC')
  }


  # 見積もり
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
      format.html do
        #置いておかないとエラーになる
      end
      format.csv do
        @csv_data = Expendable.where(date: params[:date1]..params[:date2]).order(:subcontractor_id).order(:division_id)
        send_data render_to_string, filename: "製造経費データ#{params[:date1].to_datetime.month}月分.csv", type: :csv
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
    @user = current_user

  end

  ##
  # 編集
  # @version 2018/06/10
  #
  def edit
    add_breadcrumb '製造経費入力', path: expendables_path
    add_breadcrumb '編集'
    @user = current_user
  rescue => e
    redirect_back fallback_location: url_for({action: :index}), flash: {notice: {message: e.message}}
  end

  ##
  # 更新処理
  # @version 2018/06/10
  #
  def update

    # 取引先情報更新
    expendable.update! expendable_params

    expendable.update_columns(division_id: current_user.division_id)

    payment = Payment.find_or_initialize_by(expendable_id: expendable.id)
    payment.update(expendable_id: expendable.id,subcontractor_id: expendable.subcontractor_id,price: expendable.price, date: expendable.date) if payment.present?
    payment.save!(expendable_id: expendable.id,subcontractor_id: expendable.subcontractor_id,price: expendable.price, date: expendable.date) if payment.nil?

    redirect_to expendables_path, flash: {notice: {message: '製造経費を更新しました'}}
  rescue => e

    redirect_back fallback_location: url_for({action: :index}), flash: {notice: {message: e.message}}
  end

  ##
  # 新規作成
  # @version 2018/06/10
  #
  def create

    # 取引先情報更新
    expendable.update! expendable_params

    expendable.update_columns(division_id: current_user.division_id)

    payment = Payment.find_or_initialize_by(expendable_id: expendable.id)
    payment.update(expendable_id: expendable.id,subcontractor_id: expendable.subcontractor_id,price: expendable.price, date: expendable.date) if payment.present?
    payment.save!(expendable_id: expendable.id,subcontractor_id: expendable.subcontractor_id,price: expendable.price, date: expendable.date) if payment.nil?

    redirect_to expendables_path, flash: {notice: {message: '製造経費を登録しました'}}
  rescue => e

    redirect_back fallback_location: url_for({action: :index}), flash: {notice: {message: e.message}}
  end

  ##
  # 削除
  # @version 2018/06/10
  #
  def destroy

    expendable.destroy
  rescue => e

    flash[:warning] = { message: e.message }
  ensure
    redirect_to action: :index
  end


  #----------------------------------------
  #  ** Methods **
  #----------------------------------------

  private

  def expendable_params

    params.require(:expendable).permit :name, :date, :status, :memo, :price,
    :subcontractor_id, :division_id
  end

end
