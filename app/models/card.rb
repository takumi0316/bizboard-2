# == Schema Information
#
# Table name: cards
#
#  id                  :bigint(8)        not null, primary key
#  company_division_id :bigint(8)
#  name                :string(191)
#  created_at          :datetime         not null
#  updated_at          :datetime         not null
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
  belongs_to :company_division

  # 名刺テンプレート中間テーブル
  has_many :templates, class_name: 'CardTemplate', dependent: :delete_all

  # 名刺担当者
  has_many :card_clients

  accepts_nested_attributes_for :templates, allow_destroy: true, reject_if: :reject_file_blank

  #----------------------------------------
  #  ** Delegates **
  #----------------------------------------

  #----------------------------------------
  #  ** Scopes **
  #----------------------------------------

  #----------------------------------------
  #  ** Methods **
  #----------------------------------------

  def reject_file_blank attributes

    is_destroy = attributes[:only_file].present?

    return unless is_destroy

    card_template.file.purge
  end

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
