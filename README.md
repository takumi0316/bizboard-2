# README

## sidekiq

```
# 非同期処理 起動
$ bundle exec sidekiq -C config/sidekiq.yml
# 非同期処理 デーモン起動:
$ bundle exec sidekiq -C config/sidekiq.yml -d
# sidekiq停止
$ sidekiqctl stop ./tmp/pids/sidekiq.pid
```

## デプロイ

# production
```
$ bundle exec cap production deploy
```

# staging
```
$ bundle exec cap staging deploy
```

## 本番でのcacheクリア
```
$ RAILS_ENV=production bundle exec rails r 'Rails.cache.clear'
$ sudo rm -rf /var/cache/nginx/*
```

## 本番でのコンソール操作起動コマンド

```
$ RAILS_ENV=production ruby console.rb
```

# 開発環境

## 必要なアカウント

- gmail
  - SMTP
  - oauth
- pixabay (API)
- unsplash (API)
- flickr (API)
- google analytics
- google search console
- twitter (oauth)
- facebook (oauth)
- github (oauth)

## 秘匿情報の追加/更新
```
$ EDITOR=vi rails credentials:edit
```

## SVGスプライト作成

```
$ bundle exec svgeez build --source app/assets/images/svgs --destination app/assets/images/application.svg
```

## コーディング規約チェック

```
$ bundle exec rails_best_practices --output-file ./public/check.html -f html .
$ rails s
http://localhost:3000/check.html
```

## セキュリティホール検知

```
$ brakeman -o ./report/brakeman.html
```

## Modelへのカラム名記載

```
$ bundle exec annotate
```

## 初期データ投入

```
$ bundle exec rake db:seed
```

## yarn
```
$ yarn --ignore-engines add card-vibes
$ yarn --ignore-engines remove card-vibes
```

# SEO, アクセシビリティ CHECK

- ChromeのデベロッパーツールのAuditsを使用してアクセシビリティのチェックを行う
- モバイルフレンドリーテスト https://search.google.com/test/mobile-friendly?hl=ja
- ページスピード https://developers.google.com/speed/pagespeed/insights/?hl=ja

# アカウント情報

## YahooJp ログイン管理画面

https://e.developer.yahoo.co.jp/dashboard/

## Twitter ログイン管理画面

https://apps.twitter.com/

## Facebook ログイン管理画面

https://developers.facebook.com/apps/1864510540538119/dashboard/

## google ログイン管理画面

https://console.developers.google.com/apis/credentials


## LEGOによるLetsencryptの自動更新

参考: https://blog.1q77.com/2016/07/auto-update-certificate-with-lego/
生成コマンド

```
$ /home/media_product/lego_linux_amd64 --path /etc/lego --email media_product@gmail.com --domains media_product.jp --webroot /etc/lego/webroot --accept-tos run
```

更新コマンド(crontabに仕込んである)

```
$ /home/media_product/lego_linux_amd64 --path /etc/lego --email media_product@gmail.com --domains media_product.jp --webroot /etc/lego/webroot renew  >> /var/log/lego.log 2>&1 && /sbin/service nginx configtest && /sbin/service nginx restart
```

# アカウント情報

## gmo url
アカウント: G60945673
https://vpsportal.gmocloud.com/vpsconsole

## お名前
7819141

# analyticsアカウント作成
https://analytics.google.com/analytics/web/?authuser=0#/provision/SignUp

## mysql slow log
tail -n 1000 -f /usr/local/var/mysql/nishizawakenzounoMacBook-ea-slow.log
