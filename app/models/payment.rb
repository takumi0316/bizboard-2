# == Schema Information
#
# Table name: payments
#
#  id                           :bigint           not null, primary key
#  subcontractor_id             :bigint
#  work_subcontractor_detail_id :bigint
#  price                        :integer          default(0), not null
#  date                         :date
#  expendable_id                :bigint
#  created_at                   :datetime         not null
#  updated_at                   :datetime         not null
#  work_subcontractor_id        :bigint
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

  belongs_to :expendable

  #----------------------------------------
  #  ** Scopes **
  #----------------------------------------

  #----------------------------------------
  #  ** Methods **
  #----------------------------------------

end
