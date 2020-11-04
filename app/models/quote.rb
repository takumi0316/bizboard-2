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
#  price                      :integer          default(0), not null
#  attention                  :integer
#  pdf_url                    :text(65535)
#  user_id                    :integer
#  status                     :integer          default("unworked")
#  quote_number               :string(191)
#  company_division_client_id :integer
#  quote_type                 :integer
#  channel                    :integer
#  deliver_at                 :datetime
#  deliver_type               :integer
#  deliver_type_note          :text(65535)
#  division_id                :bigint(8)
#  discount                   :integer
#  tax_type                   :integer
#  payment_terms              :integer
#  tax                        :float(24)        default(1.1)
#  reception                  :integer
#  temporary_price            :integer
#  profit_price               :integer          default(0), not null
#  created_at                 :datetime         not null
#  updated_at                 :datetime         not null
#  last_company               :string(191)
#  last_division              :string(191)
#  last_client                :string(191)
#  issues_date                :date
#  delivery_note_date         :date
#  lock                       :boolean          default(FALSE), not null
#  drive_folder_id            :string(191)
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

  enum attention: { messrs: 0, dear: 10 }

  enum status: { unworked: 0, draft: 10, estimated: 20, working: 30, end_work: 40, invoicing: 50, complete: 60, lost: 70, rejection: 80 }

  enum quote_type: { contract: 0, copy: 10 }

  enum channel: { estimate: 0, bpr_erp: 10, reception: 20, channel_other: 30 }

  enum reception: { acceptance: 0, mail: 10, delivery: 20, reservation: 30, konpro: 40, reception_other: 50 }

  enum deliver_type: { seat: 0, location: 10, pickup: 20, bizstant: 30, other: 40 }

  enum tax_type: { taxation: 0, exemption: 10 }

  enum payment_terms: { postpaid: 0, advance: 10 }

  #----------------------------------------
  #  ** Validations **
  #----------------------------------------

  #----------------------------------------
  #  ** Associations **
  #----------------------------------------

  # file
  has_many_attached :files, dependent: :detach
  has_one_attached :quotation_pdf, dependent: :detach
  has_one_attached :delivery_note_pdf, dependent: :detach

  # Jiiユーザー
  belongs_to :user, optional: true

  # 取引先担当者
  belongs_to :client, optional: true, class_name: 'CompanyDivisionClient', foreign_key: :company_division_client_id

  # 部署
  belongs_to :division, optional: true

  # 請求書
  has_one  :invoice,    dependent: :destroy

  # 請求情報
  has_one  :profit,    dependent: :destroy

  # 作業書
  has_one  :work, dependent: :destroy

  # 活動履歴
  has_one  :activity, -> { order(created_at: :desc) }, dependent: :destroy

  # ec始まったらコメントアウト外す
  has_one :task, dependent: :destroy

  has_one :inquiry, dependent: :destroy

  # 品目
  has_many :quote_projects, dependent: :destroy

  has_many :task_card_clients

  # 名刺担当者情報
  has_many :card_clients, through: :task_card_clients

  accepts_nested_attributes_for :quote_projects

  #----------------------------------------
  #  ** Delegates **
  #----------------------------------------

  #----------------------------------------
  #  ** Scopes **
  #----------------------------------------

  scope :deliverd_in, ->(datetime) { where(deliver_at: datetime) }

  scope :deliverd_at, -> { order(:deliver_at) }

  #----------------------------------------
  #  ** Methods **
  #----------------------------------------

  # 見積もり番号をセットする
  after_create :set_quote_number

  # フリーワード検索用文字列をセットする
  before_validation :set_free_word

  # 静的に会社情報を保存する
  before_validation :set_company_information

  ##
  # フリーワード検索用文字列をセットする
  # @version 2018/06/10
  #
  def set_free_word

    self.free_word = "#{self.quote_number} #{self.subject} #{self.user&.name} #{self.division&.name} #{self.created_at} #{self.client&.company_division&.company&.name} #{self.client&.company_division&.name} #{self.client&.name} #{self.last_client} #{self.last_division} #{self.last_client}"
  end

  ##
  # 見積もり番号をセットする
  # @version 2019/04/02
  #
  def set_quote_number

    update_columns(quote_number: "#{created_at.strftime('%Y%m%d')}#{id}")
  end

  def set_company_information

    return if self.client.nil? && self.persisted?
    self.last_company = self.client.company_division.company.name
    self.last_division = self.client.company_division.name
    self.last_client = self.client.name
  end

  ##
  # 一括ロック
  # @version 2019/04/02
  #
  def self.all_lock(name, status, date1, date2)

    _self = Quote.all.deliverd_in(date1..date2)
    # フリーワードが入っている
    if name.present?
      # 名称検索
      terms = name.to_s.gsub(/(?:[[:space:]%_])+/, ' ').split(' ')[0..1]
      query = (['free_word like ?'] * terms.size).join(' and ')
      _self = _self.where(query, *terms.map { |term| "%#{term}%" })
      # ステータス選択されていればステータスで絞る
      _self = _self.send(status) if status.present?
      _self.update(lock: true)

    # フリーワードが空で、ステータスが未選択
    elsif name.blank? && status.blank?

      # 日付検索
      _self.update(lock: true)
    # フリーワードが空で、ステータスが入力されている
    elsif name.blank? && status.blank?

      # ステータス検索
      _self.send(status).update(lock: true)
      return _self
    end
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
      _self = Quote.all.deliverd_in(Time.zone.strptime(parameters[:date1], '%Y-%m-%d').beginning_of_month..Time.zone.strptime(parameters[:date2], '%Y-%m-%d').end_of_day)
      terms = parameters[:name].to_s.gsub(/(?:[[:space:]%_])+/, ' ').split(' ')[0..1]
      query = (['free_word like ?'] * terms.size).join(' and ')
      _self = _self.where(query, *terms.map { |term| "%#{term}%" })
      # 日付検索

      return _self
    # フリーワードが入っていて、ステータスが選択されている
    elsif parameters[:name].present? && parameters[:status] != ''

      _self = Quote.all.deliverd_in(Time.zone.strptime(parameters[:date1], '%Y-%m-%d').beginning_of_month..Time.zone.strptime(parameters[:date2], '%Y-%m-%d').end_of_day)

      # 名称検索
      terms = parameters[:name].to_s.gsub(/(?:[[:space:]%_])+/, ' ').split(' ')[0..1]
      query = (['free_word like ?'] * terms.size).join(' and ')
      _self = _self.where(query, *terms.map { |term| "%#{term}%" }).where(status: parameters[:status])

      # 日付検索
      return _self

    # フリーワードが空で、ステータスが未選択
    elsif parameters[:name].blank? && parameters[:status] == ''

      # 日付検索
      _self = Quote.all.deliverd_in(Time.zone.strptime(parameters[:date1], '%Y-%m-%d').beginning_of_month..Time.zone.strptime(parameters[:date2], '%Y-%m-%d').end_of_day)

      return _self
    # フリーワードが空で、ステータスが入力されている
    elsif parameters[:name].blank? && parameters[:status] != nil && parameters[:status] != ''

      # 日付検索
      _self = Quote.all.deliverd_in(Time.zone.strptime(parameters[:date1], '%Y-%m-%d').beginning_of_month..Time.zone.strptime(parameters[:date2], '%Y-%m-%d').end_of_day)

      # ステータス検索
      _self = _self.where(status: parameters[:status])

      return _self
    end

    return _self
  end
end
