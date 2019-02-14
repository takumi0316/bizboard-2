class AddFreeWord < ActiveRecord::Migration[5.2]

  def change

    add_column :company_division_clients, :free_word, :text
    add_column :items, :free_word, :text
    add_column :projects, :free_word, :text
  end
end
