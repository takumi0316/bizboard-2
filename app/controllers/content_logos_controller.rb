class ContentLogosController < ApplicationController

  #----------------------------------------
  #  ** Includes **
  #----------------------------------------

  #----------------------------------------
  #  ** Instance variables **
  #----------------------------------------

  expose_with_pagination(:content_logos) { ContentLogo.with_attached_image.search(params[:name]).all.reverse_order }

  expose(:content_logo) { ContentLogo.with_attached_image.find_or_initialize_by(id: params[:id]) }

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

    add_breadcrumb '一覧', path: content_logos_path
    add_breadcrumb '新規作成'
  end

  def create

    content_logo.update! content_logo_params

    render json: { status: :success }
  rescue => e

    redirect_to_index e
  end

  def edit

    add_breadcrumb '一覧', path: content_logos_path
    add_breadcrumb '編集'
  end

  def update

    content_logo.update! content_logo_params

    redirect_to content_logos_path, flash: { notice: { message: '画像を更新しました。' } }
  rescue => e

    redirect_to_index e
  end

  def destroy

    content_logo.destroy!

    redirect_to content_logos_path, flash: { notice: { message: '画像を削除しました。' } }
  rescue => e

    redirect_to_index e
  end

  #----------------------------------------
  #  ** Methods **
  #----------------------------------------

  private

    def content_logo_params

      params.require(:content_logo).permit :name, :image
    end


    def redirect_to_index e

      redirect_to content_logos_path, flash: { notice: { message: e.message } }
    end
end
