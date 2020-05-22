##
# WorkDetails Controller
#
class WorkDetailsController < ApplicationController

  #------------------------------------------
  #  ** Includes **
  #------------------------------------------

  #------------------------------------------
  #  ** Instance variables **
  #------------------------------------------

  # 案件
  expose(:work_detail) { WorkDetail.find_or_initialize_by id: params[:id] }

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
  # @version 2020/03/13
  #
  def create

    work_detail.update! work_detail_params
    render json: { status: :success, work_detail: work_detail }
  rescue => e

    render json: { status: :error, message: e.message }
  end


  ##
  # 削除
  #
  #
  def destroy

    work_detail.destroy!

    render json: { status: :success }
  rescue => e

    render json: { status: :error, message: e.message }
  end

  #------------------------------------------
  #  ** Methods **
  #------------------------------------------

  private

  def work_detail_params

    params.require(:work_detail).permit :work_id, :count, :deliver_at, :estimated_cost, :number_of_copies, :actual_cost, :client_name
  end
end
