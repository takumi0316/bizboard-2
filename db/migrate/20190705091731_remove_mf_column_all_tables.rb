class RemoveMfColumnAllTables < ActiveRecord::Migration[5.2]
  def change

    remove_column :company_divisions, :mf_company_division_id, :string
    remove_column :companies, :mf_company_id, :string
    remove_column :invoices, :mf_invoice_id, :string
    remove_column :quotes, :mf_quote_id, :string
    remove_column :users, :mf_access_token, :string
    remove_column :users, :mf_token_expires_in, :string
    remove_column :users, :mf_refresh_token, :string
  end
end
