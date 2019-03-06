class CreateHistories < ActiveRecord::Migration[5.2]
  def change
    create_table :histories do |t|
      t.date :date, comment:"対応日時", null: false, index: true, unique: true
      t.string :content, comment:"対応内容"
      t.string :user, comment:"対応者"
      t.string :memo, comment:"メモ"
      t.string :attachment, comment:"添付"
      t.timestamps
    end
  end
end
