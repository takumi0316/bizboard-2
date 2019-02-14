class AddDivisionColumnToItem < ActiveRecord::Migration[5.2]
  def change

    add_column :items, :division_id, :integer
  end
end
