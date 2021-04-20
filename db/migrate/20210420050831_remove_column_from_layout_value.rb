class RemoveColumnFromLayoutValue < ActiveRecord::Migration[5.2]

  def up

    remove_column :layout_values, :upload_url
  end

  def down

    add_column :layout_values, :upload_url, :string
  end

end
