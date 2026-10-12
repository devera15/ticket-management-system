#!/usr/bin/env bash
# Builds a complete, deployable Laravel 12 + Inertia + React (Breeze) project
# from this bundle. Run it from the root of this repo (Git Bash / WSL / macOS / Linux).
#
# Requires: PHP 8.2+, Composer, Node.js 20+, npm, git
#
#   bash setup.sh
#
# Output: ../helpdesk  (a git-ready project you push to GitHub and deploy on Railway)

set -euo pipefail

BUNDLE_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
TARGET="$BUNDLE_DIR/../helpdesk"

if [ -e "$TARGET" ]; then
  echo "ERROR: $TARGET already exists. Remove or rename it first." >&2
  exit 1
fi

echo "==> Creating Laravel 12 project"
composer create-project laravel/laravel "$TARGET" "^12.0" --no-interaction

cd "$TARGET"

echo "==> Installing Inertia + Breeze (React)"
composer require inertiajs/inertia-laravel --no-interaction
composer require laravel/breeze --dev --no-interaction
php artisan breeze:install react --no-interaction

echo "==> Merging bundle files (overwrites same-named Breeze files)"
cp -R "$BUNDLE_DIR/backend/app/."      app/
cp -R "$BUNDLE_DIR/backend/database/." database/
cp    "$BUNDLE_DIR/backend/routes/web.php" routes/web.php
cp -R "$BUNDLE_DIR/frontend/resources/js/." resources/js/
rm -f resources/js/Pages/Tickets/README.txt

echo "==> Railway config"
# Procfile at the project root (Railway injects $PORT). Migrations run on every deploy.
cat > Procfile <<'EOF'
web: php artisan migrate --force && php artisan serve --host=0.0.0.0 --port=$PORT
EOF

# .env.example with placeholders only
cp "$BUNDLE_DIR/.env.example" .env.example

echo "==> Trusting Railway's HTTPS proxy"
if ! grep -q "trustProxies" bootstrap/app.php; then
  # Insert right after the opening of the withMiddleware callback
  sed -i.bak "s|->withMiddleware(function (Middleware \$middleware) {|->withMiddleware(function (Middleware \$middleware) {\n        \$middleware->trustProxies(at: '*');|" bootstrap/app.php
  rm -f bootstrap/app.php.bak
fi
grep -n "trustProxies" bootstrap/app.php || {
  echo "WARNING: could not auto-insert trustProxies. Add this line inside withMiddleware() in bootstrap/app.php:" >&2
  echo "    \$middleware->trustProxies(at: '*');" >&2
}

echo "==> Building frontend assets (sanity check)"
npm install
npm run build

echo "==> Initializing git"
git init -q -b main
git add -A
git commit -q -m "Initial commit: Laravel + Inertia React helpdesk"

cat <<EOF

Done. Your project is in: $TARGET

Next:
  cd "$TARGET"
  git remote add origin https://github.com/devera15/ticket-management-system.git
  git push -u --force origin main     # replaces the bundle with the full project

(--force overwrites the bundle already on GitHub. Skip it and push to a new
repo instead if you want to keep the bundle.)
EOF
