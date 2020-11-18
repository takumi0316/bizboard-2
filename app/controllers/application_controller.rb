##
# Application Controller
#
class ApplicationController < ActionController::Base

  #----------------------------------------
  #  ** Includes **
  #----------------------------------------

  # ページネーション
  include Pagy::Backend

  # パンくずリスト
  include Breadcrumbs

  # Controller - View 間のインスタンス変数共有
  extend Exposure

  #----------------------------------------
  #  ** Instance variables **
  #----------------------------------------

  #----------------------------------------
  #  ** Layouts **
  #----------------------------------------

  #----------------------------------------
  #  ** Request cycles **
  #----------------------------------------

  protect_from_forgery with: :exception

  # デバイス判定
  before_action :set_request

  # ユーザー認証
  before_action :authenticate, except: [:delivery_note]

  # 既読判定
  before_action :read_message

  # bulletの停止
  around_action :skip_bullet, if: -> { Rails.env.development? }


  ##
  # エラーハンドリング
  # @version 2018/06/10
  #
  rescue_from ActionController::RoutingError,  with: :render_404
  rescue_from ActiveRecord::RecordNotFound,    with: :render_404
  rescue_from Pagy::OutOfRangeError,           with: :render_404
  # rescue_from Exception,                       with: :render_500

  #----------------------------------------
  #  ** Actions **
  #----------------------------------------

  #----------------------------------------
  #  ** Methods **
  #----------------------------------------

  # スマホ判定をviewで使用可能にする
  helper_method :sp?

  private

    ##
    # リクエスト情報の取得
    # @version 2018/06/10
    #
    def set_request

      ActiveStorage::Current.host = request.base_url
      request.variant = :sp if request.user_agent =~ /iPhone|Android/

      gon.consumption_tax = SiteConfig.consumption_tax
    end

    ##
    # スマホ判定
    # @version 2018/06/10
    #
    def sp?

      request.variant.present?
    end

    ##
    # Not Found
    # @version 2018/06/10
    #
    def render_404

      if request.xhr?
        render_json_404
      else
        render 'errors/404', layout: 'front/layouts/application', status: 404 if File.extname(request.path_info).empty?
      end
    end

    ##
    # Server Error
    # @version 2018/06/10
    #
    def render_500

      if request.xhr?
        render_json_500
      else
        render 'errors/500', layout: 'front/layouts/application', status: 500 if File.extname(request.path_info).empty?
      end
    end

    ##
    # Not Found (JSON)
    # @version 2018/06/10
    #
    def render_json_404

      render json: { status: :error, message: 'not found.' }, status: 404
    end

    ##
    # Server Error (JSON)
    # @version 2018/06/10
    #
    def render_json_500

      render json: { status: :error, message: 'server error.' }, status: 500
    end

    ##
    # ユーザー認証
    # @version 2018/06/10
    #
    def authenticate

      # セッションが切れている場合
      unless user_signed_in?

        # Ajax時以外
        unless request.xhr?

          return_url = request.original_fullpath
          # ログイン、または登録ページが指定されている場合は除外
          session[:return_url] = return_url if return_url != sign_in_path && return_url != sign_up_path
        end

        # ログイン画面へ
        redirect_to sign_in_path(params.permit!) and return
      end

      # メールアドレスが未認証の場合
      if current_user.provider && !current_user.confirmed?

        redirect_to view_context.confirmation_url(user.confirmation_token), flash: { notice: { message: '登録がまだお済みではありません' } } and return
      end

      # 管理者による承認が済んでいない場合
      if !SiteConfig.allow_inactive_user && current_user.inactive?

        redirect_to inactive_path and return
      end
    end

    ##
    # 管理者認証
    # @version 2018/06/10
    #
    def authenticate_admin

      redirect_back fallback_location: url_for(root_path), flash: { notice: { message: '管理者のみ許可された操作です' } } unless current_user.admin?
    end

    ##
    # omniauth認証エラー時
    # @version 2018/06/10
    #
    def new_session_path(scope)

      session[:keep_signed_out] = true
      sign_in_path
    end

    ##
    # ログイン後の遷移先を指定
    # @version 2018/06/10
    #
    def after_sign_in_path_for

      # リダイレクト先が指定されている場合
      if session[:return_url].present?

        return_url = session[:return_url]
        session.delete(:return_url)
        return_url
      else
        root_path
      end
    end

    ##
    # ログアウト後の遷移先を指定
    # @version 2018/06/10
    #
    def after_sign_out_path_for(scope)

      sign_in_path
    end
    ##
    # 既読処理
    # @version 2018/06/10
    #
    def read_message

      # 遷移元のアクションとコントローラー判定
      path = Rails.application.routes.recognize_path(request.referer)
      if path[:controller] == 'tasks' && path[:action] == 'show'

        unless params[:controller] == 'tasks' && params[:action] == 'show'

          current_user.update! lastaccesstask: Time.zone.now
        end
      end
    end

    ##
    # Bulletの停止
    # @version 2018/06/10
    #
    def skip_bullet

      previous_value = Bullet.enable?
      Bullet.enable = false
      yield
    ensure

      Bullet.enable = previous_value
    end
end
