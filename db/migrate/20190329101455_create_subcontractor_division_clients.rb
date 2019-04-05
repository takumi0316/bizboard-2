class CreateSubcontractorDivisionClients < ActiveRecord::Migration[5.2]
  def change
    create_table :subcontractor_division_clients do |t|
      t.references :subcontractor_division, index: false
      t.references :user, index: true
      t.string :name
      t.string :kana
      t.integer :title, limit: 1, default: 10
      t.string :tel
      t.string :email
      t.text :note
      t.text :free_word

      t.timestamps
    end
    add_index :subcontractor_division_clients, [:subcontractor_division_id], unique: true, name: 'subcontractor_division_clients_index'
  end
end
