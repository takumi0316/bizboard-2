class AddColumnToWorkSubcontractor < ActiveRecord::Migration[5.2]
  def change

  	add_column :work_subcontractors, :order_date, :datetime
  	add_column :work_subcontractors, :delivery_date, :datetime
  	add_column :work_subcontractors, :delivery_destination, :string
  end
end
