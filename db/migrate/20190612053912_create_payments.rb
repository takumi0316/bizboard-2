class CreatePayments < ActiveRecord::Migration[5.2]
  def change
    create_table :payments do |t|
      t.references :subcontractor
      t.references :work_subcontractor_detail
      t.integer :price, default: 0
      t.date :date, comment:'支払日'

      t.timestamps
    end
  end
end
