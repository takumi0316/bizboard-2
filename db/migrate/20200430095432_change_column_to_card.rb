class ChangeColumnToCard < ActiveRecord::Migration[5.2]
  def change

    # remove_column :cards, :company_division_id
    # add_reference :cards, :company, index: true
  end
end