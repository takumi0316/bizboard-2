# == Schema Information
#
# Table name: payments
#
#  id                           :bigint(8)        not null, primary key
#  subcontractor_id             :bigint(8)
#  work_subcontractor_detail_id :bigint(8)
#  price                        :integer          default(0), not null
#  date                         :date
#  created_at                   :datetime         not null
#  updated_at                   :datetime         not null
#  expendable_id                :bigint(8)
#  work_subcontractor_id        :bigint(8)
#

class Payment < ApplicationRecord

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

  validates :price, presence: true

  #----------------------------------------
  #  ** Associations **
  #----------------------------------------

  belongs_to :subcontractor, foreign_key: 'subcontractor_id'

  #----------------------------------------
  #  ** Scopes **
  #----------------------------------------

  #----------------------------------------
  #  ** Methods **
  #----------------------------------------

end
