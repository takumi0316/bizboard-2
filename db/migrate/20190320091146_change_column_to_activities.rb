class ChangeColumnToActivities < ActiveRecord::Migration[5.2]
  def up
    change_column :activities, :status, :integer
  end

  def down
    change_column :activities, :status, :string
  end
end
