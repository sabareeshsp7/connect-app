# 🚀 Deployment Guide for Connect Chat App

## Required Environment Variables for Production

When deploying your app, make sure to set these environment variables in your deployment platform:

### Essential Variables
```bash
# Clerk Authentication (Production Keys)
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=pk_live_your_production_key
CLERK_SECRET_KEY=sk_live_your_production_secret
NEXT_PUBLIC_CLERK_SIGN_IN_URL=/sign-in
NEXT_PUBLIC_CLERK_SIGN_UP_URL=/sign-up

# Your Production App URL (CRITICAL for redirects)
NEXT_PUBLIC_APP_URL=https://your-deployed-app.com

# Convex Database
NEXT_PUBLIC_CONVEX_URL=https://your-production-convex.convex.cloud
CONVEX_DEPLOYMENT=prod:your-convex-deployment

# Gemini AI
GEMINI_API_KEY=your_production_gemini_key

# UploadThing
UPLOADTHING_SECRET=sk_live_your_production_secret
UPLOADTHING_APP_ID=your_production_app_id
```

## Platform-Specific Instructions

### Vercel Deployment
1. Push your code to GitHub
2. Connect repository to Vercel
3. Set environment variables in Vercel dashboard
4. Deploy

```bash
# Quick Vercel CLI setup
vercel env add NEXT_PUBLIC_APP_URL
vercel env add NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY
vercel env add CLERK_SECRET_KEY
# ... add all other variables
```

### Netlify Deployment
1. Build command: `npm run build`
2. Publish directory: `.next`
3. Set environment variables in Netlify dashboard

### Railway Deployment
1. Connect GitHub repository
2. Set environment variables in Railway dashboard
3. Deploy automatically on push

## Clerk Dashboard Configuration

### Required Settings in Clerk Dashboard:
1. **Authorized Domains**: Add your production domain
   - Example: `your-app.vercel.app`

2. **Redirect URLs**: Add production URLs
   - Sign-in redirect: `https://your-app.com/conversations`
   - Sign-up redirect: `https://your-app.com/conversations`

3. **Allowed Origins**: Add your production domain

## Testing Checklist

### Before Deployment:
- [ ] All environment variables are set
- [ ] Clerk dashboard is configured for production domain
- [ ] Production Convex deployment is ready

### After Deployment:
- [ ] Test sign-in flow works correctly
- [ ] Test sign-up flow works correctly
- [ ] Verify redirects go to correct URLs
- [ ] Check console for any errors
- [ ] Test chat functionality

## Common Issues & Solutions

### Issue: "Clerk: Invalid redirect URL"
**Solution**: Make sure `NEXT_PUBLIC_APP_URL` is set correctly and matches your deployed domain.

### Issue: Redirects to localhost in production
**Solution**: Verify `NEXT_PUBLIC_APP_URL` environment variable is set in production.

### Issue: Authentication fails silently
**Solution**: Check that you're using production Clerk keys (pk_live_* and sk_live_*) in production.

## Environment Variable Priority
1. Production deployment platform environment variables
2. `.env.local` (for local development only)
3. `.env` (fallback)

## Security Notes
- Never commit `.env.local` to version control
- Use production keys for live deployments
- Regularly rotate API keys
- Monitor Clerk dashboard for unusual activity
