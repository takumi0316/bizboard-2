class CreateInventories < ActiveRecord::Migration[5.2]
  def change
    create_table :inventories do |t|

      t.references :company_division, index: true
      t.text :remarks, comment: '備考'
      t.timestamps
    end
  end
end
