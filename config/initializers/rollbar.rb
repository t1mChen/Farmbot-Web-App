#=================================================+
# PLEASE READ:                                    |
#=================================================+
# FarmBot, Inc. uses Rollbar for error reporting. |
# Rollbar is a proprietary, paid product that     |
# most users would not use on their own servers.  |
# Our eventual plan is to remove this into its    |
# own repo and out of the main app.               |
#=================================================+
if Rails.env.production?
  Rollbar.configure do |config|
    config.enabled = false
  end
end

