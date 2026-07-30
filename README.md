# Winter Adventures

Winter Adventures is an e-commerce web application where users can browse a variety of products, filter search results, create accounts, and complete purchases through checkout and order placement. Admins can manage the platform by adding new products, updating product details such as names, prices, and images, and removing products when needed.

## Quick start

### Prerequisites

- .NET SDK
- Node.js and npm
- SQL Server

### Backend

```bash
cd API
dotnet restore
dotnet run
```

### Frontend

```bash
cd client
npm install
npm run dev
```

## Features

- Browse and search products
- Filter products by category or attributes
- Create an account and sign in
- Add items to a basket and complete checkout
- Admin tools for creating, updating, and deleting products

## Tech stack

- ASP.NET Core Web API
- Entity Framework Core
- React + TypeScript + Vite
- Material UI
- Redux Toolkit
- Stripe payments

## Project structure

- API: backend services, controllers, and data access
- client: frontend application and UI components
- SQL-Queries: database scripts and setup queries
