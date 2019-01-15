##
# Configs Controller
#
class ConfigsController < ApplicationController

  #----------------------------------------
  #  ** Includes **
  #----------------------------------------

  #----------------------------------------
  #  ** Instance variables **
  #----------------------------------------

  # コンポーネント一覧
  expose(:site_configs) { SiteConfig.get_all }

  #----------------------------------------
  #  ** Layouts **
  #----------------------------------------

  #----------------------------------------
  #  ** Request cycles **
  #----------------------------------------

  # 管理者認証
  before_action :authenticate_admin

  #----------------------------------------
  #  ** Actions **
  #----------------------------------------

  ##
  # サイト設定
  # @version 2018/06/10
  #
  def index

    add_breadcrumb 'サイト設定'
  end

  ##
  # サイト設定更新
  # @version 2018/06/10
  #
  def create

    # 設定ファイル上のvalueに対して更新処理を実施
    params.permit(SiteConfig.get_all.keys).each do |key, value|

      site_config = SiteConfig.find_by(var: key) || SiteConfig.new(var: key)

      # booleanの場合は変換
      value = value =~ /^(true|false)$/ ? ActiveRecord::Type::Boolean.new.cast(value) : value

      # 数値の場合は変換
      value = value =~ /^[0-9]+$/ ? value.to_i : value

      site_config.value = value
      site_config.save!
    end

    redirect_back fallback_location: url_for({action: :index}), flash: {notice: {message: '設定を更新しました'}}
  end

  ##
  # サイトロゴ更新
  # @version 2018/06/10
  #
  def create_logo

    [:logo, :ogimage, :webclip].each do |key|

      value = nil

      if params[key]
        upload = Upload.new
        upload.file = params[key]
        upload.save!
        value = rails_blob_path(upload.file, only_path: true)
      end

      site_config = SiteConfig.find_by(var: key) || SiteConfig.new(var: key)
      site_config.value = value
      site_config.save!
    end

    render json: { status: :success }
  rescue => e
    render json: { status: :error, message: e.message }
  end

  ##
  # favicon更新
  # @version 2018/06/10
  #
  def create_favicon

    value = nil
    if params[:favicon]
      upload = Upload.new
      upload.file = params[:favicon]
      upload.save!
      value = rails_blob_path(upload.file, only_path: true)
    end

    site_config = SiteConfig.find_by(var: :favicon) || SiteConfig.new(var: :favicon)
    site_config.value = value
    site_config.save!

    redirect_back fallback_location: url_for({action: :index}), flash: {notice: {message: 'faviconを更新しました'}}
  end

  ##
  # アクティベーション
  # @version 2018/06/10
  #
  def activation

    # jobがアクティブであれば解除し、非アクティブであればアクティブ化する
    job = params[:job].camelize.constantize
    job.schedule_info.next_run ? job.schedule_info.del! : job.perform_later
  rescue

    flash[:warning] = { message: '設定に失敗しました' }
  ensure

    redirect_back fallback_location: url_for({action: :index})
  end

  #----------------------------------------
  #  ** Methods **
  #----------------------------------------

end
