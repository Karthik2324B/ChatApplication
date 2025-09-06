#!/usr/bin/env bash
set -o errexit  # exit on first error

# Install backend deps
npm install

# Build frontend
cd frontend
npm install
npm run build
cd ..
