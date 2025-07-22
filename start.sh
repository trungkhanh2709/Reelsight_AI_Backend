
mkdir -p .cache

# Cài đặt Chrome cho Puppeteer
PUPPETEER_CACHE_DIR=.cache npx puppeteer browsers install chrome

# Chạy server
node app.js
