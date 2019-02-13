##
# Webhooks Controller
#
class WebhooksController < ApplicationController

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
  # mfクラウド
  # @version 2018/06/10
  #
  def mfcloud

    require 'net/https'

    uri = URI.parse('https://invoice.moneyforward.com/oauth/token')
    http = Net::HTTP.new(uri.host, uri.port)
    http.use_ssl = true
    http.verify_mode = OpenSSL::SSL::VERIFY_NONE
    req = Net::HTTP::Post.new(uri.path, {
      'Content-Type': 'application/x-www-form-urlencoded',
      'Accept': 'application/json',
    })
    req.set_form_data({
      client_id: SiteConfig.mfcloud_client_id,
      client_secret: SiteConfig.mfcloud_client_secret,
      redirect_uri: SiteConfig.mfcloud_redirect_uri,
      grant_type: :authorization_code,
      code: params[:code],
    })
    res = Oj.load http.request(req).body

    unless current_user.mf_access_token?

      current_user.mf_access_token = res['access_token']
      current_user.mf_token_expires_in = Time.now + 30.days
      current_user.mf_refresh_token = res['refresh_token']

      current_user.save!
    end

    # 登録後のリダイレクト先を指定
    redirect_url = URI(session[:return_url].presence || root_path)
    session[:return_url] = nil

    redirect_to redirect_url.to_s, flash: {notice: { message: 'MFクラウドの認証が完了しました'}}
  end

  #----------------------------------------
  #  ** Methods **
  #----------------------------------------

end
