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
    @res = http.request(req)
  end

  equest = Net::HTTP::Post.new(uri.path, initheader = )

  #----------------------------------------
  #  ** Methods **
  #----------------------------------------

end
