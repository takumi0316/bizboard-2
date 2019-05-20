class AddColumnToSubcontractor < ActiveRecord::Migration[5.2]
  def change

    add_column :subcontractors, :free_word, :text
    add_column :subcontractor_divisions, :free_word, :text
  end
end
