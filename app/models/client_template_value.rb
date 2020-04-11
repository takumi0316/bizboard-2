# == Schema Information
#
# Table name: client_template_values
#
#  id                 :bigint(8)        not null, primary key
#  client_template_id :bigint(8)
#  template_detail_id :bigint(8)
#  value              :string(191)
#  created_at         :datetime         not null
#  updated_at         :datetime         not null
#

class ClientTemplateValue < ApplicationRecord

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

  # 名刺担当者テンプレート
  belongs_to :client_template

  # 名刺情報詳細
  belongs_to :template_detail

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
