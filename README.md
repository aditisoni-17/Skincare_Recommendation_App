# Noorify

Noorify is a full-stack skincare recommendation and commerce application built with React, Node.js, Express, and MongoDB. It combines a modern product discovery experience with authentication, cart and checkout flows, admin product management, and rule-based skincare recommendations.

The project is designed to demonstrate strong full-stack engineering fundamentals: modular architecture, API-driven UI flows, CI/CD automation, production deployment, automated testing, and a clean developer experience.

## Live Application

- Frontend: [https://noorify-20260402-1.vercel.app](https://noorify-20260402-1.vercel.app)
- Backend: Deployable through the included EC2 workflow

## Project Overview

Noorify helps users explore skincare products, get tailored recommendations based on their skin profile, and move through a complete shopping flow from discovery to order confirmation. On the administrative side, it supports product CRUD operations through a dedicated management interface.

This project was built to showcase:

- End-to-end full-stack development with a React frontend and Express API
- Clean separation between UI, state management, business logic, and persistence
- Production-minded engineering practices including linting, formatting, testing, CI, and automated deployment
- A polished user experience backed by a maintainable codebase

## Core Features

- Product catalog with filtering, pagination, and recommendation-driven discovery
- Product detail modal with related product suggestions
- Rule-based skincare recommendation flow based on skin type and concerns
- Authentication with protected routes
- Cart, checkout, and order history flows
- Favorites / wishlist support
- Editable skin profile management
- Admin product management for create, update, and delete operations
- Fallback behavior for product loading and image failures

## Tech Stack

### Frontend

- React 18
- Vite
- React Router
- Tailwind CSS
- Heroicons
- Context API for auth and cart state

### Backend

- Node.js
- Express
- MongoDB
- Mongoose
- JWT authentication

### Tooling and Quality

- ESLint
- Prettier
- Jest
- Supertest
- GitHub Actions
- Dependabot

### Deployment

- Vercel for frontend hosting
- GitHub Actions based deployment pipeline for AWS EC2 backend rollout

## Architecture

Noorify follows a practical full-stack JavaScript architecture with clear boundaries between presentation, application state, API handling, and persistence.

### Frontend Architecture

The frontend lives in `src/` and is organized by responsibility:

- `pages/` contains route-level views such as product listing, cart, checkout, profile, and admin management
- `components/` contains reusable UI building blocks
- `contexts/` manages shared client-side state like authentication and cart state
- `services/` contains API and browser-storage interaction logic
- `data/` contains the shared product catalog used for fallback and recommendation consistency

The UI is API-driven where available, with safe fallbacks in places where graceful degradation improves resilience.

### Backend Architecture

The backend lives in `server/` and uses an MVC-style structure:

- `routes/` defines HTTP endpoints
- `controllers/` contains request validation and endpoint behavior
- `models/` defines Mongoose schemas
- `services/` contains operational logic such as product seeding
- `middleware/` handles shared request concerns like authentication
- `utils/` contains response shaping and reusable helpers

This separation keeps business logic isolated and improves testability.

### Data Flow

At a high level, the user flow works like this:

1. The React client calls API-backed service functions
2. Express routes delegate request handling to controllers
3. Controllers validate input and query MongoDB through Mongoose models
4. Responses are normalized before being returned to the client
5. Context providers manage session, cart, and profile state on the frontend

## CI/CD Workflow

The project includes GitHub Actions automation for both validation and deployment.

### Continuous Integration

On every push and pull request to `main`, GitHub Actions:

- checks out the repository
- installs dependencies with `npm ci`
- runs ESLint with `npm run lint`
- runs Jest tests with `npm test`

This ensures code quality and test coverage gates are enforced before deployment.

### Continuous Deployment

The repository also includes an EC2 deployment job triggered on push to `main` after CI passes. The workflow:

- connects to EC2 using SSH
- fetches the latest code
- resets the server checkout to `origin/main`
- installs dependencies
- builds the project
- restarts the backend process using `pm2` when available

### Dependency Automation

Dependabot is configured to:

- check npm dependencies weekly
- check GitHub Actions dependencies weekly
- limit open update PRs to 5

## Testing Strategy

The project includes both unit and integration test coverage.

### Unit Testing

Jest is used for isolated testing of utility functions and route behavior. Current examples include:

- utility response formatting
- authentication route behavior
- invalid login/signup edge cases

### Integration Testing

Integration tests use:

- Jest
- Supertest
- `mongodb-memory-server`

These tests validate real API + database interaction in memory, including:

- `POST` requests that create and persist records
- `GET` requests that return paginated data from MongoDB

### Current Philosophy

The testing setup is lightweight, fast, and practical. It focuses on validating critical backend behavior without overcomplicating the local developer workflow.

## Setup Instructions

### Prerequisites

- Node.js 20 recommended
- npm
- MongoDB locally or a MongoDB Atlas connection string

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

Create a `.env` file in the project root:

```env
VITE_API_BASE_URL=http://localhost:3001
PORT=3001
MONGO_URI=mongodb://127.0.0.1:27017/noorify
JWT_SECRET=replace-me
CORS_ORIGIN=http://localhost:5173
```

### 4. Start the application

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

Optional in-memory MongoDB:

```bash
npm run dev:db
```

### 5. Quality checks

Lint:

```bash
npm run lint
```

Format:

```bash
npm run format
```

Tests:

```bash
npm test
```

### Local URLs

- Frontend: [http://localhost:5173](http://localhost:5173)
- Backend: [http://localhost:3001](http://localhost:3001)

## API Overview

### Product Endpoints

- `GET /api/products`
- `GET /api/products/recommend/:id`
- `POST /api/products`
- `PUT /api/products/:id`
- `DELETE /api/products/:id`

### Recommendation Endpoint

- `POST /api/recommend`

Example request:

```json
{
  "skinType": "dry",
  "concern": "dryness"
}
```

### Authentication and Orders

- `POST /api/auth/signup`
- `POST /api/auth/login`
- `GET /api/orders`
- `POST /api/orders`

## Repository Structure

```text
src/
  components/
  contexts/
  data/
  pages/
  services/
  utils/

server/
  controllers/
  lib/
  middleware/
  models/
  routes/
  services/
  utils/

tests/
  server/
    integration/
    routes/
    utils/

.github/
  workflows/
```

## Why This Project Stands Out

Noorify is more than a UI demo. It demonstrates the ability to:

- design and ship a complete full-stack product experience
- structure frontend and backend code for maintainability
- introduce testing and CI/CD into an evolving codebase
- build deployment automation for production environments
- improve existing systems safely without breaking functionality

For recruiters and hiring managers, this project reflects practical product engineering skills rather than isolated tutorial code.

## Future Improvements

- Add role-based admin authorization
- Move mock/localStorage auth and order flows fully behind the backend API
- Add frontend component tests and route-level UI tests
- Add API contract tests and test coverage reporting in CI
- Add Docker support for local development and production parity
- Add centralized logging and observability for the backend
- Introduce image upload/storage instead of third-party hotlinked assets
- Improve recommendation logic with embeddings or user behavior signals

## Contact / Talking Points

If you are using this project in interviews or your portfolio, strong discussion topics include:

- full-stack CRUD design
- API-backed React architecture
- fault-tolerant frontend fallback patterns
- automated testing with Jest + Supertest + in-memory MongoDB
- GitHub Actions based CI/CD and EC2 deployment automation
- product-focused frontend engineering with operational discipline
