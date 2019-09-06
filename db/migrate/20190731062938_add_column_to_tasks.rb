class AddColumnToTasks < ActiveRecord::Migration[5.2]
  def change
    add_reference :tasks, :catalog, foreign_key: true, comment: 'catalogのid'
  end
end
