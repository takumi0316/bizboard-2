# == Schema Information
#
# Table name: card_templates
#
#  id         :bigint(8)        not null, primary key
#  card_id    :bigint(8)
#  status     :integer          default("true")
#  created_at :datetime         not null
#  updated_at :datetime         not null
#

class CardTemplate < ApplicationRecord

  #----------------------------------------
  #  ** Includes **
  #----------------------------------------

  #----------------------------------------
  #  ** Constants **
  #----------------------------------------

  #----------------------------------------
  #  ** Enums **
  #----------------------------------------

  enum status: { true: 0, false: 10 }

  #----------------------------------------
  #  ** Validations **
  #----------------------------------------

  #----------------------------------------
  #  ** Associations **
  #----------------------------------------

  # 名刺
  belongs_to :card

  # テンプレート
  has_one_attached :file, dependent: :detach

  # 名刺テンプレート詳細
  has_many :details, class_name: 'TemplateDetail', dependent: :delete_all

  accepts_nested_attributes_for :details, allow_destroy: true, reject_if: :all_blank

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
    unless self.new_record?

      details = []
      self.details.each { |detail| details.push(detail) }
      obj['id'] = self.id
      obj['card_id'] = self.card.id
      obj['status'] = self.status
      obj['file'] = self.decorate.file_original
      obj['details'] = details
    end

    obj
  end

end
