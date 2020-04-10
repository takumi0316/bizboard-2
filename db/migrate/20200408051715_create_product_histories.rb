class CreateProductHistories < ActiveRecord::Migration[5.2]
  def change
    create_table :product_histories do |t|

      t.references :product, index: true
      t.date :date,	comment: '発注日'
      t.integer	:status, comment: '依頼ステータス'
      t.integer	:quantity, comment: '数量'
      t.timestamps
    end
  end
end
