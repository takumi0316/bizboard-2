class CreateTableTaskCardClient < ActiveRecord::Migration[5.2]
  def change
    create_table :task_card_clients do |t|

      t.references :task, index: true
      t.references :quote, index: true
      t.references :card_client, index: true
      t.integer    :count

      t.timestamps
    end
  end
end
