class CreateTargets < ActiveRecord::Migration[5.2]
  def change
    create_table :targets do |t|

      t.references :division
      t.integer :target_year, default: 1
      t.integer :target_month, default: 1
      t.integer :sales, default: 0
      t.integer :profit, default: 0
      t.integer :cost, default: 0

      t.timestamps
    end
  end
end
