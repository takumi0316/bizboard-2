class AddLastaccesstaskToUsers < ActiveRecord::Migration[5.2]
  def change
    add_column :users, :lastaccesstask, :datetime, default:DateTime.now
  end
end
