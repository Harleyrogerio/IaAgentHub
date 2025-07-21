# 🚀 Deployment Guide: Replit → Netlify

## Quick Deploy (Frontend Only)

### Netlify Configuration:
- **Build command:** `npm run build`
- **Publish directory:** `dist/public`
- **Node version:** 20.x

### Environment Variables:
Add these in Netlify dashboard → Site settings → Environment variables:
```
VITE_WEBHOOK_URL=your-webhook-endpoint-url
VITE_LOGO_URL=your-logo-url (optional)
```

## File Structure After Build:
```
dist/
├── public/          # Deploy this folder to Netlify
│   ├── index.html
│   └── assets/
│       ├── index-[hash].css
│       └── index-[hash].js
└── index.js         # Server file (not needed for frontend-only)
```

## Deployment Steps:

1. **Connect Repository to Netlify**
   - Go to Netlify dashboard
   - Click "New site from Git"
   - Connect your GitHub/GitLab repo

2. **Configure Build Settings**
   ```
   Build command: npm run build
   Publish directory: dist/public
   ```

3. **Add Environment Variables**
   - VITE_WEBHOOK_URL: Your webhook endpoint
   - VITE_LOGO_URL: Your logo URL (optional)

4. **Deploy**
   - Click "Deploy site"
   - Netlify will automatically build and deploy

## Features Available:
✅ 12 AI Agent cards with interactive UI
✅ WhatsApp-style chat modals
✅ Responsive space-themed design
✅ Webhook integration for external AI services
✅ Audio recording functionality
✅ Modern React/TypeScript frontend

## Post-Deployment:
- Configure your webhook endpoint to handle agent communications
- Test all agent interactions
- Update any hardcoded URLs to use environment variables

## Notes:
- This deploys the frontend only
- Backend API routes will need external webhook services
- All chat functionality relies on configured VITE_WEBHOOK_URL