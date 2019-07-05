require_relative 'boot'

require 'rails/all'

# Require the gems listed in Gemfile, including any gems
# you've limited to :test, :development, or :production.
Bundler.require(*Rails.groups)

module JiiFactory
  class Application < Rails::Application

    # Initialize configuration defaults for originally generated Rails version.
    config.load_defaults 5.2

    # Setting in config/environments/* take precedence over those specified here.
    # Application configuration should go into files in config/initializers
    # -- all .rb files in that directory are automatically loaded.

    # デフォルト言語
    config.i18n.default_locale = :ja

    # タイムゾーン設定
    config.time_zone = 'Asia/Tokyo'

    # dbのtimezoneと一致させておく
    config.active_record.default_timezone = :local

    # configs
    config.x.system = config_for(:system_config)

    # DecoratorのConcern
    config.eager_load_paths += Dir[Rails.root.join('app', 'decorators', 'concerns')]

    # ActiveStorageのURL有効期限
    ActiveStorage::Service.url_expires_in = 6.hours

    # cache store
    config.cache_store = :redis_cache_store, {
      driver: :hiredis,
      namespace: :jii_factory,
      compress: true,
      url: "redis://#{config.x.system['redis_host']}:#{config.x.system['redis_port']}/#{Rails.env.production?? 0 : 2}/"
    }

    # アクセス制限
    config.middleware.use Rack::Attack

    # 末尾にスラッシュ付きのURLはスラッシュ無しへリダイレクト
    config.middleware.insert_before(Rack::Runtime, Rack::Rewrite) do
      r301 %r{^/(.*)/$}, '/$1'
      r301 %r{^/?(.*)/index.html$}, '/$1'
    end

    # default form builder
    config.action_view.default_form_builder = 'ApplicationFormBuilder'

    # field_with_errors wrapper
    config.action_view.field_error_proc = Proc.new { |html_tag, instance| html_tag.html_safe }
  end
end
