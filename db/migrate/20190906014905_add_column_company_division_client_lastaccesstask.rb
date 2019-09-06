class AddColumnCompanyDivisionClientLastaccesstask < ActiveRecord::Migration[5.2]
  def change

    add_column :company_division_clients, :lastaccesstask, :datetime, default:DateTime.now
  end
end
