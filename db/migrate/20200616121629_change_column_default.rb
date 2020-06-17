class ChangeColumnDefault < ActiveRecord::Migration[5.2]
  def up

    change_column :users, :lastaccesstask, :datetime, default: Time.zone.now 
    change_column :company_division_clients, :lastaccesstask, :datetime, default: Time.zone.now 
    change_column :tasks, :clientlastaccess, :datetime, default: Time.zone.now
  end

  def down

    change_column :users, :lastaccesstask, :datetime, default: Datetime.now 
    change_column :company_division_clients, :lastaccesstask, :datetime, default: Datetime.now 
    change_column :tasks, :clientlastaccess, :datetime, default: Datetime.now
  end
end
