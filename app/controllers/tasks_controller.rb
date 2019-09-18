##
# Tasks Controller
#
class TasksController < ApplicationController

  #----------------------------------------
  #  ** Includes **
  #----------------------------------------

  #----------------------------------------
  #  ** Instance variables **
  #----------------------------------------
  # タスク
  expose(:tasks) {
    Task
    .joins(:quote)
    .merge(Quote.joins(client: :company_division)
    .where(:company_divisions => {:id => current_company_division_client.company_division_id}))
  }

  # タスク
  expose(:task) { Task.find_or_initialize_by id: params[:id]}
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
  # タスク編集
  # @version 2018/06/10
  #
  def show

    add_breadcrumb '編集'
    @task_id = task.id

  rescue => e
    #エラー時は進捗確認のタスク一覧へ。
    redirect_back fallback_location: url_for({action: :index}), flash: {notice: {message: e.message}}
  end

  ##
  # 更新処理
  # @version 2018/06/10
  #
  def update

   #情報更新
   message = task.messages.new
   message.name = current_user.name
   message.content = params[:task][:messages_attributes][:content] unless params[:task][:messages_attributes][:content].blank?
   message.attached_files = params[:task][:attached_files] unless params[:task][:attached_files].blank?
   message.save!

   #成功したら編集ページに飛ぶ
   redirect_to task_path(task)
 rescue => e
   #エラー時は直前のページへ
   redirect_back fallback_location: url_for({action: :edit}), flash: {notice: {message: e.message}}
 end

  #----------------------------------------
  #  ** Methods **
  #----------------------------------------

end
