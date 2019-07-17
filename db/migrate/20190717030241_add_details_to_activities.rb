class AddDetailsToActivities < ActiveRecord::Migration[5.2]
  def change
    add_column :activities, :accurary, :integer, comment:'確度'
    add_column :activities, :next_action, :integer, comment:'次回アクション'
    add_column :activities, :next_action_date, :date, comment:'次回アクション期日'
    add_column :activities, :scheduled_date, :date, comment:'受注予定日'
  end
end
