# 🛍️ LUX Store – Modern E-Commerce Web App

LUX Store is a modern, responsive e-commerce web application built using **React, TypeScript, Vite, Tailwind CSS, and shadcn/ui**.  
It focuses on clean UI/UX, modular architecture, and scalable frontend practices.

---

## 🚀 Features

- 🛒 Product listing & product detail pages
- 🧺 Cart & checkout flow
- 💳 Payment page UI
- 🌗 Dark / Light theme support (Context API)
- ⚡ Fast development with Vite
- 🎨 Modern UI using Tailwind CSS + shadcn/ui
- 📱 Fully responsive design
- 🧠 Clean and scalable folder structure

---

## 🛠️ Tech Stack

- **Frontend:** React + TypeScript
- **Build Tool:** Vite
- **Styling:** Tailwind CSS
- **UI Components:** shadcn/ui, Radix UI
- **State Management:** React Context / Hooks
- **Routing:** React Router
- **Package Manager:** npm

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
├── hooks/             # Custom React hooks
├── data/              # Static / mock data
├── App.tsx            # Main app component
├── main.tsx           # App entry point
├── index.css          # Global styles (Tailwind)
└── vite-env.d.ts

