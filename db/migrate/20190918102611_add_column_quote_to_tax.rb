class AddColumnQuoteToTax < ActiveRecord::Migration[5.2]
  def change

    add_column :quotes, :tax, :float, default: 1.08
  end
end
