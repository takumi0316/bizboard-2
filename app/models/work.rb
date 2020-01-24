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

  # 部署
  belongs_to :division, optional: true

  has_many :work_details, class_name: 'WorkDetail', dependent: :destroy

  has_many :subcontractor, class_name: 'WorkSubcontractor', dependent: :destroy

  has_many :subcontractor_detail, class_name: 'WorkSubcontractorDetail', dependent: :destroy

  #----------------------------------------
  #  ** Scopes **
  #----------------------------------------
  #Quoteのdeliverd_atを使えるように
  scope :asc_deliverd_at, -> { joins(:quote).merge(Quote.deliverd_at) }
  #Workのステータス未作業のもの検索
  scope :draft, -> { where(status: 0) }
  #Workのステータス作業中のもの検索
  scope :working, ->{ where(status: 10) }

  #----------------------------------------
  #  ** Methods **
  #----------------------------------------

  # フリーワード検索用文字列をセットする
  before_validation :set_free_word

  ##
  # Iterate
  # @version 2020/01/06
  #
  def iterate

		reshape = []
		self.subcontractor&.pluck(:id, :subcontractor_division_client_id, :order_date, :delivery_date, :delivery_destination, :notices, :work_id).each do |i|

			reshape_detail = []
			associative = { id: nil, client: nil, division: nil, subcontractor: nil, order_date: '', delivery_date: '', delivery_destination: '', notices: '', details: nil }

			associative[:id]                    = i[0] ? i[0] : nil
			associative[:client]                = i[1] ? SubcontractorDivisionClient.find(i[1]) : nil
			associative[:division]              = i[1] ? SubcontractorDivision.find(SubcontractorDivisionClient.find(i[1]).subcontractor_division_id) : nil
			associative[:subcontractor]         = i[1] ? Subcontractor.find(SubcontractorDivision.find(SubcontractorDivisionClient.find(i[1]).subcontractor_division_id).subcontractor_id) : nil
			associative[:order_date]            = i[2] ? i[2] : ''
			associative[:delivery_date]         = i[3] ? i[3] : ''
			associative[:delivery_destination]  = i[4] ? i[4] : ''
			associative[:notices]               = i[5] ? i[5] : ''
			i[0] ? WorkSubcontractor.find(i[0]).detail.each { |detail| reshape_detail.push(detail) if detail.work_id == self.id && detail.work_subcontractor_id == i[0] } : nil
			associative[:details]                = reshape_detail

			reshape.push(associative)
    end

    reshape
  end

  ##
  # フリーワード検索用文字列をセットする(顧客、自社担当者、案件名、案件番号、期日、自部署名、作業担当者)
  #
  #
  def set_free_word

    self.free_word = "#{self.quote&.client&.company_division&.company&.name} #{self.quote&.user&.name} #{self.quote&.subject} #{self.quote&.quote_number} #{self.quote&.deliver_at} #{self.division&.name} #{self.work_details&.pluck(:client_name).join(' ')}"
  end

  ##
  # 名称検索
  #
  #
  def self.search(**parameters)

    _self = self
    # フリーワードが入っていて、ステータスが未選択
    if parameters[:name].present? && parameters[:status] == ''

      # 名称検索
      _self = _self.joins(:quote).merge(Quote.deliverd_in(parameters[:date1].to_datetime.beginning_of_day..parameters[:date2].to_datetime.end_of_day))
      terms = parameters[:name].to_s.gsub(/(?:[[:space:]%_])+/, ' ').split(' ')[0..1]
      query = (['works.free_word like ?'] * terms.size).join(' and ')
      _self = _self.where(query, *terms.map { |term| "%#{term}%" })
      # 日付検索
      _self
    # フリーワードが入っていて、ステータスが選択されている
    elsif parameters[:name].present? && parameters[:status] != ''

      _self = _self.joins(:quote).merge(Quote.deliverd_in(parameters[:date1].to_datetime.beginning_of_day..parameters[:date2].to_datetime.end_of_day))


      # 名称検索
      terms = parameters[:name].to_s.gsub(/(?:[[:space:]%_])+/, ' ').split(' ')[0..1]
      query = (['works.free_word like ?'] * terms.size).join(' and ')
      _self = _self.where(query, *terms.map { |term| "%#{term}%" }).where(status: parameters[:status])

      # 日付検索
      _self

    # フリーワードが空で、ステータスが未選択
    elsif parameters[:name].blank? && parameters[:status] == ''

      _self = _self.joins(:quote).merge(Quote.deliverd_in(parameters[:date1].to_datetime.beginning_of_day..parameters[:date2].to_datetime.end_of_day))
      _self
    # フリーワードが空で、ステータスが入力されている
    elsif parameters[:name].blank? && parameters[:status] != nil && parameters[:status] != ''

      _self = where(status: parameters[:status])
      # 日付検索
      _self = _self.joins(:quote).merge(Quote.deliverd_in(parameters[:date1].to_datetime.beginning_of_day..parameters[:date2].to_datetime.end_of_day))
      _self
    end
    _self
  end

end
