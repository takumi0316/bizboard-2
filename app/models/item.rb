# == Schema Information
#
# Table name: items
#
#  id          :bigint(8)        not null, primary key
#  name        :string(191)
#  mf_item_id  :string(191)
#  code        :string(191)
#  note        :string(191)
#  quantity    :integer          default(0)
#  unit_price  :integer          default(0)
#  unit        :string(191)
#  excise      :boolean          default(FALSE)
#  created_at  :datetime         not null
#  updated_at  :datetime         not null
#  division_id :integer
#  free_word   :text(65535)
#

class Item < ApplicationRecord

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

  # 自社部署
  belongs_to :division, optional: true

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

    self.free_word = "#{self.name} #{self.code} #{self.division&.name} #{self.note}"
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
