# == Schema Information
#
# Table name: subcontractor_divisions
#
#  id               :bigint(8)        not null, primary key
#  subcontractor_id :bigint(8)
#  name             :string(191)
#  kana             :string(191)
#  zip              :string(191)
#  tel              :string(191)
#  prefecture_id    :integer
#  address1         :string(191)
#  address2         :string(191)
#  note             :text(65535)
#  created_at       :datetime         not null
#  updated_at       :datetime         not null
#

class SubcontractorDivision < ApplicationRecord

  #----------------------------------------
  #  ** Includes **
  #----------------------------------------

  extend ActiveHash::Associations::ActiveRecordExtensions

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

  # 都道府県
  belongs_to_active_hash :prefecture

  # 部署
  has_many :clients, class_name: 'SubcontractorDivisionClient'

  #----------------------------------------
  #  ** Scopes **
  #----------------------------------------

  #----------------------------------------
  #  ** Methods **
  #----------------------------------------

end
