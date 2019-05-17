class AddDivisionIdToWorks < ActiveRecord::Migration[5.2]
  def change
    add_reference :works, :division, foreign_key: true
  end
end
