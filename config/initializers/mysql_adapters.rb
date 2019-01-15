require 'active_record/connection_adapters/abstract_mysql_adapter'

module ActiveRecord
  module ConnectionAdapters
    class AbstractMysqlAdapter
      # 絵文字などの特殊文字に対応できるよう、charsetをutf → utfmb4に変更したのでstringの上限を変更
      NATIVE_DATABASE_TYPES[:string] = { name: 'varchar', limit: SystemConfig.native_database_string_limit }
    end
  end
end
