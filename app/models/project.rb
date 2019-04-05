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
#  project_type               :integer          default("contract")
#  channel                    :integer          default("estimate")
#  deliver_at                 :datetime
#  deliver_type               :integer          default("seat")
#  deliver_type_note          :text(65535)
#  binding_work               :integer          default("binding_works_unnecessary")
#  after_process              :integer          default("after_process_unnecessary")
#  note                       :text(65535)
#  created_at                 :datetime         not null
#  updated_at                 :datetime         not null
#  status                     :integer          default("draft")
#  free_word                  :text(65535)
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

  enum project_category: { project_print: 0, project_card: 10, project_copy: 20, project_bind: 30, project_scan: 40, project_other: 50 }
  enum project_type: { contract: 0, sales: 10 }
  enum channel: { estimate: 0, bpr_erp: 10, reception: 20, channel_other: 30 }
  enum deliver_type: { seat: 0, location: 10, pickup: 20, other: 30 }

  enum after_process: { after_process_unnecessary: 0, after_process_necessary: 10 }
  enum binding_work: { binding_works_unnecessary: 0, binding_works_necessary: 10 }

  enum status: { draft: 0, estimated: 10, pre_work: 20, working: 30, end_work: 40, deliverd: 50, invoicing: 60, complete: 70 }

  #----------------------------------------
  #  ** Validations **
  #----------------------------------------

  #----------------------------------------
  #  ** Associations **
  #----------------------------------------

  belongs_to :user, optional: true
  belongs_to :client, optional: true, class_name: 'CompanyDivisionClient', foreign_key: :company_division_client_id

  has_one  :bind,    class_name: 'ProjectBind',    dependent: :destroy
  has_one  :card,    class_name: 'ProjectCard',    dependent: :destroy
  has_one  :copy,    class_name: 'ProjectCopy',    dependent: :destroy
  has_one  :print,   class_name: 'ProjectPrint',   dependent: :destroy
  has_one  :scan,    class_name: 'ProjectScan',    dependent: :destroy

  has_one  :project_after_process, dependent: :destroy
  has_one  :project_binding_work,  dependent: :destroy

  has_one  :work,    dependent: :destroy

  has_one  :activity,    dependent: :destroy

  has_many :histories, class_name: 'ProjectHistory',    dependent: :destroy

  has_many :quotes

  accepts_nested_attributes_for :bind
  accepts_nested_attributes_for :card
  accepts_nested_attributes_for :copy
  accepts_nested_attributes_for :print
  accepts_nested_attributes_for :scan

  accepts_nested_attributes_for :project_after_process
  accepts_nested_attributes_for :project_binding_work

  #----------------------------------------
  #  ** Scopes **
  #----------------------------------------

  scope :deliverd_in, ->(datetime) { where(deliver_at: datetime) }

  #----------------------------------------
  #  ** Methods **
  #----------------------------------------

  # フリーワード検索用文字列をセットする
  before_validation :set_free_word

  # 案件番号をセットする
  after_create :set_project_number

  ##
  # フリーワード検索用文字列をセットする
  # @version 2018/06/10
  #
  def set_free_word

    self.free_word = "#{self.user&.name} #{self.client&.name} #{self.client&.company_division&.company&.name} #{self.name} #{self.description} #{self.note}"
  end

  ##
  # 案件番号をセットする
  # @version 2019/04/02
  #
  def set_project_number

    update_columns(:project_number => "#{created_at.strftime('%Y%m%d')}#{id}")
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
