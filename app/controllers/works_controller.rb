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
  # 詳細
  # @version 2018/06/10
  #
  def show

  end

  ##
  # 更新
  #
  #
  def update

    # 作業進捗更新
    work.update! status: params[:work][:status].to_i

    if request.xhr?
      puts 'nannyanenomae'
      render json: { status: :success, work: work.status }
    else
      puts 'ussaihaboke'
    end

  rescue => e

    puts 'rescueeeeeeeee'
    render json: { status: :error, work: work.status }
  end

  #----------------------------------------
  #  ** Methods **
  #----------------------------------------

  private
    
  ##
  # パラメータの取得
  #
  #

end
