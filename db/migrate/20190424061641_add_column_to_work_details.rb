class AddColumnToWorkDetails < ActiveRecord::Migration[5.2]
  def change
    add_column :work_details, :notices, :text
  end
end
