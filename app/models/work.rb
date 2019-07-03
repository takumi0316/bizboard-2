# == Schema Information
#
# Table name: works
#
#  id          :bigint(8)        not null, primary key
#  quote_id    :bigint(8)
#  price       :integer          default(0)
#  cost        :integer          default(0)
#  status      :integer          default("draft")
#  created_at  :datetime         not null
#  updated_at  :datetime         not null
#  free_word   :text(65535)
#  notices     :text(65535)
#  division_id :bigint(8)
#

class Work < ApplicationRecord

  #----------------------------------------
  #  ** Includes **
  #----------------------------------------

  # 複製
  include DeepCloneable

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

  belongs_to :quote

  #部署
  belongs_to :division, optional: true

  has_many :work_details, class_name: 'WorkDetail', dependent: :destroy

  has_many :subcontractor, class_name: 'WorkSubcontractor', dependent: :destroy

  has_many :subcontractor_detail, class_name: 'WorkSubcontractorDetail', dependent: :destroy

  #----------------------------------------
  #  ** Scopes **
  #----------------------------------------
  #Quoteのdeliverd_atを使えるように
  scope :asc_deliverd_at, -> {joins(:quote).merge(Quote.deliverd_at)}

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

    self.free_word = "#{self.quote&.client&.company_division&.company&.name} #{self.quote&.client&.name} #{self.quote&.subject} #{self.quote&.quote_number} #{self.status} #{self.quote&.deliver_at} #{self.division&.name}"
  end

  ##
  # 名称検索
  #
  #
  def self.search(**parameters)

    _self = self
    # フリーワードが入っていて、ステータスが未選択
    if parameters[:name].present? && parameters[:status] == 'ステータス'

      # 名称検索
      _self = _self.joins(:quote).merge(Quote.deliverd_in(parameters[:date1].to_datetime.beginning_of_day..parameters[:date2].to_datetime.end_of_day))
      terms = parameters[:name].to_s.gsub(/(?:[[:space:]%_])+/, ' ').split(' ')[0..1]
      query = (['works.free_word like ?'] * terms.size).join(' and ')
      _self = where(query, *terms.map { |term| "%#{term}%" })
      # 日付検索
      return _self
    # フリーワードが入っていて、ステータスが選択されている
    elsif parameters[:name].present? && parameters[:status] != 'ステータス'

      _self = _self.joins(:quote).merge(Quote.deliverd_in(parameters[:date1].to_datetime.beginning_of_day..parameters[:date2].to_datetime.end_of_day))


      # 名称検索
      terms = parameters[:name].to_s.gsub(/(?:[[:space:]%_])+/, ' ').split(' ')[0..1]
      query = (['works.free_word like ?'] * terms.size).join(' and ')
      _self = where(query, *terms.map { |term| "%#{term}%" }).where(status: parameters[:status])

      # 日付検索
      return _self

    # フリーワードが空で、ステータスが未選択
    elsif parameters[:name].blank? && parameters[:status] == 'ステータス'

      _self = _self.joins(:quote).merge(Quote.deliverd_in(parameters[:date1].to_datetime.beginning_of_day..parameters[:date2].to_datetime.end_of_day))
      return _self
    # フリーワードが空で、ステータスが入力されている
    elsif parameters[:name].blank? && parameters[:status] != nil && parameters[:status] != 'ステータス'

      _self = where(status: parameters[:status])
      # 日付検索
      _self = _self.joins(:quote).merge(Quote.deliverd_in(parameters[:date1].to_datetime.beginning_of_day..parameters[:date2].to_datetime.end_of_day))
      return _self
    end
     return _self
  end

end
