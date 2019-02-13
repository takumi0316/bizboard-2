class CreateItems < ActiveRecord::Migration[5.2]
  def change
    create_table :items do |t|

      t.string :name, limit: 191
      t.string :mf_item_id, limit: 191
      t.string :code, limit: 191
      t.string :note, limit: 191
      t.integer :unit_price, default: 0
      t.string :unit_label, limit: 191
      t.integer :consumption_tax, default: 0
      t.string :note, limit: 191

      t.timestamps

      t.index [:name], unique: true
      t.index [:mf_item_id], unique: true
    end

    add_column :users, :mf_access_token, :string
    add_column :users, :mf_token_expires_in, :datetime
    add_column :users, :mf_refresh_token, :string
  end
end
