class SystemConfig

  ##
  # 定数を取得するメソッドを定義
  # @version 2018/06/10
  #
  Rails.configuration.x.system.each do |key, value|

    define_singleton_method key do
      value
    end
  end
end
