# == Schema Information
#
# Table name: work_subcontractor_details
#
#  id                    :bigint           not null, primary key
#  work_subcontractor_id :bigint
#  order_contents        :string(191)
#  deliver_method        :text(65535)
#  specification         :text(65535)
#  count                 :string(191)
#  number_of_copies      :string(191)
#  deliver_at            :datetime
#  cost_unit_price       :string(191)
#  estimated_cost        :string(191)
#  actual_count          :string(191)
#  actual_cost           :string(191)
#  status                :integer          default(0)
#  work_id               :bigint
#  created_at            :datetime         not null
#  updated_at            :datetime         not null
#

class WorkSubcontractorDetail < ApplicationRecord

  #------------------------------------
  #  ** Includes **
  #------------------------------------

  #------------------------------------
  #  ** Constants **
  #------------------------------------

  #------------------------------------
  #  ** Enums **
  #------------------------------------

  #------------------------------------
  #  ** Validations **
  #------------------------------------

  #------------------------------------
  #  ** Associations **
  #------------------------------------

  belongs_to :work

  belongs_to :work_subcontractor

  #----------------------------------------
  #  ** Scopes **
  #----------------------------------------

  #----------------------------------------
  #  ** Methods **
  #----------------------------------------

end
