class AddColumnQuoteReception < ActiveRecord::Migration[5.2]
  def change

    add_column :quotes, :reception, :integer
  end
end
