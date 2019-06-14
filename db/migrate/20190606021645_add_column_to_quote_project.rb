class AddColumnToQuoteProject < ActiveRecord::Migration[5.2]
  def change

  	add_column :quote_projects, :remarks, :text
  end
end
