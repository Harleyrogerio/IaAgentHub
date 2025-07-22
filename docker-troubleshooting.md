# 🐳 Docker Build Troubleshooting Guide

## 🚨 Problema Resolvido: Exit Code 127

### ❌ Erro Original:
```
ERROR: failed to solve: process "/bin/sh -c npm run build" did not complete successfully: exit code 127
```

### 🔍 Causa:
- Exit code 127 = "command not found"
- O problema estava no Dockerfile original que usava `npm ci --only=production`
- Isso instalava apenas dependências de produção
- Mas o comando `npm run build` precisa das devDependencies (vite, esbuild, etc.)

### ✅ Solução Implementada:
1. **Instalar todas as dependências** com `npm ci` (sem --only=production)
2. **Fazer o build** com todas as ferramentas disponíveis
3. **Limpar devDependencies** após o build com `npm prune --production`
4. **Adicionar git** no Alpine Linux para dependências que precisam

### 📄 Dockerfile Corrigido:
```dockerfile
FROM node:20-alpine

# Instalar git (necessário para alguns pacotes npm)
RUN apk add --no-cache git

WORKDIR /app

# Copiar package files
COPY package*.json ./

# Instalar TODAS as dependências (incluindo devDependencies)
RUN npm ci

# Copiar código fonte
COPY . .

# Build (agora tem todas as ferramentas necessárias)
RUN npm run build

# Remover devDependencies após build (otimizar tamanho)
RUN npm prune --production

EXPOSE 5000
ENV NODE_ENV=production
CMD ["npm", "start"]
```

### 🎯 Comandos para Testar:
```bash
# Build da imagem
docker build -t hartech-portfolio .

# Executar com variáveis de ambiente
docker run -p 5000:5000 \
  -e DATABASE_URL="postgresql://user:pass@host:port/db" \
  -e VITE_WEBHOOK_URL="https://seu-webhook.com" \
  hartech-portfolio
```

### 🔧 Variáveis Obrigatórias:
- `DATABASE_URL`: String de conexão PostgreSQL
- `VITE_WEBHOOK_URL`: Endpoint para comunicação com IA

### 📂 Estrutura Final no Container:
```
/app/
├── dist/
│   ├── index.js          # Backend buildado
│   └── public/           # Frontend buildado
│       ├── index.html
│       ├── assets/
│       └── hartech-logo.svg
├── node_modules/         # Apenas produção
└── package.json
```

### ✨ Otimizações Incluídas:
- Layer caching otimizado (package.json copiado primeiro)
- Instalação de git para dependências que precisam
- Limpeza de devDependencies pós-build
- .dockerignore otimizado para builds mais rápidos