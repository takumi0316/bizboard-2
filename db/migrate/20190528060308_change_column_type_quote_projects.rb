class ChangeColumnTypeQuoteProjects < ActiveRecord::Migration[5.2]
  def change

    change_column :quote_projects, :unit_price, :string
    change_column :quote_projects, :unit, :string
    change_column :quote_projects, :price, :string
  end
end
