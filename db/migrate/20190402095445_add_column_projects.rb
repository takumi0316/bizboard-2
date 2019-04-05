class AddColumnProjects < ActiveRecord::Migration[5.2]

  def up
    
    add_column :projects, :project_number, :bigint
  end
end
