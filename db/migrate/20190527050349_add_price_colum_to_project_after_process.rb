class AddPriceColumToProjectAfterProcess < ActiveRecord::Migration[5.2]
  def change

    add_column :project_after_processes, :folding_price, :integer, default: 0, after: :folding
    add_column :project_after_processes, :stapler_price, :integer, default: 0, after: :stapler
    add_column :project_after_processes, :hole_price, :integer, default: 0, after: :hole
    add_column :project_after_processes, :clip_price, :integer, default: 0, after: :clip
    add_column :project_after_processes, :bind_price, :integer, default: 0, after: :bind
    add_column :project_after_processes, :back_text_price, :integer, default: 0, after: :back_text
    remove_column :project_after_processes, :price, :integer
  end
end
