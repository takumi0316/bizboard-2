class AddDataExpendableToWorkSubcontractorDetailId < ActiveRecord::Migration[5.2]
  def change

    add_reference :expendables, :work_subcontractor_detail, foreign_key: true
  end
end
