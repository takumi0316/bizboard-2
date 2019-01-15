module Breadcrumbs

  ##
  # パンくずリスト取得用helperメソッドの定義
  # @version 2018/06/10
  #
  def self.included(c)

    c.helper_method :breadcrumbs
  end

  ##
  # パンくずリストを取得する
  # @version 2018/06/10
  #
  def breadcrumbs

    return @breadcrumbs if defined? @breadcrumbs
    @breadcrumbs = []
  end

  ##
  # パンくずリストに追加する
  # @version 2018/06/10
  #
  def add_breadcrumb(name, path: nil)

    send(:breadcrumbs)
    @breadcrumbs << OpenStruct.new(name: name, path: path)
  end
end
