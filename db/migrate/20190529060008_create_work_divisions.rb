class CreateWorkDivisions < ActiveRecord::Migration[5.2]
  def change
    create_table :work_divisions do |t|
      t.references :division, foreign_key: true

      t.timestamps
    end
  end
end
