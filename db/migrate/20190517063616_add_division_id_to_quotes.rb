class AddDivisionIdToQuotes < ActiveRecord::Migration[5.2]
  def change
    add_reference :quotes, :division, foreign_key: true
  end
end
