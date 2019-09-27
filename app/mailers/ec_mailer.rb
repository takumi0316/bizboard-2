class EcMailer < ActionMailer::Base

  default from: "運営事務局 <#{SystemConfig.email}>"
  add_template_helper ApplicationHelper
  layout 'task_mailer/layouts/ec'

end
