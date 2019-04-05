class CreateWorkSubcontractorDetails < ActiveRecord::Migration[5.2]
  def change
    create_table :work_subcontractor_details do |t|
      t.references :work_subcontractor, index: true
      t.string :order_contents
      t.string :standard
      t.string :specification
      t.string :count
      t.string :number_of_copies
      t.datetime :deliver_at
      t.string :cost_unit_price
      t.string :estimated_cost
      t.string :actual_count
      t.string :actual_cost
      t.integer :status, limit: 1, default: 0

      t.timestamps
    end
  end
end
