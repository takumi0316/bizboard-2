class AddColumnToInvetories < ActiveRecord::Migration[5.2]

  def up

    add_column :products, :unit, :string
    add_column :products, :issue_quantity, :integer, default: 0, limit: 1
    add_reference :products, :delivery_target, foreign_key: true
    add_reference :delivery_targets, :inventory, foreign_key: true
  end

  def down

    remove_column :products, :unit, :string
    remove_column :products, :issue_quantity, :integer, default: 0, limit: 1
    remove_reference :products, :delivery_target, foreign_key: true
    remove_reference :delivery_targets, :inventory, foreign_key: true
  end

end
