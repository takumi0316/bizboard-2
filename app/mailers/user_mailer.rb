class UserMailer < ApplicationMailer

  ##
  # メール認証用
  # @version 2018/06/10
  #
  def confirmation(email, url)

    @email = email
    @url = url
    mail to: @email, subject: "[#{SiteConfig.site_name}]本登録を完了させてください。"
  end

  ##
  # ユーザー登録承認
  # @version 2018/06/10
  #
  def activation(user_id)

    @user = User.find user_id
    mail to: @user.email, subject: "[#{SiteConfig.site_name}]本登録処理が完了しました。"
  end

  ##
  # パスワードの再送信
  # @version 2018/06/10
  #
  def remind(user_id)

    @user = User.find user_id
    mail to: @user.email, subject: "[#{SiteConfig.site_name}]パスワード再設定のお知らせ"
  end

end
