# == Schema Information
#
# Table name: projects
#
#  id                         :bigint(8)        not null, primary key
#  user_id                    :bigint(8)
#  company_division_client_id :bigint(8)
#  name                       :string(191)
#  description                :text(65535)
#  project_category           :integer          default("project_print")
#  project_count              :integer          default(0)
#  binding_work               :integer          default("binding_works_unnecessary")
#  after_process              :integer          default("after_process_unnecessary")
#  note                       :text(65535)
#  status                     :integer          default(0)
#  free_word                  :text(65535)
#  project_number             :bigint(8)
#  price                      :integer          default(0)
#  code                       :string(191)
#  created_at                 :datetime         not null
#  updated_at                 :datetime         not null
#

class Project < ApplicationRecord

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

  belongs_to :user, optional: true

  has_many :histories, class_name: 'ProjectHistory',    dependent: :destroy

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

    self.free_word = "#{self.name} #{self.project_category_i18n} #{self.note}"
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
