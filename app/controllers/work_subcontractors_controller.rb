class WorkSubcontractorsController < ApplicationController

  ##
  # 新規作成
  #
  #
  def create

    if params[:contents] === 'create'

      Work.find(params[:work_subcontractors][:work_id]).subcontractor.create!
      render json: { status: :success, subcontractors: Work.find(params[:work_subcontractors][:work_id]).subcontractor }
    elsif params[:contents] === 'notices'

      params.require(:work_subcontractor_notices_update).each do |subcontractors|

        parse_json = JSON.parse(subcontractors)
        WorkSubcontractor.find(parse_json['id']).update!(notices: parse_json['notices'])
      end
      render json: { status: :success, work_subcontractors: Work.find(params[:work_id]).subcontractor }
    end

    rescue => e

      flash[:warning] = { message: e.message }
      if params[:contents] === 'create'

        render json: { subcontractors: Work.find(params[:work_subcontractors][:work_id]).subcontractor }
      elsif params[:contents] === 'notices'

        render json: { status: :error, work_subcontractor: Work.find(params[:work_id]).subcontractor }
      end
  end

  ##
  # 更新
  #
  #

  def update

    # 作業外注進捗
    if params[:contents] === 'status'

      WorkSubcontractor.find(params[:id]).update! status: params[:subcontractor][:status].to_i

      render json: { status: :success, subcontractor_status: WorkSubcontractor.find(params[:id]).status, work_subcontractors: Work.find(params[:work_id]).subcontractor }
    elsif params[:contents] === 'subcontractor_division_client_id'

      WorkSubcontractor.find(params[:id]).update! subcontractor_division_client_id: params[:subcontractor_division_client_id].to_i

      render json: { status: :success, work_subcontractors: Work.find(params[:work_id]).subcontractor, clients: SubcontractorDivisionClient.all, divisions: SubcontractorDivision.all, subcontractors: Subcontractor.all }
    end

    rescue => e

      if params[:contents] === 'status'

        render json: { status: :error, subcontractor_status: WorkSubcontractor.find(params[:id]).status }
      elsif params[:contents] === 'subcontractor_division_client_id'

        render json: { status: :error, work_subcontractors: Work.find(params[:work_id]).subcontractor, clients: SubcontractorDivisionClient.all, divisions: SubcontractorDivsion.all }
      end
  end

  def destroy

    WorkSubcontractor.find(params[:id]).destroy!

    render json: { status: :success, work_subcontractors: Work.find(params[:work_id]).subcontractor, actual_costs: WorkSubcontractor.find(params[:id]).detail.pluck(:actual_cost) }

  rescue => e

    render json: { work_subcontractors: Work.find(params[:work_id]).subcontractor }
  end

  def show

    @directions = (Date.today).to_s + WorkSubcontractor.find(params[:id]).work.quote.subject
  end

end
