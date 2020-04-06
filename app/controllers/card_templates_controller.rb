class CardTemplatesController < ApplicationController
  def index
  end

  def new
  end

  def edit
  end

  ##
  # 画像引用参照
  # @version 2018/06/10
  #
  def transfer

    raise if params[:url].blank?
    content = open params[:url]
    send_data content.read, type: content.content_type, disposition: 'inline'
  rescue

    render_json_404
  end
end
