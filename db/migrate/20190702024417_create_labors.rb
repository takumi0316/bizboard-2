class CreateLabors < ActiveRecord::Migration[5.2]
  def change
    
    create_table :labors do |t|

      t.references :division
      t.text :memo
      t.integer :price, default: 0
      t.date :date, comment:'申請日'

      t.timestamps
    end
  end
end
