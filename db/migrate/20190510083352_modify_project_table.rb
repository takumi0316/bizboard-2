class ModifyProjectTable < ActiveRecord::Migration[5.2]
  def change

    create_table :quote_projects do |t|

      t.references :quote
      t.references :project
      t.integer :price, limit: 1, default: 10
      t.integer :unit, limit: 1, default: 10

      t.timestamps
    end

    remove_column :quotes, :project_id, :string
    rename_column :invoices, :project_id, :quote_id
    rename_column :works, :project_id, :quote_id

    drop_table :items
  end
end
