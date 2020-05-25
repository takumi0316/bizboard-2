class AddColumnQuotesLock < ActiveRecord::Migration[5.2]
  def change

    #案件ロック機能
    add_column :quotes, :lock, :boolean, default: false, null: false
  end
end
