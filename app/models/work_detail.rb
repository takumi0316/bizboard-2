# == Schema Information
#
# Table name: work_details
#
#  id                  :bigint(8)        not null, primary key
#  work_id             :bigint(8)
#  count               :string(191)
#  deliver_at          :datetime
#  client_name         :string(191)
#  status              :integer          default(0), not null
#  estimated_man_hours :string(191)
#  estimated_cost      :string(191)
#  actual_man_hours    :string(191)
#  actual_cost         :string(191)
#  created_at          :datetime         not null
#  updated_at          :datetime         not null
#

class WorkDetail < ApplicationRecord

  #------------------------------------
  #  ** Includes **
  #------------------------------------
  
  #------------------------------------
  #  ** Constants **
  #------------------------------------ 

  #------------------------------------
  #  ** Enums **
  #------------------------------------

  #enum status: { draft: 0, working: 10, deliverd: 20, complete: 30 }

  #------------------------------------
  #  ** Validations **
  #------------------------------------

  #------------------------------------
  #  ** Associations **
  #------------------------------------

  belongs_to :work

  #------------------------------------
  #  ** Scopes **
  #------------------------------------

  #------------------------------------
  #  ** Methods **
  #------------------------------------

end
