class CreateInquiries < ActiveRecord::Migration[5.2]
  def change
    create_table :inquiries do |t|
      t.references :quote,  index: true
      t.integer :result, default: 0
      t.string :quote_number, comment:'案件番号'
      t.datetime :import_time
      t.timestamps
    end
  end
end
