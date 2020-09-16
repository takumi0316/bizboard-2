# == Schema Information
#
# Table name: expendables
#
#  id                           :bigint(8)        not null, primary key
#  division_id                  :bigint(8)
#  subcontractor_id             :bigint(8)
#  status                       :integer          default("copy")
#  name                         :string(191)
#  price                        :integer          default(0), not null
#  date                         :date
#  memo                         :text(65535)
#  work_subcontractor_detail_id :bigint(8)
#  created_at                   :datetime         not null
#  updated_at                   :datetime         not null
#  user_id                      :bigint(8)
#  work_subcontractor_id        :bigint(8)
#  accouting_status             :integer          default("active")
#

class Expendable < ApplicationRecord

  #----------------------------------------
  #  ** Includes **
  #----------------------------------------

  #----------------------------------------
  #  ** Constants **
  #----------------------------------------

  #----------------------------------------
  #  ** Enums **
  #----------------------------------------

  enum status: {
    copy: 0,
    material: 10,
    paper: 20,
    product: 30,
    expendable: 40,
    rent: 50,
    repair: 60,
    communication: 70,
    delivery: 80,
    maintenance: 90,
    cost: 100
  }

  enum accouting_status: { active: 0, inactive: 10 }

  #----------------------------------------
  #  ** Validations **
  #----------------------------------------

  validates :price, presence: true

  #----------------------------------------
  #  ** Associations **
  #----------------------------------------

  belongs_to :subcontractor

  belongs_to :division

  belongs_to :work_subcontractor, optional: true

  has_one :payment

  #----------------------------------------
  #  ** Scopes **
  #----------------------------------------

  scope :date_in, ->(datetime) { where(date: datetime) }

  #----------------------------------------
  #  ** Methods **
  #----------------------------------------

  ##
  # 名称検索
  #
  #
  def self.search(**parameters)

    _self = self

    if parameters[:division] == '' && parameters[:subcontractor] == '' && parameters[:status] == ''

      # 日付検索
      _self = _self.where(date: Time.zone.strptime(parameters[:date1], '%Y-%m-%d').beginning_of_day..Time.zone.strptime(parameters[:date2], '%Y-%m-%d').end_of_day)
    else

      # 日付検索
      _self = _self.where(date: Time.zone.strptime(parameters[:date1], '%Y-%m-%d').beginning_of_day..Time.zone.strptime(parameters[:date2], '%Y-%m-%d').end_of_day) if parameters[:date1] != nil && parameters[:date2] != nil
      _self = _self.where(status: parameters[:status]) if parameters[:status] != '' && parameters[:status] != nil
      _self = _self.where(division_id: parameters[:division]) if parameters[:division] != '' && parameters[:division] != nil
      _self = _self.where(subcontractor_id: parameters[:subcontractor]) if parameters[:subcontractor] != '' && parameters[:subcontractor] != nil
    end

    _self
  end

  ##
  # プロダクションスクリプト
  # @version 2020/03/11
  #
  def self.production_script

    Expendable.where.not(work_subcontractor_detail_id: nil).pluck(:work_subcontractor_detail_id).each do |r|

      work_subcontractor_detail = WorkSubcontractorDetail.find_or_initialize_by(id: r)
      expendable = Expendable.find_or_initialize_by(work_subcontractor_detail_id: r)
      payment = Payment.find_or_initialize_by(work_subcontractor_detail_id: r)
      work_subcontractor = WorkSubcontractor.find_or_initialize_by(id: work_subcontractor_detail.work_subcontractor)
      if !work_subcontractor_detail.new_record? && !expendable.new_record? && !work_subcontractor.new_record?

        actual_cost = work_subcontractor.detail.sum(:actual_cost).to_i
        quote_type = work_subcontractor.work&.quote&.quote_type == :contract || :salse ? 100 : 10
        expendable.update! work_subcontractor_id: work_subcontractor.id, work_subcontractor_detail_id: nil, price: actual_cost, date: work_subcontractor.delivery_date, status: quote_type
        payment.update! work_subcontractor_id: work_subcontractor.id, work_subcontractor_detail_id: nil, price: actual_cost, date: work_subcontractor.delivery_date
        work_subcontractor.detail_ids.each do |d|

          d_expendable = Expendable.find_or_initialize_by(work_subcontractor_detail_id: d)
          d_payment = Payment.find_or_initialize_by(work_subcontractor_detail_id: d)
          d_expendable.destroy! if r != d && !d_expendable.new_record?
          d_payment.destroy! if r != d && !d_payment.new_record?
        end
      end
    end
  rescue => e

    puts "message: #{e.message}"
  end
end
