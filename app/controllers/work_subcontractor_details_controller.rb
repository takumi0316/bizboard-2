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

    work_subcontractor_detail.update! work_id: params[:work_id], work_subcontractor_id: params[:work_subcontractor_id], deliver_at: DateTime.now, count: 1, number_of_copies: 1, actual_cost: 0

      render json: { status: :success, work_subcontractor_detail: work_subcontractor_detail }
  rescue => e

    flash[:warning] = { message: e.message }
    render json: { work_subcontractors_iterate: Work.find(params[:work_id]).iterate }
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

end
