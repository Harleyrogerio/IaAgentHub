# AI Agent Portfolio Application

## Overview

This is a full-stack web application showcasing various AI agents for different business functions. Built with React (frontend), Express.js (backend), and PostgreSQL (database), the application allows users to interact with different AI agents through both text and voice chat interfaces.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture
- **Framework**: React 18 with TypeScript
- **Build Tool**: Vite for fast development and optimized production builds
- **UI Components**: Radix UI with shadcn/ui component library
- **Styling**: Tailwind CSS with custom CSS variables for theming
- **State Management**: TanStack Query for server state management
- **Routing**: Wouter for lightweight client-side routing
- **Form Handling**: React Hook Form with Zod validation

### Backend Architecture
- **Framework**: Express.js with TypeScript
- **Database ORM**: Drizzle ORM with PostgreSQL dialect
- **Database Provider**: Neon Database (serverless PostgreSQL)
- **Session Management**: connect-pg-simple for PostgreSQL-backed sessions
- **Development**: tsx for TypeScript execution in development
- **Build**: esbuild for production bundling

### Data Storage
- **Primary Database**: PostgreSQL via Neon Database
- **ORM**: Drizzle ORM for type-safe database operations
- **Schema Location**: `shared/schema.ts` for shared type definitions
- **Migrations**: Drizzle Kit for database migrations
- **Fallback**: In-memory storage implementation for development

## Key Components

### Database Schema
- **users**: User authentication and profile data
- **chatSessions**: Individual chat session management with agent types
- **chatMessages**: Message storage with support for text and audio messages

### Agent System
- **Portfolio Display**: Grid-based showcase of available AI agents
- **Agent Types**: Various business-focused agents (Customer Service, Sales SDR, Technical Support, HR, Marketing, Finance, Legal, Operations)
- **Chat Interface**: Modal-based chat system with text and voice input support

### Audio Processing
- **Recording**: Browser-based audio recording with MediaRecorder API
- **Format**: WAV audio format with base64 encoding
- **Permissions**: Microphone access management with error handling

### External Integrations
- **Webhook System**: External service integration for AI agent responses
- **Environment Configuration**: VITE_WEBHOOK_URL for webhook endpoint configuration

## Data Flow

1. **User Interaction**: User selects an agent from the portfolio grid
2. **Session Creation**: New chat session created with unique session ID
3. **Message Processing**: 
   - Text/audio input captured from user
   - Message stored in database
   - Payload sent to external webhook for AI processing
   - Response received and stored as bot message
4. **Real-time Updates**: Chat interface updates with new messages
5. **Session Persistence**: All conversations stored in PostgreSQL database

## External Dependencies

### Frontend Dependencies
- **UI Framework**: React ecosystem with TypeScript support
- **Component Library**: Radix UI primitives with shadcn/ui styling
- **State Management**: TanStack Query for server state
- **Audio Processing**: Browser MediaRecorder API
- **Date Handling**: date-fns for timestamp formatting

### Backend Dependencies
- **Database**: Drizzle ORM with Neon Database connector
- **Validation**: Zod for schema validation
- **Development**: Vite plugins for Replit integration and error handling

## Deployment Strategy

### Development
- **Dev Server**: Concurrent frontend (Vite) and backend (Express) servers
- **Hot Reload**: Vite HMR for frontend, tsx for backend TypeScript execution
- **Environment**: NODE_ENV=development with Replit-specific plugins

### Production
- **Build Process**: 
  1. Vite builds frontend to `dist/public`
  2. esbuild bundles backend to `dist/index.js`
- **Static Serving**: Express serves built frontend assets
- **Database**: PostgreSQL connection via DATABASE_URL environment variable
- **Session Storage**: PostgreSQL-backed session store

### Environment Configuration
- **DATABASE_URL**: PostgreSQL connection string (required)
- **VITE_WEBHOOK_URL**: External webhook endpoint for AI responses (optional)
- **NODE_ENV**: Environment flag for development/production behavior

The application follows a monorepo structure with shared TypeScript definitions, making it easy to maintain type safety across the full stack while supporting both development and production deployment scenarios.