# == Schema Information
#
# Table name: template_details
#
#  id               :bigint(8)        not null, primary key
#  card_template_id :bigint(8)
#  name             :string(191)
#  font             :string(191)
#  font_size        :string(191)
#  font_color       :string(191)
#  length           :string(191)
#  line_space       :string(191)
#

class TemplateDetail < ApplicationRecord
	
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

  # 名刺テンプレート情報
  belongs_to :template, class_name: 'CardTemplate', optional: true

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
