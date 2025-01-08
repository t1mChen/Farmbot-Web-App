# How to install FarmBot Web API on a Fresh Ubuntu 22.04 Machine

# IMPORTANT NOTE: Resources are limited and Farmbot, inc. cannot provide
# longterm support to self-hosted users. If you have never administered a
# Ruby on Rails application, we highly advise stopping now. this presents an
# extremely high risk of data loss. Free hosting is provided at
# https://my.farm.bot and eliminates the risks and troubles of self-hosting.
#
# You are highly encouraged to use the my.farm.bot servers. Self hosted
# documentation is provided with the assumption that you have experience with
# Ruby/Javascript development.
#
# Self-hosting a Farmbot server is not a simple task.

# Remove old (possibly broke) docker versions
sudo apt remove docker-engine
sudo apt remove docker docker.io containerd runc

# Install docker and docker compose
sudo apt update
sudo apt install ca-certificates curl gnupg lsb-release -y
sudo install -m 0755 -d /etc/apt/keyrings
curl -fsSL https://download.docker.com/linux/ubuntu/gpg | sudo gpg --dearmor -o /etc/apt/keyrings/docker.gpg
sudo chmod a+r /etc/apt/keyrings/docker.gpg
echo "deb [arch=$(dpkg --print-architecture) signed-by=/etc/apt/keyrings/docker.gpg] https://download.docker.com/linux/ubuntu $(lsb_release -cs) stable" | sudo tee /etc/apt/sources.list.d/docker.list > /dev/null
sudo apt update
sudo apt install docker-ce docker-ce-cli containerd.io docker-buildx-plugin docker-compose-plugin -y
# Verify installation
sudo docker run hello-world
sudo docker compose version

# Install FarmBot Web App
# ⚠ SKIP THIS STEP IF UPGRADING!
git clone https://github.com/FarmBot/Farmbot-Web-App --depth=5 --branch=main

cd Farmbot-Web-App

cp example.env .env # ⚠ SKIP THIS STEP IF UPGRADING!

# == This is a very important step!!! ==
#
# Open `.env` in a text editor and change all the values.
#
# == Nothing will work if you skip this step!!! ==

nano .env          # ⚠ SKIP THIS STEP IF UPGRADING!
# ^ This is the most important step
# READ NOTE ABOVE. Very important!

# Install the correct version of bundler for the project
sudo docker compose run web gem install bundler
# Install application specific Ruby dependencies
sudo docker compose run web bundle install
# Install application specific Javascript deps
sudo docker compose run web npm install
# Create a database in PostgreSQL
sudo docker compose run web bundle exec rails db:create db:migrate
# Generate a set of *.pem files for data encryption
sudo docker compose run web rake keys:generate # ⚠ SKIP THIS STEP IF UPGRADING!
# Build the UI assets via ParcelJS
sudo docker compose run web rake assets:precompile
# Run the server! ٩(^‿^)۶
# NOTE: DONT TRY TO LOGIN until you see a message similar to this:
#   "✨  Built in 44.92s"
# THIS MAY TAKE A VERY LONG TIME ON SLOW MACHINES (~3 minutes on DigitalOcean)
# You will just get an empty screen otherwise.
# This only happens during initialization
sudo docker compose up

# At this point, setup is complete. Content should be visible at ===============
#  http://YOUR_HOST:3000/.

# You can optionally verify installation by running unit tests.

# Create the database for the app to use:
sudo docker compose run -e RAILS_ENV=test web bundle exec rails db:setup
# Run the tests in the "test" RAILS_ENV:
sudo docker compose run -e RAILS_ENV=test web rspec spec
# Run user-interface unit tests REQUIRES AT LEAST 4 GB OF RAM:
sudo docker compose run web npm run test

# === BEGIN OPTIONAL UPGRADES
  # To update to later versions of FarmBot,
  # shut down the server, create a database backup
  # and run commands below.
  git pull https://github.com/FarmBot/Farmbot-Web-App.git main
  sudo docker compose build
  sudo docker compose run web bundle install   # <== ⚠ UPGRADE USERS ONLY
  sudo docker compose run web npm install      # <== ⚠ UPGRADE USERS ONLY
  sudo docker compose run web rails db:migrate # <== ⚠ UPGRADE USERS ONLY
# === END OPTIONAL UPGRADES ^
