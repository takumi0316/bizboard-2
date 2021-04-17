# == Schema Information
#
# Table name: uploads
#
#  id          :bigint(8)        not null, primary key
#  name        :string(191)
#  author      :string(191)
#  author_name :string(191)
#  credit      :string(191)
#  created_at  :datetime         not null
#  updated_at  :datetime         not null
#  status      :integer          default("normal")
#

class Upload < ApplicationRecord

  #----------------------------------------
  #  ** Includes **
  #----------------------------------------

  #----------------------------------------
  #  ** Constants **
  #----------------------------------------

  #----------------------------------------
  #  ** Enums **
  #----------------------------------------

  enum status: { normal: 0, card: 10 }

  #----------------------------------------
  #  ** Validations **
  #----------------------------------------

  #----------------------------------------
  #  ** Associations **
  #----------------------------------------

  # file
  has_one_attached :image, dependent: :detach

  has_many :content_flag_uploads

  has_many :content_flags, through: :content_flag_uploads

  has_many :content_uploads

  has_many :layout_contents, through: :content_uploads

  accepts_nested_attributes_for :content_flag_uploads, allow_destroy: true

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
