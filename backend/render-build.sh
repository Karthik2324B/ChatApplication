#!/usr/bin/env bash
# Exit on error
set -o errexit

# Install backend dependencies
npm install

# Build frontend
cd frontend
npm install --include=dev   # ✅ ensures devDependencies are installed on Render
npm run build
cd ..
