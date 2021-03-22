class AddColumnToProduct < ActiveRecord::Migration[5.2]

  def up

    add_column :products, :fixed_additions, :integer, default: 1
  end

  def down

    remove_column :products, :fixed_additions, :integer
  end

end
