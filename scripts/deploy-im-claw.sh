#!/usr/bin/env bash
# Deploy the IMvision static export to the iM Claw Apache server.
# Usage:
#   scripts/deploy-im-claw.sh
#
# Requires:
#   - SSH access to 100.92.250.3 as ivanmartic
#   - Server password set in IM_CLAW_PASSWORD env var (or enter interactively)
#   - npm run build already produced dist/

set -euo pipefail

SERVER="100.92.250.3"
USER="ivanmartic"
REMOTE_DIR="/Library/WebServer/Documents"
STAGING_DIR="~/imvision-site"

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
PROJECT_ROOT="$(cd "$SCRIPT_DIR/.." && pwd)"

if [[ ! -d "$PROJECT_ROOT/dist" ]]; then
  echo "Error: dist/ not found. Run 'npm run build' first."
  exit 1
fi

if [[ -z "${IM_CLAW_PASSWORD:-}" ]]; then
  read -rsp "Enter sudo password for $USER@$SERVER: " IM_CLAW_PASSWORD
  echo
fi

echo "==> Syncing dist/ to staging area on $SERVER..."
rsync -avz --delete --exclude='dev/' \
  "$PROJECT_ROOT/dist/" \
  "$USER@$SERVER:$STAGING_DIR/"

echo "==> Copying staged files to Apache DocumentRoot..."
ssh "$USER@$SERVER" "
  set -e
  rm -rf $STAGING_DIR/dev
  printf '%s\n' '$IM_CLAW_PASSWORD' | sudo -S bash -c '
    rm -rf $REMOTE_DIR/*
    cp -R $STAGING_DIR/* $REMOTE_DIR/
    chown -R root:wheel $REMOTE_DIR
    chmod -R 755 $REMOTE_DIR
  '
"

echo "==> Restarting Apache..."
ssh "$USER@$SERVER" "
  printf '%s\n' '$IM_CLAW_PASSWORD' | sudo -S apachectl configtest
  printf '%s\n' '$IM_CLAW_PASSWORD' | sudo -S apachectl restart
"

echo "==> Verifying deployment..."
sleep 2
for path in / /contact/ /sv/contact/ /sales/ /service/ /sv/service/; do
  code=$(curl -s -o /dev/null -w "%{http_code}" -L "http://$SERVER$path")
  echo "$path -> HTTP $code"
done

echo "==> Done. Site live at:"
echo "  • Tailnet:  http://$SERVER/"
echo "  • Public:   https://imclaw.tail5679ed.ts.net/"
