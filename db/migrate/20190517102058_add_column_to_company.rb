class AddColumnToCompany < ActiveRecord::Migration[5.2]
  def change

    add_column :companies, :free_word, :text
    add_column :company_divisions, :free_word, :text
  end
end
