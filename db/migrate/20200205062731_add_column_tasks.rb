class AddColumnTasks < ActiveRecord::Migration[5.2]
  def change

    #こんプロ側からSlack通知をスレッドに投稿する為の親コードを保存する為
    add_column :tasks, :ts_code, :string
  end
end
