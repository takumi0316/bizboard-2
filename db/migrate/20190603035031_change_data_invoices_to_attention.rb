class ChangeDataInvoicesToAttention < ActiveRecord::Migration[5.2]
  def change

    change_column :invoices, :attention, :text
  end
end
