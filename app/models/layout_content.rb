# == Schema Information
#
# Table name: layout_contents
#
#  id                 :bigint(8)        not null, primary key
#  card_layout_id     :bigint(8)
#  content_flag_id    :bigint(8)
#  name               :string(191)
#  x_coordinate       :string(191)
#  y_coordinate       :string(191)
#  font_size          :string(191)
#  layout_length      :string(191)
#  letter_spacing     :string(191)
#  reduction_rate     :string(191)
#  is_reduction_rated :integer
#  layout_type        :integer
#  font_family        :integer
#  font_color         :integer
#  created_at         :datetime         not null
#  updated_at         :datetime         not null
#

class LayoutContent < ApplicationRecord

  #----------------------------------------
  #  ** Includes **
  #----------------------------------------

  #----------------------------------------
  #  ** Constants **
  #----------------------------------------

  #----------------------------------------
  #  ** Enums **
  #----------------------------------------

  enum is_reduction_rated: { true: 0, false: 10 }

  enum layout_type: { text: 0, text_area: 10, image: 20 }

  enum font_color: { black: 0, red: 1, yellow: 2, green: 3 }

  #----------------------------------------
  #  ** Validations **
  #----------------------------------------

  validates :name, presence: true
  validates :name, length: { maximum: 191 }

  #----------------------------------------
  #  ** Associations **
  #----------------------------------------

  belongs_to :content_flag

  has_many :content_uploads

  has_many :uploads, through: :content_uploads

  accepts_nested_attributes_for :content_uploads, allow_destroy: true, reject_if: :all_blank

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
