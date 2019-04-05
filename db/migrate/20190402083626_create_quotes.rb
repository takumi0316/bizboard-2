class CreateQuotes < ActiveRecord::Migration[5.2]
  def change
    create_table :quotes do |t|
      t.references :project
      t.date :date, comment:'発行日'
      t.date :expiration, comment:'発行期限'
      t.string :subject, comment:'件名'
      t.text :remarks, comment:'備考'
      t.text :memo, comment:'メモ'
      t.text :free_word, comment:'検索用'

      t.timestamps
    end
  end
end
