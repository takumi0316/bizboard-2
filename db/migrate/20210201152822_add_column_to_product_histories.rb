class AddColumnToProductHistories < ActiveRecord::Migration[5.2]

  def up

    add_column :product_histories, :apply_status, :integer, default: 0, limit: 1
  end

  def down

    remove_column :product_histories, :apply_status, :integer, default: 0, limit: 1
  end

end