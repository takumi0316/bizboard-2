class AddColumnQuotes < ActiveRecord::Migration[5.2]
  def change

    add_column :quotes, :price, :integer

    add_column :quotes, :attention, :integer
  end
end
