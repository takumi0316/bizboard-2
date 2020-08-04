# == Schema Information
#
# Table name: card_layouts
#
#  id                 :bigint(8)        not null, primary key
#  card_template_id   :bigint(8)
#  layout_logo_id     :bigint(8)
#  layout_flags_id    :bigint(8)
#  name               :string(191)
#  x_coordinate       :string(191)
#  y_coordinate       :string(191)
#  font_family        :string(191)
#  font_color         :string(191)
#  font_size          :string(191)
#  layout_length      :string(191)
#  letter_spacing     :string(191)
#  reduction_rate     :string(191)
#  is_reduction_rated :integer
#  layout_type        :integer
#

class CardLayout < ApplicationRecord

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
