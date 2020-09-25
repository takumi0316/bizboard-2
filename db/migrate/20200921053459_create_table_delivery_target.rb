class CreateTableDeliveryTarget < ActiveRecord::Migration[5.2]

  def up
  
    create_table :delivery_targets do |t|

      t.references :card_template, index: true
      t.string :name, limit: 191, comment: '配送先住所の名称'
      t.string :address1, limit: 191, comment: '配送先の住所1'
      t.string :address2, limit: 191, comment: '配送先の住所2'
    end

    remove_column :tasks, :shipping_address
    add_reference :tasks, :delivery_target, foreign_key: true
  end

  def down
  
    drop_table :delivery_targets
    add_column :tasks, :shipping_address, :string, limit: 191
    remove_reference :tasks, :delivery_target, foreign_key: true

  end

end
