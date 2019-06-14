class CreateQuoteItems < ActiveRecord::Migration[5.2]
  def change
    create_table :quote_items do |t|

      t.references :quote
      t.integer :cost, comment:'コスト'
      t.decimal :gross_profit, precision: 11, scale: 8, comment:'粗利'
      t.text :detail, comment:'詳細'


      t.timestamps

    end
  end
end
