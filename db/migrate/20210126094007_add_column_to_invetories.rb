class AddColumnToInvetories < ActiveRecord::Migration[5.2]
 
  def up

    add_reference :products, :delivery_target, foreign_key: true
    add_reference :delivery_targets, :inventory, foreign_key: true
  end

  def down
  
    remove_reference :products, :delivery_target, foreign_key: true
    remove_reference :delivery_targets, :inventory, foreign_key: true
  end
 
end
