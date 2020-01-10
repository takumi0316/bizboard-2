class WorkSubcontractorsController < ApplicationController

  ##
  # 新規作成
  #
  #
  def create
    if params[:contents] == 'create'

      Work.find(params[:work_subcontractors][:work_id]).subcontractor.create!(order_date: DateTime.now, delivery_date: DateTime.now)
      render json: { status: :success, subcontractor: Work.find(params[:work_subcontractors][:work_id]).subcontractor.last }
    elsif params[:contents] == 'notices'

      params.require(:work_subcontractor_notices_update).each do |subcontractors|

        parse_json = JSON.parse(subcontractors)
        WorkSubcontractor.find(parse_json['id']).update!(notices: parse_json['notices'], order_date: parse_json['order_date'], delivery_date: parse_json['delivery_date'], delivery_destination: parse_json['delivery_destination'])
        detail_ids = WorkSubcontractorDetail.where(work_subcontractor_id: parse_json['id']).ids
        Payment.where(work_subcontractor_detail_id: detail_ids).update_all(date: parse_json['delivery_date'])
        Expendable.where(work_subcontractor_detail_id: detail_ids).update_all(date: parse_json['delivery_date'])
      end
      render json: { status: :success, work_subcontractors: Work.find(params[:work_id]).subcontractor }
    end

  rescue => e

    flash[:warning] = { message: e.message }
    if params[:contents] == 'create'

      render json: { subcontractors: Work.find(params[:work_subcontractors][:work_id]).subcontractor }
    elsif params[:contents] == 'notices'

      render json: { status: :error, work_subcontractor: Work.find(params[:work_id]).subcontractor }
    end
  end

  ##
  # 更新
  #
  #

  def update

    # 作業外注進捗
    if params[:contents] == 'status'

      WorkSubcontractor.find(params[:id]).update! status: params[:subcontractor][:status].to_i

      render json: { status: :success, subcontractor_status: WorkSubcontractor.find(params[:id]).status, work_subcontractors: Work.find(params[:work_id]).subcontractor }
    elsif params[:contents] == 'client'

			WorkSubcontractor.find(params[:id]).update! subcontractor_division_client_id: params[:client]
			work_subcontractor = WorkSubcontractor.find(params[:id])
			client = SubcontractorDivisionClient.find(work_subcontractor.subcontractor_division_client_id)
			division      = SubcontractorDivision.find(client.subcontractor_division_id)
			subcontractor = Subcontractor.find(division.subcontractor_id)

      render json: { status: :success, client: client, division: division, subcontractor: subcontractor }
    end

  rescue => e

		flash[:warning] = { message: e.message }
    if params[:contents] == 'status'

      render json: { status: :error, subcontractor_status: WorkSubcontractor.find(params[:id]).status }
    elsif params[:contents] == 'client'

      render json: { status: :error }
    end
  end

  def destroy

    WorkSubcontractor.find(params[:id]).destroy!

		render json: { status: :success }
  rescue => e

		flash[:warning] = { message: e.message }
    render json: { status: :error }
  end

  def show

    @directions = (Date.today).to_s + WorkSubcontractor.find(params[:id]).work.quote.subject
  end

end
