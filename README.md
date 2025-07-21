# AI Agents Portfolio

Uma aplicação moderna de portfólio de agentes de IA com interface futurista e chat interativo estilo WhatsApp.

## 🚀 Funcionalidades

- **12 Agentes Especializados**: Atendimento, Vendas, Suporte, RH, Marketing, Financeiro, Jurídico, Educacional, Saúde, Imobiliário, E-commerce e Agendamento
- **Chat Interativo**: Modal estilo WhatsApp com mensagens de texto e áudio
- **Gravação de Áudio**: Envio de mensagens de voz em base64
- **Integração Webhook**: Comunicação com APIs externas para respostas dos agentes
- **Design Responsivo**: Interface mobile-first com tema espacial moderno
- **Múltiplas Mensagens**: Suporte a respostas sequenciais com delay automático

## 🛠️ Tecnologias

- **Frontend**: React 18 + TypeScript + Vite
- **Backend**: Express.js + Node.js
- **Estilização**: Tailwind CSS + Radix UI
- **Estado**: TanStack Query
- **Roteamento**: Wouter
- **Banco**: PostgreSQL com Drizzle ORM

## 🔧 Configuração

### Variáveis de Ambiente

Crie um arquivo `.env` na raiz do projeto:

```env
VITE_LOGO_URL=https://sua-logo-url.com/logo.png
VITE_WEBHOOK_URL=https://seu-webhook.com/endpoint
DATABASE_URL=postgresql://usuario:senha@host:porta/database
```

### Instalação

```bash
# Clone o repositório
git clone https://github.com/seu-usuario/ai-agents-portfolio.git
cd ai-agents-portfolio

# Instale as dependências
npm install

# Inicie o servidor de desenvolvimento
npm run dev
```

### Docker

```bash
# Build da imagem
docker build -t ai-agents-portfolio .

# Execute o container
docker run -p 5000:5000 ai-agents-portfolio
```

## 📡 API Webhook

O chat envia requisições POST para o webhook com a estrutura:

```json
{
  "agent": "nome_do_agente",
  "message": "texto_da_mensagem",
  "type": "text",
  "session_id": "uuid_gerado"
}
```

Resposta esperada:

```json
{
  "messages": [
    {
      "message": "Resposta do agente",
      "type": "text"
    }
  ]
}
```

## 🎨 Estrutura do Projeto

```
├── client/src/          # Frontend React
│   ├── components/      # Componentes reutilizáveis
│   ├── pages/          # Páginas da aplicação
│   ├── hooks/          # Hooks customizados
│   └── lib/            # Utilitários
├── server/             # Backend Express
├── shared/             # Schemas compartilhados
└── Dockerfile          # Configuração Docker
```

## 📱 Agentes Disponíveis

1. **Atendimento ao Cliente** - Suporte 24/7
2. **SDR (Vendas)** - Qualificação de leads
3. **Suporte Técnico** - Resolução de problemas
4. **Recursos Humanos** - Recrutamento e gestão
5. **Marketing Digital** - Campanhas automatizadas
6. **Financeiro** - Controle e análises
7. **Jurídico** - Consultoria legal
8. **Educacional** - Tutoria personalizada
9. **Saúde** - Triagem médica
10. **Imobiliário** - Consultoria imobiliária
11. **E-commerce** - Recomendações
12. **Agendamento** - Gestão de horários

## 🚀 Deploy

1. Configure as variáveis de ambiente
2. Execute `npm run build`
3. Inicie com `npm start`
4. Ou use Docker: `docker build -t app . && docker run -p 5000:5000 app`

## 📄 Licença

MIT License - veja o arquivo LICENSE para detalhes.