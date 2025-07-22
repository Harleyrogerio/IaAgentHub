#!/bin/bash

# Script para deploy frontend-only no Easypanel
echo "🚀 Iniciando deploy frontend-only..."

# Fazer backup do Dockerfile atual
if [ -f "Dockerfile" ]; then
    echo "📦 Fazendo backup do Dockerfile atual..."
    cp Dockerfile Dockerfile.backup
fi

# Usar Dockerfile frontend
echo "📝 Configurando Dockerfile para frontend..."
cp Dockerfile.frontend Dockerfile

# Build local para testar
echo "🔨 Testando build local..."
npm run build

if [ $? -eq 0 ]; then
    echo "✅ Build local OK!"
    
    # Testar serve local
    echo "🌐 Testando servidor estático..."
    npx serve -s dist/public -l 3001 &
    SERVE_PID=$!
    
    # Aguardar servidor iniciar
    sleep 3
    
    # Testar se está funcionando
    if curl -s http://localhost:3001 > /dev/null; then
        echo "✅ Servidor estático funcionando!"
        kill $SERVE_PID
        
        # Commit e push
        echo "📤 Fazendo commit..."
        git add .
        git commit -m "Deploy: Switch to frontend-only with serve"
        git push origin main
        
        echo "🎉 Deploy preparado! Agora faça o deploy no Easypanel."
        echo ""
        echo "Configurações para Easypanel:"
        echo "- Port: 5000"
        echo "- Build: npm run build"  
        echo "- Start: serve -s dist/public -l 5000"
        echo "- Health Check: /"
    else
        echo "❌ Erro no servidor estático"
        kill $SERVE_PID
        exit 1
    fi
else
    echo "❌ Erro no build"
    exit 1
fi