class AddColumnAndCangeColumn < ActiveRecord::Migration[5.2]
  def change

    #csv取り込み処理の為に案件の合計金額のみを入力するフォームに使用する為
    add_column :quotes, :temporary_price, :integer
    #こんプロ側から発注決定判断に使用する為
    add_column :tasks, :will_order, :integer, default: 0, null: :false
    #inquiry使用時に登録時間を記録するカラムを設けたがcreated_atで使用可能だった為
    remove_column :inquiries, :import_time, :datetime
    #inquiry使用時に部署で登録処理を分ける為
    add_reference :inquiries, :division, foreign_key: true
  end



end
