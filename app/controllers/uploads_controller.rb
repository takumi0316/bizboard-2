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

  expose_with_pagination(:uploads) { Upload.with_attached_image.search(params[:name]).all.where(status: :card).reverse_order }

  expose(:upload) { Upload.with_attached_image.find_or_initialize_by(id: params[:id], status: :card) }

  #----------------------------------------
  #  ** Layouts **
  #----------------------------------------

  #----------------------------------------
  #  ** Request cycles **
  #----------------------------------------

  #----------------------------------------
  #  ** Actions **
  #----------------------------------------

  def index

    add_breadcrumb '一覧'
  end

  def new

    @content_flag_uploads = []

    add_breadcrumb '一覧', path: uploads_path
    add_breadcrumb '新規作成'
  end

  def create

    upload.update! upload_params

    redirect_to uploads_path, flash: { show: true, icon: 'success', message: '画像を作成しました。' }
  rescue => e

    redirect_to_index e
  end

  def edit
 
    @content_flag_uploads = upload.content_flag_uploads.map do |r|
      {
        id: r.id,
        content_flag_id: r.content_flag_id,
        content_flag_name: r.content_flag.name,
        upload_id: r.upload_id
      }
    end

    add_breadcrumb '一覧', path: uploads_path
    add_breadcrumb '編集'
  end

  def update

    upload.update! upload_params

    redirect_to uploads_path, flash: { show: true, icon: 'success', message: '画像を更新しました。' }
  rescue => e

    redirect_to_index e
  end

  def destroy

    upload.destroy!

    redirect_to uploads_path, flash: { show: true, icon: 'info', message: '画像を削除しました。' }
  rescue => e

    redirect_to_index e
  end

  #----------------------------------------
  #  ** Methods **
  #----------------------------------------

  private

    def upload_params

      params.require(:upload).permit :name, :image, :status,
        content_flag_uploads_attributes: [:id, :content_flag_id, :upload_id, :_destroy]
    end


    def redirect_to_index e

      redirect_to uploads_path, flash: { show: true, icon: 'info', message: e.message }
    end
end
