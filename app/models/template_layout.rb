# == Schema Information
#
# Table name: template_layouts
#
#  id               :bigint           not null, primary key
#  card_template_id :bigint
#  card_layout_id   :bigint
#  created_at       :datetime         not null
#  updated_at       :datetime         not null
#  status           :integer          default("head")
#

class TemplateLayout < ApplicationRecord

  #----------------------------------------
  #  ** Includes **
  #----------------------------------------

  #----------------------------------------
  #  ** Constants **
  #----------------------------------------

  #----------------------------------------
  #  ** Enums **
  #----------------------------------------

  enum status: { head: 0, tail: 10 }

  #----------------------------------------
  #  ** Validations **
  #----------------------------------------

  #----------------------------------------
  #  ** Associations **
  #----------------------------------------

  belongs_to :card_template

  belongs_to :card_layout

  #----------------------------------------
  #  ** Delegates **
  #----------------------------------------

  #----------------------------------------
  #  ** Scopes **
  #----------------------------------------

  #----------------------------------------
  #  ** Methods **
  #----------------------------------------

  ##
  # 名称検索
  #
  #
  def self.search name

    terms = name.to_s.gsub(/(?:[[:space:]%_])+/, ' ').split(' ')[0..1]

    query = (['name like ?'] * terms.size).join(' and ')

    self.where(query, *terms.map { |term| "%#{term}%" })
  end
end
