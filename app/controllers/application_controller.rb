class ApplicationController < ActionController::Base
  # For APIs, you may want to use :null_session instead.
  protect_from_forgery with: :null_session
  after_action :unset_current_device

  # Rescue from database-related errors
  rescue_from ActiveRecord::StatementInvalid, ActiveRecord::RecordNotFound, with: :handle_database_error

  def unset_current_device
    Device.send(:current=, nil)
  end

  def current_device
    return @current_device if @current_device
    authenticate_user! unless current_user
    @current_device = current_user.device
    Device.send(:current=, @current_device)
    @current_device
  end

  def current_device_id
    "device_#{current_device.try(:id) || 0}"
  end

  private

  # Method to handle database errors gracefully
  def handle_database_error(exception)
    # Log the error to see it in logs (optional)
    Rails.logger.warn "Database error occurred: #{exception.message}"
    # Respond with a fallback message or status code
    render json: { error: 'A database error occurred. Please try again later.' }, status: 500
  end
end
