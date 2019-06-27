# == Schema Information
#
# Table name: profits
#
#  id         :bigint(8)        not null, primary key
#  company_id :bigint(8)
#  quote_id   :bigint(8)
#  price      :integer          default(0)
#  date       :date
#  created_at :datetime         not null
#  updated_at :datetime         not null
#

class Profit < ApplicationRecord

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

  belongs_to :company, foreign_key: 'company_id'

  #----------------------------------------
  #  ** Scopes **
  #----------------------------------------

  #----------------------------------------
  #  ** Methods **
  #----------------------------------------


end
