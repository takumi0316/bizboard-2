class AddColumnToQuoteProjects < ActiveRecord::Migration[5.2]
  def change

    add_column :quote_projects, :project_name, :string
  end
end
