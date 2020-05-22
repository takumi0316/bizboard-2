class AddColumnQuote < ActiveRecord::Migration[5.2]
  def change

    add_column :quotes, :profit_price, :integer, default: 0, after: :temporary_price
  end
end
