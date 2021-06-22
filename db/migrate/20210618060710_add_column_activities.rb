class AddColumnActivities < ActiveRecord::Migration[5.2]
  
  def up

    add_reference :activities, :user, foreign_key: true
  end

  def down

    remove_reference :activities, :user
  end
end
