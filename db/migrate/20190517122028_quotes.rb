class Quotes < ActiveRecord::Migration[5.2]
  def change

    add_column :quotes, :discount, :integer
  end
end
