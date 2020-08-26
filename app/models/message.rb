# == Schema Information
#
# Table name: messages
#
#  id                         :bigint(8)        not null, primary key
#  task_id                    :bigint(8)
#  content                    :text(65535)
#  name                       :string(191)
#  user_id                    :bigint(8)
#  company_division_client_id :bigint(8)
#  created_at                 :datetime         not null
#  updated_at                 :datetime         not null
#

class Message < ApplicationRecord

  #----------------------------------------
  #  ** Includes **
  #----------------------------------------

  #----------------------------------------
  #  ** Constants **
  #----------------------------------------

  #----------------------------------------
  #  ** Enums **
  #----------------------------------------

  #----------------------------------------
  #  ** Validations **
  #----------------------------------------

  #validates :content,  presence: true

  #----------------------------------------
  #  ** Associations **
  #----------------------------------------

  has_many_attached :attached_files, dependent: :detach

  # task
  belongs_to :task

  #----------------------------------------
  #  ** Delegates **
  #----------------------------------------

  #----------------------------------------
  #  ** Scopes **
  #----------------------------------------

  #----------------------------------------
  #  ** Methods **
  #----------------------------------------

end
