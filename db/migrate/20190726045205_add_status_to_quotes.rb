class AddStatusToQuotes < ActiveRecord::Migration[5.2]
  def change

    add_column :quotes, :tax_type, :integer
    add_column :quotes, :payment_terms, :integer
  end
end
