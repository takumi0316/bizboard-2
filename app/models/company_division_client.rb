# == Schema Information
#
# Table name: company_division_clients
#
#  id                   :bigint(8)        not null, primary key
#  company_division_id  :bigint(8)
#  user_id              :bigint(8)
#  name                 :string(191)
#  kana                 :string(191)
#  title                :integer          default("honorific")
#  tel                  :string(191)
#  email                :string(191)
#  note                 :text(65535)
#  free_word            :text(65535)
#  status               :integer          default(0)
#  user_type            :integer          default(0)
#  password_digest      :string(191)
#  provider             :string(191)
#  uid                  :string(191)
#  sign_in_count        :integer          default(0)
#  current_sign_in_at   :datetime
#  last_sign_in_at      :datetime
#  current_sign_in_ip   :string(191)
#  last_sign_in_ip      :string(191)
#  remember_created_at  :datetime
#  confirmation_token   :string(191)
#  confirmed_at         :datetime
#  confirmation_sent_at :datetime
#  unconfirmed_email    :string(191)
#  lastaccesstask       :datetime         default(Mon, 06 Apr 2020 15:31:43 JST +09:00)
#  opt                  :integer          default(0)
#  created_at           :datetime         not null
#  updated_at           :datetime         not null
#

class CompanyDivisionClient < ApplicationRecord

  #----------------------------------------
  #  ** Includes **
  #----------------------------------------

  has_secure_password

  #----------------------------------------
  #  ** Constants **
  #----------------------------------------

  #----------------------------------------
  #  ** Enums **
  #----------------------------------------

  # 敬称
  enum title: { nothing: 0, honorific: 10, normal: 20 }

  # ユーザー区分(admin: 20消しました)
  enum user_type: { general: 0, division: 10, admin: 20}


  #----------------------------------------
  #  ** Validations **
  #----------------------------------------

  #----------------------------------------
  #  ** Associations **
  #----------------------------------------

  belongs_to :company_division

  belongs_to :user, optional: true

  # 案件
  has_many :projects, -> { order(id: :desc) }

  # 見積
  has_many :quotes, -> { order(id: :desc) }

  # 名刺担当者
  has_many :card_clients

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

    self.free_word = "#{self.company_division&.company&.name} #{self.company_division&.company&.kana} #{self.company_division&.name} #{self.company_division&.kana} #{self.name} #{self.kana} #{self.note}"
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
