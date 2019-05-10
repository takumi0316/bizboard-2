# == Schema Information
#
# Table name: invoices
#
#  id            :bigint(8)        not null, primary key
#  quote_id      :bigint(8)
#  date          :date
#  expiration    :date
#  subject       :string(191)
#  remarks       :text(65535)
#  memo          :text(65535)
#  free_word     :text(65535)
#  created_at    :datetime         not null
#  updated_at    :datetime         not null
#  attention     :integer
#  mf_invoice_id :string(191)
#  pdf_url       :string(191)
#

class Invoice < ApplicationRecord

  #----------------------------------------
  #  ** Includes **
  #----------------------------------------

  #----------------------------------------
  #  ** Constants **
  #----------------------------------------

  #----------------------------------------
  #  ** Enums **
  #----------------------------------------

  enum attention: { messrs: 0, dear: 10}

  #----------------------------------------
  #  ** Validations **
  #----------------------------------------

  #----------------------------------------
  #  ** Associations **
  #----------------------------------------

  # 案件
  belongs_to :quote

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

    self.free_word = "#{self.quote.quote_number} #{self.subject} #{self.remarks} #{self.memo} #{self.quote.client.company_division.company.name} #{self.quote.client.company_division.name} #{self.quote.client.name}"
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
