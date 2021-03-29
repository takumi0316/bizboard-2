# server-based syntax
# ======================
# Defines a single server with a list of roles and multiple properties.
# You can define all roles on a single server, or split them:

# server 'example.com', user: 'deploy', roles: %w{app db web}, my_property: :my_value
# server 'example.com', user: 'deploy', roles: %w{app web}, other_property: :other_value
# server 'db.example.com', user: 'deploy', roles: %w{db}

server 'factory-staging', user: 'media', roles: %w{app assets batch db}

set :assets_roles, [:assets]

# rails
set :rails_env, 'staging'
set :branch, 'issues#77'
set :deploy_to, '/home/media'
set :log_level, :debug
set :default_shell, '/bin/bash -l'

# sidekiq
set :sidekiq_role, :batch

after 'deploy:publishing', 'deploy:restart'

namespace :deploy do

  # precompile前にnodeで使用する最大メモリサイズを指定する
  before :compile_assets, :set_max_heep_size do
    on roles(:assets) do
      within release_path do
        execute "export NODE_OPTIONS='--max-old-space-size=1000'"
      end
    end
  end

  task :restart do
    invoke 'unicorn:legacy_restart'
  end

  # migration前にdatabaseを作成する
  before :migrate, :db_create do
    on roles(:db) do
      within release_path do
        with rails_env: fetch(:rails_env) do
          info 'creating database...'
          execute :rails, 'db:create'
        end
      end
    end
  end

  # migration前にmysql再起動
  before :db_create, :mysql_restart do
    on roles(:db), in: :sequence, wait: 5 do
      info 'restarting mysql server...'
      sudo '/etc/init.d/mysqld restart'
    end
  end
end
