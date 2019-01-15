# 404
Rails.application.configure do
  
  config.exceptions_app = ErrorsController.action(:routing_error)
end
