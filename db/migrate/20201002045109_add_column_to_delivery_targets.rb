class AddColumnToDeliveryTargets < ActiveRecord::Migration[5.2]

  def up
 
    add_column :delivery_targets, :tel, :string
  end

  def down
  
    remove_column :delivery_targets, :tel, :string
  end

end
