class WorkSubcontractorDetailsController < ApplicationController

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
    if params[:subcontractor_detail][:subcontractor_id].present?

      detail = WorkSubcontractor.find(params[:subcontractor_detail][:subcontractor_id]).detail.create!(count: 1, number_of_copies: 1, deliver_at: DateTime.now, cost_unit_price: 0, estimated_cost: 0, actual_count: 1, actual_cost: 0, work_id: params[:work_id])
      render json: { status: :success, detail: detail }

    # update処理
    else

      if params[:token] === 'value'

        params.require(:subcontractor_detail_update).each do |detail|

          parse_json = JSON.parse(detail)
          subcontractor_detail = WorkSubcontractorDetail.find(parse_json['id'])
          subcontractor_detail.update!(
            order_contents: parse_json['order_contents'],
            deliver_method: parse_json['deliver_method'],
            specification: parse_json['specification'],
            count: parse_json['count'],
            number_of_copies: parse_json['number_of_copies'],
            cost_unit_price: parse_json['cost_unit_price'],
            estimated_cost: parse_json['estimated_cost'],
            actual_count: parse_json['actual_count'],
            actual_cost: parse_json['actual_cost'],
          )
          binding.pry

          #外注金額保存
          payment = Payment.find_or_initialize_by(work_subcontractor_detail_id: parse_json['id'])
          payment.update(subcontractor_id: subcontractor_detail.work_subcontractor.client&.subcontractor_division&.subcontractor&.id,price: parse_json['actual_cost'], date: subcontractor_detail.work_subcontractor&.delivery_date) if payment.present?
          payment.save!(subcontractor_id: subcontractor_detail.work_subcontractor.client&.subcontractor_division&.subcontractor&.id, work_subcontractor_detail_id: parse_json['id'], price: parse_json['actual_cost'], date: subcontractor_detail.work_subcontractor.delivery_date) if payment.nil?
          #製造経費保存
          expendable = Expendable.find_or_initialize_by(work_subcontractor_detail_id: parse_json['id'])
          if expendable.present?
            expendable.update(division_id: subcontractor_detail.work_subcontractor.work.quote.division.id, subcontractor_id: subcontractor_detail.work_subcontractor.client&.subcontractor_division&.subcontractor&.id,price: parse_json['actual_cost'], date: subcontractor_detail.work_subcontractor&.delivery_date)
            if  subcontractor_detail.work_subcontractor.work.quote.subcontractor_detail.work_subcontractor.work.quote.quote_type
          elsif expendable.nil?
            expendable.save!(division_id: subcontractor_detail.work_subcontractor.work.quote.division.id, subcontractor_id: subcontractor_detail.work_subcontractor.client&.subcontractor_division&.subcontractor&.id, work_subcontractor_detail_id: parse_json['id'], price: parse_json['actual_cost'], date: subcontractor_detail.work_subcontractor.delivery_date)
        end

        render json: { status: :success, detail: Work.find(params[:work_id]).subcontractor_detail }
      elsif params[:token] === 'empty'

        render json: { status: :nothing, work_subcontractor: Work.find(params[:work_id]).subcontractor }
      end
    end

  rescue => e

    flash[:warning] = { message: e.message }
    render json: { detail: Work.find(params[:work_id]).subcontractor_detail }
  end


  ##
  # 削除
  #
  #
  def destroy

    #外注金額の削除
    Payment.find_by(work_subcontractor_detail_id: params[:id]).destroy! if Payment.find_by(work_subcontractor_detail_id: params[:id]).present? && Expendable.find_or_initialize_by(work_subcontractor_detail_id: parse_json['id'])
    WorkSubcontractorDetail.find(params[:id]).destroy!

    render json: { status: :success }

  rescue => e

    flash[:warning] = { message: e.message }
    render json: { status: :error, details: Work.find(params[:work_id]).subcontractor_detail }
  end

  #------------------------------------------
  #  ** Methods **
  #------------------------------------------

end
