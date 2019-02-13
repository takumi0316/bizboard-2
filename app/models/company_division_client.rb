# == Schema Information
#
# Table name: company_division_clients
#
#  id                  :bigint(8)        not null, primary key
#  company_division_id :bigint(8)
#  user_id             :bigint(8)
#  name                :string(191)
#  kana                :string(191)
#  title               :integer          default("honorific")
#  tel                 :string(191)
#  email               :string(191)
#  note                :text(65535)
#  created_at          :datetime         not null
#  updated_at          :datetime         not null
#

class CompanyDivisionClient < ApplicationRecord

  #----------------------------------------
  #  ** Includes **
  #----------------------------------------

  #----------------------------------------
  #  ** Constants **
  #----------------------------------------

  #----------------------------------------
  #  ** Enums **
  #----------------------------------------

  # 敬称
  enum title: { nothing: 0, honorific: 10, normal: 20 }

  #----------------------------------------
  #  ** Validations **
  #----------------------------------------

  #----------------------------------------
  #  ** Associations **
  #----------------------------------------
  
  belongs_to :company_division

  # 案件
  has_many :projects, -> { order(id: :desc) }

  #----------------------------------------
  #  ** Scopes **
  #----------------------------------------

  #----------------------------------------
  #  ** Methods **
  #----------------------------------------

end
