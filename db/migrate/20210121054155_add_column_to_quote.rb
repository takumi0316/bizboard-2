class AddColumnToQuote < ActiveRecord::Migration[5.2]

  def up

    add_column :quotes, :destination, :integer, limit: 1, default: 0
  end

  def down

    remove_column :quotes, :destination, :integer, limit: 1, default: 0
  end

end
