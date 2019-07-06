# == Schema Information
#
# Table name: invoices
#
#  id         :bigint(8)        not null, primary key
#  quote_id   :bigint(8)
#  date       :date
#  expiration :date
#  subject    :string(191)
#  remarks    :text(65535)
#  memo       :text(65535)
#  free_word  :text(65535)
#  created_at :datetime         not null
#  updated_at :datetime         not null
#  attention  :text(65535)
#  pdf_url    :string(191)
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

  scope :invoiced_in, ->(datetime) { where(created_at: datetime) }

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

    self.free_word = "#{self.quote.quote_number} #{self.subject} #{self.date} #{self.quote&.client&.company_division&.company&.name} #{self.quote&.client&.name} #{self.quote&.user&.division&.name}"
  end

  ##
  # 名称検索
  #
  #
  def self.search(**parameters)

    _self = self

    #そもそも日付選択されてんのか
    if parameters[:date1] = "InvalidDate"

      terms = parameters[:name].to_s.gsub(/(?:[[:space:]%_])+/, ' ').split(' ')[0..1]
      query = (['free_word like ?'] * terms.size).join(' and ')
      _self = where(query, *terms.map { |term| "%#{term}%" })

      return _self
    else
      #検索に情報が入力されているか
      if parameters[:name].present?

        _self = Quote.all.deliverd_in(parameters[:date1].to_datetime.beginning_of_day..parameters[:date2].to_datetime.end_of_day)
        # 名称検索
        terms = parameters[:name].to_s.gsub(/(?:[[:space:]%_])+/, ' ').split(' ')[0..1]
        query = (['free_word like ?'] * terms.size).join(' and ')
        _self = where(query, *terms.map { |term| "%#{term}%" })

        return _self
      else

        # 日付検索
        _self = Quote.all.deliverd_in(parameters[:date1].to_datetime.beginning_of_day..parameters[:date2].to_datetime.end_of_day)

        return _self

      end
    end

  end


end
