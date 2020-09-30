# == Schema Information
#
# Table name: companies
#
#  id                       :bigint(8)        not null, primary key
#  name                     :string(191)
#  kana                     :string(191)
#  note                     :text(65535)
#  free_word                :text(65535)
#  created_at               :datetime         not null
#  updated_at               :datetime         not null
#  approval_status          :integer          default("nothing")
#  online_web_business_card :integer          default("disabled")
#

class Company < ApplicationRecord

  #----------------------------------------
  #  ** Includes **
  #----------------------------------------

  #----------------------------------------
  #  ** Constants **
  #----------------------------------------

  HEADER_TO_SYM_MAP = {
    'ID' => :id,
    '部署名' => :division_name,
    '氏名' => :name,
    'メールアドレス' => :mail,
    'パスワード' => :password,
  }


  #----------------------------------------
  #  ** Enums **
  #----------------------------------------

  enum approval_status: { nothing: 0, approval: 10 }

  enum online_web_business_card: { disabled: 0, enabled: 10 }

  #----------------------------------------
  #  ** Validations **
  #----------------------------------------

  #----------------------------------------
  #  ** Associations **
  #----------------------------------------

  # 部署
  has_many :divisions, class_name: 'CompanyDivision'

  # 請求情報
  has_many :profits

  # 名刺テンプレート
  has_many :cards

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
  # @version 2018/06/10
  #
  def self.search(word)

    # 検索ワードをスペース区切りで配列化(検索ワードは2つまで対応)
    terms = word.to_s.gsub(/(?:[[:space:]%_])+/, ' ').split(' ')[0..1]
    query = (['free_word like ?'] * terms.size).join(' and ')

    where(query, *terms.map { |term| "%#{term}%" })
  end

  #csv読み込んで担当者を作成する機能
  def self.import_client(file, company_id)

    header_converter = lambda { |h| HEADER_TO_SYM_MAP[h] }

    csv = CSV.read(file.path, headers: :first_row, header_converters: header_converter, converters: :integer, skip_blanks: true, encoding: 'UTF-8')
    group = csv.group_by{|u| u[:division_name] }

    error_division = []

    group.each do |row,r|

      #csvの中に取引先部署と対応する部署があるか検索
      division = CompanyDivision.all.where(company_id: company_id).find_by(name: row)

      if division.blank?
        #部署無い場合
        error_division << row
        next
      else
        #部署ある場合
        division_id = division.id
      end

      new_client = []

      # 同じ案件番号の内容でeach処理
      begin
        r.each do |ri|
          new_client << CompanyDivisionClient.new(company_division_id: division_id, name: ri[:name], email: ri[:mail], confirmation_token: 'FactoryToken', confirmed_at: Time.now, confirmation_sent_at: Time.now, password: ri[:password].to_s, password_confirmation: ri[:password].to_s )
        end
        CompanyDivisionClient.import new_client
      end
    end
  end

end
