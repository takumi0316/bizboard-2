class Payment < ApplicationRecord

  #----------------------------------------
  #  ** Includes **
  #----------------------------------------

  #----------------------------------------
  #  ** Constants **
  #----------------------------------------

  #----------------------------------------
  #  ** Enums **
  #----------------------------------------

  #----------------------------------------
  #  ** Validations **
  #----------------------------------------

  #----------------------------------------
  #  ** Associations **
  #----------------------------------------

  belongs_to :subcontractor

  #----------------------------------------
  #  ** Scopes **
  #----------------------------------------

  #----------------------------------------
  #  ** Methods **
  #----------------------------------------

  ##
  # 検索
  #
  #
  def self.search(**parameters)

    _self = self

    #そもそも日付選択されてんのか
    if parameters[:date1] = "InvalidDate"

      terms = parameters[:name].to_s.gsub(/(?:[[:space:]%_])+/, ' ').split(' ')[0..1]
      query = (['free_word like ?'] * terms.size).join(' and ')
      _self = where(query, *terms.map { |term| "%#{term}%" })

      return _self
    else
      #検索に情報が入力されているか
      if parameters[:name].present?

        _self.deliverd_in(parameters[:date1].to_datetime.beginning_of_day..parameters[:date2].to_datetime.end_of_day)
        # 名称検索
        terms = parameters[:name].to_s.gsub(/(?:[[:space:]%_])+/, ' ').split(' ')[0..1]
        query = (['free_word like ?'] * terms.size).join(' and ')
        _self = where(query, *terms.map { |term| "%#{term}%" })

        return _self
      else

        # 日付検索
        _self = Quote.all.deliverd_in(parameters[:date1].to_datetime.beginning_of_day..parameters[:date2].to_datetime.end_of_day)

        return _self

      end
    end

  end


end
