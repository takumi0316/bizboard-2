# == Schema Information
#
# Table name: delivery_targets
#
#  id               :bigint(8)        not null, primary key
#  card_template_id :bigint(8)
#  name             :string(191)
#  address1         :string(191)
#  address2         :string(191)
#  tel              :string(191)
#  inventory_id     :bigint(8)
#

class DeliveryTarget < ApplicationRecord

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

  belongs_to :card_template, optional: true

  belongs_to :company_division, optional: true

  has_many :products

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
