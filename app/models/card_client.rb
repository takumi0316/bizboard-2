# == Schema Information
#
# Table name: card_clients
#
#  id                         :bigint(8)        not null, primary key
#  company_division_client_id :bigint(8)
#  head_layout_id             :bigint(8)
#  tail_layout_id             :bigint(8)
#  created_at                 :datetime         not null
#  updated_at                 :datetime         not null
#

class CardClient < ApplicationRecord

  #----------------------------------------
  #  ** Includes **
  #----------------------------------------

  #----------------------------------------
  #  ** Constants **
  #----------------------------------------

  #----------------------------------------
  #  ** Enums **
  #----------------------------------------

  enum status: { custom: 0, default: 10 }

  #----------------------------------------
  #  ** Validations **
  #----------------------------------------

  #----------------------------------------
  #  ** Associations **
  #----------------------------------------

  # 担当者
  belongs_to :company_division_client

  belongs_to :head_layout, class_name: 'CardLayout', foreign_key: 'head_layout_id', optional: true

  belongs_to :tail_layout, class_name: 'CardLayout', foreign_key: 'tail_layout_id', optional: true

  has_many :task_card_clients, dependent: :destroy

  has_many :tasks, through: :task_card_clients

  has_many :quotes, through: :task_card_clients

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
