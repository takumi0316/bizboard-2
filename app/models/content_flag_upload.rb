# == Schema Information
#
# Table name: content_flag_uploads
#
#  id              :bigint(8)        not null, primary key
#  content_flag_id :bigint(8)
#  upload_id       :bigint(8)
#

class ContentFlagUpload < ApplicationRecord

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

  belongs_to :content_flag

  belongs_to :upload
 
  #----------------------------------------
  #  ** Delegates **
  #----------------------------------------

  #----------------------------------------
  #  ** Scopes **
  #----------------------------------------

  #----------------------------------------
  #  ** Methods **
  #----------------------------------------
 

  def transferring_data_script

    ContentFlag.where(content_type: :image).each do |f|
      LayoutContent.find_by(content_flag_id: f.id).uploads.each { |u|
        ContentFlagUpload.create! content_flag_id: f.id, upload_id: u.id
      }
    end
  end

end
