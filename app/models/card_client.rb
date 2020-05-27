# == Schema Information
#
# Table name: card_clients
#
#  id                         :bigint(8)        not null, primary key
#  card_id                    :bigint(8)
#  company_division_id        :bigint(8)
#  company_division_client_id :bigint(8)
#  created_at                 :datetime         not null
#  updated_at                 :datetime         not null
#  free_word                  :text(65535)
#  status                     :integer          default("custom")
#

class CardClient < ApplicationRecord

  #----------------------------------------
  #  ** Includes **
  #----------------------------------------

  #----------------------------------------
  #  ** Constants **
  #----------------------------------------

  #----------------------------------------
  #  ** Enums **
  #----------------------------------------

  enum status: { custom: 0, default: 10 }

  #----------------------------------------
  #  ** Validations **
  #----------------------------------------

  #----------------------------------------
  #  ** Associations **
  #----------------------------------------

  # 名刺
  belongs_to :card

  # 部署
  belongs_to :company_division

  # 担当者
  belongs_to :company_division_client

  # 名刺担当者テンプレート情報
  has_many :templates, class_name: 'ClientTemplate', dependent: :destroy

  has_many :task_card_clients, dependent: :delete_all

  has_many :quotes, through: :task_card_clients

  has_many :tasks, through: :task_card_clients

  accepts_nested_attributes_for :templates, allow_destroy: true, reject_if: :all_blank

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

    self.free_word = "#{self.card.name} #{self.card.company.name}"
  end

  ##
  # 名称検索
  # @version 2018/06/10
  #
  def self.search word

    # 検索ワードをスペース区切りで配列化(検索ワードは2つまで対応)
    terms = word.to_s.gsub(/(?:[[:space:]%_])+/, ' ').split(' ')[0..1]
    query = (['free_word like ?'] * terms.size).join(' and ')

    where(query, *terms.map { |term| "%#{term}%" })
  end

  ##
  # 部署検索
  # @version 2020/05/01
  #
  def division_search

    arr = []
    Card.all.pluck(:company_id).uniq.each do |r|

      company = Company.find(r)
      company.divisions.each { |d| arr.append({ company: company, division: d }) }
    end

    arr
  end

end
