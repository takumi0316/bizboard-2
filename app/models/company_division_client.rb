# == Schema Information
#
# Table name: company_division_clients
#
#  id                  :bigint(8)        not null, primary key
#  company_division_id :bigint(8)
#  user_id             :bigint(8)
#  name                :string(191)
#  kana                :string(191)
#  title               :integer          default("honorific")
#  tel                 :string(191)
#  email               :string(191)
#  note                :text(65535)
#  created_at          :datetime         not null
#  updated_at          :datetime         not null
#  free_word           :text(65535)
#

class CompanyDivisionClient < ApplicationRecord

  #----------------------------------------
  #  ** Includes **
  #----------------------------------------

  #----------------------------------------
  #  ** Constants **
  #----------------------------------------

  #----------------------------------------
  #  ** Enums **
  #----------------------------------------

  # 敬称
  enum title: { nothing: 0, honorific: 10, normal: 20 }

  #----------------------------------------
  #  ** Validations **
  #----------------------------------------

  #----------------------------------------
  #  ** Associations **
  #----------------------------------------
  
  belongs_to :company_division
  belongs_to :user

  # 案件
  has_many :projects, -> { order(id: :desc) }

  #----------------------------------------
  #  ** Scopes **
  #----------------------------------------

  #----------------------------------------
  #  ** Methods **
  #----------------------------------------

  # フリーワード検索用文字列をセットする
  before_validation :set_free_word

  ##
  # フリーワード検索用文字列をセットする
  # @version 2018/06/10
  #
  def set_free_word

    self.free_word = "#{self.company_division&.company&.name} #{self.company_division&.company&.kana} #{self.company_division&.name} #{self.company_division&.kana} #{self.user&.name} #{self.name} #{self.kana} #{self.title} #{self.tel} #{self.email} #{self.note}"
  end

  ##
  # 名称検索
  # @version 2018/06/10
  #
  def self.search(word)

    # 検索ワードをスペース区切りで配列化(検索ワードは2つまで対応)
    terms = word.to_s.gsub(/(?:[[:space:]%_])+/, ' ').split(' ')[0..1]
    query = (['free_word like ?'] * terms.size).join(' and ')

    where(query, *terms.map { |term| "%#{term}%" })
  end

end
