# Use Node.js 20 como imagem base
FROM node:20-alpine

# Define o diretório de trabalho
WORKDIR /app

# Copia os arquivos de dependência
COPY package*.json ./

# Instala só o necessário para produção
RUN npm install

# Copia o restante do projeto
COPY . .

# Executa o build do backend
RUN npm run build

# Expõe a porta do Express
EXPOSE 5000

# Define o ambiente como produção
ENV NODE_ENV=production

# Inicia a aplicação
CMD ["npm", "start"]
