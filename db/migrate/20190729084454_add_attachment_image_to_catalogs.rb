class AddAttachmentImageToCatalogs < ActiveRecord::Migration[5.2]
  def self.up
    change_table :catalogs do |t|
      t.attachment :image
    end
  end

  def self.down
    remove_attachment :catalogs, :image
  end
end
