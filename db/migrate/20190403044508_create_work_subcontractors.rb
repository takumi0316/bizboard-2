class CreateWorkSubcontractors < ActiveRecord::Migration[5.2]
  def change
    create_table :work_subcontractors do |t|
      t.references :work, index: true
      t.references :subcontractor_division_client, index: true
      t.integer :status, limit: 1, default: 0

      t.timestamps
    end
  end
end
