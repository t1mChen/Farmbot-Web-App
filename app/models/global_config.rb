class GlobalConfig
  # Instead of using ActiveRecord, we can store the key-value pairs in a hash.
  
  # Define your configuration values here, 
  # possibly loaded from environment variables or constants if necessary.
  CONFIG_VALUES = {
    "FBOS_END_OF_LIFE_VERSION" => "14.6.0",
    "MINIMUM_FBOS_VERSION" => "14.6.0",
    "TOS_URL" => ENV.fetch("TOS_URL", ""),
    "PRIV_URL" => ENV.fetch("PRIV_URL", ""),
    "NODE_ENV" => ENV["RAILS_ENV"] || "development",
    "LONG_REVISION" => ENV["BUILT_AT"] || ENV["HEROKU_SLUG_COMMIT"] || "NONE",
    "SHORT_REVISION" => (ENV["BUILT_AT"] || ENV["HEROKU_SLUG_COMMIT"] || "NONE")[0, 8],
    "MQTT_WS" => ENV["MQTT_WS"] || "ws://localhost:3000"
  }

  # Get the value for a given key
  def self.get(key)
    CONFIG_VALUES[key]
  end

  # Set the value for a given key (optional, for runtime changes)
  def self.set(key, value)
    CONFIG_VALUES[key] = value
  end

  # Memoized version of the configuration dump
  def self.dump
    @dump ||= CONFIG_VALUES
  end
end
