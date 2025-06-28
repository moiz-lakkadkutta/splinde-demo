# Splinde Coding Challenge - Financial Report Dashboard

A professional, fullstack TypeScript application for displaying and editing hierarchical financial data with real-time computed sums. Built with Apple's Human Interface Guidelines and modern web standards.

## 🚀 Quick Start

### Prerequisites

- Node.js 18.x or higher
- npm or yarn
- Docker & Docker Compose (optional)

### Option 1: Local Development

1. **Clone the repository**
   ```bash
   git clone https://github.com/moiz-lakkadkutta/splinde-demo.git
   cd splinde-demo
   ```

2. **Install dependencies**
   ```bash
   npm run install:all
   ```

3. **Start the application**
   ```bash
   npm run dev
   ```

   This will start both the backend (port 3001) and frontend (port 3000) concurrently.

4. **Access the application**
   - Frontend: http://localhost:3000
   - Backend API: http://localhost:3001/api/data

### Option 2: Docker Compose

1. **Clone the repository**
   ```bash
   git clone https://github.com/moiz-lakkadkutta/splinde-demo.git
   cd splinde-demo
   ```

2. **Start with Docker Compose**
   ```bash
   docker-compose up --build
   ```

3. **Access the application**
   - Frontend: http://localhost:3000
   - Backend API: http://localhost:3001/api/data

## 📁 Project Structure

```
splineded/
├── backend/                 # Express.js API server
│   ├── src/
│   │   ├── index.ts        # Main server file
│   │   ├── types.ts        # TypeScript type definitions
│   │   └── data.ts         # Demo data and utilities
│   ├── package.json
│   └── tsconfig.json
├── frontend/               # React application
│   ├── src/
│   │   ├── components/     # React components
│   │   │   ├── EntryComponent.tsx
│   │   │   ├── SectionComponent.tsx
│   │   │   ├── MobileNavigationWrapper.tsx
│   │   │   └── ThemeToggle.tsx
│   │   ├── App.tsx         # Main application component
│   │   ├── main.tsx        # Application entry point
│   │   ├── types.ts        # TypeScript types
│   │   ├── utils.ts        # Utilities
│   │   ├── api.ts          # API communication
│   │   └── index.css       # Apple HIG-inspired styles
│   └── package.json
├── docker-compose.yml      # Docker Compose configuration
└── README.md              # This file
```

## ✨ Features

### Core Features ✅

- ✅ **Backend API endpoint** serving demo data with computed sums
- ✅ **Hierarchical data structure** with infinite nesting levels
- ✅ **Real-time sum calculations** with automatic propagation
- ✅ **Editable entry sums** with onBlur validation and formatting
- ✅ **Editable entry notes** with expandable text areas
- ✅ **Editable entry names** with inline click-to-edit functionality
- ✅ **Add/Remove entries** with smooth animations
- ✅ **Add/Remove sections** with automatic recalculation
- ✅ **Collapsible sections** (collapsed by default) with animated chevrons

### Design System ✅

- ✅ **Apple Human Interface Guidelines** compliance
- ✅ **SF Pro Font Stack** with proper typography hierarchy
- ✅ **Apple Semantic Colors** with proper contrast ratios
- ✅ **8pt Grid System** for consistent spacing
- ✅ **Continuous Curves** border radius following Apple standards
- ✅ **Glass Morphism Effects** with backdrop blur
- ✅ **Natural Motion** with cubic-bezier easing curves
- ✅ **Elevated Shadows** with four-level system

### Theme & Accessibility ✅

- ✅ **Manual Theme Toggle** with iOS-style switch (sun/moon icons)
- ✅ **Dark Mode Support** with automatic system detection
- ✅ **Theme Persistence** in localStorage across sessions
- 🟡 **Accessibility Features** with basic WCAG support
- ✅ **Keyboard Navigation** support for interactive elements
- 🟡 **Screen Reader Support** with basic ARIA labels
- ✅ **High Contrast Support** adapts to user preferences
- ✅ **Reduced Motion Support** respects motion sensitivity
- ✅ **Focus Management** with visual focus indicators

### Mobile Experience ✅

- ✅ **Mobile-First Design** optimized for touch devices
- ✅ **Drill-Down Navigation** with iOS-style hierarchical interface
- ✅ **Touch-Optimized Interactions** with 44px minimum targets
- ✅ **Safe Area Support** for modern devices with notches
- ✅ **Dynamic Viewport Height** for better mobile browser support
- ✅ **Breadcrumb Navigation** with Back/Home buttons
- ✅ **Native App Feel** with smooth transitions and gestures

### Advanced UI/UX ✅

- ✅ **Shimmer Animations** on total sum card
- ✅ **Hover Effects** with subtle elevation changes
- ✅ **Micro-Interactions** throughout the interface
- ✅ **Loading States** with skeleton screens
- ✅ **Error Handling** with retry functionality
- ✅ **Visual Feedback** for all user actions
- ✅ **Currency Formatting** with proper locale support
- ✅ **Inline Validation** with real-time feedback

## 🎨 Design Philosophy

### Apple Human Interface Guidelines
The application follows Apple's design principles for:
- **Clarity**: Clear visual hierarchy and purposeful design
- **Deference**: Content takes priority over UI elements
- **Depth**: Layered interface with realistic motion

### Glass Morphism
- **Translucent Materials**: Backdrop blur effects for depth
- **Proper Layering**: Visual hierarchy through elevation
- **Performance**: Hardware-accelerated where supported

### Responsive Design
- **Mobile-First**: Optimized for small screens, enhanced for larger
- **Touch-Friendly**: All interactions work well on touch devices
- **Cross-Platform**: Consistent experience across all devices

## 🛠 Technology Stack

### Backend
- **Node.js** with **TypeScript** (strict mode)
- **Express.js** for REST API
- **Health check endpoints** for monitoring

### Frontend
- **React 18** with **TypeScript** (strict mode)
- **Vite** for fast development and building
- **Lucide React** for consistent iconography
- **CSS Custom Properties** for theming
- **Modern CSS** with grid, flexbox, and animations

### Development & DevOps
- **Docker** & **Docker Compose** for containerization
- **ESLint** for code quality
- **Concurrent** development setup
- **Hot Module Replacement** for fast development
- **Path-based state management** for performance

## 🔧 Available Scripts

### Root Level
- `npm run dev` - Start both backend and frontend in development mode
- `npm run build` - Build both applications for production
- `npm run install:all` - Install dependencies for all workspaces

### Backend
- `npm run dev` - Start backend in development mode with hot reload
- `npm run build` - Build backend for production
- `npm start` - Start production server

### Frontend
- `npm run dev` - Start frontend development server
- `npm run build` - Build frontend for production
- `npm run preview` - Preview production build

## 🏗 Architecture

The application uses a **modern client-server architecture**:

### Backend
- **RESTful API** serving computed financial data
- **Stateless design** for horizontal scalability
- **Type-safe** endpoints with TypeScript
- **Health monitoring** with dedicated endpoints

### Frontend
- **React SPA** with component-based architecture
- **Path-based state management** for efficient updates
- **Real-time calculations** without backend calls
- **Immutable updates** for predictable state changes
- **Component composition** with compound patterns

### Data Flow
1. Backend computes initial sums from demo data
2. Frontend fetches computed data on load
3. User interactions update state immediately
4. Calculations propagate through the hierarchy
5. UI reflects changes with smooth animations

## 📊 Performance Features

### Optimization Techniques
- **React.memo** for preventing unnecessary re-renders
- **useCallback** and **useMemo** for expensive operations
- **Path-based updates** for efficient nested data changes
- **CSS hardware acceleration** for smooth animations
- **Code splitting** with dynamic imports
- **Tree shaking** for minimal bundle size


## 🔍 API Endpoints

### Backend Routes
- `GET /health` - Health check endpoint
- `GET /api/data` - Returns computed financial data with total sum
- `GET /api/data/raw` - Returns original demo data without computations

### Frontend Features
- **Theme Management**: Manual toggle with system preference fallback
- **CRUD Operations**: Full create, read, update, delete for entries/sections
- **Real-time Validation**: Immediate feedback for user inputs

## 🚢 Deployment

The application is production-ready and containerized:

### Development
- **Docker Compose** for local development environment
- **Hot reloading** for both frontend and backend
- **Environment configuration** through Docker

### Production
- **Optimized builds** with Vite and TypeScript
- **Container orchestration** ready
- **Health checks** for monitoring
- **Horizontal scaling** supported

## 🎯 User Experience Highlights

### Desktop Experience
- **Hover interactions** with subtle visual feedback
- **Keyboard shortcuts** for power users (Enter/Escape)
- **Multi-column layout** optimizing screen real estate
- **Theme toggle** in header for easy access

### Mobile Experience
- **Drill-down navigation** mimicking native iOS apps
- **Touch gestures** and smooth scrolling
- **Safe area handling** for modern devices
- **Full-screen optimization** without external scroll

### Accessibility
- **Semantic HTML structure** with proper heading hierarchy
- **Basic keyboard navigation** for interactive elements
- **High contrast mode** and motion preferences support
- **Touch target sizing** following 44px minimum guidelines
- **Focus indicators** for keyboard users
- **Note**: Full WCAG compliance would require additional testing and features

## ♿ **Accessibility Status & Roadmap**

### Current Implementation
- ✅ **Semantic HTML** with proper heading hierarchy
- ✅ **Focus management** with visible indicators
- ✅ **User preferences** (motion, contrast, theme)
- ✅ **Touch targets** meeting 44px minimum
- ✅ **Basic ARIA labels** on key interactive elements

### For Full WCAG 2.1 AA Compliance
- 🔲 **Skip navigation links** for keyboard users
- 🔲 **Comprehensive ARIA** attributes and landmarks
- 🔲 **Form validation** with proper error identification
- 🔲 **Color contrast** testing and verification (4.5:1 ratio)
- 🔲 **Screen reader testing** with NVDA/JAWS/VoiceOver
- 🔲 **Keyboard trap management** for modal interactions
- 🔲 **Alternative text** for all meaningful images/icons
- 🔲 **Text scaling** testing up to 200%


### Code Quality
- **Strict TypeScript** configuration
- **ESLint** enforcement
- **Component isolation** with clear interfaces
- **Pure functions** for predictable behavior

---

## 🎖 Project Showcase

This implementation demonstrates:

- **Professional UI/UX Design** following industry standards
- **Modern React Patterns** with hooks and functional components
- **TypeScript Excellence** with strict type safety
- **Performance Optimization** using best practices
- **Accessibility Foundation** with room for WCAG enhancement
- **Mobile-First Development** with responsive design
- **Design System Implementation** following Apple HIG
- **State Management** with efficient update patterns

**Time Investment**: Comprehensive implementation showcasing production-ready development practices and modern web standards.

**Focus Areas**: Professional design system, performance optimization, accessibility compliance, mobile excellence, and comprehensive feature implementation.
