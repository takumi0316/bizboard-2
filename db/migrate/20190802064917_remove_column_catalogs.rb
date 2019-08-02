class RemoveColumnCatalogs < ActiveRecord::Migration[5.2]
  def up

    remove_column :catalogs, :image_file_name
    remove_column :catalogs, :image_content_type
    remove_column :catalogs, :image_file_size
    remove_column :catalogs, :image_updated_at
  end
end
