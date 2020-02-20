# == Schema Information
#
# Table name: activities
#
#  id               :bigint(8)        not null, primary key
#  date             :date
#  status           :integer
#  memo             :text(65535)
#  attachment       :text(65535)
#  created_at       :datetime         not null
#  updated_at       :datetime         not null
#  free_word        :text(65535)
#  quote_id         :bigint(8)
#  accurary         :integer
#  next_action      :integer
#  next_action_date :date
#  scheduled_date   :date
#

class Activity < ApplicationRecord

  #----------------------------------------
  #  ** Includes **
  #----------------------------------------

  ActiveHash::Associations::ActiveRecordExtensions

  #----------------------------------------
  #  ** Constants **
  #----------------------------------------

  #----------------------------------------
  #  ** Enums **
  #----------------------------------------

  # 種類のenum
  # enum status: { meeting: 0, mail: 10, tell: 20,
  #  estimate: 30, workshop: 40, lost: 50, other: 60 }

  enum status: {
    contact: 0,
    hearing: 10,
    proposal: 20,
    estimate: 30,
    closing: 40,
    order: 50,
    lost: 60,
    rejection: 70
  }, _prefix: true

  # 確度のenum
  enum accurary: { a: 0, b: 10, c: 20 }

  # 次回アクションのenum
  enum next_action: {
    contact: 0,
    hearing: 10,
    proposal: 20,
    estimate: 30,
    closing: 40,
    order: 50,
    lost: 60,
    rejection: 70,
    other: 90
  }, _prefix: true

  #----------------------------------------
  #  ** Validations **
  #----------------------------------------

  #----------------------------------------
  #  ** Associations **
  #----------------------------------------

  belongs_to :quote

  #----------------------------------------
  #  ** Delegates **
  #----------------------------------------

  #----------------------------------------
  #  ** Scopes **
  #----------------------------------------

  scope :date_in, ->(datetime) { where(scheduled_date: datetime) }

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

    self.free_word = "#{self.memo} #{self.quote_id} #{self.quote&.user&.name} #{self.quote&.subject}"
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
