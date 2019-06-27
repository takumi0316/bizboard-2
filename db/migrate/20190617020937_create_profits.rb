class CreateProfits < ActiveRecord::Migration[5.2]
  def change
    create_table :profits do |t|
      t.references :company
      t.references :quote
      t.integer :price, default: 0
      t.date :date, comment:'請求日'

      t.timestamps
    end
  end
end
