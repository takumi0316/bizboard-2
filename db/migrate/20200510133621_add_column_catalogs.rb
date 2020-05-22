class AddColumnCatalogs < ActiveRecord::Migration[5.2]
  def change

    add_column :catalogs, :turn, :integer, default: 0
  end
end
