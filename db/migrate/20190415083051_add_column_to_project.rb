class AddColumnToProject < ActiveRecord::Migration[5.2]
  def change
    add_column :projects, :price, :integer, default: 0
  end
end
