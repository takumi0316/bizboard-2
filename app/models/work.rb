# == Schema Information
#
# Table name: works
#
#  id         :bigint(8)        not null, primary key
#  project_id :bigint(8)
#  price      :integer          default(0)
#  cost       :integer          default(0)
#  status     :integer          default("draft")
#  created_at :datetime         not null
#  updated_at :datetime         not null
#  free_word  :text(65535)
#  notices    :text(65535)
#

class Work < ApplicationRecord

  #----------------------------------------
  #  ** Includes **
  #----------------------------------------

  #----------------------------------------
  #  ** Constants **
  #----------------------------------------

  #----------------------------------------
  #  ** Enums **
  #----------------------------------------

  enum status: { inactive: 0, active: 10 }
  enum status: { draft: 0, working: 10, delivered: 20, completed: 30 }

  #----------------------------------------
  #  ** Validations **
  #----------------------------------------

  #----------------------------------------
  #  ** Associations **
  #----------------------------------------

  belongs_to :project

  has_many :work_details, class_name: 'WorkDetail', dependent: :destroy

  has_many :subcontractor, class_name: 'WorkSubcontractor', dependent: :destroy

  has_many :subcontractor_detail, class_name: 'WorkSubcontractorDetail', dependent: :destroy

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
  #
  #
  def set_free_word

    self.free_word = "#{self.project.client&.company_division&.company&.name} #{self.project.client&.name} #{self.project.name} #{self.status} #{self.project.deliver_at}"
  end

  ##
  # 名称検索
  #
  #
  def self.search(**parameters)

    _self = self
    if parameters[:name].present? && parameters[:status] == 'ステータス'

      # 名称検索
      terms = parameters[:name].to_s.gsub(/(?:[[:space:]%_])+/, ' ').split(' ')[0..1]
      query = (['free_word like ?'] * terms.size).join(' and ')
      _self = _self.where(query, *terms.map { |term| "%#{term}%" })
      # 日付検索
      _self = _self.joins(:project).merge(Project.deliverd_in(parameters[:date1].to_datetime.beginning_of_day..parameters[:date2].to_datetime.end_of_day))
      return _self
    elsif parameters[:name].present? && parameters[:status] != 'ステータス'

      # 名称検索
      terms = parameters[:name].to_s.gsub(/(?:[[:space:]%_])+/, ' ').split(' ')[0..1]
      query = (['free_word like ?'] * terms.size).join(' and ')
      where(query, *terms.map { |term| "%#{term}%" })
      # ステータス検索
      _self = _self.where(status: parameters[:status])
      # 日付検索
      _self = _self.joins(:project).merge(Project.deliverd_in(parameters[:date1].to_datetime.beginning_of_day..parameters[:date2].to_datetime.end_of_day))
      return _self
    end
     return _self
  end

end
