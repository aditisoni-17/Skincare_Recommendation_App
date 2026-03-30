#!/bin/bash

echo "🚀 Starting Noorify deployment..."

# Install dependencies
echo "📦 Installing dependencies..."
npm install

# Build project
echo "🏗️ Building project..."
npm run build

# Run tests (optional)
echo "🧪 Running tests..."
npm test || exit 1

echo "✅ Deployment script completed!"