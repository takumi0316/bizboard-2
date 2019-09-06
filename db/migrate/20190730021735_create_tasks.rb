class CreateTasks < ActiveRecord::Migration[5.2]
  def change
    create_table :tasks do |t|
      t.date :date, comment: '希望納期'
      t.binary :data, comment: '添付データ'
      t.text :remarks, comment: '備考欄'
      t.references :quote, foreign_key: true, comment: 'quoteのid'

      t.timestamps
    end
  end
end
