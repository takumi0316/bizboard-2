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

      work.update! status: params[:work][:status]

      work.project.end_work! if work.delivered? || work.completed?

      render json: { status: :success, work: work.status }
    elsif params[:status] === 'price'

      work.update! price: params[:price]
      render json: { status: :success, price: work.price }

    elsif params[:status] === 'notices'

      work.update! notices: params[:work_notices]
      render json: { status: :success, notices: work.notices }
    end

    rescue => e

      if params[:status] === 'status'

        render json: { status: :error, work: work.status }
      elsif params[:status] === 'price'

        render json: { status: :error, price: work.price }
      elsif params[:status] === 'notices'

        work.update! notices: params[:work_notices]
        render json: { status: :success, notices: work.notices }
      end
  end

  def directions

    work_detail_clients = Work.find(params[:id]).work_details.pluck(:client_name).uniq
    @client = String.new
    @clients = String.new
    if work_detail_clients.present?

     if work_detail_clients.length == 1

       @client = @client_name[0]
       return @client
     else

       work_detail_clients.each_with_index do |client, index|

         if client.present?

           if work_detail_clients.length - 1 == index

             puts client_if: "#{client}"
             @clients << "#{client}"
           else

             puts client_index: "#{index}"
             puts client_length: "#{work_detail_clients.length}"
             @clients << "#{client}, "
           end
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

end
