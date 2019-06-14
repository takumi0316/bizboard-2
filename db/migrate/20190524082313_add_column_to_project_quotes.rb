class AddColumnToProjectQuotes < ActiveRecord::Migration[5.2]

  def change

    add_column :quote_projects, :name, :string
    add_column :quote_projects, :unit_price, :Integer
  end
end
