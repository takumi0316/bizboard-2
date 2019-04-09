class AddColumnToWorkSubcontractorDetail < ActiveRecord::Migration[5.2]
  def change
    add_reference :work_subcontractor_details, :work, index: true
  end
end
