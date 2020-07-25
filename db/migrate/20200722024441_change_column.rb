class ChangeColumn < ActiveRecord::Migration[5.2]
  def up

    change_column :template_details, :name, :text
    add_column :template_details, :item_type, :integer, limit: 1, default: 0
  end

  def down

    change_column :template_details, :name, :string
    remove_column :template_details, :item_type, :integer, limit: 1, default: 0
  end
end
