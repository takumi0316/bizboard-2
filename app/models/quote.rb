# == Schema Information
#
# Table name: quotes
#
#  id         :bigint(8)        not null, primary key
#  project_id :bigint(8)
#  date       :date
#  expiration :date
#  subject    :string(191)
#  remarks    :text(65535)
#  memo       :text(65535)
#  free_word  :text(65535)
#  created_at :datetime         not null
#  updated_at :datetime         not null
#

class Quote < ApplicationRecord

  #----------------------------------------
  #  ** Includes **
  #----------------------------------------

  #----------------------------------------
  #  ** Constants **
  #----------------------------------------

  #----------------------------------------
  #  ** Enums **
  #----------------------------------------

  #のenum
  enum attention: { messrs: 0, dear: 10}


  #----------------------------------------
  #  ** Validations **
  #----------------------------------------

  #----------------------------------------
  #  ** Associations **
  #----------------------------------------

  belongs_to :project

  has_many :quote_items
  accepts_nested_attributes_for :quote_items

  #----------------------------------------
  #  ** Delegates **
  #----------------------------------------

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

    self.free_word = "#{self.id} #{self.project_id} #{self.project&.user&.name} #{self.project&.name}  #{self.project&.project_number} #{self.subject}"
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
