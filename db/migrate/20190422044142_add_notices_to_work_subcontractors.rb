class AddNoticesToWorkSubcontractors < ActiveRecord::Migration[5.2]
  def change

    add_column :work_subcontractors, :notices, :text
  end
end
