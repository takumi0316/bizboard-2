class AddMfIdToCompanies < ActiveRecord::Migration[5.2]
  def change

    add_column :companies, :mf_company_id, :string
    add_column :company_divisions, :mf_company_division_id, :string
  end
end
