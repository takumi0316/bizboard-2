##
# Admins AuthCallbacksController
#
class AuthCallbacksController < Devise::OmniauthCallbacksController

  #----------------------------------------
  #  ** Includes **
  #----------------------------------------

  #----------------------------------------
  #  ** Instance variables **
  #----------------------------------------

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
  # Google用callback時のアクション
  # @version 2018/06/10
  #
  def google

    sns_auth
  end

  #----------------------------------------
  #  ** Methods **
  #----------------------------------------

  private

    ##
    # ユーザー認証処理
    # @version 2018/06/10
    #
    def sns_auth

      # SNS認証情報
      omniauth = request.env['omniauth.auth']

      # プロバイダでのメール認証が済んでいない場合
      if omniauth.info.email.blank?
        redirect_to sign_up_path, flash: {success: { message: 'ご利用アカウントのメール認証がお済みではない可能性があります。ご確認後、再度ご登録をお願い致します。'} } and return
      end

      # 認証情報存在確認
      user = User.find_or_initialize_by(email: omniauth.info.email)

      unless user.confirmed?

        # ユーザーの仮情報を登録
        user.name     ||= omniauth.info.name
        user.provider = omniauth.provider
        user.uid      = omniauth.uid

        user.save!

        # 本登録処理へ
        redirect_to view_context.confirmation_url(user.confirmation_token) and return
      end

      # sign_in処理
      sign_in(:user, user)
      redirect_to root_path
    rescue
      
      redirect_to sign_up_path, flash: {success: { message: 'ログインに失敗しました'} }
    end
end
