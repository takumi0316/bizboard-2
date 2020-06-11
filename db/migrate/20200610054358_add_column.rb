class AddColumn < ActiveRecord::Migration[5.2]

  def up

    add_column :carts, :status, :integer, limit: 1, default: 0
    add_reference :carts, :company_division, index: true
  end

  def down

    remove_column :carts, :status, :integer
    remove_reference :carts, :company_division
  end
end
