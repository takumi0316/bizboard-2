Redis.current = Redis.new(
  driver: :hiredis,
  host: SystemConfig.redis_host,
  port: SystemConfig.redis_port,
  db: 1
)
Redis::Objects.redis = Redis.current
