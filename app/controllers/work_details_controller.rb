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

  # 作業
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

    # create処理
    if params[:work_detail][:work_id].present?

      Work.find(params[:work_detail][:work_id]).work_details.create!(count: 1, deliver_at: DateTime.now, estimated_man_hours: 1, estimated_cost: 0, number_of_copies: 1, actual_cost: 0, client_name: current_user.name)
      render json: { status: :success, detail: Work.find(params[:work_detail][:work_id]).work_details.last }

    # update処理
    else

      if params[:token] === 'value'

        params.require(:work_detail_update).each do |detail|

          parse_json = JSON.parse(detail)
          work_detail = WorkDetail.find(parse_json['id'])
          work_detail.update!(
            work_id: parse_json['work_id'],
            order_contents: parse_json['order_contents'],
            deliver_method: parse_json['deliver_method'],
            specification: parse_json['specification'],
            number_of_copies: parse_json['number_of_copies'],
            count: parse_json['count'],
            deliver_at: parse_json['deliver_at'],
            client_name: parse_json['client_name'],
            estimated_cost: parse_json['estimated_cost'],
            actual_cost: parse_json['actual_cost']
          )
        end
        render json: { status: :success, detail: Work.find(params[:work_id]).work_details }
      elsif params[:token] === 'cost'

        WorkDetail.find(params[:id]).update!(estimated_cost: params[:estimated_cost])
        render json: { status: :success, detail: Work.find(params[:work_id]).work_details }
      elsif params[:token] === 'count'

        WorkDetail.find(params[:id]).update!(count: params[:count])
        render json: { status: :success, detail: Work.find(params[:work_id]).work_details }
      elsif params[:token] === 'empty'

        render json: { status: :nothing }
      end
    end

  rescue => e

    flash[:warning] = { message: e.message }
    if params[:work_detail][:work_id].present?
      render json: { detail: Work.find(params[:work_detail][:work_id]).work_details }
    else
      render json: { detail: Work.find(params[:work_id]).work_details }
    end
  end


  ##
  # 削除
  #
  #
  def destroy

    WorkDetail.find(params[:id]).destroy!

    if request.xhr?
      render json: { status: :success }
    else
      redirect_to works_path(params[:work_detail][:work_id])
    end

  rescue => e

    flash[:warning] = { message: e.message }
    render json: { detail: Work.find(params[:work_detail][:work_id]).work_details }
  end

  #------------------------------------------
  #  ** Methods **
  #------------------------------------------

end
