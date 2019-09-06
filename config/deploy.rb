lock '3.11.0'

require 'capistrano/sidekiq'

set :application, 'jiifactory'

set :repo_url, 'git@github.com:shogoyoneda/jii-factory.git'
#set :scm, :git
set :keep_releases, 3

# Default value for linked_dirs is []
append :linked_dirs, 'log', 'tmp/pids', 'tmp/cache', 'tmp/sockets', 'tmp/storage', 'node_modules', 'vendor/bundle', 'public/sitemaps', 'public/packs'

# 指定ファイルに変化が生じた場合にprecompileを行う
set :assets_dependencies, %w(app/assets lib/assets vendor/assets app/javascript package.json yarn.lock config/webpack)

# ruby
set :rbenv_ruby, '2.6.3'
set :default_env, { path: '~/.rbenv/shims:~/.rbenv/bin:$PATH' }
