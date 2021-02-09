# == Schema Information
#
# Table name: product_histories
#
#  id           :bigint(8)        not null, primary key
#  product_id   :bigint(8)
#  date         :date
#  status       :integer          default("first_stock")
#  quantity     :integer          default(0)
#  created_at   :datetime         not null
#  updated_at   :datetime         not null
#  apply_status :integer          default(0)
#

class ProductHistory < ApplicationRecord

  #----------------------------------------
  #  ** Includes **
  #----------------------------------------

  #----------------------------------------
  #  ** Constants **
  #----------------------------------------

  #----------------------------------------
  #  ** Enums **
  #----------------------------------------

  enum status: { first_stock: 0, delivery_stock: 10, add_stock: 20 }

  enum apply_status: { unset: 0, applied: 10 }

  #----------------------------------------
  #  ** Validations **
  #----------------------------------------

  #----------------------------------------
  #  ** Associations **
  #----------------------------------------

  # 在庫管理
  belongs_to :product

  #----------------------------------------
  #  ** Scopes **
  #----------------------------------------

  #----------------------------------------
  #  ** Methods **
  #----------------------------------------

end
