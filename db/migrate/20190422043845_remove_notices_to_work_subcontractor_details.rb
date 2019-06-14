class RemoveNoticesToWorkSubcontractorDetails < ActiveRecord::Migration[5.2]
  def change

    remove_column :work_subcontractor_details, :notices, :text
  end
end
