class WorkSubcontractorDetailsController < ApplicationController

  #------------------------------------------
  #  ** Includes **
  #------------------------------------------

  #------------------------------------------
  #  ** Instance variables **
  #------------------------------------------

  expose(:work_subcontractor_detail) { WorkSubcontractorDetail.find_or_initialize_by id: params[:id] }

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
  #
  #
  def create

    work_subcontractor_detail.update! work_subcontractor_detail_params

    render json: { status: :success, work_subcontractor_detail: work_subcontractor_detail }
  rescue => e

    render json: { status: :error, message: e.message }
  end

  ##
  # 削除
  #
  #
  def destroy

    work_subcontractor_detail.destroy!

    render json: { status: :success }
  rescue => e

    render json: { status: :error, message: e.message }
  end

  #------------------------------------------
  #  ** Methods **
  #------------------------------------------

  def work_subcontractor_detail_params

    params.require(:work_subcontractor_detail).permit :work_id, :work_subcontractor_id, :deliver_at, :count, :number_of_copies, :actual_cost
  end

end
