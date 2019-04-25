# == Schema Information
#
# Table name: invoices
#
#  id         :bigint(8)        not null, primary key
#  project_id :bigint(8)
#  date       :date
#  expiration :date
#  subject    :string(191)
#  remarks    :text(65535)
#  memo       :text(65535)
#  free_word  :text(65535)
#  created_at :datetime         not null
#  updated_at :datetime         not null
#

class Invoice < ApplicationRecord
end
