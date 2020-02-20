# == Schema Information
#
# Table name: expendables
#
#  id                           :bigint(8)        not null, primary key
#  division_id                  :bigint(8)
#  subcontractor_id             :bigint(8)
#  status                       :integer          default("copy")
#  name                         :string(191)
#  price                        :integer          default(0)
#  date                         :date
#  created_at                   :datetime         not null
#  updated_at                   :datetime         not null
#  memo                         :text(65535)
#  work_subcontractor_detail_id :bigint(8)
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

  #----------------------------------------
  #  ** Validations **
  #----------------------------------------

  #----------------------------------------
  #  ** Associations **
  #----------------------------------------

  belongs_to :subcontractor

  belongs_to :division

  belongs_to :work_subcontractor_detail, optional: true

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
      _self = _self.where(date: parameters[:date1].to_datetime.beginning_of_day..parameters[:date2].to_datetime.end_of_day)
		else

      # 日付検索
      _self = _self.where(date: parameters[:date1].to_datetime.beginning_of_day..parameters[:date2].to_datetime.end_of_day) if parameters[:date1] != nil && parameters[:date2] != nil
      _self = _self.where(status: parameters[:status]) if parameters[:status] != '' && parameters[:status] != nil
      _self = _self.where(division_id: parameters[:division]) if parameters[:division] != '' && parameters[:division] != nil
      _self = _self.where(subcontractor_id: parameters[:subcontractor]) if parameters[:subcontractor] != '' && parameters[:subcontractor] != nil
    end

    _self

  end


end
