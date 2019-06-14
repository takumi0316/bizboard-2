class AddFreeWordToWorks < ActiveRecord::Migration[5.2]
  def change
    add_column :works, :free_word, :text
  end
end
