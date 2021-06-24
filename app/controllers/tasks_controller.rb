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
    Task.includes(quote: [client: [:company_division, :company]]).all.order(created_at: :desc)
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
  # 一覧
  # @version 2018/06/10
  #
  def index
    

  end
  
  ##
  # タスク編集
  # @version 2018/06/10
  #
  def show

    @task_id = task.id
    @group = task.messages.group_by{|u| u.created_at.strftime('%m月%d日') }

    add_breadcrumb '案件(編集)', path: edit_quote_path(task.quote.id)
    add_breadcrumb 'チャット(詳細)'
  rescue => e
    #エラー時は進捗確認のタスク一覧へ。
    redirect_back fallback_location: url_for({action: :index}), flash: {notice: {message: e.message}}
  end

  ##
  # 更新処理
  # @version 2018/06/10
  #
  def update
    
    if params[:task][:quote_attributes].blank?

     # チャット送信処理
     message = task.messages.new
     message.name = current_user.name
     message.user_id = current_user.id
     message.content = params[:task][:messages_attributes][:content] unless params[:task][:messages_attributes][:content].blank?
     message.attached_files = params[:task][:attached_files] unless params[:task][:attached_files].blank?
     message.save!
     if task.clientlastaccess.to_datetime < message.created_at.to_datetime
       # メール送信
       TaskMailer.read(task.quote.client.id,task.id,message.id).deliver_later
     end

    elsif
      # 案件メモ編集(仕様書代わり)
      task.quote.memo = params[:task][:quote_attributes][:memo]
      task.quote.save!
    end

   #成功したら編集ページに飛ぶ
   redirect_to task_path(task)
 rescue => e
   #エラー時は直前のページへ
   redirect_back fallback_location: url_for({action: :edit}), flash: {notice: {message: e.message}}
 end

  #----------------------------------------
  #  ** Methods **
  #----------------------------------------

 private

 def task_params
  params.require(:task).permit quote_attributes: [:id, :subject, :quote_number, :deliver_at, :reception], messages_attributes: [:id, :task_id, :content, :name, :attached_files]
 end


end
