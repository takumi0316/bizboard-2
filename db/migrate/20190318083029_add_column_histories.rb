class AddColumnHistories < ActiveRecord::Migration[5.2]
  def change

    add_column :histories, :free_word, :text

    remove_column :histories, :user

    add_reference :histories, :project, index: true
  end
end
