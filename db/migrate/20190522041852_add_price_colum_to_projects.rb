class AddPriceColumToProjects < ActiveRecord::Migration[5.2]
  def change

    add_column :project_after_processes, :price, :integer
    add_column :project_binds, :price, :integer
    add_column :project_binding_works, :price, :integer
    add_column :project_cards, :price, :integer
    add_column :project_copies, :price, :integer
    add_column :project_prints, :price, :integer
    add_column :project_scans, :price, :integer

  end
end
