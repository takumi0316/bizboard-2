class CreateSubcontractorDivisions < ActiveRecord::Migration[5.2]
  def change
    create_table :subcontractor_divisions do |t|
      t.references :subcontractor, index: true
      t.string :name
      t.string :kana
      t.string :zip
      t.string :tel
      t.integer :prefecture_id
      t.string :address1
      t.string :address2
      t.text :note

      t.timestamps
    end
  end
end
