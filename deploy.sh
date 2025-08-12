#!/bin/bash

# Sahm Stock App Deployment Script
echo "🚀 Starting Sahm deployment..."

# Build the application
echo "📦 Building application..."
npm run build

# Check if build was successful
if [ $? -eq 0 ]; then
    echo "✅ Build successful!"
    
    # Check if _redirects file exists
    if [ -f "build/_redirects" ]; then
        echo "✅ _redirects file found in build folder"
    else
        echo "❌ _redirects file missing from build folder"
        exit 1
    fi
    
    # Check if netlify.toml exists
    if [ -f "netlify.toml" ]; then
        echo "✅ netlify.toml configuration found"
    else
        echo "❌ netlify.toml missing"
        exit 1
    fi
    
    echo "🎉 Ready for deployment!"
    echo ""
    echo "Next steps:"
    echo "1. Push to GitHub: git push origin main"
    echo "2. Netlify will auto-deploy"
    echo "3. Check Netlify dashboard for deployment status"
    echo ""
    echo "Or deploy manually with: netlify deploy --prod"
    
else
    echo "❌ Build failed!"
    exit 1
fi 