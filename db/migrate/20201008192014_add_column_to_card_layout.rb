class AddColumnToCardLayout < ActiveRecord::Migration[5.2]
 
  def up
 
    add_column :layout_contents, :font_weight, :integer, limit: 1, default: 0
  end

  def down
  
    remove_column :layout_contents, :font_weight, :integer, limit: 1
  end
end
