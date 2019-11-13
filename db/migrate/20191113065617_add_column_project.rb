class AddColumnProject < ActiveRecord::Migration[5.2]
  def change

    add_column :projects, :code, :string
  end
end
