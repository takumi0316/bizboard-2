class AddColumnToCompanyDivisionClient < ActiveRecord::Migration[5.2]
  
  def up
    
    add_column :company_division_clients, :uuid, :string
    add_column :companies, :online_web_business_card, :integer, default: 0
  end
  
  def down
  
    remove_column :company_division_clients, :uuid, :string
    remove_column :companies, :online_web_business_card, :integer, default: 0
  end
end
