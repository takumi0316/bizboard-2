# == Schema Information
#
# Table name: company_unit_clients
#
#  id              :bigint(8)        not null, primary key
#  company_unit_id :bigint(8)
#  user_id         :bigint(8)
#  name            :string(191)
#  kana            :string(191)
#  title           :integer          default(0)
#  tel             :string(191)
#  email           :string(191)
#  note            :text(65535)
#

class CompanyUnitClient < ApplicationRecord

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
  
  belongs_to :unit, class_name: 'CompanyUnit'

  # 案件
  has_many :invoices, -> { order(id: :desc) }

  #----------------------------------------
  #  ** Scopes **
  #----------------------------------------

  #----------------------------------------
  #  ** Methods **
  #----------------------------------------

end
