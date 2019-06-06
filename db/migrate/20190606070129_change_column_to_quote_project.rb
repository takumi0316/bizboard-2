class ChangeColumnToQuoteProject < ActiveRecord::Migration[5.2]
  def change

  	change_column :quote_projects, :unit_price, :float
  end
end
