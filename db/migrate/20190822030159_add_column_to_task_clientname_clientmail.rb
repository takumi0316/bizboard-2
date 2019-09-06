class AddColumnToTaskClientnameClientmail < ActiveRecord::Migration[5.2]
  def change

    add_column :tasks, :client_name, :string
    add_column :tasks, :client_mail, :string
  end
end
