class AddColumnToWork < ActiveRecord::Migration[5.2]
  def change

    add_column :works, :notices, :text
  end
end
