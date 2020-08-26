# == Schema Information
#
# Table name: carts
#
#  id                         :bigint           not null, primary key
#  company_division_client_id :bigint
#  created_at                 :datetime         not null
#  updated_at                 :datetime         not null
#  status                     :integer          default(0)
#  company_division_id        :bigint
#

class Cart < ApplicationRecord
  belongs_to :company_division_client
end
