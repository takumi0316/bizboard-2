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

  enum status: { draft: 0, working: 10, deliverd: 20, complete: 30 }

  #----------------------------------------
  #  ** Validations **
  #----------------------------------------

  #----------------------------------------
  #  ** Associations **
  #----------------------------------------

  belongs_to :project, optional: true

  has_many :work_details, class_name: 'WorkDetail', dependent: :destroy

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
  def self.search(word)

    terms = word.to_s.gsub(/(?:[[:space:]%_])+/, ' ').split(' ')[0..1]
    query = (['free_word like ?'] * terms.size).join(' and ')

    where(query, *terms.map { |term| "%#{term}%" })
  end

  ##
  # パラメータによる検索
  # @version 2018/06/10
  #
  def self.by_params(**parameters)

    _self = self

    # ステータス
    _self = _self.where(status: parameters[:status]) if parameters[:status].present?

    _self = _self.joins(:project).merge(Project.deliverd_in(parameters[:date1].to_datetime.beginning_of_day..parameters[:date2].to_datetime.end_of_day)) if parameters[:date1].present? && parameters[:date2].present?

    _self
  end

end
