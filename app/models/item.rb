# == Schema Information
#
# Table name: items
#
#  id              :bigint(8)        not null, primary key
#  name            :string(191)
#  mf_item_id      :string(191)
#  code            :string(191)
#  note            :string(191)
#  unit_price      :integer
#  unit_label      :string(191)
#  consumption_tax :integer
#  created_at      :datetime         not null
#  updated_at      :datetime         not null
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
  # @version 2018/06/10
  #
  def self.search(word)

    # 検索ワードをスペース区切りで配列化(検索ワードは2つまで対応)
    terms = word.to_s.gsub(/(?:[[:space:]%_])+/, ' ').split(' ')[0..1]
    query = (['name like ?'] * terms.size).join(' and ')

    where(query, *terms.map { |term| "%#{term}%" })
  end

end
