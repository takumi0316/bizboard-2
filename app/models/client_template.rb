# == Schema Information
#
# Table name: client_templates
#
#  id               :bigint(8)        not null, primary key
#  card_client_id   :bigint(8)
#  card_template_id :bigint(8)
#

class ClientTemplate < ApplicationRecord

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

  # 名刺担当者
  belongs_to :card_client

  # 名刺テンプレート
  has_many :values, class_name: 'ClientTemplateValue', dependent: :delete_all

  accepts_nested_attributes_for :values, allow_destroy: true, reject_if: :all_blank

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
