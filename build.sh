#!/bin/zsh
# build.sh - Build static files using Docker multi-stage and copy dist to local

set -e

# Build Docker image from Dockerfile.prod

echo "[1/4] Building Docker image..."
docker build -f Dockerfile.prod -t odoo-owl-app .

echo "[2/4] Creating temporary container..."
docker create --name extract-dist odoo-owl-app > /dev/null

echo "[3/4] Copying static files to ./dist ..."
rm -rf ./dist
mkdir -p ./dist
docker cp extract-dist:/usr/share/nginx/html/. ./dist

echo "[4/4] Cleaning up..."
docker rm extract-dist > /dev/null
docker rmi odoo-owl-app > /dev/null

echo "Build complete! Static files are in ./dist"
