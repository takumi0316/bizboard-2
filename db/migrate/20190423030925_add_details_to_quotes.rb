class AddDetailsToQuotes < ActiveRecord::Migration[5.2]
  def change

    add_column :quotes, :pdf_url, :text

    add_column :quotes, :mf_quote_id, :text
  end
end
