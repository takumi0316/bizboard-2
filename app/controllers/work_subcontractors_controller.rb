class WorkSubcontractorsController < ApplicationController

  ##
  # 新規作成
  #
  #
  def create
    
    Work.find(params[:work_subcontractors][:work_id]).subcontractor.create!
    render json: { status: :success, subcontractors: Work.find(params[:work_subcontractors][:work_id]).subcontractor }

  rescue => e
    flash[:warning] = { message: e.message }
    render json: { subcontractors: Work.find(params[:work_subcontractors][:work_id]).subcontractor }
  end

  ##
  # 更新　
  #
  #

  def update
    
    # 作業外注進捗
    if params[:contents] === 'status'

      WorkSubcontractor.find(params[:id]).update! status: params[:subcontractor][:status].to_i
      render json: { status: :success, subcontractor_status: WorkSubcontractor.find(params[:id]).status  }
    elsif params[:contents] === 'subcontractor_division_client_id'

      WorkSubcontractor.find(params[:id]).update! subcontractor_division_client_id: params[:subcontractor_division_client_id].to_i
      render json: { status: :success, work_subcontractors: Work.find(params[:work_id]).subcontractor, clients: SubcontractorDivisionClient.find(params[:subcontractor_division_client_id]), divisions: SubcontractorDivision.all, subcontractors: Subcontractor.all }
    end
    
    rescue => e
     
      if params[:contents] === 'status'

        render json: { status: :error, subcontractor_status: WorkSubcontractor.find(params[:id]).status }
      elsif params[:contents] === 'subcontractor_division_client_id'

        render json: { status: :success, clients: SubcontractorDivisionClient.all, divisions: SubcontractorDivsion.all }
      end
  end

end
