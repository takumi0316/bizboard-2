# == Schema Information
#
# Table name: work_subcontractor_details
#
#  id                    :bigint(8)        not null, primary key
#  work_subcontractor_id :bigint(8)
#  order_contents        :string(191)
#  standard              :string(191)
#  specification         :string(191)
#  count                 :string(191)
#  number_of_copies      :string(191)
#  deliver_at            :datetime
#  cost_unit_price       :string(191)
#  estimated_cost        :string(191)
#  actual_count          :string(191)
#  actual_cost           :string(191)
#  status                :integer          default(0)
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

  belongs_to :work_subcontractor

  #----------------------------------------
  #  ** Scopes **
  #----------------------------------------

  #----------------------------------------
  #  ** Methods **
  #----------------------------------------

end
