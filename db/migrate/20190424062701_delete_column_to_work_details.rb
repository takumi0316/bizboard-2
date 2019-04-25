class DeleteColumnToWorkDetails < ActiveRecord::Migration[5.2]
  def change

    remove_column :work_details, :notices, :text
  end
end
