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
    .search(name: params[:name], status: params[:status], date1: params[:date1], date2: params[:date2])
    .all
    .asc_deliverd_at
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

    @division = current_user.division&.id
    @user_type = current_user.user_type
    @count = params[:count]
  end

  ##
  # 更新
  #
  #
  def update

    if params[:status] === 'status'

      work.update! status: params[:work][:status]

      work.quote.end_work! if work.delivered? || work.completed?

      render json: { status: :success, work: work.status }
    elsif params[:status] === 'price'

      work.update! price: params[:price]
      render json: { status: :success, price: work.price }

    elsif params[:status] === 'notices'

      work.update! notices: params[:work_notices]
      render json: { status: :success, notices: work.notices }

    elsif params[:status] === 'division'

      work.update! division_id: params[:division_id]
      render json: { status: :success, division: work.division }
    end

    rescue => e

      if params[:status] === 'status'

        render json: { status: :error, work: work.status }
      elsif params[:status] === 'price'

        render json: { status: :error, price: work.price }
      elsif params[:status] === 'notices'

        work.update! notices: params[:work_notices]
        render json: { status: :success, notices: work.notices }
      elsif params[:division]

        render json: { status: :error, division: work.division }
      end
  end

  def directions

    work_detail_clients = Work.find(params[:id]).work_details.pluck(:client_name).uniq
    work_detail_clients = work_detail_clients.reject{ |client| client == '' }
    @client = String.new
    @clients = String.new
    @directions = (Date.today).to_s + works.find(params[:id]).quote.subject
    if work_detail_clients.present?

     if work_detail_clients.length == 1

       @client = work_detail_clients[0]
       return @client
     else

       work_detail_clients.each_with_index do |client, index|

        if work_detail_clients.length - 1 == index

           @clients << "#{client}"
        else

           @clients << "#{client}, "
        end
      end

       return @clients
     end
    else
      
      return @client
    end
  end

  #----------------------------------------
  #  ** Methods **
  #----------------------------------------

  def count_params
    params :count
  end

end
