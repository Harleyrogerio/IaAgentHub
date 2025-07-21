# 🔍 NETLIFY DEBUG - Checklist Completo

## ✅ Configurações Verificadas (Use exatamente assim):

### Build Settings:
```
Repository: [seu-repo-github]
Branch: main
Build command: npm run build
Publish directory: dist/public
Base directory: (vazio)
Functions directory: (vazio)
```

### Environment:
```
NODE_VERSION=20.18.1
CI=false
VITE_WEBHOOK_URL=https://seu-endpoint.com
```

## 🔥 CHECKLIST DE DEBUGGING:

### 1. ✅ Verifique o Build Log
Procure por estas mensagens de sucesso:
```
✓ 1667 modules transformed.
../dist/public/index.html
../dist/public/assets/index-[hash].css
../dist/public/assets/index-[hash].js
✓ built in [X]s
```

### 2. ✅ Teste Local Primeiro
```bash
npm run build
# Deve criar pasta dist/public/ com:
# - index.html
# - assets/index-[hash].css
# - assets/index-[hash].js
# - _redirects
```

### 3. ✅ Variáveis de Ambiente
**OBRIGATÓRIO configurar no Netlify:**
- `VITE_WEBHOOK_URL` (mesmo que seja placeholder)
- `NODE_VERSION=20.18.1`

### 4. ✅ Arquivos de Deploy
Estes arquivos estão prontos no projeto:
- `netlify.toml` ✅
- `_redirects` ✅ (copiado automaticamente para dist/public)

## 🚨 ERROS MAIS COMUNS:

### Error: "ENOENT: no such file or directory"
**Solução:** Verifique se `dist/public` existe após build

### Error: "Module not found" 
**Solução:** Clear cache + Redeploy

### Error: Site carrega mas sem estilos
**Solução:** Verifique se assets estão em `dist/public/assets/`

### Error: 404 em rotas
**Solução:** Arquivo `_redirects` deve estar em `dist/public/`

## 🎯 TESTE FINAL:
1. Build local funciona? ✅
2. Pasta `dist/public` criada? ✅  
3. Variáveis configuradas? ✅
4. Node version 20.18.1? ✅
5. Cache limpo no Netlify? ✅

Se todos ✅ = Deploy funcionará! 🚀