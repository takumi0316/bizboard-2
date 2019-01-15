class ApplicationMailer < ActionMailer::Base
  
  default from: "運営事務局 <#{SystemConfig.email}>"
  add_template_helper ApplicationHelper
  layout 'user_mailer/layouts/application'

end
