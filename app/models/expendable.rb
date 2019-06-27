# == Schema Information
#
# Table name: expendables
#
#  id                :bigint(8)        not null, primary key
#  divisions_id      :bigint(8)
#  subcontractors_id :bigint(8)
#  status            :integer          default("copy")
#  name              :string(191)
#  price             :integer          default(0)
#  date              :date
#  created_at        :datetime         not null
#  updated_at        :datetime         not null
#

class Expendable < ApplicationRecord
  #----------------------------------------
  #  ** Includes **
  #----------------------------------------

  #----------------------------------------
  #  ** Constants **
  #----------------------------------------

  #----------------------------------------
  #  ** Enums **
  #----------------------------------------

  enum status: { copy: 0, material: 10, paper: 20, product: 30, expendable: 40, rent: 50, repair: 60, communication: 70, delivery: 80, maintenance: 90, cost: 100}

  #----------------------------------------
  #  ** Validations **
  #----------------------------------------

  #----------------------------------------
  #  ** Associations **
  #----------------------------------------

  belongs_to :division

  belongs_to :subcontractor

  #----------------------------------------
  #  ** Scopes **
  #----------------------------------------

  #----------------------------------------
  #  ** Methods **
  #----------------------------------------

end
