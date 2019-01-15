##
# Application Helper
#
module ApplicationHelper

  # ページネーション
  include Pagy::Frontend

  ##
  # metaタグのデフォルト値を指定
  # @version 2018/06/10
  #
  def application_meta_tags
    
    {
      site: SiteConfig.site_name,
      reverse: true,
      separator: '|',
      title: title_with_page_number(SiteConfig.site_title),
      description: SiteConfig.site_description,
      canonical: request.try(:original_url) || SystemConfig.url,
      noindex: true,
      nofollow: true,
      nosnippet: true,
      noarchive: true,
    }
  end

  ##
  # ld+jsonのデフォルト値
  # @version 2018/06/10
  #
  def application_json_ld
    
    {
      '@context': 'http://schema.org',
      '@type': :WebSite,
      'url': SystemConfig.url,
      'potentialAction': {
        '@type': :SearchAction,
        'target': URI.unescape(search_url(search: '{search_term}')),
        'query-input': 'required name=search_term'
      },
    }.to_json
  end

  ##
  # 前ページのURL
  # @version 2018/06/10
  #
  def rel_prev

    # ページング対象のページではない、または前ページが存在しない場合はreturn
    return nil if !defined?(pagination) || pagination.prev.nil?

    uri = URI request.original_url
    uri.query = Rack::Utils.parse_nested_query(uri.query).symbolize_keys.merge({ page: pagination.prev }).to_param

    # 前ページのURL(page=1は除去)
    pagy_trim_url uri.to_s
  end

  ##
  # 次ページのURL
  # @version 2018/06/10
  #
  def rel_next

    # ページング対象のページではない、または次ページが存在しない場合はreturn
    return nil if !defined?(pagination) || pagination.next.nil?

    uri = URI request.original_url
    uri.query = Rack::Utils.parse_nested_query(uri.query).symbolize_keys.merge({ page: pagination.next }).to_param
    uri.to_s
  end
  
  ##
  # page=1のパラメータを削除する(ページネーションで使用)
  # @version 2018/06/10
  #
  def pagy_trim_url(url)

    url.sub(/((?:[?&])page=1\z|\b(?<=[?&])page=1&)/, '')
  end

  ##
  # タイトルにページ番号を付加する
  # @version 2018/06/10
  #
  def title_with_page_number(title)

    return title if !defined?(pagination) || pagination.prev.nil?

    "#{title} (#{pagination.page}ページ目)"
  end

  ##
  # image_tagをオーバーライドし、404時の代替画像をセットする
  # @version 2018/06/10
  #
  def image_tag(source, options={})

    options.store('onerror', "this.src='#{image_path 'noimage.svg'}'")
    super(source, options)
  end

  ##
  # assetをinlineでレンダリングする
  # @version 2018/06/10
  #
  def render_asset(path)
    
    raw Rails.application.assets.find_asset(path)
  end

  ##
  # 認証用URL生成
  # @version 2018/06/10
  #
  def confirmation_url(confirmation_token)
    
    # メール認証用URL
    url = verify_url(token: confirmation_token)
    # 認証後に遷移する先
    url += "&return_url=#{CGI.escape(session[:return_url])}" if session[:return_url].present?
    url
  end
end
