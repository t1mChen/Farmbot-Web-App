class ApplicationController < ActionController::Base
  protect_from_forgery with: :null_session
  after_action :unset_current_device

  # Rescue from any database connection errors, including PG::ConnectionBad
  rescue_from PG::ConnectionBad, ActiveRecord::StatementInvalid do |exception|
    Rails.logger.warn "Ignoring database connection error: #{exception.message}"
    # Optionally, return a generic response if necessary, otherwise let the app continue running
  end

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
end
