# MindConnect - Mental Health Platform

## Overview

MindConnect is a comprehensive mental health platform that provides users with access to licensed therapists, a supportive community blog, and anonymous peer support chat. The application is built with a modern full-stack architecture using React, Express, and PostgreSQL, designed to create a safe and accessible space for mental wellness support.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture
- **Framework**: React 18 with TypeScript
- **Routing**: Wouter (lightweight React router)
- **State Management**: TanStack Query (React Query) for server state
- **UI Framework**: Shadcn/ui components with Radix UI primitives
- **Styling**: Tailwind CSS with custom design system
- **Build Tool**: Vite for development and production builds

### Backend Architecture
- **Runtime**: Node.js with Express.js framework
- **Language**: TypeScript with ES modules
- **API Pattern**: RESTful API with WebSocket support for real-time features
- **Database ORM**: Drizzle ORM for type-safe database operations
- **Session Management**: Express sessions with PostgreSQL session store

### Data Storage Solutions
- **Primary Database**: PostgreSQL with Neon serverless database
- **ORM**: Drizzle ORM with schema-first approach
- **Migration System**: Drizzle Kit for database migrations
- **Development Storage**: In-memory storage class for development/testing

## Key Components

### Database Schema
The application uses five main tables:
- **therapists**: Licensed therapist profiles with credentials and contact info
- **blog_posts**: Community blog posts with categories and like counts
- **blog_comments**: Comments on blog posts with anonymous author tracking
- **chat_rooms**: Anonymous peer support chat rooms
- **chat_messages**: Real-time chat messages with room associations

All tables use UUID primary keys and support anonymous user sessions for privacy.

### Authentication & Authorization
- **Anonymous Sessions**: Uses session IDs for user tracking without requiring registration
- **Privacy-First**: No personal data collection, all interactions are anonymous
- **Session Storage**: PostgreSQL-backed session storage with connect-pg-simple

### Real-Time Features
- **WebSocket Integration**: Custom WebSocket manager for real-time chat
- **Connection Management**: Automatic reconnection with exponential backoff
- **Room-Based Chat**: Users can join/leave chat rooms with live user counts

### UI/UX Design System
- **Design Tokens**: CSS custom properties for consistent theming
- **Color Palette**: Warm, calming colors (primary: teal, secondary: sage green, accent: coral)
- **Component Library**: Comprehensive set of accessible UI components
- **Responsive Design**: Mobile-first approach with breakpoint-based layouts

## Data Flow

### Client-Server Communication
1. **API Requests**: RESTful endpoints for CRUD operations
2. **Real-Time Updates**: WebSocket connections for chat functionality
3. **Query Management**: TanStack Query handles caching, synchronization, and optimistic updates
4. **Error Handling**: Centralized error handling with user-friendly toast notifications

### Data Persistence
1. **Database Operations**: Drizzle ORM provides type-safe database queries
2. **Session Management**: Express sessions persist user state across requests
3. **Migration Strategy**: Schema changes managed through Drizzle migrations
4. **Development Mode**: Falls back to in-memory storage when database unavailable

## External Dependencies

### Core Dependencies
- **@neondatabase/serverless**: PostgreSQL serverless database driver
- **drizzle-orm**: Type-safe ORM with PostgreSQL support
- **@radix-ui/***: Accessible UI component primitives
- **@tanstack/react-query**: Server state management
- **wouter**: Lightweight React routing
- **ws**: WebSocket implementation for real-time features

### Development Tools
- **Vite**: Fast development server and build tool
- **TypeScript**: Type safety across frontend and backend
- **Tailwind CSS**: Utility-first CSS framework
- **ESBuild**: Fast JavaScript bundler for production

### UI Enhancement
- **react-hook-form**: Form state management with validation
- **zod**: Runtime type validation and schema parsing
- **date-fns**: Date manipulation utilities
- **lucide-react**: Consistent icon system

## Deployment Strategy

### Build Process
- **Frontend**: Vite builds React app to static assets
- **Backend**: ESBuild bundles Node.js server for production
- **Assets**: Static files served from Express in production mode

### Environment Configuration
- **Development**: Hot module replacement with Vite middleware
- **Production**: Static file serving with optimized bundles
- **Database**: Environment-based connection string configuration

### Scalability Considerations
- **Stateless Backend**: Sessions stored in database for horizontal scaling
- **WebSocket Management**: Connection pooling for real-time features
- **Database**: Serverless PostgreSQL for automatic scaling
- **CDN Ready**: Static assets can be served from CDN

The architecture prioritizes user privacy, accessibility, and scalability while maintaining a simple and intuitive user experience for mental health support.