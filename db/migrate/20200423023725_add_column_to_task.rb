class AddColumnToTask < ActiveRecord::Migration[5.2]
  def change

    add_column :tasks, :shipping_address, :string
  end
end
