class ChangeColumnToWorkSubcontractorDetails < ActiveRecord::Migration[5.2]
  def change

    change_column :work_subcontractor_details, :specification, :text
  end

end
