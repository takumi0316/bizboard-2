class CreateTableFlagUploads < ActiveRecord::Migration[5.2]
 
  def up

    create_table :flag_uploads do |t|

      t.references :flag
      t.references :upload
    end
  end

  def down

    drop_table :flag_uploads
  end

end
