class AddActivityIdToQuote < ActiveRecord::Migration[5.2]
  def change

    rename_column :activities, :project_id, :quote_id

    add_column :quotes, :user_id, :integer
    add_column :quotes, :status, :integer, default: 0, null: :false
    add_column :quotes, :quote_number, :string
    add_column :quotes, :company_division_client_id, :integer, index: true
    add_column :quotes, :quote_type, :integer
    add_column :quotes, :channel, :integer
    add_column :quotes, :deliver_at, :datetime
    add_column :quotes, :deliver_type, :integer
    add_column :quotes, :deliver_type_note, :text

    remove_column :projects, :project_type, :integer
    remove_column :projects, :channel, :integer
    remove_column :projects, :deliver_at, :datetime
    remove_column :projects, :deliver_type, :integer
    remove_column :projects, :deliver_type_note, :text
  end
end
