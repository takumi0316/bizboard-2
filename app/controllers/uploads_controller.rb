##
# Uploads Controller
#
class UploadsController < ApplicationController

  #----------------------------------------
  #  ** Includes **
  #----------------------------------------

  #----------------------------------------
  #  ** Instance variables **
  #----------------------------------------

  # キャラクター一覧
  expose_with_pagination(:uploads) { Upload.with_attached_file.reverse_order }

  #----------------------------------------
  #  ** Layouts **
  #----------------------------------------

  #----------------------------------------
  #  ** Request cycles **
  #----------------------------------------

  #----------------------------------------
  #  ** Actions **
  #----------------------------------------

  ##
  # リソース一覧
  # @version 2018/06/10
  #
  def index
  end

  ##
  # 新規作成処理
  # @version 2018/06/10
  #
  def create

    upload = Upload.create upload_params
    render json: { status: :success, url: url_for(upload.file), upload: upload }
  rescue
    render_json_404
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

  ##
  # 画像引用登録
  # @version 2018/06/10
  #
  def reprint

    upload = Upload.new
    upload.file.attach(io: open(params[:url]), filename: :blob)
    upload.save!

    render json: { status: :success, url: rails_blob_path(upload.file, only_path: true), image: upload }
  rescue
    render_json_404
  end

  #----------------------------------------
  #  ** Methods **
  #----------------------------------------

  private

    ##
    # パラメータの取得
    # @version 2018/06/10
    #
    def upload_params
      
      params.permit :file, :name, :author, :author_name, :credit
    end

end
