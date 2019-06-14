class AddNameToHistories < ActiveRecord::Migration[5.2]
  def change
    rename_table :histories, :activities
  end
end
