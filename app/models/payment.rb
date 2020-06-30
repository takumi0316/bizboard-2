# == Schema Information
#
# Table name: payments
#
#  id                           :bigint(8)        not null, primary key
#  subcontractor_id             :bigint(8)
#  work_subcontractor_detail_id :bigint(8)
#  price                        :integer          default(0), not null
#  date                         :date
#  expendable_id                :bigint(8)
#  created_at                   :datetime         not null
#  updated_at                   :datetime         not null
#  work_subcontractor_id        :bigint(8)
#  accouting_status             :integer          default("active")
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

  enum accouting_status: { active: 0, inactive: 10 }

  #----------------------------------------
  #  ** Validations **
  #----------------------------------------

  validates :price, presence: true

  #----------------------------------------
  #  ** Associations **
  #----------------------------------------

  belongs_to :subcontractor, foreign_key: 'subcontractor_id'

  belongs_to :work_subcontractor, optional: true

  belongs_to :expendable, dependent: :destroy

  #----------------------------------------
  #  ** Scopes **
  #----------------------------------------

  #----------------------------------------
  #  ** Methods **
  #----------------------------------------

end
