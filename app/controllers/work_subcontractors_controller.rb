class WorkSubcontractorsController < ApplicationController

  #------------------------------------------
  #  ** Includes **
  #------------------------------------------

  #------------------------------------------
  #  ** Instance variables **
  #------------------------------------------

  # 作業外注
  expose(:work_subcontractor) { WorkSubcontractor.find_or_initialize_by id: params[:id] }

  # 外注先
  expose(:client) { SubcontractorDivisionClient.find_or_initialize_by id: params[:work_subcontractor][:subcontractor_division_client_id] }

  # 製造経費
  expose(:expendable) { Expendable.find_or_initialize_by work_subcontractor_id: params[:id] }

  # 支払い管理
  expose(:payment) { Payment.find_or_initialize_by work_subcontractor_id: params[:id] }

  #------------------------------------------
  #  ** Layouts **
  #------------------------------------------

  #------------------------------------------
  #  ** Request cycles **
  #------------------------------------------

  #------------------------------------------
  #  ** Request cycles **
  #------------------------------------------

  #------------------------------------------
  #  ** Actions **
  #------------------------------------------

  ##
  # 新規作成
  # @version 2020/03/11
  #
  def create

    work_subcontractor.update! work_subcontractor_params

    render json: { status: :success, subcontractor: work_subcontractor }
  rescue => e

    render json: { status: :error, message: e.message }
  end

  ##
  # 更新
  # @version 2020/03/11
  #
  def update

    work_subcontractor.update! work_subcontractor_params

    actual_cost = work_subcontractor.details.sum(:actual_cost).to_i
    division      = SubcontractorDivision.find(client.subcontractor_division_id)
    subcontractor = Subcontractor.find(division.subcontractor_id)
    quote_type = work_subcontractor.work.quote.quote_type == :contract || :salse ? 100 : 10

    expendable.update! division_id: work_subcontractor.work.quote&.division&.id, subcontractor_id: work_subcontractor.client.subcontractor_division.subcontractor.id, price: actual_cost, date: work_subcontractor.delivery_date, status: quote_type
    payment.update! subcontractor_id: work_subcontractor.client.subcontractor_division.subcontractor.id, work_subcontractor_id: work_subcontractor.id, expendable_id: expendable.id, price: actual_cost, date: work_subcontractor.delivery_date

    render json: { status: :success, client: client, division: division, subcontractor: subcontractor }

  rescue => e

    render json: { stattus: :error, message: e.message }
  end

  ##
  # 詳細
  # @version 2020/03/11
  #
  def show

    @directions = Date.today.to_s + work_subcontractor.work.quote.subject
  end

  ##
  # 削除
  # @version 2020/03/11
  #
  def destroy

    work_subcontractor.destroy!

    render json: { status: :success }
  rescue => e

    render json: { status: :error, message: e.message }
  end

  #----------------------------------------
  #  ** Methods **
  #----------------------------------------

  private

    def work_subcontractor_params

    params.require(:work_subcontractor).permit :work_id, :notices, :order_date, :delivery_date, :delivery_destination, :subcontractor_division_client_id, :order_date, :delivery_date,
    details_attributes: [:id, :work_subcontractor_id, :order_contents, :deliver_method, :specification, :count, :number_of_copies, :actual_cost]
  end
end
