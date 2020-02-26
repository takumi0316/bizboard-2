# == Schema Information
#
# Table name: tasks
#
#  id               :bigint(8)        not null, primary key
#  date             :date
#  data             :binary(65535)
#  remarks          :text(65535)
#  quote_id         :bigint(8)
#  created_at       :datetime         not null
#  updated_at       :datetime         not null
#  catalog_id       :bigint(8)
#  client_name      :string(191)
#  client_mail      :string(191)
#  clientlastaccess :datetime         default(Mon, 30 Sep 2019 09:53:06 JST +09:00)
#  will_order       :integer          default(0)
#  ts_code          :string(191)
#

class Task < ApplicationRecord

  #----------------------------------------
  #  ** Includes **
  #----------------------------------------

  #----------------------------------------
  #  ** Constants **
  #----------------------------------------

  VALID_EMAIL_REGEX = /\A[\w+\-.]+@[a-z\d\-.]+\.[a-z]+\z/i

  #----------------------------------------
  #  ** Enums **
  #----------------------------------------

  #----------------------------------------
  #  ** Validations **
  #----------------------------------------

  validates :client_mail, presence: true, uniqueness: true, format: { with: VALID_EMAIL_REGEX }

  #----------------------------------------
  #  ** Associations **
  #----------------------------------------

  # quote
  belongs_to :quote
  accepts_nested_attributes_for :quote, update_only: true

  #catalog
  belongs_to :catalog

  # message
  has_many :messages
  accepts_nested_attributes_for :messages, allow_destroy: true

  #----------------------------------------
  #  ** Delegates **
  #----------------------------------------

  #----------------------------------------
  #  ** Scopes **
  #----------------------------------------

  #----------------------------------------
  #  ** Methods **
  #----------------------------------------

end
