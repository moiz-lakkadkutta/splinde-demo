# Splinde Coding Challenge - Financial Report Dashboard

A fullstack TypeScript application for displaying and editing hierarchical financial data with real-time computed sums.

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
│   │   ├── App.tsx         # Main application component
│   │   ├── main.tsx        # Application entry point
│   │   ├── types.ts        # TypeScript types
│   │   ├── utils.ts        # Utilities
│   │   ├── api.ts          # API communication
│   │   └── index.css       # Global styles
│   └── package.json
├── docker-compose.yml      # Docker Compose configuration
└── README.md              # This file
```

## ✨ Features

### Must-Have Features ✅

- ✅ **Backend API endpoint** serving demo data
- ✅ **Computed sums** calculation for sections and total sum
- ✅ **Frontend rendering** of sections with computed sums
- ✅ **Editable entry sums** with real-time sum updates
- ✅ **Editable notes** for all entries

### Optional Features ✅

- ✅ **Modern, responsive UI** with gradient backgrounds and smooth transitions
- ✅ **Docker Compose setup** for easy deployment
- ✅ **Collapse/expand sections** with animated chevron icons
- ✅ **Real-time calculations** without backend calls for sum updates
- ✅ **Error handling** with retry functionality
- ✅ **Loading states** and user feedback

## 🛠 Technology Stack

### Backend
- **Node.js** with **TypeScript**
- **Express.js** for REST API
- **CORS** enabled for cross-origin requests

### Frontend
- **React 18** with **TypeScript**
- **Vite** for fast development and building
- **Lucide React** for icons
- **Modern CSS** with gradients and animations

### DevOps
- **Docker** & **Docker Compose**
- **Concurrent** development setup
- **ESLint** for code quality

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

The application uses a **client-server architecture**:

1. **Backend**: Express.js server that serves the demo data with computed sums via REST API
2. **Frontend**: React SPA that fetches data and provides an interactive interface
3. **Real-time Updates**: Sum calculations happen on the frontend for immediate feedback
4. **Hierarchical Data**: Supports infinite nesting levels of sections and entries

## 📊 Data Flow

1. Backend computes initial sums from demo data
2. Frontend fetches computed data on load
3. User edits entry sums or notes
4. Frontend recalculates all affected sums immediately
5. UI updates in real-time without backend calls

## 🎨 UI/UX Features

- **Gradient backgrounds** for modern visual appeal
- **Hover effects** and **smooth transitions**
- **Collapsible sections** with animated icons
- **Responsive design** that works on all screen sizes
- **Clear visual hierarchy** with proper typography
- **Inline editing** with focused input states
- **Currency formatting** for better readability

## 🚢 Deployment

The application is containerized and ready for deployment:

1. **Development**: Use Docker Compose for local development
2. **Production**: Build optimized versions and deploy containers
3. **Scalability**: Stateless backend allows horizontal scaling

## 🔍 API Endpoints

- `GET /health` - Health check endpoint
- `GET /api/data` - Returns computed financial data with total sum
- `GET /api/data/raw` - Returns original demo data without computations

---

**Focus Areas**: Clean architecture, TypeScript safety, modern UI/UX, and comprehensive feature implementation. 
