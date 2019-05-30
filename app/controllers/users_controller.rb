##
# Users Controller
#
class UsersController < ApplicationController

  #----------------------------------------
  #  ** Includes **
  #----------------------------------------

  #----------------------------------------
  #  ** Instance variables **
  #----------------------------------------

  # ユーザー一覧
  expose_with_pagination(:users) { User.with_eager_loaded_image.reverse_order }
  # ユーザー
  expose(:user) { User.find_or_initialize_by id: params[:id] }

  #----------------------------------------
  #  ** Layouts **
  #----------------------------------------

  #----------------------------------------
  #  ** Request cycles **
  #----------------------------------------

  # 管理者認証
  before_action :authenticate_admin, only: [:index, :destroy]

  #----------------------------------------
  #  ** Actions **
  #----------------------------------------

  ##
  # 一覧
  # @version 2018/06/10
  #
  def index

    add_breadcrumb 'ユーザー一覧'
  end

  ##
  # 編集
  # @version 2018/06/10
  #
  def edit

    # 管理者以外は他人のプロフィールの操作は不可
    raise '許可されない操作です' if current_user.id != user.id && !current_user.admin?

    add_breadcrumb 'ユーザー一覧', path: users_path if current_user.admin?
    add_breadcrumb 'プロフィール編集'
  rescue => e
    redirect_back fallback_location: url_for({action: :index}), flash: {notice: {message: e.message}}
  end

  ##
  # 更新処理
  # @version 2018/06/10
  #
  def update

    # 管理者以外は他人のプロフィールの操作は不可
    raise '許可されない操作です' if current_user.id != user.id && !current_user.admin?

    user.attributes = user_params

    # ユーザー承認メール
    UserMailer.activation(user.id).deliver_later if user.active? && user.status_changed?

    # ユーザー情報更新
    user.save!

    redirect_back fallback_location: url_for({action: :index}), flash: {notice: {message: 'ユーザー情報を更新しました'}}
  rescue => e
    
    redirect_back fallback_location: url_for({action: :index}), flash: {notice: {message: e.message}}
  end

  ##
  # 削除
  # @version 2018/06/10
  #
  def destroy

    raise '己です。' if user.id = current_user.id

    raise '対象のユーザーは見積りに紐付きがあります' if user.quotes.exists?

    user.destroy!
  rescue => e

    flash[:warning] = { message: e.message }
  ensure
    redirect_to action: :index
  end

  #----------------------------------------
  #  ** Methods **
  #----------------------------------------

  private

    ##
    # パラメータの取得
    # @version 2018/06/10
    #
    def user_params
      
      params.require(:user).permit :name, :email, :image, :user_type, :division_id, :comment, :password, :password_confirmation, :publish, :status
    end
end
