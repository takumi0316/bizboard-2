class CreateWorks < ActiveRecord::Migration[5.2]
  def change
    create_table :works do |t|

      t.references :project,  index: true
      t.integer    :price,    default: 0
      t.integer    :cost,     default: 0
      t.integer    :status,   limit: 1,     default: 0

      t.timestamps
    end
  end
end
