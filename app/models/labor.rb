# == Schema Information
#
# Table name: labors
#
#  id          :bigint(8)        not null, primary key
#  division_id :bigint(8)
#  memo        :text(65535)
#  price       :integer          default(0)
#  date        :date
#  created_at  :datetime         not null
#  updated_at  :datetime         not null
#

class Labor < ApplicationRecord
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

  belongs_to :division

  #----------------------------------------
  #  ** Scopes **
  #----------------------------------------

  scope :date_in, ->(datetime) { where(date: datetime) }

  #----------------------------------------
  #  ** Methods **
  #----------------------------------------

end
