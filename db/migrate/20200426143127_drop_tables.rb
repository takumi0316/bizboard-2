class DropTables < ActiveRecord::Migration[5.2]
  def change

    drop_table :cards
    drop_table :card_templates
    drop_table :template_details
    drop_table :card_clients
    drop_table :client_templates
    drop_table :client_template_values
    drop_table :task_card_clients
  end
end
