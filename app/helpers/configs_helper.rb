##
# Configs Helper
#
module ConfigsHelper

  ##
  # 未承認ユーザーのログインを許可
  # @version 2018/06/10
  #
  def allow_inactive_users

    [['許可する', true], ['許可しない', false]]
  end

  ##
  # SNS認証の可否
  # @version 2018/06/10
  #
  def user_authes

    [['許可する', true], ['許可しない', false]]
  end

end
