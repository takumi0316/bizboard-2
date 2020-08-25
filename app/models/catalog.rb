# == Schema Information
#
# Table name: catalogs
#
#  id          :bigint           not null, primary key
#  name        :string(191)
#  description :text(65535)
#  price       :string(191)
#  deliver_at  :string(191)
#  category_id :bigint
#  turn        :integer          default(0)
#  created_at  :datetime         not null
#  updated_at  :datetime         not null
#

class Catalog < ApplicationRecord

  #----------------------------------------
  #  ** Includes **
  #----------------------------------------

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

  # 画像
  has_one_attached :image, dependent: :detach

  # category
  belongs_to :category

  #----------------------------------------
  #  ** Delegates **
  #----------------------------------------

  #----------------------------------------
  #  ** Scopes **
  #----------------------------------------

  # 画像のN+1回避(eager load)
  scope :with_eager_loaded_image, -> { eager_load(image_attachment: :blob) }

  #----------------------------------------
  #  ** Methods **
  #----------------------------------------

end
