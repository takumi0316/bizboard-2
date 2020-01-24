source 'https://rubygems.org'

git_source(:github) do |repo_name|
  repo_name = "#{repo_name}/#{repo_name}" unless repo_name.include?('/')
  "https://github.com/#{repo_name}.git"
end

# Bundle edge Rails instead: gem 'rails', github: 'rails/rails'
gem 'rails', '~> 5.2.0'
# Use sqlite3 as the database for Active Record
gem 'mysql2'
# Use SCSS for stylesheets
gem 'sass-rails', '~> 5.0'

# Use unicorn as the app server
gem 'unicorn'

# fast start
gem 'bootsnap', require: false

# access control
gem 'rack-attack'

# redirect trailing slash
gem 'rack-rewrite'

# Webpacker
gem 'webpacker'
gem 'webpacker-react'

# js grobal variables
gem 'gon'

# 静的データ
gem 'active_hash', '~> 1.5.3'

# Use ActiveStorage variant
gem 'mini_magick', '~> 4.8'

# active storage
gem 'aws-sdk-s3', require: false

# KVS
gem 'hiredis'
gem 'redis', require: ['redis', 'redis/connection/hiredis']
gem 'redis-objects'

# template engine
gem 'slim-rails'

# auto Prefixer
gem 'autoprefixer-rails'

# meta
gem 'meta-tags'

# icons
gem 'evil_icons'

# job controller
gem 'sidekiq'
gem 'sinatra', require: false
gem 'mini_scheduler'

# settings
gem 'rails-settings-cached'

# Turbolinks makes navigating your web application faster. Read more: https://github.com/turbolinks/turbolinks
gem 'turbolinks', '~> 5'

# fast json builder
gem 'jb'

# fast json parser
gem 'oj'

# fast detect spaces
gem 'fast_blank'

# decorator
gem 'draper'

# localizer
gem 'enum_help'

# pagination
gem 'pagy'

# auth
gem 'devise'
gem 'omniauth'
gem 'omniauth-google-oauth2'

gem 'wicked_pdf'
gem 'wkhtmltopdf-binary', '0.12.4'

# slack
gem 'slack-api'

# csv読み込み
gem 'roo'

# bulk insert
gem 'activerecord-import'

# Windows does not include zoneinfo files, so bundle the tzinfo-data gem
gem 'tzinfo-data', platforms: [:mingw, :mswin, :x64_mingw, :jruby]

#コード規約チェック
group :development do
  # rubocop
  gem 'rubocop-performance', require: false
  gem 'rubocop', '~> 0.77.0', require: false
end


group :production do

  # for debug
  gem 'pry', require: false
  gem 'pry-rails', require: 'pry-rails/console'

  # Use Uglifier as compressor for JavaScript assets
  gem 'mini_racer', platforms: :ruby
end

# for development
local_gemfile = File.join(File.dirname(__FILE__), 'Gemfile.development')
instance_eval File.read(local_gemfile) if File.exist? local_gemfile
