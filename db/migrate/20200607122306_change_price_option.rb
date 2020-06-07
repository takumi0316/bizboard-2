class ChangePriceOption < ActiveRecord::Migration[5.2]

  def up

    change_column_null :quotes, :price, false, 0
    change_column :quotes, :price, :integer, default: 0
    change_column_null :quotes, :profit_price, false, 0
    change_column :quotes, :profit_price, :integer, default: 0
  end

  def down

    change_column_null :quotes, :price, true, nil
    change_column :quotes, :price, :integer, default: nil
    change_column_null :quotes, :profit_price, true, nil
    change_column :quotes, :profit_price, :integer, default: nil

  end
end
