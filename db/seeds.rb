# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)

# 管理者データ
User.delete_all
User.create! id: 1,name: "#{SiteConfig.site_name}公式", email: SystemConfig.email, user_type: :admin, status: :active

# 静的テキスト
StaticText.delete_all
StaticText.create! name: 'robots.txt', body: 'User-agent: *\r\nDisallow: /'
