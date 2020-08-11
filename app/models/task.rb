# == Schema Information
#
# Table name: tasks
#
#  id               :bigint(8)        not null, primary key
#  date             :date
#  data             :binary(65535)
#  remarks          :text(65535)
#  quote_id         :bigint(8)
#  catalog_id       :bigint(8)
#  client_name      :string(191)
#  client_mail      :string(191)
#  clientlastaccess :datetime         default(Wed, 05 Aug 2020 14:19:37 JST +09:00)
#  will_order       :integer          default(0)
#  created_at       :datetime         not null
#  updated_at       :datetime         not null
#  ts_code          :string(191)
#  shipping_address :string(191)
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

  validates :client_mail, format: { with: VALID_EMAIL_REGEX }, allow_nil: true

  #----------------------------------------
  #  ** Associations **
  #----------------------------------------

  # quote
  belongs_to :quote

  # catalog
  belongs_to :catalog

  # message
  has_many :messages

  has_many :task_card_clients

  has_many :card_clients, through: :task_card_clients

  accepts_nested_attributes_for :messages, allow_destroy: true

  accepts_nested_attributes_for :quote, update_only: true

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
