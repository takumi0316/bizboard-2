# == Schema Information
#
# Table name: cards
#
#  id         :bigint(8)        not null, primary key
#  name       :string(191)
#  created_at :datetime         not null
#  updated_at :datetime         not null
#  company_id :bigint(8)
#

class Card < ApplicationRecord

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

  # 部署
  belongs_to :company

  # 名刺テンプレート中間テーブル
  has_many :templates, class_name: 'CardTemplate', dependent: :delete_all

  # 名刺担当者
  has_many :card_clients, dependent: :delete_all

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

  def formatting status

    obj = { id: '', card_id: '', status: status, file: '', details: [] }
    if !self.new_record? && self.templates.where(status: status).present?

      template = self.templates.where(status: status)[0]
      details = []
      template.details.each { |detail| details.push(detail) }
      obj['id'] = template.id
      obj['card_id'] = self.id
      obj['status'] = template.status
      obj['file'] = template.decorate.file_original
      obj['details'] = details
    end

    obj
  end
end
