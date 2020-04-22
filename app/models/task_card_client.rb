# == Schema Information
#
# Table name: task_card_clients
#
#  id             :bigint(8)        not null, primary key
#  task_id        :bigint(8)
#  quote_id       :bigint(8)
#  card_client_id :bigint(8)
#  count          :integer
#  created_at     :datetime         not null
#  updated_at     :datetime         not null
#

class TaskCardClient < ApplicationRecord

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

  #----------------------------------------
  #  ** Associations **
  #----------------------------------------

  belongs_to :task, optional: true

  belongs_to :quote, optional: true

  belongs_to :card_client, optional: true

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
