# == Schema Information
#
# Table name: layout_values
#
#  id                         :bigint           not null, primary key
#  company_division_client_id :bigint
#  text_value                 :string(191)
#  textarea_value             :text(65535)
#  created_at                 :datetime         not null
#  updated_at                 :datetime         not null
#  layout_type                :integer
#  content_flag_id            :bigint
#  upload_id                  :bigint
#  layout_content_id          :bigint
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
