# DineDash - Restaurant Listing Platform

DineDash is a modern, high-performance web application designed for seamless restaurant management. Built with a robust full-stack architecture, it allows users to discover, add, update, and manage restaurant listings with efficiency and ease. This project serves as a comprehensive solution for restaurant data management, prioritizing performance, type safety, and a premium user experience.

## Tech Stack

![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)
![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white)
![Material UI](https://img.shields.io/badge/Material%20UI-007FFF?style=for-the-badge&logo=mui&logoColor=white)
![TanStack Query](https://img.shields.io/badge/TanStack%20Query-FF4154?style=for-the-badge&logo=react-query&logoColor=white)
![Axios](https://img.shields.io/badge/Axios-5A29E4?style=for-the-badge&logo=axios&logoColor=white)
![Vite](https://img.shields.io/badge/Vite-646CFF?style=for-the-badge&logo=vite&logoColor=white)

![Node.js](https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white)
![Express](https://img.shields.io/badge/Express-000000?style=for-the-badge&logo=express&logoColor=white)
![Prisma](https://img.shields.io/badge/Prisma-39827E?style=for-the-badge&logo=prisma&logoColor=white)
![PostgreSQL](https://img.shields.io/badge/PostgreSQL-4169E1?style=for-the-badge&logo=postgresql&logoColor=white)
![Zod](https://img.shields.io/badge/Zod-3E67B1?style=for-the-badge&logo=zod&logoColor=white)
![Docker](https://img.shields.io/badge/Docker-2496ED?style=for-the-badge&logo=docker&logoColor=white)

---

## Core Features

- **Restaurant Listing**: Dynamic display of restaurants with pagination support for optimized loading.
- **Dynamic CRUD Operations**: Create, Read, Update, and Delete restaurant records with real-time UI updates via TanStack Query.
- **Advanced Form Handling**: Structured forms for adding and editing restaurants with built-in validation.
- **Responsive Design**: Fully responsive interface built with Material UI, ensuring a premium experience across all devices.
- **Type Safety**: End-to-end TypeScript implementation for both frontend and backend.
- **Efficient State Management**: Server-state synchronization using TanStack Query, reducing unnecessary API calls and providing smooth transitions.

---

## Architecture

### Backend (Clean Architecture)
The backend is structured following Clean Architecture principles to ensure scalability and maintainability:
- **Core**: Contains domain entities and business logic interfaces.
- **Application**: Implements use cases and application-specific logic.
- **Infrastructure**: Handles external concerns like database persistence (Prisma), logging, and configuration.
- **Presentation**: Manages HTTP requests, controllers, routes, and middlewares.

### Frontend (Modular Component Design)
The frontend follows a modular, component-driven approach:
- **Custom Hooks**: Decoupled API logic using TanStack Query for data fetching and mutations.
- **Centralized API Client**: Axios instance with global configuration and error handling.
- **Theme System**: Custom Material UI theme for consistent branding and modern aesthetics.

---

## Getting Started

### Prerequisites
- Node.js (v18+)
- Docker and Docker Compose
- PostgreSQL instance

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd DineDash-2026
   ```

2. **Backend Setup**
   ```bash
   cd backend
   npm install
   # Create a .env file based on .env.example and configure your DATABASE_URL
   npx prisma migrate dev
   npm run dev
   ```

3. **Frontend Setup**
   ```bash
   cd frontend
   npm install
   # Create a .env file and set VITE_API_BASE_URL
   npm run dev
   ```

### Docker Support
The backend is fully containerized. To run the backend using Docker:
```bash
cd backend
docker-compose up --build
```

---

## API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/v1/restaurants` | Fetch all restaurants (paginated) |
| POST | `/api/v1/restaurants` | Add a new restaurant |
| PATCH | `/api/v1/restaurants/:id` | Update an existing restaurant |
| DELETE | `/api/v1/restaurants/:id` | Remove a restaurant |

---

## Assignment Compliance

- **Speed and Efficiency**: Leveraged TanStack Query for optimized data fetching and caching.
- **UI Design**: Implemented a professional UI using Material UI components and a custom theme.
- **API Calls**: Robust CRUD implementation using Axios and clean async/await patterns.
- **Model Structure**: Designed efficient database schemas using Prisma and PostgreSQL.
- **Migrations**: Implemented Prisma Migrations for schema versioning and database management.
- **Deployment**: Configured for Vercel (Frontend) and Dockerized (Backend).

---

Designed and Developed by AJAI
