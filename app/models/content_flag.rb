# == Schema Information
#
# Table name: content_flags
#
#  id         :bigint(8)        not null, primary key
#  name       :string(191)
#  created_at :datetime         not null
#  updated_at :datetime         not null
#

class ContentFlag < ApplicationRecord

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

  validates :name, presence: true
  validates :name, length: { maximum: 191 }

  #----------------------------------------
  #  ** Associations **
  #----------------------------------------

  has_many :contents, class_name: 'LayoutContent'

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