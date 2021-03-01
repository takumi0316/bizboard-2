##
# Users Sessions Controller
#
class SessionsController < Devise::SessionsController

  #----------------------------------------
  #  ** Includes **
  #----------------------------------------

  #----------------------------------------
  #  ** Instance variables **
  #----------------------------------------

  # 特集記事
  expose(:user) { User.new }

  #----------------------------------------
  #  ** Layouts **
  #----------------------------------------

  layout 'layouts/application'

  #----------------------------------------
  #  ** Request cycles **
  #----------------------------------------

  # 認証
  before_action :authenticate, only: [:index, :new, :verify, :confirm]

  #----------------------------------------
  #  ** Actions **
  #----------------------------------------

  ##
  # user sign in
  # @version 2018/06/10
  #
  def index

    return unless request.post?

    self.user = User.find_by(email: user_params[:email])

    # ユーザー情報が取得できない場合
    raise 'ログインに失敗しました。入力したメールアドレスをご確認ください。' if self.user.blank?

    # ユーザー認証
    unless self.user.authenticate(user_params[:password])
      raise 'ログインに失敗しました。入力したパスワードに誤りがないかご確認ください。'
    end

    sign_in(:user, self.user)

    redirect_to after_sign_in_path_for

  rescue => e

    redirect_to sign_in_path, flash: { warning: { message: e.message }} and return
  end

  ##
  # user sign in
  # @version 2018/06/10
  #
  def new

    return unless request.post?

    self.user = User.find_or_initialize_by(email: user_params[:email])

    raise '正しいメールアドレスを入力してください' if self.user.blank?

    # 既に登録済みの場合はエラー
    if self.user.confirmed?
      # ログイン画面へリダイレクトする
      redirect_to sign_in_path, flash: { warning: {message: 'ご指定のメールアドレスは登録済みです。ログインして下さい'}} and return
    end

    # 登録時バリデーション
    raise 'メールアドレスの形式が不正です' unless self.user.valid?

    self.user.save!

    # 認証画面のURLを生成
    url = view_context.confirmation_url self.user.confirmation_token

    # 認証メール送信
    UserMailer.confirmation(self.user.email, url).deliver_later

    render 'sessions/send'

  rescue => e

    flash.now[:warning] = { message: e.message }
    render 'sessions/new'
  end

  ##
  # ユーザー情報登録
  # @version 2018/06/10
  #
  def verify

    # ユーザー情報を取得する
    self.user = User.find_by(confirmation_token: params[:token])

    raise 'ユーザーが不正です' if self.user.blank?

    raise '既に認証済みです' if self.user.confirmed?

    # 認証トークンをsessionに格納
    session[:token] = self.user.confirmation_token

    # return url が指定されている場合はsessionに格納
    session[:return_url] = params[:return_url] if params[:return_url].present?

  rescue => e
    redirect_to sign_up_path, flash: { warning: {message: e.message}}
  end

  ##
  # ユーザー本登録
  # @version 2018/06/10
  #
  def confirm

    # tokenが指定されている場合はメール認証する
    raise '認証トークンが不正です' if session[:token].blank?

    self.user = User.find_by(confirmation_token: session[:token])

    raise '未入力の項目があります。' if user_params[:name].blank? || user_params[:password].blank? || user_params[:password_confirmation].blank?

    raise 'パスワードと確認用パスワードが一致しません' if user_params[:password] != user_params[:password_confirmation]

    raise 'ユーザー情報が不正です' if self.user.blank?

    raise '既に認証済みです' if self.user.confirmed?

    self.user.update! user_params

    # トークン承認
    self.user.confirm

    sign_in(:user, self.user)

    # 登録後のリダイレクト先を指定
    redirect_url = URI(session[:return_url].presence || root_path)
    session[:return_url] = nil

    redirect_to redirect_url.to_s

  rescue => e

    if session[:token].present?
      self.user.attributes = user_params
      flash.now[:warning] = { message: e.message }
      render :verify
    else

      redirect_to sign_up_path, flash: { warning: { message: e.message } }
    end
  end

  ##
  # user sign in
  # @version 2018/06/10
  #
  def auth

    request.env['devise.mapping'] = Devise.mappings[:user]
    redirect_to user_google_omniauth_authorize_path
  end

  ##
  # パスワードの再送
  # @version 2018/06/10
  #
  def remind

    return unless request.post?

    begin
      self.user = User.find_by!(email: user_params[:email])

      # メールアドレスが未承認の場合
      unless self.user.confirmed?

        redirect_to sign_in_path, flash: { warning: { message: 'ご入力いただいたメールアドレスはまだ認証がお済みではありません。以前お送りしたメールをご確認ください。' } } and return
      end

      # メール送信
      UserMailer.remind(self.user.id).deliver_later
    rescue
    ensure

      # セキュリティ対策のためいかなる場合も成功時と同様のviewを表示する
      render 'sessions/remind_send'
    end
  end

  ##
  # パスワードリセット
  # @version 2018/06/10
  #
  def password_reset

    # ユーザー情報を取得
    self.user = User.find_by(password_digest: params[:key])

    raise '情報が取得できませんでした。もう一度お試しください' if self.user.blank?

    if request.post?

      # パスワードを更新する
      raise '入力したパスワードに誤りがあります' unless self.user.update(
        password: user_params[:password],
        password_confirmation: user_params[:password_confirmation]
      )
      redirect_to root_path, flash: { warning: { message: 'パスワードを更新しました' } } and return
    end
  rescue => e
    redirect_to sign_in_path, flash: { warning: { message: e.message } }
  end

  ##
  # 管理者による承認待ち
  # @version 2018/06/10
  #
  def inactive

    # 既に承認済の場合はリダイレクト
    redirect_to root_path unless current_user.inactive?
  end

  ##
  # user sign out
  # @version 2018/06/10
  #
  def destroy

    super
    flash[:notice] = { message: 'ログアウトしました' }
    session[:keep_signed_out] = true # Set a flag to suppress auto sign in
  end

  #----------------------------------------
  #  ** Methods **
  #----------------------------------------

  private

    ##
    # ユーザー認証
    # @version 2018/06/10
    #
    def authenticate

      # すでにログイン済みの場合はユーザーのrootへ
      redirect_to root_path and return if user_signed_in?
    end

    ##
    # 送信されたユーザー情報更新用パラメータ
    # @version 2018/06/10
    #
    def user_params

      params.require(:user).permit(:email, :name, :password, :password_confirmation)
    end
end
