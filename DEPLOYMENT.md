# 🚀 Deployment Guide: Replit → Netlify

## 🛠️ TROUBLESHOOTING GUIA COMPLETO

### ⚙️ Configurações Corretas do Netlify:
- **Build command:** `npm run build`
- **Publish directory:** `dist/public`
- **Node version:** `20.18.1` (IMPORTANTE: Use exatamente esta versão)
- **Base directory:** (deixe vazio)
- **Functions directory:** (deixe vazio para este projeto)

### 🔧 Environment Variables (OBRIGATÓRIAS):
Configure no Netlify dashboard → Site settings → Environment variables:
```bash
# ESSENCIAL - Endpoint para comunicação com IA  
VITE_WEBHOOK_URL=https://seu-webhook-endpoint.com

# OPCIONAL - Logo customizado da Hartech (já incluído no projeto)
VITE_LOGO_URL=https://hartech.com/logo.svg

# RECOMENDADO - Para builds mais rápidos
CI=false
```

### 🚨 PROBLEMAS COMUNS E SOLUÇÕES:

#### ❌ Erro: "Command failed with exit code 1"
**Causa:** Versão incompatível do Node.js
**Solução:** Configure Node version para `20.18.1` no netlify.toml

#### ❌ Erro: "Module not found" ou dependências
**Causa:** Cache corrompido ou dependências desatualizadas
**Solução:** 
1. Limpe o cache: Site settings → Build & deploy → Clear cache
2. Force um novo deploy

#### ❌ Erro: "Page not found" após deploy
**Causa:** Routing do SPA não configurado
**Solução:** Arquivo `_redirects` já está incluído no build

#### ❌ Build passa mas site não carrega
**Causa:** Variável VITE_WEBHOOK_URL não configurada
**Solução:** Defina a variável mesmo que temporariamente:
```
VITE_WEBHOOK_URL=https://exemplo.com
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