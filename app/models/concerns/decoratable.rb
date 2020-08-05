module Decoratable

  #----------------------------------------
  #  ** Includes **
  #----------------------------------------

  extend ActiveSupport::Concern

  #----------------------------------------
  #  ** Constants **
  #----------------------------------------

  #----------------------------------------
  #  ** Scopes **
  #----------------------------------------

  #----------------------------------------
  #  ** Methods **
  #----------------------------------------

  ##
  # デコレーション層
  # @version 2018/06/10
  #
  def decorate

    self.decorator_class.new self
  end

  ##
  # デコレーターを取得
  # @version 2018/06/10
  #
  def decorator_class

    self.class.decorator_class
  end

  module ClassMethods

    ##
    # デコレーターを取得
    # @version 2018/06/10
    #
    def decorator_class

      "#{self.name}Decorator".constantize
    end

    ##
    # デコレーション層(配列)
    # @version 2018/06/10
    #
    def decorate

      # 各レコードをデコレート
      klass = self.decorator_class
      self.all.map { |record| klass.new record }
    end
  end
end
