class CreateProducts < ActiveRecord::Migration[5.2]
  def change
    create_table :products do |t|

      t.references :inventory, index: true
      t.string :name, comment: '商品名'
      t.integer	:quantity, comment: '在庫数'
      t.text :remarks, comment: '備考'
      t.timestamps
    end
  end
end
