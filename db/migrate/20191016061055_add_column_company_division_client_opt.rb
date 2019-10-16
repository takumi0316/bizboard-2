class AddColumnCompanyDivisionClientOpt < ActiveRecord::Migration[5.2]
  def change

    add_column :company_division_clients, :opt, :integer, default:0
  end
end
