class SyncItemsJob < ApplicationJob

  #----------------------------------------
  #  ** Includes **
  #----------------------------------------

  extend MiniScheduler::Schedule

  #----------------------------------------
  #  ** Constants **
  #----------------------------------------

  every 24.hours

  #----------------------------------------
  #  ** Methods **
  #----------------------------------------

  ##
  # 実行
  # @version 2018/06/10
  #
  def perform

    user = User.mf_expires_in.first

    return nil if user.blank?

    client = MfCloud::Invoice::Client.new(access_token: user.mf_access_token)
    items = client.items
    meta = items.all.meta

    (1..meta.total_pages).each do |page|

      collection = items.all(page: page).collection

      break if collection.blank?

      collection.each do |item|

        next if Item.exists?(mf_item_id: item.id)

        Item.create!(
          mf_item_id: item.id,
          name: item.name,
          note: item.detail,
          unit_price: item.unit_price.to_i,
          unit: item.unit,
          quantity: item.quantity.to_i,
          excise: item.excise,
        )
      end
    end
  end
end
