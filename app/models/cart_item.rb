# == Schema Information
#
# Table name: cart_items
#
#  id             :bigint(8)        not null, primary key
#  card_client_id :bigint(8)
#  cart_id        :bigint(8)
#  quantity       :integer          default(0)
#  created_at     :datetime         not null
#  updated_at     :datetime         not null
#

class CartItem < ApplicationRecord

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

  has_one_attached :csv_file

  belongs_to :card_client

  belongs_to :cart

  #----------------------------------------
  #  ** Delegates **
  #----------------------------------------

  #----------------------------------------
  #  ** Scopes **
  #----------------------------------------

  #----------------------------------------
  #  ** Methods **
  #----------------------------------------
end
