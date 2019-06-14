class ChangeColumnToHistories < ActiveRecord::Migration[5.2]
  def up
    change_column :histories, :attachment, :text
  end

  def down
    change_column :histories, :attachment, :string
  end
end
