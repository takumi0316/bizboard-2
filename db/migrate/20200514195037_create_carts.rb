class CreateCarts < ActiveRecord::Migration[5.2]
  def change
    create_table :carts, options: 'DEFAULT CHARSET=utf8mb4' do |t|

      t.references :company_division_client, index: true

      t.timestamps
    end
    create_table :cart_items, options: 'DEFAULT CHARSET=utf8mb4' do |t|

      t.references :card_client, idnex: true
      t.references :cart, idnex: true
      t.integer :quantity, default: 0

      t.timestamps
    end
  end
end
