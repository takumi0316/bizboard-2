##
# profit_graphs Controller
#
class ProfitGraphsController < ApplicationController
  #----------------------------------------
  #  ** Includes **
  #----------------------------------------

  #----------------------------------------
  #  ** Instance variables **
  #----------------------------------------

  #----------------------------------------
  #  ** Layouts **
  #----------------------------------------

  #----------------------------------------
  #  ** Request cycles **
  #----------------------------------------

  #----------------------------------------
  #  ** Actions **
  #----------------------------------------

  ##
  # 一覧
  # @version 2019/03/12
  #
  def index

    add_breadcrumb '受注管理'
    quote_ids = Quote.where(division_id: 2).pluck(:id)
    activity = Activity.where(quote_id: quote_ids).joins(:quote)
    hash = activity.group(:quote_id).having('count(*) >= 2').maximum(:created_at)
    activity_ids = activity.where(quote_id: hash.keys).where.not(created_at: hash.values).pluck(:id)
    activity_ids = activity.ids if hash.blank?

  end


  #----------------------------------------
  #  ** Methods **
  #----------------------------------------

end
