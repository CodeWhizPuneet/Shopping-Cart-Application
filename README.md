# Experiment 2.3.2 - Full Stack Integration (Redux Shopping Cart)

This implementation follows the same style as the reference README with split frontend and backend folders.

## Project Structure
```
experiment-7.2/
├── client/                      # React frontend
│   ├── src/
│   │   ├── store/               # Redux store and cart slice
│   │   ├── App.jsx              # Product list, cart, add-product form
│   │   └── ...
│   └── vite.config.js           # Dev proxy to backend
└── server/                      # Node.js backend
    ├── controllers/
    ├── middlewares/
    ├── models/
    ├── routes/
    └── server.js
```

## Tech Stack
- React 18
- Redux Toolkit
- Material UI
- Axios
- Node.js + Express

## Setup

### Backend
```bash
cd server
npm install
npm run dev
```
Server runs on `http://localhost:5000`.

### Frontend
```bash
cd client
npm install
npm run dev
```
Client runs on `http://localhost:3000` with proxy `/api/* -> http://localhost:5000`.

## API Endpoints
- `GET /api/health`
- `GET /api/products`
- `POST /api/products`

### Create Product Example
```http
POST /api/products
Content-Type: application/json

{
  "name": "Wireless Headphones",
  "price": 2999,
  "image": "https://example.com/headphones.jpg",
  "description": "High-quality wireless headphones with noise cancellation"
}
```

## Implemented Features
- Product catalog from backend API
- Add to cart / remove / update quantity / clear cart
- Persistent cart in localStorage
- Add Product form with validation feedback
- Loading and error handling states
