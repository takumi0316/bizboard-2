class AddColumnDriveidQuotes < ActiveRecord::Migration[5.2]
  def change

    add_column :quotes, :drive_folder_id, :string
  end
end
