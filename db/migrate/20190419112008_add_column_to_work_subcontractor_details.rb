class AddColumnToWorkSubcontractorDetails < ActiveRecord::Migration[5.2]
  def change

    add_column :work_subcontractor_details, :notices, :text

    rename_column :work_subcontractor_details, :standard, :deliver_method
  end

end
