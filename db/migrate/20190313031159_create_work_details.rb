class CreateWorkDetails < ActiveRecord::Migration[5.2]
  def change
    create_table :work_details do |t|
      t.references :work, foreign_key: true
      t.string :count
      t.datetime :deliver_at
      t.string :client_name
      t.integer :status, limit: 4, null: false, default: 0
      t.string :estimated_man_hours
      t.string :estimated_cost
      t.string :actual_man_hours
      t.string :actual_cost

      t.timestamps
    end
  end
end
