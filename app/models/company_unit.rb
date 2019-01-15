# == Schema Information
#
# Table name: company_units
#
#  id         :bigint(8)        not null, primary key
#  name       :string(191)
#  kana       :string(191)
#  title      :integer          default(0)
#  zip        :string(191)
#  prefecture :string(191)
#  address1   :string(191)
#  sddress2   :string(191)
#  note       :text(65535)
#

class CompanyUnit < ApplicationRecord

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

  belongs_to :company

  # 部署
  has_many :clients, class_name: 'CompanyUnitClient'

  #----------------------------------------
  #  ** Scopes **
  #----------------------------------------

  #----------------------------------------
  #  ** Methods **
  #----------------------------------------

end
