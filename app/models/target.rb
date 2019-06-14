# == Schema Information
#
# Table name: targets
#
#  id           :bigint(8)        not null, primary key
#  division_id  :bigint(8)
#  target_year  :integer          default(1)
#  target_month :integer          default(1)
#  sales        :integer          default(0)
#  profit       :integer          default(0)
#  cost         :integer          default(0)
#  created_at   :datetime         not null
#  updated_at   :datetime         not null
#

class Target < ApplicationRecord

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
