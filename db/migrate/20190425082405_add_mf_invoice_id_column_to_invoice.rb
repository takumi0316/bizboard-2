class AddMfInvoiceIdColumnToInvoice < ActiveRecord::Migration[5.2]
  def change

    add_column :invoices, :attention, :integer
    add_column :invoices, :mf_invoice_id, :string
    add_column :invoices, :pdf_url, :string
  end
end
