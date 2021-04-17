class CreateTableContentFlagUploads < ActiveRecord::Migration[5.2]
 
  def up

    create_table :content_flag_uploads do |t|

      t.references :content_flag
      t.references :upload
    end
  end

  def down

    drop_table :content_flag_uploads
  end

end
