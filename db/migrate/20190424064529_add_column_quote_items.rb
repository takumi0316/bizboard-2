class AddColumnQuoteItems < ActiveRecord::Migration[5.2]
  def change

    add_column :quote_items, :name, :string

    add_column :quote_items, :unit_price, :integer

    add_column :quote_items, :quantity, :integer

    change_column :quote_items, :detail, :string
  end
end
