# == Schema Information
#
# Table name: activities
#
#  id               :bigint(8)        not null, primary key
#  date             :date
#  status           :integer
#  memo             :text(65535)
#  attachment       :text(65535)
#  free_word        :text(65535)
#  accurary         :integer
#  next_action      :integer
#  next_action_date :date
#  scheduled_date   :date
#  quote_id         :bigint(8)
#  created_at       :datetime         not null
#  updated_at       :datetime         not null
#

class Activity < ApplicationRecord

  #----------------------------------------
  #  ** Includes **
  #----------------------------------------

  ActiveHash::Associations::ActiveRecordExtensions

  #----------------------------------------
  #  ** Constants **
  #----------------------------------------

  #----------------------------------------
  #  ** Enums **
  #----------------------------------------

  #種類のenum

  enum status: { contact: 0, hearing: 10, proposal: 20, estimate: 30,
    closing: 40, order: 50, lost: 60, rejection: 70
  }, _prefix: true

  # 確度のenum
  enum accurary: { a: 0, b: 10, c: 20 }

  # 次回アクションのenum
  enum next_action: { contact: 0, hearing: 10, proposal: 20, estimate: 30,
    closing: 40, order: 50, lost: 60, rejection: 70, other: 90
  }, _prefix: true

  #----------------------------------------
  #  ** Validations **
  #----------------------------------------

  #----------------------------------------
  #  ** Associations **
  #----------------------------------------

  belongs_to :quote

  belongs_to :user

  #----------------------------------------
  #  ** Delegates **
  #----------------------------------------

  #----------------------------------------
  #  ** Scopes **
  #----------------------------------------

  scope :date_in, -> from, to { where(next_action_date: from..to) }

  #----------------------------------------
  #  ** Methods **
  #----------------------------------------

  # フリーワード検索用文字列をセットする
  before_validation :set_free_word

  ##
  # フリーワード検索用文字列をセットする
  # @version 2018/06/10
  #
  def set_free_word

    self.free_word = "#{ self.memo } #{ self.user&.name } #{ self.quote&.subject } #{self.status_i18n}"
  end

  ##
  # 名称検索
  # @version 2018/06/10
  #
  def self.search(**parameters)
    _self = self
    
    if parameters[:name].blank? && parameters[:status].blank? && parameters[:date1].blank? && parameters[:date2].blank?
      return _self
    end
      _self = self.date_in(Time.zone.strptime(parameters[:date1], '%Y-%m-%d'), Time.zone.strptime(parameters[:date2], '%Y-%m-%d'))
    # フリーワードが入っている場合
    if parameters[:name].present?
      terms = parameters[:name].to_s.gsub(/(?:[[:space:]%_])+/, ' ').split(' ')[0..1]

      query = (['free_word like ?'] * terms.size).join(' and ')

      _self = _self.where(query, *terms.map { |term| "%#{term}%" })
    end


    if parameters[:status].present?
      _self = _self.where(next_action: parameters[:status])
    end


    return _self
  end

  ##
  # プロダクションスクリプト
  # @version 2020/06/23
  #
  def self.production_script

    Activity.where(status: :lost).or(Activity.where(status: :rejection)).each do |r|

      if r.quote.work.present?

        if r.quote.work.work_subcontractors.present?

          r.quote.work.work_subcontractors.each do |w|

            w.expendable.inactive! if w.expendable.present?
            w.payment.inactive! if w.payment.present?
          end
        end
      end
    end

  rescue => e

    p e
  end

end
