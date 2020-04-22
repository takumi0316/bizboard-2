# == Schema Information
#
# Table name: client_templates
#
#  id               :bigint(8)        not null, primary key
#  card_client_id   :bigint(8)
#  card_template_id :bigint(8)
#  created_at       :datetime         not null
#  updated_at       :datetime         not null
#

class ClientTemplate < ApplicationRecord

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

  # 名刺担当者
  belongs_to :card_client

  # 名刺情報
  belongs_to :card_template

  # 名刺テンプレート
  has_many :values, class_name: 'ClientTemplateValue', dependent: :delete_all

  accepts_nested_attributes_for :values, allow_destroy: true, reject_if: :all_blank

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

    obj = { id: '', card_client_id: '', card_template_id: '', file: '', values: [] }
    return if self.card_template.status != status.to_s
    unless self.new_record?

      values = []
      self.values.each do |value|
        detail = value.template_detail
        format_value = {
          id: value.id,
          client_template_id: value.client_template_id,
          template_detail_id: value.template_detail_id,
          value: value.value,
          name: detail.name,
          font: detail.font,
          font_size: detail.font_size,
          font_color: detail.font_color,
          coord_x: detail.coord_x,
          coord_y: detail.coord_y,
          length: detail.length,
          line_space: detail.line_space
        }
        values.push(format_value)
      end

      obj['id'] = self.id
      obj['card_id'] = self.card_template.card.id
      obj['card_client_id'] = self.card_client_id
      obj['card_template_id'] = self.card_template_id
      obj['status'] = self.card_template.status
      obj['file'] = self.card_template.decorate.file_original
      obj['values'] = values
    end

    obj
  end

end
