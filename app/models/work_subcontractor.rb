# == Schema Information
#
# Table name: work_subcontractors
#
#  id                               :bigint(8)        not null, primary key
#  work_id                          :bigint(8)
#  subcontractor_division_client_id :bigint(8)
#  status                           :integer          default(0)
#  created_at                       :datetime         not null
#  updated_at                       :datetime         not null
#  notices                          :text(65535)
#

class WorkSubcontractor < ApplicationRecord

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

  belongs_to :work

  has_many :detail, class_name: 'WorkSubcontractorDetail', dependent: :destroy 

  belongs_to :client, optional: true, class_name: 'SubcontractorDivisionClient', foreign_key: :subcontractor_division_client_id

  #----------------------------------------
  #  ** Scopes **
  #----------------------------------------

  #----------------------------------------
  #  ** Methods **
  #----------------------------------------

end
