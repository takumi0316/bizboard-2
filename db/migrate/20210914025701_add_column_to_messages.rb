class AddColumnToMessages < ActiveRecord::Migration[5.2]
  
  def up

    add_column :messages, :invisible, :integer, limit: 1, default: 0
  end

  def down

    remove_column :messages, :invisible, :integer, limit: 1, default: 0
  end
end
