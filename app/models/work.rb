# == Schema Information
#
# Table name: works
#
#  id         :bigint(8)        not null, primary key
#  project_id :bigint(8)
#  price      :integer          default(0)
#  cost       :integer          default(0)
#  status     :integer          default("draft")
#  created_at :datetime         not null
#  updated_at :datetime         not null
#

class Work < ApplicationRecord

  #----------------------------------------
  #  ** Includes **
  #----------------------------------------

  #----------------------------------------
  #  ** Constants **
  #----------------------------------------

  #----------------------------------------
  #  ** Enums **
  #----------------------------------------

  enum status: { draft: 0, working: 10, deliverd: 20, complete: 30 }

  #----------------------------------------
  #  ** Validations **
  #----------------------------------------

  #----------------------------------------
  #  ** Associations **
  #----------------------------------------

  belongs_to :project

  #----------------------------------------
  #  ** Scopes **
  #----------------------------------------

  #----------------------------------------
  #  ** Methods **
  #----------------------------------------

end
