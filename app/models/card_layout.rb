# == Schema Information
#
# Table name: card_layouts
#
#  id         :bigint(8)        not null, primary key
#  name       :string(191)
#  created_at :datetime         not null
#  updated_at :datetime         not null
#

class CardLayout < ApplicationRecord

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

  #----------------------------------------
  #  ** Validations **
  #----------------------------------------

  validates :name, presence: true

  validates :name, length: { maximum: 191 }

  #----------------------------------------
  #  ** Associations **
  #----------------------------------------

  has_one_attached :file, dependent: :detach

  has_many :contents, class_name: 'LayoutContent', dependent: :destroy

  has_many :template_layouts

  has_many :card_templates, through: :template_layouts

  has_many :head_layout_company_division_clients, class_name: 'CompanyDivisionClient', foreign_key: 'head_layout_id'

  has_many :tail_layout_company_division_clients, class_name: 'CompanyDivisionClient', foreign_key: 'tail_layout_id'

  has_many :head_layout_card_clients, class_name: 'CardClient', foreign_key: 'head_layout_id'

  has_many :tail_layout_card_clients, class_name: 'CardClient', foreign_key: 'tail_layout_id'

  accepts_nested_attributes_for :contents, allow_destroy: true, reject_if: :all_blank

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

    query = (['content_flags.name like ?'] * terms.size).join(' and ')

    self.where(query, *terms.map { |term| "%#{term}%" })
  end

end
