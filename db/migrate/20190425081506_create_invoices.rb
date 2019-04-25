class CreateInvoices < ActiveRecord::Migration[5.2]
  def change
    create_table :invoices do |t|

      t.references :project
      t.date :date, comment:'請求日'
      t.date :expiration, comment:'支払い期限'
      t.string :subject, comment:'件名'
      t.text :remarks, comment:'備考'
      t.text :memo, comment:'メモ'
      t.text :free_word, comment:'検索用'

      t.timestamps
    end
  end
end
