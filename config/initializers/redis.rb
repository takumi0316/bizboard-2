Redis.current = Redis.new(
  driver: :hiredis,
  host: SystemConfig.redis_host,
  port: SystemConfig.redis_port,
  db: Rails.env.production?? 1 : 3,
)
Redis::Objects.redis = Redis.current
