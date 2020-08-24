class RenameTableToCardInformations < ActiveRecord::Migration[5.2]

  def up

    rename_table :card_informations, :layout_values
    add_reference :layout_values, :content_flag, foreign_key: true
    add_reference :layout_values, :upload, foreign_key: true
    add_reference :layout_values, :layout_content, foreign_key: true
    add_reference :company_division_clients, :head_layout, foreign_key: { to_table: :card_layouts }
    add_reference :company_division_clients, :tail_layout, foreign_key: { to_table: :card_layouts }
  end

  def down

    rename_table :layout_values, :card_informations
    remove_reference :card_informations, :content_flag, index: true
    remove_reference :card_informations, :upload, index: true
    remove_reference :layout_values, :layout_content, foreign_key: true
    remove_reference :company_division_clients, :head_layout, foreign_key: { to_table: :card_layouts }
    remove_reference :company_division_clients, :tail_layout, foreign_key: { to_table: :card_layouts }
  end
end
