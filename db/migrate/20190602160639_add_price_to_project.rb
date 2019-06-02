class AddPriceToProject < ActiveRecord::Migration[5.2]
  def change

    add_column :project_prints, :work_price, :integer, default: 0, after: :work_time
    add_column :project_cards, :work_price, :integer, default: 0, after: :work_time
  end
end
