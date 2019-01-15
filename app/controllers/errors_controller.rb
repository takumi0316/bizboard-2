##
# Errors Controller
#
class ErrorsController < ApplicationController

  #----------------------------------------
  #  ** Includes **
  #----------------------------------------

  #----------------------------------------
  #  ** Instance variables **
  #----------------------------------------

  #----------------------------------------
  #  ** Layouts **
  #----------------------------------------

  #----------------------------------------
  #  ** Request cycles **
  #----------------------------------------

  #----------------------------------------
  #  ** Actions **
  #----------------------------------------

  ##
  # routing error
  # @version 2018/06/10
  #
  def routing_error

    if request.path_info !~ /^\/(assets|packs)\//
      raise ActionController::RoutingError, "No route matches #{request.path.inspect}"
    end
    head 404
  end

  #----------------------------------------
  #  ** Methods **
  #----------------------------------------

end
