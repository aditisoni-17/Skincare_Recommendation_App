# Noorify

Noorify is a full-stack skincare recommendation and e-commerce application built with React, Vite, Express, and MongoDB. It combines a modern product catalog, admin product management, rule-based recommendations, authentication, cart and checkout flows, and a clean API-backed architecture that is easy to demo in interviews.

## Live Demo

- Frontend: `[Add Vercel URL here]`
- Backend API: `[Add Render URL here]`

## Project Overview

The project is designed as a beginner-friendly but scalable full-stack app. Users can browse products, search and filter the catalog, view recommendations, manage cart items, and place demo orders. Admin users can create, update, and delete products through an API-connected dashboard.

## Features

- Product catalog with search, category filtering, rating filter, and pagination
- Product detail modal with related product recommendations
- Rule-based AI-style recommendation flow using skin type and concern inputs
- Admin panel for product CRUD operations
- Express REST API with MongoDB and Mongoose
- Authentication and protected routes
- Cart, checkout, and order history flows
- Responsive UI built with React and Tailwind CSS
- Fallback handling for API and image failures

## Tech Stack

### Frontend

- React 18
- Vite
- React Router
- Tailwind CSS
- Heroicons

### Backend

- Node.js
- Express
- MongoDB
- Mongoose
- JWT authentication

### Tooling

- ESLint
- PostCSS
- Vercel for frontend deployment
- Render for backend deployment

## Folder Structure

```text
src/
  components/
  contexts/
  pages/
  services/
server/
  controllers/
  models/
  routes/
  services/
  utils/
```

## Getting Started

### Prerequisites

- Node.js 18+
- npm
- MongoDB locally, or a MongoDB Atlas connection string

### 1. Clone the repository

```bash
git clone https://github.com/aditisoni-17/Skincare_Recommendation_App.git
cd Skincare_Recommendation_App
```

### 2. Install dependencies

```bash
npm install
```

### 3. Configure environment variables

Create a `.env` file from `.env.example`:

```bash
cp .env.example .env
```

Example values:

```env
VITE_API_BASE_URL=http://localhost:3001
PORT=3001
MONGO_URI=mongodb://127.0.0.1:27017/noorify
JWT_SECRET=replace-me
CORS_ORIGIN=http://localhost:5173
```

### 4. Start the project

Frontend:

```bash
npm run dev
```

Backend:

```bash
npm run dev:server
```

Run both together:

```bash
npm run dev:full
```

Optional in-memory MongoDB for development:

```bash
npm run dev:db
```

## Local URLs

- Frontend: [http://localhost:5173](http://localhost:5173)
- Backend: [http://localhost:3001](http://localhost:3001)

## Key Pages

- `/` Home page
- `/products` Product listing and recommendations
- `/admin/products` Admin product management
- `/cart` Cart page
- `/profile` Profile and order history
- `/skin-test` Skin assessment flow

## API Endpoints

### Products

- `GET /api/products`
- `GET /api/products/:id` (add if implemented later)
- `GET /api/products/recommend/:id`
- `POST /api/products`
- `PUT /api/products/:id`
- `DELETE /api/products/:id`

### Recommendations

- `POST /api/recommend`

Request body:

```json
{
  "skinType": "dry",
  "concern": "dryness"
}
```

### Auth and Orders

- `POST /api/auth/signup`
- `POST /api/auth/login`
- `GET /api/orders`
- `POST /api/orders`

## Production Deployment

### Frontend on Vercel

1. Import the GitHub repo into Vercel.
2. Set framework preset to `Vite`.
3. Add `VITE_API_BASE_URL` pointing to the deployed backend.
4. Deploy.

### Backend on Render

1. Create a new Web Service from the same repo.
2. Build command: `npm install`
3. Start command: `node server/index.js`
4. Add `PORT`, `MONGO_URI`, `JWT_SECRET`, and `CORS_ORIGIN`.
5. Deploy and verify `/api/health`.

## Screenshots

Add screenshots before sharing the repo publicly.

- `[Home page screenshot]`
- `[Products page screenshot]`
- `[Admin dashboard screenshot]`
- `[Cart and checkout screenshot]`
- `[Profile / orders screenshot]`

## Interview Talking Points

- Full-stack CRUD architecture with React, Express, and MongoDB
- Environment-based frontend/backend deployment setup
- API fallback strategy and frontend error handling
- Rule-based recommendation system designed to be ML-upgradeable later
- Separation of concerns across routes, controllers, services, and UI components

## Future Improvements

- Server-side pagination and sorting controls in the UI
- Role-based admin access control
- Cloud image storage instead of third-party hotlinked image URLs
- Unit and integration tests for controllers and pages
- Smarter recommendation ranking using embeddings or user history
