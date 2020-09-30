# == Schema Information
#
# Table name: card_templates
#
#  id         :bigint(8)        not null, primary key
#  company_id :bigint(8)
#  name       :string(191)
#  status     :integer          default("true")
#  created_at :datetime         not null
#  updated_at :datetime         not null
#

class CardTemplate < ApplicationRecord

  #----------------------------------------
  #  ** Includes **
  #----------------------------------------

  include DeepCloneable

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

  validates :name, presence: true

  validates :name, length: { maximum: 191 }

  #----------------------------------------
  #  ** Associations **
  #----------------------------------------

  belongs_to :company

  has_many :template_layouts

  has_many :card_layouts, through: :template_layouts

  has_many :delivery_targets

  accepts_nested_attributes_for :template_layouts, allow_destroy: true

  #----------------------------------------
  #  ** Delegates **
  #----------------------------------------

  #----------------------------------------
  #  ** Scopes **
  #----------------------------------------

  #----------------------------------------
  #  ** Methods **
  #----------------------------------------

  def self.search name

    # 検索ワードをスペース区切りで配列化(検索ワードは2つまで対応)
    terms = name.to_s.gsub(/(?:[[:space:]%_])+/, ' ').split(' ')[0..1]
    query = (['name like ?'] * terms.size).join(' and ')

    where(query, *terms.map { |term| "%#{term}%" })
  end

end
