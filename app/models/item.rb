# == Schema Information
#
# Table name: items
#
#  id              :bigint(8)        not null, primary key
#  name            :string(191)
#  mf_item_id      :string(191)
#  code            :string(191)
#  note            :string(191)
#  unit_price      :integer
#  unit_label      :string(191)
#  consumption_tax :integer
#  created_at      :datetime         not null
#  updated_at      :datetime         not null
#

class Item < ApplicationRecord
end
