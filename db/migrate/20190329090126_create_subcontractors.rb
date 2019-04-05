class CreateSubcontractors < ActiveRecord::Migration[5.2]
  def change
    create_table :subcontractors do |t|
      t.string :name
      t.string :kana
      t.text :note

      t.timestamps
    end
  end
end
