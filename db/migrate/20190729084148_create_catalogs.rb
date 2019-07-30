class CreateCatalogs < ActiveRecord::Migration[5.2]
  def change
    create_table :catalogs do |t|

      t.string :name, comment:'商品名'
      t.text :description, comment:'商品説明用'
      t.string :price, comment:'文言なども入る'
      t.string :deliver_at, comment:'文言なども入る'
      t.timestamps
    end
  end
end
