#!/bin/bash
# Deploy IMvision static site to iM Claw server via Tailscale SSH
# Run this from the project root: ./deploy-imclaw.sh

set -e

HOST="root@100.92.250.3"
DEST="/var/www/html"
SOURCE="./dist/"

echo "👉 Building static site..."
npm run build

echo ""
echo "👉 Deploying to $HOST:$DEST..."
echo "   This will replace the contents of $DEST with the built site."
echo ""

rsync -avz --delete \
  -e "ssh -o StrictHostKeyChecking=accept-new" \
  "$SOURCE" \
  "$HOST:$DEST"

echo ""
echo "👉 Setting web server permissions (best effort)..."
ssh "$HOST" "chown -R www-data:www-data '$DEST' 2>/dev/null || chown -R nginx:nginx '$DEST' 2>/dev/null || chown -R apache:apache '$DEST' 2>/dev/null || true"
ssh "$HOST" "chmod -R 755 '$DEST'"

echo ""
echo "✅ Deploy complete!"
echo "   Server: $HOST"
echo "   Path:   $DEST"
