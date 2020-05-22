class AddColumnQuotes < ActiveRecord::Migration[5.2]
  def change

    #請求書発行時に静的に会社名を保存する為
    add_column :quotes, :last_company, :string

    #請求書発行時に静的に部署名を保存する為
    add_column :quotes, :last_division, :string

    #請求書発行時に静的にお客様名を保存する為
    add_column :quotes, :last_client, :string

    #見積もり発行日
    add_column :quotes, :issues_date, :date
    #納品日
    add_column :quotes, :delivery_note_date, :date

  end
end
