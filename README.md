# RefinedReal

A premium, small-business e-commerce storefront built with Next.js (App Router),
JavaScript, Tailwind CSS, MongoDB, and Better Auth.

## Tech stack

- **Next.js 14** (App Router, JavaScript only — no TypeScript)
- **React 18**
- **Tailwind CSS** for styling, with a light/dark theme token system
- **MongoDB** for users, sessions, and orders
- **Better Auth** for authentication (email + password)
- **lucide-react** for icons

## Getting started

### 1. Install dependencies

```bash
npm install
```

### 2. Set up environment variables

Copy the example file and fill in your own values:

```bash
cp .env.example .env.local
```

- `MONGODB_URI` — your MongoDB connection string (a free
  [MongoDB Atlas](https://www.mongodb.com/atlas) cluster works great for this).
- `BETTER_AUTH_SECRET` — any long random string (used to sign sessions).
  Generate one with: `openssl rand -base64 32`
- `BETTER_AUTH_URL` / `NEXT_PUBLIC_BETTER_AUTH_URL` — `http://localhost:3000`
  for local development.

### 3. Run the dev server

```bash
npm run dev
```

Visit [http://localhost:3000](http://localhost:3000).

### 4. Build for production

```bash
npm run build
npm start
```

## Project structure

```
app/                   Routes (App Router)
  page.js              Homepage
  shop/                Product listing, search, filters
  products/[id]/       Product detail pages
  cart/                Shopping cart
  checkout/            Checkout + order placement
  login/ register/     Auth pages
  account/             Profile + order history
  about/               About page
  api/auth/[...all]/   Better Auth route handler
  api/orders/          Order creation + retrieval

components/            Reusable UI components
lib/                   MongoDB client, Better Auth config, product helpers,
                        cart context, theme context
data/products.json     Product catalog (edit this to add/change products)
public/products/       Product photos
public/images/         Logo assets
```

## Managing products

The catalog lives in `data/products.json` — there's no need to touch MongoDB
to add, edit, or remove products. Each entry looks like:

```json
{
  "id": 15,
  "name": "New Product",
  "slug": "new-product",
  "price": 1500,
  "oldPrice": 1800,
  "category": "Gadgets",
  "image": "/products/new-product.jpg",
  "images": ["/products/new-product.jpg"],
  "description": "Short description shown on cards.",
  "details": "Longer description shown on the product page.",
  "rating": 4.5,
  "reviews": 10,
  "inStock": true,
  "featured": false
}
```

Drop the matching photo into `public/products/` with the same filename
referenced in `image`.

## Notes on the product catalog

A couple of the source photos used other brands' names or characters
(for example, a novelty toy branded with another company's logo). Those
products are listed under generic, descriptive names rather than the
original branding, since the site shouldn't market unrelated companies'
trademarks. One additional supplied photo wasn't included at all because it
carried another business's watermark rather than being an original product
photo — swap in your own photo of that item and add it to `products.json`
if you'd like it in the catalog.

## What's implemented

- Light/dark mode with persistence and no flash-of-wrong-theme
- Responsive navbar with search, cart badge, categories dropdown, mobile menu
- Home page: hero, categories, featured products, value props, promo banner
- Shop page: search, category + price filtering, sorting, mobile filter drawer
- Product detail page: gallery, quantity selector, add to cart, buy now,
  related products
- Cart with quantity controls, persisted to `localStorage`
- Checkout: customer info form, order summary, order stored in MongoDB
- Auth: register, login, logout, session-aware navbar, account page
- Account page: profile info + order history (pulled from MongoDB)
- SEO metadata per page/product, semantic HTML, keyboard-visible focus states

## A note on this environment

This project was generated in a sandbox without npm registry access, so
while every file has been checked for JSX/syntax correctness, the app has
not been run through an actual `npm install && npm run dev` cycle yet.
Please run through the checklist below after your first install:

- [ ] `npm install` completes without errors
- [ ] Home, Shop, Product, Cart, Checkout, Login, Register, Account, About
      pages all load
- [ ] Product images load on cards, detail pages, and the hero
- [ ] Search and filters on the Shop page work
- [ ] Add to cart / update quantity / remove from cart works and persists
      after a refresh
- [ ] Placing an order writes a document to your MongoDB `orders` collection
- [ ] Register → Login → Account (with order history) → Logout works
- [ ] Theme toggle persists across refresh and page navigation
- [ ] Mobile layout (nav, filters, product grid) looks right at narrow widths

If anything doesn't line up — most likely candidates are the exact
`better-auth` API surface (it's a fast-moving library; double check
`mongodbAdapter` and `toNextJsHandler` against the version you install) —
that's the first place to look.

## Current deployment mode
MongoDB and authentication are temporarily disabled. Checkout shows a demo confirmation but does not save orders to a database.
