class ChangeColumnDefaultQuoteTax < ActiveRecord::Migration[5.2]
  def self.up
    change_column :quotes, :tax, :float, default: 1.1
  end

  def self.down
    change_column :quotes, :tax, :float, default: 1.08
  end
end
