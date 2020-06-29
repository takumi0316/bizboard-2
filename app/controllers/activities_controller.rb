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
  expose_with_pagination(:activities) { Activity.search(params[:name]).all.order(date: :desc) }

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

    @id = params[:name]

    add_breadcrumb '活動履歴'
  end

  ##
  # 新規作成
  # @version 2018/06/10
  #
  def new

    @id = params[:quote_id]
    @activity = Activity.new(quote_id: @id)
    @quote = Quote.find(@id) rescue @quote = Quote.find_by(@id)

    add_breadcrumb '活動履歴', path: activities_path
    add_breadcrumb '新規作成'
  end

  ##
  # 新規作成
  # @version 2018/06/10
  #
  def create

    # 取引先情報更新
    activity.update! activity_params

    change_inactive?

    @sort = activity.quote_id

    redirect_to activities_path(name: @sort), flash: { notice: { message: '活動履歴を作成しました' } }
  rescue => e

    redirect_back fallback_location: url_for({ action: :index }), flash: { notice: { message: e.message } }
  end

  ##
  # 編集
  # @version 2018/06/10
  #
  def edit

    @id = activity.quote_id
    @quote = Quote.find(@id)

    add_breadcrumb '活動履歴', path: activities_path
    add_breadcrumb '編集'
  rescue => e

    redirect_back fallback_location: url_for({ action: :index }), flash: { notice: { message: e.message } }
  end

  ##
  # 更新処理
  # @version 2018/06/10
  #
  def update

    # 取引先情報更新
    activity.update! activity_params

    change_inactive?

    change_active?

    @sort = activity.quote_id

    redirect_to activities_path(name: @sort), flash: { notice: { message: '活動履歴を更新しました' } }
  rescue => e

    redirect_back fallback_location: url_for({ action: :index }), flash: { notice: { message: e.message } }
  end

  ##
  # 削除
  # @version 2018/06/10
  #
  def destroy

    activity.destroy!
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

    params.require(:activity).permit :name, :date, :status, :memo, :attachment, :quote_id, :accurary, :next_action, :next_action_date, :scheduled_date
  end

  ##
  # 経費計上しない
  # @version 2020/06/23
  #
  def change_inactive?

    if activity.status_lost? || activity.status_rejection?

      work = activity.quote.work
      if work.present?

        if work.work_subcontractors.present?

          work.work_subcontractors.each do |r|

            r.expendable.inactive!
            r.expendable.payment.inactive!
          end
        end
      end
    end
  end

  ##
  # 経費計上する
  # @version 2020/06/23
  #
  def change_active?

    unless activity.status_lost? || activity.status_rejection?

      work = activity.quote.work
      if work.present?

        if work.work_subcontractors.present?

          work.work_subcontractors.each do |r|

            r.expendable.active!
            r.expendable.payment.active!
          end
        end
      end
    end
  end

end
