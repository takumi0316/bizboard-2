# == Schema Information
#
# Table name: products
#
#  id                 :bigint(8)        not null, primary key
#  inventory_id       :bigint(8)
#  name               :string(191)
#  quantity           :integer          default(0)
#  remarks            :text(65535)
#  created_at         :datetime         not null
#  updated_at         :datetime         not null
#  issue_quantity     :string(191)
#  delivery_target_id :bigint(8)
#  max_unit           :integer          default(0)
#  min_unit           :integer          default(0)
#

class Product < ApplicationRecord

  #----------------------------------------
  #  ** Includes **
  #----------------------------------------

  #----------------------------------------
  #  ** Constants **
  #----------------------------------------

  #----------------------------------------
  #  ** Enums **
  #----------------------------------------

  enum unit: { box: 0, book: 10, sheet: 20 }

  #----------------------------------------
  #  ** Validations **
  #----------------------------------------

  #----------------------------------------
  #  ** Associations **
  #----------------------------------------

  # 在庫管理
  belongs_to :inventory

  # 配送先
  belongs_to :delivery_target

  # 商品
  has_many :product_histories, dependent: :destroy
  accepts_nested_attributes_for :product_histories, allow_destroy: true


  #----------------------------------------
  #  ** Scopes **
  #----------------------------------------

  #----------------------------------------
  #  ** Methods **
  #----------------------------------------

end
