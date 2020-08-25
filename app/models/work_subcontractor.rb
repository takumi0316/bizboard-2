# == Schema Information
#
# Table name: work_subcontractors
#
#  id                               :bigint           not null, primary key
#  work_id                          :bigint
#  subcontractor_division_client_id :bigint
#  status                           :integer          default(0)
#  notices                          :text(65535)
#  order_date                       :datetime
#  delivery_date                    :datetime
#  delivery_destination             :string(191)
#  created_at                       :datetime         not null
#  updated_at                       :datetime         not null
#

class WorkSubcontractor < ApplicationRecord

  #----------------------------------------
  #  ** Includes **
  #----------------------------------------

  include DeepCloneable

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

  # 請求情報
  has_one :payment

  # 製造原価
  has_one :expendable

  belongs_to :client, optional: true, class_name: 'SubcontractorDivisionClient', foreign_key: :subcontractor_division_client_id

  has_many :details, class_name: 'WorkSubcontractorDetail', dependent: :destroy

  accepts_nested_attributes_for :details

  #----------------------------------------
  #  ** Scopes **
  #----------------------------------------

  #----------------------------------------
  #  ** Methods **
  #----------------------------------------

end
