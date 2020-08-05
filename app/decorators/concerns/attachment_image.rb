##
# Decorator Concern
#
module AttachmentImage

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
  def image_original

    self.image.attached?? self.image.service_url : raise
  rescue
    ActionController::Base.helpers.image_url('noimage.svg')
  end

  ##
  # PC表示用
  # @version 2018/06/10
  #
  def image_large

    self.image.attached?? self.image.variant(resize: '900x600').processed.service_url : h.image_url('noimage.svg')
  rescue
    h.image_url('noimage.svg')
  end

  ##
  # スマホ表示用
  # @version 2018/06/10
  #
  def image_medium

    self.image.attached?? self.image.variant(resize: '600x400').processed.service_url : h.image_url('noimage.svg')
  rescue
    h.image_url('noimage.svg')
  end

  ##
  # サムネール表示用
  # @version 2018/06/10
  #
  def image_thumb

    self.image.attached?? self.image.variant(resize: '200x200').processed.service_url : h.image_url('noimage.svg')
  rescue
    h.image_url('noimage.svg')
  end
end
