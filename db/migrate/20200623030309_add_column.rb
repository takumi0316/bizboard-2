class AddColumn < ActiveRecord::Migration[5.2]

  def up

    add_column :expendables, :accouting_status, :integer, default: 0, limit: 1
    add_column :payments, :accouting_status, :integer, default: 0, limit: 1
  end

  def down

    remove_column :expendables, :accouting_status, :integer
    remove_column :payments, :accouting_status, :integer
  end
end
