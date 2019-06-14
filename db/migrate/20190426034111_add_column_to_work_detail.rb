class AddColumnToWorkDetail < ActiveRecord::Migration[5.2]
  def change
    add_column :work_details, :order_contents, :string
    add_column :work_details, :deliver_method, :text
    add_column :work_details, :specification, :text
    add_column :work_details, :number_of_copies, :string
  end
end
