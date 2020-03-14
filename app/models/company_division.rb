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

  belongs_to :company

  # 都道府県
  belongs_to_active_hash :prefecture

  # 部署
  has_many :clients, class_name: 'CompanyDivisionClient'

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
  def self.search(id)

    # 検索ワードをスペース区切りで配列化(検索ワードは2つまで対応)
    terms = word.to_s.gsub(/(?:[[:space:]%_])+/, ' ').split(' ')[0..1]
    query = (['free_word like ?'] * terms.size).join(' and ')

    where(query, *terms.map { |term| "%#{term}%" })
  end
end
