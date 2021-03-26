class AddColumnToLayoutValue < ActiveRecord::Migration[5.2]
 
  def up

    add_column :layout_values, :upload_url, :string
  end

  def down

    remove_column :layout_values, :upload_url, :string
  end

end
