class ChangeColumnDeliverToWorkSubcontractorDetails < ActiveRecord::Migration[5.2]
  def change

    change_column :work_subcontractor_details, :deliver_method, :text
  end
end
