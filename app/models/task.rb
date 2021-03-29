# == Schema Information
#
# Table name: tasks
#
#  id                 :bigint(8)        not null, primary key
#  date               :date
#  data               :binary(65535)
#  remarks            :text(65535)
#  quote_id           :bigint(8)
#  catalog_id         :bigint(8)
#  client_name        :string(191)
#  client_mail        :string(191)
#  clientlastaccess   :datetime         default(Tue, 16 Jun 2020 21:30:03 JST +09:00)
#  will_order         :integer          default(0)
#  created_at         :datetime         not null
#  updated_at         :datetime         not null
#  ts_code            :string(191)
#  delivery_target_id :bigint(8)
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

  belongs_to :delivery_target, optional: true

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
