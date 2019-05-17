module DeepCloneable

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
  # 自身のモデルと指定された関連性のあるModelを複製する
  # @version 2018/06/10
  #
  def deep_clone(*associations)

    # 自身の複製を生成
    kopy = dup

    associations.each do |association|

      # 指定されたモデルとの関連性を取得する(has_many or has_one)
      if (relation_type = self.class.reflect_on_association(association))

        # コピーモデルを生成する
        duped_association_object = send(
          "dup_#{relation_type.macro}_association",
          { relation_type: relation_type, association: association }
        )

        # コピーした関連モデル関連性を持たせる
        kopy.send("#{association}=", duped_association_object)
      end
    end

    kopy
  end

  private

    ##
    # has_oneモデルのコピーを生成する
    # @version 2018/06/10
    #
    def dup_has_one_association(options)

      send(options[:association])
    end

    ##
    # has_manyモデルのコピーを生成する
    # @version 2018/06/10
    #
    def dup_has_many_association(options)

      # 外部キーを取得
      foreign_key = options[:relation_type].foreign_key.to_s

      # 保存可能にするため外部キーをnilにする
      send(options[:association]).map do |object|
        object.send("#{foreign_key}=", nil)
        object
      end
    end
end
