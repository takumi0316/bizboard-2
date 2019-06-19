##
# activities Controller
#
class ActivitiesController < ApplicationController
  #----------------------------------------
  #  ** Includes **
  #----------------------------------------

  #----------------------------------------
  #  ** Instance variables **
  #----------------------------------------

  # 活動履歴
  expose(:activities) {
    Activity
    .search(params[:name])
    .all
    .order(date: 'DESC')
  }

  # 活動履歴
  expose(:activity) { Activity.find_or_initialize_by id: params[:id] || params[:activity_id] }


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
  # @version 2019/03/12
  #
  def index

    add_breadcrumb '活動履歴'
    @id = params[:name]
  end

  ##
  # 新規作成
  # @version 2018/06/10
  #
  def new

    add_breadcrumb '活動履歴', path: activities_path
    add_breadcrumb '新規作成'
    @id = params[:quote_id]
    @activity = Activity.new(:quote_id => @id)
    @quote = Quote.find(@id) rescue @quote = Quote.find_by(@id)
  end

  ##
  # 編集
  # @version 2018/06/10
  #
  def edit
    add_breadcrumb '活動履歴', path: activities_path
    add_breadcrumb '編集'
    @id = activity.quote_id
    @quote = Quote.find(@id)
  rescue => e
    redirect_back fallback_location: url_for({action: :index}), flash: {notice: {message: e.message}}
  end

  ##
  # 更新処理
  # @version 2018/06/10
  #
  def update

    # 取引先情報更新
    activity.update! activity_params

    if activity.status == "lost"
      quote = Quote.find_or_initialize_by(id: activity.quote.id)
      quote.update(status: "lost")
    end

    @sort = activity.quote_id
    redirect_to activities_path+"?name=#{@sort}", flash: {notice: {message: '活動履歴を更新しました'}}
  rescue => e

    redirect_back fallback_location: url_for({action: :index}), flash: {notice: {message: e.message}}
  end

  ##
  # 新規作成
  # @version 2018/06/10
  #
  def create

    # 取引先情報更新
    activity.update! activity_params

    if activity.status == "lost"
      quote = Quote.find_or_initialize_by(id: activity.quote.id)
      quote.update(status: "lost")
    end

    @sort = activity.quote_id
    redirect_to activities_path+"?name=#{@sort}", flash: {notice: {message: '活動履歴を作成しました'}}
  rescue => e

    redirect_back fallback_location: url_for({action: :index}), flash: {notice: {message: e.message}}
  end

  ##
  # 削除
  # @version 2018/06/10
  #
  def destroy

    activity.destroy
  rescue => e

    flash[:warning] = { message: e.message }
  ensure
    redirect_to action: :index
  end

  #----------------------------------------
  #  ** Methods **
  #----------------------------------------

  private

  def activity_params

    params.require(:activity).permit :name, :date, :status, :memo, :attachment, :quote_id
  end

end
