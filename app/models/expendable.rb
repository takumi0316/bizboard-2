# == Schema Information
#
# Table name: expendables
#
#  id                :bigint(8)        not null, primary key
#  divisions_id      :bigint(8)
#  subcontractors_id :bigint(8)
#  status            :integer          default("copy")
#  name              :string(191)
#  price             :integer          default(0)
#  date              :date
#  created_at        :datetime         not null
#  updated_at        :datetime         not null
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
    copy: 0, material: 10, paper: 20,
    product: 30, expendable: 40, rent: 50,
    repair: 60, communication: 70, delivery: 80,
    maintenance: 90, cost: 100
  }

  #----------------------------------------
  #  ** Validations **
  #----------------------------------------

  #----------------------------------------
  #  ** Associations **
  #----------------------------------------

  belongs_to :subcontractor

  belongs_to :division

  #----------------------------------------
  #  ** Scopes **
  #----------------------------------------

  #----------------------------------------
  #  ** Methods **
  #----------------------------------------

  ##
  # 名称検索
  #
  #
  def self.search(**parameters)

    _self = self

    if parameters[:division] == "負担部署" && parameters[:subcontractor] == "仕入先" && parameters[:status] == "勘定科目"

      #日付検索
      _self = _self.where(date: parameters[:date1].to_datetime.beginning_of_day..parameters[:date2].to_datetime.end_of_day)
      _self
    else
      #日付検索
      _self = _self.where(date: parameters[:date1].to_datetime.beginning_of_day..parameters[:date2].to_datetime.end_of_day) if parameters[:date1] != nil && parameters[:date2] != nil
      _self = _self.where(status: parameters[:status]) if parameters[:status] != "勘定科目" && parameters[:status] != nil
      _self = _self.where(division_id: parameters[:division]) if parameters[:division] != "負担部署" && parameters[:division] != nil
      _self = _self.where(subcontractor_id: parameters[:subcontractor]) if parameters[:subcontractor] != "仕入先" && parameters[:subcontractor] != nil
      _self
    end

    _self

  end


end
