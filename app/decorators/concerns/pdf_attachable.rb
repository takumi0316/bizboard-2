##
# Decorator Concern
#
module PdfAttachable

  #----------------------------------------
  #  ** Includes **
  #----------------------------------------

  #----------------------------------------
  #  ** Constants **
  #----------------------------------------

  #----------------------------------------
  #  ** Methods **
  #----------------------------------------

  ##
  # オリジナル表示用
  # @version 2018/06/10
  #
  def file_original

    self.file.attached?? self.file.service_url : raise
  rescue

    # ActionController::Base.helpers.image_url('noimage.svg')
  end

  ##
  # PC表示用
  # @version 2018/06/10
  #
  def file_large

    self.file.attached?? self.file.blob.preview(resize: '900x600').processed.service_url : raise
  rescue

    ActionController::Base.helpers.image_url('noimage.svg')
  end

  ##
  # スマホ表示用
  # @version 2018/06/10
  #
  def file_medium

    self.file.attached?? self.file.blob.preview(resize: '600x400').processed.service_url : raise
  rescue

    ActionController::Base.helpers.image_url('noimage.svg')
  end

  ##
  # サムネール表示用
  # @version 2018/06/10
  #
  def file_thumb

    self.file.attached?? self.file.blob.preview(resize: '200x200').processed.service_url : raise
  rescue

    ActionController::Base.helpers.image_url('noimage.svg')
  end

  ##
  # 画像引用参照
  # @version 2018/06/10
  #
  def transfer

    raise unless self.file.attached? 
    content = open self.file.service_url 
    send_data content.read, type: content.content_type, disposition: 'inline'
  rescue

    ActionController::Base.helpers.image_url('noimage.svg')
  end
end
