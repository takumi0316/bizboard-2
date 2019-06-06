class ChangeColumnToQuoteProjects < ActiveRecord::Migration[5.2]
  def up

    change_column :quote_projects, :unit_price, :decimal, precision: 10, scale: 3
  end

  def down

    change_column :quote_projects, :unit_price, :string
  end
end
