class AddColumnToCardAndCardClient < ActiveRecord::Migration[5.2]

  def change

    add_column :cards, :free_word, :text
    add_column :card_clients, :free_word, :text
  end
end
