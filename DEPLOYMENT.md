# 🚀 Deployment Guide for Sahm

This guide covers deployment to various platforms and production considerations.

## 📋 Pre-deployment Checklist

- [ ] Set up Polygon.io API key
- [ ] Test application locally
- [ ] Run `npm run build` successfully
- [ ] Verify environment variables
- [ ] Check responsive design
- [ ] Test error handling

## 🌐 Platform Deployment

### Netlify (Recommended)

1. **Connect Repository**
   - Connect your GitHub repository to Netlify
   - Netlify will automatically detect it's a React app

2. **Build Settings**
   - Build command: `npm run build`
   - Publish directory: `build`
   - Node version: `18` (set in netlify.toml)

3. **Environment Variables**
   Set in Netlify dashboard → Site settings → Environment variables:
   ```
   REACT_APP_POLYGON_API_KEY=your_actual_api_key
   REACT_APP_ENV=production
   ```

4. **Deploy**
   - Netlify will auto-deploy on push to main branch
   - Manual deploy: `netlify deploy --prod`

5. **Custom Domain** (Optional)
   - Add domain in Netlify dashboard
   - Update DNS records
   - SSL automatically handled

### Vercel

1. **Connect Repository**
   ```bash
   # Install Vercel CLI
   npm i -g vercel
   
   # Deploy
   vercel --prod
   ```

2. **Environment Variables**
   Set in Vercel dashboard:
   ```
   REACT_APP_POLYGON_API_KEY=your_actual_api_key
   ```

3. **Custom Domain** (Optional)
   - Add domain in Vercel dashboard
   - Update DNS records
   - SSL automatically handled

### GitHub Pages

1. **Install gh-pages**
   ```bash
   npm install --save-dev gh-pages
   ```

2. **Add to package.json**
   ```json
   {
     "homepage": "https://yourusername.github.io/sahm-stocks",
     "scripts": {
       "predeploy": "npm run build",
       "deploy": "gh-pages -d build"
     }
   }
   ```

3. **Deploy**
   ```bash
   npm run deploy
   ```

### AWS S3 + CloudFront

1. **Build Application**
   ```bash
   npm run build
   ```

2. **Upload to S3**
   - Create S3 bucket
   - Enable static website hosting
   - Upload build folder contents

3. **CloudFront Distribution**
   - Create distribution
   - Set origin to S3 bucket
   - Configure custom error pages

## 🔧 Environment Configuration

### Production Environment Variables

```bash
# Required
REACT_APP_POLYGON_API_KEY=your_polygon_api_key

# Optional
REACT_APP_ENV=production
REACT_APP_API_TIMEOUT=10000
```

### Netlify Configuration

The following files are required for proper Netlify deployment:

1. **`netlify.toml`** - Main configuration file
2. **`public/_redirects`** - Handles client-side routing

## 🚨 Troubleshooting

### Common Issues

#### 1. "Page not found" on Netlify
**Problem:** Direct access to routes like `/explore` returns 404
**Solution:** Ensure `public/_redirects` file exists with:
```
/*    /index.html   200
```

#### 2. Build fails on Netlify
**Problem:** Build process fails
**Solutions:**
- Check Node.js version in `netlify.toml`
- Verify all dependencies are in `package.json`
- Check environment variables are set

#### 3. API calls fail in production
**Problem:** Polygon.io API returns errors
**Solutions:**
- Verify `REACT_APP_POLYGON_API_KEY` is set in Netlify
- Check API key has proper permissions
- Verify API key is not rate limited

#### 4. Assets not loading
**Problem:** Images, CSS, or JS files not found
**Solutions:**
- Check `public/` folder structure
- Verify build output in `build/` folder
- Check file paths in code

### Debugging Steps

1. **Check Netlify Deploy Logs**
   - Go to Netlify dashboard
   - Click on your site
   - Check "Deploys" tab for build logs

2. **Test Locally**
   ```bash
   npm run build
   npm install -g serve
   serve -s build
   ```

3. **Check Environment Variables**
   - Verify all required variables are set
   - Check variable names match exactly
   - Ensure no typos in values

4. **Verify Build Output**
   ```bash
   npm run build
   ls -la build/
   ```

## 📊 Performance Optimization

### Build Optimization
- Code splitting with React.lazy()
- Tree shaking for unused code
- Image optimization
- Gzip compression (handled by Netlify)

### Runtime Optimization
- Client-side caching
- Debounced search
- Infinite scroll
- Error boundaries

## 🔒 Security Considerations

### Environment Variables
- Never commit API keys to repository
- Use environment variables for sensitive data
- Rotate API keys regularly

### CORS Configuration
- Polygon.io API handles CORS
- No additional CORS configuration needed

### Content Security Policy
- Consider adding CSP headers
- Monitor for security vulnerabilities

## 📈 Monitoring & Analytics

### Error Tracking
- Consider adding Sentry for error tracking
- Monitor API rate limits
- Track user interactions

### Performance Monitoring
- Use Netlify Analytics
- Monitor Core Web Vitals
- Track API response times

## 🎯 Best Practices

1. **Always test locally before deploying**
2. **Use environment variables for configuration**
3. **Monitor build logs for errors**
4. **Set up proper redirects for SPAs**
5. **Optimize images and assets**
6. **Implement proper error handling**
7. **Add loading states for better UX**
8. **Test on multiple devices and browsers**

## 🚀 Quick Deploy Commands

### Netlify CLI
```bash
# Install Netlify CLI
npm install -g netlify-cli

# Deploy
netlify deploy --prod

# Set environment variables
netlify env:set REACT_APP_POLYGON_API_KEY your_api_key
```

### Manual Deploy
```bash
# Build
npm run build

# Deploy to Netlify
netlify deploy --prod --dir=build
```

## 📞 Support

If you encounter issues:
1. Check this troubleshooting guide
2. Review Netlify documentation
3. Check build logs for specific errors
4. Verify environment variables are set correctly 