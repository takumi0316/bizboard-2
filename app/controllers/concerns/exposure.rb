module Exposure

  ##
  # Controller - View 間のインスタンス変数共有
  # @version 2018/06/10
  #
  def expose(name, &blk)

    iv = "@#{name}"

    ##
    # 指定されたインスタンス変数のgetterメソッドを定義
    # @version 2018/06/10
    #
    define_method name do

      return instance_variable_get iv if instance_variable_defined? iv
      instance_variable_set iv, instance_eval(&blk)
    end
    helper_method name

    ##
    # 指定されたインスタンス変数のsetterメソッドを定義
    # @version 2018/06/10
    #
    define_method :"#{name}=" do |value|

      instance_variable_set iv, value
    end
    private :"#{name}="
  end

  ##
  # Controller - View 間のインスタンス変数共有とページネーション
  # @version 2018/06/10
  #
  def expose_with_pagination(name, items: Pagy::VARS[:items], &blk)

    iv = "@#{name}"

    ##
    # 指定されたインスタンス変数のgetterメソッドを定義
    # @version 2018/06/10
    #
    define_method name do

      return instance_variable_get iv if instance_variable_defined? iv
      page, result = pagy(instance_eval(&blk), items: items)
      instance_variable_set :@pagination, page
      instance_variable_set iv, result
    rescue
    end
    helper_method name

    ##
    # 指定されたインスタンス変数のsetterメソッドを定義
    # @version 2018/06/10
    #
    define_method :"#{name}=" do |value|

      instance_variable_set iv, value
    end
    private :"#{name}="

    ##
    # 指定されたインスタンス変数のページネーションを定義
    # @version 2018/06/10
    #
    define_method :pagination do

      return instance_variable_get :@pagination if instance_variable_defined? :@pagination
      send name
      instance_variable_get :@pagination
    end
    helper_method :pagination

    ##
    # 指定されたインスタンス変数のsetterメソッドを定義
    # @version 2018/06/10
    #
    define_method :pagination= do |value|

      instance_variable_set :@pagination, value
    end
    private :pagination=
  end
end
