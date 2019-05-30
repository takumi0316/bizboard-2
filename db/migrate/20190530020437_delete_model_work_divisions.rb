class DeleteModelWorkDivisions < ActiveRecord::Migration[5.2]
  def change

    drop_table :work_divisions
  end
end
