class ChangeColumnQuoteProjects < ActiveRecord::Migration[5.2]
  def change

  	change_column :quote_projects, :unit_price, :string
  end
end
