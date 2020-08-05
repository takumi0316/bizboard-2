class ContentLogosController < ApplicationController

  #----------------------------------------
  #  ** Includes **
  #----------------------------------------

  #----------------------------------------
  #  ** Instance variables **
  #----------------------------------------

  expose_with_pagination(:content_logos) { ContentLogo.search(params[:name]).all.reverse_order }

  expose(:content_logo) { ContentLogo.find_or_initialize_by(id: params[:id]) }

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

    content_flag.update! content_logo_params

    redirect_to action: :edit, flash: { notice: { message: '画像・ロゴを作成しました。' } }
  rescue => e

    redirect_back action: :edit, flash: { notice: { message: e.message } }
  end

  def edit

    add_breadcrumb '一覧', path: content_logos_path
    add_breadcrumb '編集'
  end

  def update

    content_logo.update! content_logo_params

    redirect_to action: :edit, flash: { notice: { message: '画像・ロゴを作成しました。' } }
  rescue => e

    redirect_back action: :edit, flash: { notice: { message: e.message } }
  end

  def destroy

    content_flag.destroy!

    redirect_to action: :index, flash: { notice: { message: '画像・ロゴを削除しました。' } }
  rescue => e

    redirect_back action: :index, flash: { notice: { message: e.message } }
  end

  #----------------------------------------
  #  ** Methods **
  #----------------------------------------

  private

    def content_logo_params

      params.require(:content_logo).permit :name, :logo
    end

end
