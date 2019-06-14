class DeleteIndexUniqueFromCreateSubcontractorDivisionClients < ActiveRecord::Migration[5.2]
  def change

    remove_index :subcontractor_division_clients, name: 'subcontractor_division_clients_index'
    add_index :subcontractor_division_clients, [:subcontractor_division_id], unique: false, name: 'subcontractor_division_clients_index'
  end
end
