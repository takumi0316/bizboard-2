# == Schema Information
#
# Table name: card_clients
#
#  id                         :bigint(8)        not null, primary key
#  company_division_client_id :bigint(8)
#

class CardClient < ApplicationRecord

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

  # 担当者
  belongs_to :company_division_client

  # 名刺担当者テンプレート情報
  has_many :templates, class_name: 'ClientTemplate', dependent: :delete_all

  accepts_nested_attributes_for :templates, allow_destroy: true, reject_if: :all_blank

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
