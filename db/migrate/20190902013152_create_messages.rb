class CreateMessages < ActiveRecord::Migration[5.2]
  def change
    create_table :messages do |t|
      t.references :task,  index: true
      t.text :content, comment: 'チャット内容'
      t.string :name, comment: 'チャット送信者'
      t.timestamps
    end
  end
end
