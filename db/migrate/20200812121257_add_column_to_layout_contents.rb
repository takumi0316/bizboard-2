class AddColumnToLayoutContents < ActiveRecord::Migration[5.2]

  def up

    add_column :layout_contents, :logo_height, :string,  limit: 191
    add_column :layout_contents, :logo_width,  :string,  limit: 191
    add_column :template_layouts, :status,     :integer, default: 0, limit: 1
  end

  def down

    remove_column :layout_contents, :logo_height, :string, limit: 191
    remove_column :layout_contents, :logo_width, :string, limit: 191
    remove_column :template_layouts, :status,     :integer, default: 0, limit: 1
  end

end
