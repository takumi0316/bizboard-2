# == Schema Information
#
# Table name: layout_values
#
#  id                         :bigint(8)        not null, primary key
#  company_division_client_id :bigint(8)
#  text_value                 :string(191)
#  textarea_value             :text(65535)
#  created_at                 :datetime         not null
#  updated_at                 :datetime         not null
#  content_flag_id            :bigint(8)
#

class LayoutValue < ApplicationRecord

  #----------------------------------------
  #  ** Includes **
  #----------------------------------------

  #----------------------------------------
  #  ** Constants **
  #----------------------------------------

  #----------------------------------------
  #  ** Enums **
  #----------------------------------------

  enum layout_type: { text: 0, text_area: 10, image: 20 }

  #----------------------------------------
  #  ** Validations **
  #----------------------------------------

  belongs_to :company_division_client

  belongs_to :layout_content, optional: true

  belongs_to :content_flag

  belongs_to :upload, optional: true

  #----------------------------------------
  #  ** Associations **
  #----------------------------------------

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