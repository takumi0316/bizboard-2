class CreateExpendables < ActiveRecord::Migration[5.2]
  def change
    create_table :expendables do |t|
      t.references :divisions
      t.references :subcontractors
      t.integer :status, default: 0
      t.string :name
      t.integer :price, default: 0
      t.date :date, comment:'申請日'

      t.timestamps
    end
  end
end
