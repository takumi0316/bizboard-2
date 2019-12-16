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
