#!/bin/sh
set -e

# Generate Caddyfile with PORT from environment
PORT=${PORT:-80}
echo "Starting Caddy on port ${PORT}"

cat > /Caddyfile <<EOF
:${PORT}

root * /app/dist

encode gzip zstd

file_server

try_files {path} /index.html
EOF

echo "Caddyfile generated:"
cat /Caddyfile

echo "Starting Caddy..."
exec caddy run --config /Caddyfile --adapter caddyfile
