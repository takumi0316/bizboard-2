class TaskMailer < EcMailer

  ##
  # 未読通知
  # @version 2018/06/10
  #
  def read(client_id,task_id,message_id)
    @client = CompanyDivisionClient.find client_id
    @task = Task.find task_id
    @message = Message.find message_id
    mail to: @client.email, subject: "[ビジスタント]チャットが届きました"
  end

end
