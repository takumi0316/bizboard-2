# == Schema Information
#
# Table name: inventories
#
#  id                  :bigint(8)        not null, primary key
#  company_division_id :bigint(8)
#  remarks             :text(65535)
#  created_at          :datetime         not null
#  updated_at          :datetime         not null
#

class Inventory < ApplicationRecord

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

  # 部署
  belongs_to :company_division

  # 配送先
  has_many :delivery_targets

  # 商品
  has_many :products, dependent: :destroy

  accepts_nested_attributes_for :products, allow_destroy: true


  #----------------------------------------
  #  ** Scopes **
  #----------------------------------------

  #----------------------------------------
  #  ** Methods **
  #----------------------------------------

end
