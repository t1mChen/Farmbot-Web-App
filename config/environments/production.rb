FarmBot::Application.configure do
  # Use the API_HOST environment variable for default URL, fallback to "my.farm.bot"
  config.action_mailer.default_url_options = { host: ENV.fetch("API_HOST", "my.farm.bot") }

  # Enable deprecation warnings
  config.active_support.deprecation = :notify

  # Enable caching and eager load classes in production
  config.cache_classes = true
  config.consider_all_requests_local = false
  config.eager_load = true

  # Force SSL if the environment variable is set
  config.force_ssl = true if ENV["FORCE_SSL"]

  # Fallback to default i18n settings
  config.i18n.fallbacks = true

  # Log formatting and level settings
  config.log_formatter = ::Logger::Formatter.new
  config.log_level = :info

  # Disable caching for static assets
  config.perform_caching = false
  config.public_file_server.enabled = false
  config.serve_static_assets = true

  # Disable asset compilation (in production you likely precompile assets)
  config.assets.compile = false

  # Set email SMTP settings using environment variables
  pw = ENV['SMTP_PASSWORD'] || ENV['SENDGRID_PASSWORD']
  uname = ENV['SMTP_USERNAME'] || ENV['SENDGRID_USERNAME']

  config.action_mailer.smtp_settings = {
    port: ENV.fetch("SMTP_PORT", 587),
    address: ENV['SMTP_HOST'],
    user_name: uname,
    password: pw
  }

  # Disabling database connection (since you are not using it)
  # You can override ActiveRecord connection settings to avoid trying to connect to a database
  config.active_record.database = nil
  config.active_record.migration_error = :page_load

  # Disable active record connection pooling (optional)
  config.active_record.pool = 0

  # Additional configuration can go here (e.g., logging, security, etc.)
end
