# 🛍️ LuxeStore – Premium E-Commerce Web Application

**LuxeStore** is a modern, responsive e-commerce web application built with **React, TypeScript, Vite, Tailwind CSS, and shadcn/ui**.  
It delivers a clean shopping experience with a premium UI, smooth navigation, and a complete cart-to-checkout flow.

🔗 **Live Demo:** https://lux-store-vt9n.vercel.app

---

## ✨ Features

- 🏠 Elegant landing page with premium hero section
- 🛍️ Product listing with responsive grid layout
- 📄 Product detail pages
- 🧺 Shopping cart with quantity management
- 💳 Checkout flow (Cart → Address → Payment)
- ✅ Order success & confirmation page
- 🌗 Theme support using React Context
- 🔔 Toast notifications for actions
- 📱 Fully responsive UI
- ⚡ Fast performance with Vite

---

## 🛠️ Tech Stack

- **Frontend:** React + TypeScript
- **Build Tool:** Vite
- **Styling:** Tailwind CSS
- **UI Library:** shadcn/ui + Radix UI
- **State Management:** React Context & Hooks
- **Routing:** React Router
- **Notifications:** Sonner / Toaster
- **Deployment:** Vercel

---

## 📸 Screenshots

### 🏠 Home Page
![Home Page](home.png.png)
> Premium hero section with gradient background, featured collection badge, and call-to-action buttons.

---

### 🛍️ Products Page
![Products Page](products.png.png)
> Displays all products in a clean and responsive card-based layout.

---

### 🧺 Shopping Cart
![Cart Page](cart.png.png)
> Cart page with quantity controls, price calculation, and order summary.

---

### 🚚 Checkout Page
![Checkout Page](checkout.png.png)
> Multi-step checkout flow with shipping details and order summary.

---

### ✅ Order Success Page
![Order Success](order-success.png.png)
> Order confirmation screen with status tracking and success notification.

---

## 📂 Project Structure

```txt
src/
├── assets/            # Images and static assets
├── components/        # Reusable UI components
│   ├── Navbar.tsx
│   ├── ProductCard.tsx
│   └── AdminSidebar.tsx
├── context/           # Global contexts
│   └── theme-context.tsx
├── pages/             # Application pages
│   ├── Index.tsx
│   ├── Products.tsx
│   ├── ProductDetail.tsx
│   ├── Cart.tsx
│   ├── Checkout.tsx
│   ├── Payment.tsx
│   └── OrderSuccess.tsx
├── hooks/             # Custom hooks
├── data/              # Static / mock data
├── App.tsx            # Root component
├── main.tsx           # Application entry point
├── index.css          # Global styles (Tailwind)
└── vite-env.d.ts
