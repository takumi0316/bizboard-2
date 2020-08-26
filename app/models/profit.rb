# == Schema Information
#
# Table name: profits
#
#  id         :bigint           not null, primary key
#  company_id :bigint
#  quote_id   :bigint
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
  belongs_to :quote, foreign_key:   'quote_id'

  #----------------------------------------
  #  ** Scopes **
  #----------------------------------------

  #----------------------------------------
  #  ** Methods **
  #----------------------------------------


end
