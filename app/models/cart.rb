# == Schema Information
#
# Table name: carts
#
#  id                         :bigint(8)        not null, primary key
#  company_division_client_id :bigint(8)
#  created_at                 :datetime         not null
#  updated_at                 :datetime         not null
#

class Cart < ApplicationRecord
  belongs_to :company_division_client
end
