class AddColumnToContentFlag < ActiveRecord::Migration[5.2]
  def up

    add_column :content_flags, :content_type, :integer, default: 0
  end

  def def down

    remove_column :content_flags, :content_type, :integer, default: 0
  end
end
