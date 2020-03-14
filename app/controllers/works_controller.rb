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

  # 作業進捗一覧
  expose_with_pagination(:work_manager) {
    Work
    .search(name: params[:name], status: params[:status], date1: params[:date1], date2: params[:date2])
    .where(division_id: current_user.division.id)
    .where.not(status: :delivered)
    .where.not(status: :completed)
    .asc_deliverd_at
  }

  # 作業進捗一覧
  expose_with_pagination(:work_general) {
    Work
    .search(name: params[:name], status: params[:status], date1: params[:date1], date2: params[:date2])
    .where(division_id: current_user.division.id)
    .where.not(status: :delivered)
    .where.not(status: :completed)
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

    @draft = works.draft.where(division_id: current_user.division.id)
    @working = works.working.where(division_id: current_user.division.id)
    @count_draft = @draft.size
    @count_working = @working.size

    add_breadcrumb '作業進捗一覧'
  end

  ##
  # 詳細
  # @version 2018/06/10
  #
  def show

    add_breadcrumb '作業進捗一覧', path: works_path
    add_breadcrumb '編集'
  end

  ##
  # 更新
  #
  #
  def update

    work.update! work_params

    work.quote.working! if work.working?
    work.quote.end_work! if work.completed? && !work.quote.invoicing?

    render json: { status: :success, work: work }
  rescue => e

    render json: { status: :error, message: e.message }
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

  def work_params

    params.require(:work).permit :price, :status, :notices, :division_id,
    work_details_attributes: [:id, :work_id, :order_contents, :deliver_method, :specification, :number_of_copies, :count, :deliver_at, :client_name, :estimated_cost, :actual_cost]
  end
end
