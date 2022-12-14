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
#  created_at                 :datetime         not null
#  updated_at                 :datetime         not null
#  status                     :integer          default(0)
#  free_word                  :text(65535)
#  project_number             :bigint(8)
#  price                      :integer          default(0)
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
  enum after_process: { after_process_unnecessary: 0, after_process_necessary: 10 }
  enum binding_work: { binding_works_unnecessary: 0, binding_works_necessary: 10 }

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

  has_many :histories, class_name: 'ProjectHistory',    dependent: :destroy

  #has_many :quote_projects
  #has_many :quotes, through: :quote_projects

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

  #----------------------------------------
  #  ** Methods **
  #----------------------------------------

  # ??????????????????????????????????????????????????????
  before_validation :set_free_word

  ##
  # ??????????????????????????????????????????????????????
  # @version 2018/06/10
  #
  def set_free_word

    self.free_word = "#{self.client&.name} #{self.client&.company_division&.company&.name} #{self.name} #{self.description} #{self.note}"
  end

  ##
  # ????????????
  # @version 2018/06/10
  #
  def self.search(word)

    # ???????????????????????????????????????????????????(??????????????????2???????????????)
    terms = word.to_s.gsub(/(?:[[:space:]%_])+/, ' ').split(' ')[0..1]
    query = (['free_word like ?'] * terms.size).join(' and ')

    where(query, *terms.map { |term| "%#{term}%" })
  end

end
