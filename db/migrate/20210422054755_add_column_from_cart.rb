class AddColumnFromCart < ActiveRecord::Migration[5.2]

  def up

    add_reference :carts, :task, foreign_key: true
  end

  def down

    remove_reference :carts, :task
  end

end
