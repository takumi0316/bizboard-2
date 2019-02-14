class CreateDivisionTable < ActiveRecord::Migration[5.2]
  def change
    ##
    # 自社部署
    # @version 2018/06/10
    #
    create_table :divisions do |t|

      t.string  :name
      t.string  :kana
      t.string  :zip
      t.string  :tel
      t.integer :prefecture_id
      t.string  :address1
      t.string  :address2
      t.text :note

      t.timestamps
    end
  end
end
