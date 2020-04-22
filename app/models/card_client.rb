# == Schema Information
#
# Table name: card_clients
#
#  id                         :bigint(8)        not null, primary key
#  card_id                    :bigint(8)
#  company_division_id        :bigint(8)
#  company_division_client_id :bigint(8)
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

  #----------------------------------------
  #  ** Validations **
  #----------------------------------------

  #----------------------------------------
  #  ** Associations **
  #----------------------------------------

  # 名刺
  belongs_to :card

  # 部署
  belongs_to :company_division

  # 担当者
  belongs_to :company_division_client

  # 名刺担当者テンプレート情報
  has_many :templates, class_name: 'ClientTemplate', dependent: :delete_all

  has_many :task_card_clients, dependent: :delete_all

  has_many :quotes, through: :task_card_clients

  has_many :tasks, through: :task_card_clients

  accepts_nested_attributes_for :templates, allow_destroy: true, reject_if: :all_blank

  #----------------------------------------
  #  ** Delegates **
  #----------------------------------------

  #----------------------------------------
  #  ** Scopes **
  #----------------------------------------

  #----------------------------------------
  #  ** Methods **
  #----------------------------------------

  def self.search(**parameters)

    if parameters[:company_division_id].present?

      self.where(company_division_id: parameters[:company_division_id])
    end

    self
  end

end
