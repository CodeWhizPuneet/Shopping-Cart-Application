# Experiment 2.3.2 - Redux Shopping Cart

## Aim
Implement Redux for state management in shopping carts.

## Objectives Covered
1. Configure Redux store with Toolkit
2. Create cart slice with reducers
3. Implement cart operations (add/remove/update)
4. Connect components to Redux store
5. Persist cart state to localStorage

## Tech Stack
- React 18+
- Redux Toolkit 2+
- Material UI 5+
- Vite 5

## Project Structure
```
experiment-7.2/
   client/
      src/
         store/cartSlice.js
         store/storage.js
         store/store.js
         App.jsx
         main.jsx
   server/
      server.js
```

## How To Run
1. Install dependencies:
   ```bash
   cd client
   npm install
   ```
2. Start dev server:
   ```bash
   cd client
   npm run dev
   ```
3. Build for production:
   ```bash
   cd client
   npm run build
   ```

## Expected Output
- Product cards with Add To Cart button
- Cart panel with quantity increase/decrease
- Remove individual item and clear cart actions
- Total updates automatically
- Cart persists after page refresh using localStorage
- Products loaded from backend API (`/api/products`)

## Notes
- Open Redux DevTools extension to inspect actions:
  - `cart/addToCart`
  - `cart/removeFromCart`
  - `cart/updateQuantity`
  - `cart/clearCart`
