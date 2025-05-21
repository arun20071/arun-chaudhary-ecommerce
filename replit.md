# Arun Chaudhary E-Commerce Store

## Overview

This is a full-stack e-commerce application built with React, Express, and Drizzle ORM. The application implements a complete shopping experience with product listings, detailed product views, shopping cart functionality, and a checkout process. The frontend uses modern React patterns with a component-based architecture, while the backend provides API endpoints for data retrieval and manipulation.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture

The frontend is built with React using a modern component-based architecture:

- **UI Framework**: Custom components based on Radix UI primitives with the shadcn/ui styling approach
- **Routing**: Uses Wouter for lightweight client-side routing
- **State Management**: 
  - Context API for cart state management
  - React Query for server state management
- **Styling**: Tailwind CSS with a custom theme configuration
- **Animations**: Framer Motion for smooth UI transitions and animations

The frontend follows a clear component hierarchy where layouts, pages, and UI elements are separated. The application implements a dark/light theme system that respects user preferences.

### Backend Architecture

The backend is a Node.js Express server that:

- Serves the React application in production
- Provides REST API endpoints for data operations
- Connects to a database using Drizzle ORM
- Uses a modular structure with separate route handlers

The server is configured to run in both development and production modes, with appropriate middleware for each environment.

### Data Storage

The application uses PostgreSQL (via Drizzle ORM) for data persistence:

- **Schema Definition**: The database schema is defined in `shared/schema.ts` using Drizzle's schema definition syntax
- **Models**: The main data models are Users and Products
- **Validation**: Uses Zod integration with Drizzle for schema validation

### Authentication Flow

The application has user authentication capabilities with:
- User registration and login
- Password hashing for security
- Session-based authentication

## Key Components

### Frontend Components

1. **Page Components**:
   - `Home.tsx`: Main landing page with multiple sections
   - `ProductDetail.tsx`: Detailed view of individual products
   - `Cart.tsx`: Shopping cart management
   - `Checkout.tsx`: Multi-step checkout process

2. **UI Components**:
   - Header with navigation and cart preview
   - Product cards for listings
   - Cart dropdown for quick access
   - Theme switcher for dark/light mode

3. **Context Providers**:
   - `CartProvider`: Manages the shopping cart state
   - `ThemeProvider`: Handles theme preferences

### Backend Components

1. **API Routes**:
   - Product endpoints (listing, details, categories)
   - Cart management endpoints
   - User authentication endpoints

2. **Database Models**:
   - User model with authentication fields
   - Product model with complete product information
   - Cart and order models for purchase management

3. **Utilities**:
   - Request logging
   - Error handling middleware
   - Static file serving

## Data Flow

1. **Product Browsing**:
   - Client requests product data via API
   - Server fetches data from database
   - Products displayed in grid/list layouts

2. **Cart Management**:
   - Add to cart stores items in client-side state
   - Cart data persisted in localStorage
   - Cart summary accessible from header dropdown

3. **Checkout Process**:
   - Multi-step form for user information
   - Shipping and payment information collection
   - Order submission to backend

## External Dependencies

### Frontend Dependencies

- **UI Components**: Radix UI primitives
- **Styling**: Tailwind CSS
- **Routing**: Wouter
- **Data Fetching**: TanStack Query (React Query)
- **Animations**: Framer Motion
- **Form Handling**: React Hook Form with Zod validation

### Backend Dependencies

- **Server**: Express.js
- **Database ORM**: Drizzle ORM
- **Database Client**: @neondatabase/serverless
- **Session Management**: connect-pg-simple
- **Schema Validation**: Zod and drizzle-zod

## Deployment Strategy

The application is configured for deployment on Replit with:

1. **Build Process**:
   - Frontend built with Vite
   - Backend bundled with esbuild
   - Combined assets placed in the dist directory

2. **Runtime Configuration**:
   - Environment variables for database connections
   - Production/development mode detection
   - Static file serving for production builds

3. **Database Provisioning**:
   - PostgreSQL database configuration via Replit
   - Database schema migrations using Drizzle Kit

The deployment workflow is defined in the `.replit` file, which includes commands for building and starting the application.