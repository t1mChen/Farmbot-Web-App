if Rails.env.production?
  ActiveRecord::Base.establish_connection(nil)
end
