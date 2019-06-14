class ChangeDatatypeMemoOfActivities < ActiveRecord::Migration[5.2]
  def change
    change_column :activities, :memo, :text
  end
end
