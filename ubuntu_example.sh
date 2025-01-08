name: Deploy FarmBot Web API to GitHub Pages

on:
  push:
    branches:
      - dev  # Trigger deployment when the dev branch is updated

jobs:
  deploy:
    runs-on: ubuntu-latest

    steps:
      # Step 1: Checkout the repository
      - name: Checkout code
        uses: actions/checkout@v3

      # Step 2: Set up Ruby and Node.js
      - name: Set up Ruby 3.2 and Node.js
        uses: ruby/setup-ruby@v1
        with:
          ruby-version: '3.0.6'
      - name: Set up Node.js
        uses: actions/setup-node@v3
        with:
          node-version: '16'

      # Step 3: Install dependencies
      - name: Install Ruby and JavaScript dependencies
        run: |
          sudo docker compose run web gem install bundler
          sudo docker compose run web bundle install
          sudo docker compose run web npm install

      # Step 4: Precompile assets (Static assets like HTML, JS, CSS)
      - name: Precompile assets
        run: |
          sudo docker compose run web rake assets:precompile

      # Step 5: Build the static site (if using Jekyll or similar)
      - name: Build static site for GitHub Pages
        run: |
          # Assuming your static assets are in the 'public' directory
          mkdir -p gh-pages
          cp -R public/* gh-pages/

      # Step 6: Deploy to GitHub Pages
      - name: Deploy to GitHub Pages
        uses: jamesives/github-pages-deploy-action@v4.7.2
        with:
          branch: gh-pages  # Push to the `gh-pages` branch
          folder: gh-pages  # The folder where your built assets are stored
        env:
          GITHUB_TOKEN: ${{ secrets.GITHUB_TOKEN }}  # Automatically provided by GitHub Actions
