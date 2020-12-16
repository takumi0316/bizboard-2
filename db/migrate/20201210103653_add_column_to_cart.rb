class AddColumnToCart < ActiveRecord::Migration[5.2]

  def up
  
    add_reference :carts, :delivery_target, foreign_key: true
  end

  def down
  
    remove_reference :carts, :delivery_target, foreign_key: true
  end
end
