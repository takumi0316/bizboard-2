class AddColumnToLayoutContent < ActiveRecord::Migration[5.2]

  def up

    add_column :layout_contents, :no_image, :boolean, default: true
  end

  def down

    remove_column :layout_contents, :no_image, :boolean
  end
end
