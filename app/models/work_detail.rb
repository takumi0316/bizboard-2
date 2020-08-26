# == Schema Information
#
# Table name: work_details
#
#  id                  :bigint           not null, primary key
#  work_id             :bigint
#  count               :string(191)
#  deliver_at          :datetime
#  client_name         :string(191)
#  status              :integer          default(0), not null
#  estimated_man_hours :string(191)
#  estimated_cost      :string(191)
#  actual_man_hours    :string(191)
#  actual_cost         :string(191)
#  order_contents      :string(191)
#  deliver_method      :text(65535)
#  specification       :text(65535)
#  number_of_copies    :string(191)
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
