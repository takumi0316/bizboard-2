class AddColumnToCartItem < ActiveRecord::Migration[5.2]

  def up

    create_table :card_clients, options: 'DEFAULT CHARSET=utf8mb4' do |t|

      t.references :company_division_client, index: true
      t.references :head_layout, foreign_key: { to_table: :card_layouts }
      t.references :tail_layout, foreign_key: { to_table: :card_layouts }

      t.timestamps
    end

    create_table :task_card_clients, options: 'DEFAULT CHARSET=utf8mb4' do |t|

      t.references :task, index: true
      t.references :quote, index: true
      t.references :card_client, index: true
      t.string     :shipping_address
      t.integer    :count

      t.timestamps
    end

  end

  def down

    drop_table :card_clients

    drop_table :task_card_clients
  end

end
