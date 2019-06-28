class ChangeDataExpendableToDivisionsId < ActiveRecord::Migration[5.2]
  def change

    rename_column :expendables, :divisions_id, :division_id

    rename_column :expendables, :subcontractors_id, :subcontractor_id
  end
end
