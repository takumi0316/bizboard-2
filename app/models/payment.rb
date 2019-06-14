# == Schema Information
#
# Table name: payments
#
#  id                           :bigint(8)        not null, primary key
#  subcontractor_id             :bigint(8)
#  work_subcontractor_detail_id :bigint(8)
#  price                        :integer          default(0)
#  date                         :date
#  created_at                   :datetime         not null
#  updated_at                   :datetime         not null
#

class Payment < ApplicationRecord

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

  belongs_to :subcontractor

  #----------------------------------------
  #  ** Scopes **
  #----------------------------------------

  #----------------------------------------
  #  ** Methods **
  #----------------------------------------

end
