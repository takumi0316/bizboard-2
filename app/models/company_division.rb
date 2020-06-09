# == Schema Information
#
# Table name: company_divisions
#
#  id            :bigint(8)        not null, primary key
#  company_id    :bigint(8)
#  name          :string(191)
#  kana          :string(191)
#  zip           :string(191)
#  tel           :string(191)
#  prefecture_id :integer
#  address1      :string(191)
#  address2      :string(191)
#  note          :text(65535)
#  created_at    :datetime         not null
#  updated_at    :datetime         not null
#  free_word     :text(65535)
#

class CompanyDivision < ApplicationRecord

  #----------------------------------------
  #  ** Includes **
  #----------------------------------------

  extend ActiveHash::Associations::ActiveRecordExtensions

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

  # 都道府県
  belongs_to_active_hash :prefecture

  # 会社
  belongs_to :company

  # 担当者
  has_many :clients, class_name: 'CompanyDivisionClient'

  # 名刺担当者
  has_many :card_clients

  # quote
  has_one :inventory

  #----------------------------------------
  #  ** Scopes **
  #----------------------------------------

  #----------------------------------------
  #  ** Methods **
  #----------------------------------------

  before_validation :set_free_word

  ##
  # フリーワード検索用文字列をセットする
  # @version 2018/06/10
  #
  def set_free_word

    self.free_word = "#{self.company.name} #{self.company.kana} #{self.name} #{self.kana} #{self.note}"
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

  ##
  # free_wordにワードを仕込むスクリプト
  # @version 2020/06/09
  #
  def self.all_set_free_word

    CompanyDivision.where(free_word: nil).each { |r| r.update! free_word: "#{r.company.name} #{r.company.kana} #{r.name} #{r.kana}" }
  end
end
