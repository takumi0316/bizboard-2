require 'sidekiq/web'

# sidekiqへのBasic認証
Sidekiq::Web.use Rack::Auth::Basic do |user, password|

  user == SystemConfig.basic_auth_id && password == SystemConfig.basic_auth_pass
end

Sidekiq.configure_server do |config|

  config.redis = { url: "redis://#{SystemConfig.redis_host}:#{SystemConfig.redis_port}" }
end

Sidekiq.configure_client do |config|

  config.redis = { url: "redis://#{SystemConfig.redis_host}:#{SystemConfig.redis_port}" }
end
