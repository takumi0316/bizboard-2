# == Schema Information
#
# Table name: quotes
#
#  id                         :bigint(8)        not null, primary key
#  date                       :date
#  expiration                 :date
#  subject                    :string(191)
#  remarks                    :text(65535)
#  memo                       :text(65535)
#  free_word                  :text(65535)
#  created_at                 :datetime         not null
#  updated_at                 :datetime         not null
#  price                      :integer
#  attention                  :integer
#  pdf_url                    :text(65535)
#  mf_quote_id                :text(65535)
#  user_id                    :integer
#  status                     :integer          default("draft")
#  quote_number               :string(191)
#  company_division_client_id :integer
#  quote_type                 :integer
#  channel                    :integer
#  deliver_at                 :datetime
#  deliver_type               :integer
#  deliver_type_note          :text(65535)
#  division_id                :bigint(8)
#  discount                   :integer
#

class Quote < ApplicationRecord

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

  #のenum
  enum attention: { messrs: 0, dear: 10}

  enum status: { draft: 0, estimated: 10, working: 20, end_work: 30, invoicing: 40, complete: 50, lost: 60 }

  enum quote_type: { contract: 0, sales: 10,  copy: 20}
  enum channel: { estimate: 0, bpr_erp: 10, reception: 20, channel_other: 30 }
  enum deliver_type: { seat: 0, location: 10, pickup: 20, bizstant: 30, other: 40 }


  #----------------------------------------
  #  ** Validations **
  #----------------------------------------

  #----------------------------------------
  #  ** Associations **
  #----------------------------------------

  belongs_to :user, optional: true
  belongs_to :client, optional: true, class_name: 'CompanyDivisionClient', foreign_key: :company_division_client_id

  #部署
  belongs_to :division, optional: true

  has_many :quote_projects, dependent: :destroy
  #has_many :projects, through: :quote_projects

  has_many :quote_items
  accepts_nested_attributes_for :quote_items

  has_one  :invoice,    dependent: :destroy

  has_one  :work, dependent: :destroy

  has_one  :activity, dependent: :destroy

  #----------------------------------------
  #  ** Delegates **
  #----------------------------------------

  #----------------------------------------
  #  ** Scopes **
  #----------------------------------------

  scope :deliverd_in, ->(datetime) { where(deliver_at: datetime) }

  scope :deliverd_at, ->{ order(:deliver_at) }

  #----------------------------------------
  #  ** Methods **
  #----------------------------------------

  # 見積もり番号をセットする
  after_create :set_quote_number

  # フリーワード検索用文字列をセットする
  before_validation :set_free_word

  ##
  # フリーワード検索用文字列をセットする
  # @version 2018/06/10
  #
  def set_free_word

    self.free_word = "#{self.subject} #{self.user&.name} #{self.division&.name} #{self.created_at} #{self.client&.company_division&.company&.name} #{self.client&.company_division&.name} #{self.client&.name}"
  end

  ##
  # 見積もり番号をセットする
  # @version 2019/04/02
  #
  def set_quote_number

    update_columns(quote_number: "#{created_at.strftime('%Y%m%d')}#{id}")
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
      _self = Quote.all.deliverd_in(parameters[:date1].to_datetime.beginning_of_day..parameters[:date2].to_datetime.end_of_day)
      terms = parameters[:name].to_s.gsub(/(?:[[:space:]%_])+/, ' ').split(' ')[0..1]
      query = (['free_word like ?'] * terms.size).join(' and ')
      _self = where(query, *terms.map { |term| "%#{term}%" })
      # 日付検索
      return _self
    # フリーワードが入っていて、ステータスが選択されている
    elsif parameters[:name].present? && parameters[:status] != 'ステータス'

      _self = Quote.all.deliverd_in(parameters[:date1].to_datetime.beginning_of_day..parameters[:date2].to_datetime.end_of_day)

      # 名称検索
      terms = parameters[:name].to_s.gsub(/(?:[[:space:]%_])+/, ' ').split(' ')[0..1]
      query = (['free_word like ?'] * terms.size).join(' and ')
      _self = where(query, *terms.map { |term| "%#{term}%" }).where(status: parameters[:status])

      # 日付検索
      return _self

    # フリーワードが空で、ステータスが未選択
    elsif parameters[:name].blank? && parameters[:status] == 'ステータス'

      #日付検索
      _self = Quote.all.deliverd_in(parameters[:date1].to_datetime.beginning_of_day..parameters[:date2].to_datetime.end_of_day)
      return _self
    # フリーワードが空で、ステータスが入力されている
    elsif parameters[:name].blank? && parameters[:status] != nil && parameters[:status] != 'ステータス'

      #日付検索
      _self = Quote.all.deliverd_in(parameters[:date1].to_datetime.beginning_of_day..parameters[:date2].to_datetime.end_of_day)
      #ステータス検索
      _self = where(status: parameters[:status])
      return _self
    end
     return _self
  end

end
