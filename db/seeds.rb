# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)

# 管理者データ
# User.delete_all
# User.create! id: 1,name: "#{SiteConfig.site_name}公式", email: SystemConfig.email, user_type: :admin, status: :active

# Web名刺テストユーザーデータ
30.times { |time| CompanyDivisionClient.create! company_division_id: 1829, name: "サンプル三郎郎#{ time }", email: "y.oshima+0#{time}@jiinet.co.jp", password_digest: 'yuto'  }

