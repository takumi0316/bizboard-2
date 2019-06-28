class AddColumnExpendable < ActiveRecord::Migration[5.2]
  def change

    add_column :expendables, :memo, :text
  end
end
