class AddColumnCardClient < ActiveRecord::Migration[5.2]
  def change

    add_column :card_clients, :status, :integer, limit: 1, default: 0
  end
end
