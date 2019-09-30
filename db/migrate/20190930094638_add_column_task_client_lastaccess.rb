class AddColumnTaskClientLastaccess < ActiveRecord::Migration[5.2]
  def change

    add_column :tasks, :clientlastaccess, :datetime, default:DateTime.now
  end
end
