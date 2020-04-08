class AddColumns < ActiveRecord::Migration[5.2]
  def change

    add_reference :expendables, :work_subcontractor, foreign_key: true
    add_reference :payments, :work_subcontractor, foreign_key: true
  end
end
