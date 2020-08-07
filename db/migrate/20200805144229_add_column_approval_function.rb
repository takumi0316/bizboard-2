class AddColumnApprovalFunction < ActiveRecord::Migration[5.2]
  def change

    add_column :carts, :status, :integer, default: 0
    add_column :companies, :approval_status, :integer, default: 0
  end
end
