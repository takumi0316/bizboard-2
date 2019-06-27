# == Schema Information
#
# Table name: subcontractors
#
#  id         :bigint(8)        not null, primary key
#  name       :string(191)
#  kana       :string(191)
#  note       :text(65535)
#  created_at :datetime         not null
#  updated_at :datetime         not null
#  free_word  :text(65535)
#

class Subcontractor < ApplicationRecord

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
  has_many :divisions, class_name: 'SubcontractorDivision', dependent: :destroy

  #請求情報
  has_many :payments

  #経費入力
  has_many :expendables

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

    self.free_word = "#{self.name} #{self.kana}"
  end

  ##
  # 名称検索
  # @version
  #
  def self.search(word)

    # 検索ワードをスペース区切りで配列化(検索ワードは2つまで対応)
    terms = word.to_s.gsub(/(?:[[:space:]%_])+/, ' ').split(' ')[0..1]
    query = (['name like ?'] * terms.size).join(' and ')

    where(query, *terms.map { |term| "%#{term}%" })
  end
end
