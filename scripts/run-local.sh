#!/usr/bin/env bash
# Detect local IP and start Expo with REACT_NATIVE_API_URL set.
# Usage: ./scripts/run-local.sh [port]
set -euo pipefail
PORT=${1:-8000}
# Try common macOS interface en0, otherwise fallback to localhost
if command -v ipconfig >/dev/null 2>&1; then
  HOST_IP=$(ipconfig getifaddr en0 2>/dev/null || true)
fi
HOST_IP=${HOST_IP:-}
if [ -z "$HOST_IP" ]; then
  # try hostname -I (linux) or fallback
  if command -v hostname >/dev/null 2>&1; then
    HOST_IP=$(hostname -I 2>/dev/null | awk '{print $1}')
  fi
fi
HOST_IP=${HOST_IP:-127.0.0.1}
export REACT_NATIVE_API_URL="http://$HOST_IP:$PORT"
echo "Starting Expo with REACT_NATIVE_API_URL=$REACT_NATIVE_API_URL"
pnpm start
