class AddColumnExpendables < ActiveRecord::Migration[5.2]
  def change

    add_reference :expendables, :user, foreign_key: true
  end
end
