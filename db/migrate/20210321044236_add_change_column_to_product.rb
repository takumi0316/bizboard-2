class AddChangeColumnToProduct < ActiveRecord::Migration[5.2]
 
  def up
 
    remove_column :products, :unit
    add_column :products, :max_unit, :integer, limit: 1, default: 0
    add_column :products, :min_unit, :integer, limit: 1, default: 0
  end
 
  def down
 
    add_column :products, :unit, :integer, limit: 1, default: 0
    remove_column :products, :max_unit
    remove_column :products, :min_unit
  end

end
