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

  expose(:upload) { Upload.with_attached_image.find_or_initialize_by(id: params[:id]) }

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

    add_breadcrumb '一覧', path: uploads_path
    add_breadcrumb '新規作成'
  end

  def create

    upload.update! upload_params

    render json: { status: :success }
  rescue => e

    redirect_to_index e
  end

  def edit

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

      params.require(:upload).permit :name, :image, :status
    end


    def redirect_to_index e

      redirect_to uploads_path, flash: { show: true, icon: 'info', message: e.message }
    end
end
