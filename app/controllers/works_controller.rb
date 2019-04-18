##
# Works Controller
#
class WorksController < ApplicationController

  #----------------------------------------
  #  ** Includes **
  #----------------------------------------

  #----------------------------------------
  #  ** Instance variables **
  #----------------------------------------

  # 作業進捗一覧
  expose_with_pagination(:works) {
    Work
      .by_params(status: params[:status], date1: params[:date1], date2: params[:date2])
      .search(params[:name])
      .all
      .reverse_order
  }

  # 案件
  expose(:work) { Work.find_or_initialize_by id: params[:id] }

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
  # @version 2018/06/10
  #
  def index

    add_breadcrumb '作業進捗一覧'

  end

  ##
  # 更新
  #
  #
  def update

    if params[:status] === 'status'

      work.update! status: params[:work][:status].to_i
      render json: { status: :success, work: work.status }
    elsif params[:status] === 'price'

      work.project.update! price: params[:price]
      render json: { status: :success, price: work.project.price }
    end

  rescue => e

    if params[:status] === 'status'

      render json: { status: :error, work: work.status }
    elsif params[:status] === 'price'

      render json: { status: :error, price: work.project.price }
    end
  end

  #----------------------------------------
  #  ** Methods **
  #----------------------------------------

end
