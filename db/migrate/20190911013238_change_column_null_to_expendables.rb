class ChangeColumnNullToExpendables < ActiveRecord::Migration[5.2]
  def change

    # NULL制約を追加
    change_column_null :expendables, :price, false
    change_column_null :payments, :price, false
  end
end
