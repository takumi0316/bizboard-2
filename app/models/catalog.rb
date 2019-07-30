# == Schema Information
#
# Table name: catalogs
#
#  id                 :bigint(8)        not null, primary key
#  name               :string(191)
#  description        :text(65535)
#  price              :string(191)
#  deliver_at         :string(191)
#  created_at         :datetime         not null
#  updated_at         :datetime         not null
#  image_file_name    :string(191)
#  image_content_type :string(191)
#  image_file_size    :bigint(8)
#  image_updated_at   :datetime
#

class Catalog < ApplicationRecord

  #----------------------------------------
  #  ** Includes **
  #----------------------------------------

  has_attached_file :image,
  #画像サイズを指定
  styles: { medium: "500x500>", thumb: "100x100>", big: "810x500"},
  #サーバ上の画像保存先パス
  path: "#{Rails.root}/app/assets/images/catalog/:filename"
  validates_attachment_content_type :image, content_type: /image/

  #----------------------------------------
  #  ** Constants **
  #----------------------------------------

  #----------------------------------------
  #  ** Enums **
  #----------------------------------------

  #----------------------------------------
  #  ** Validations **
  #----------------------------------------

  #----------------------------------------
  #  ** Associations **
  #----------------------------------------

  #----------------------------------------
  #  ** Delegates **
  #----------------------------------------

  #----------------------------------------
  #  ** Scopes **
  #----------------------------------------

  #----------------------------------------
  #  ** Methods **
  #----------------------------------------

end
