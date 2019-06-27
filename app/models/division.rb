# == Schema Information
#
# Table name: divisions
#
#  id            :bigint(8)        not null, primary key
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
#

class Division < ApplicationRecord

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

  has_many :users

  #作業管理
  has_many :works

  #見積り
  has_many :quotes

  # 都道府県
  belongs_to_active_hash :prefecture

  #経費入力
  has_many :expendables

  #----------------------------------------
  #  ** Scopes **
  #----------------------------------------

  #----------------------------------------
  #  ** Methods **
  #----------------------------------------

end
