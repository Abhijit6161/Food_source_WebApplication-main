# 🍔 FoodSource - Full-Stack MERN Food Delivery Application

[![Tech Stack](https://img.shields.io/badge/Stack-MERN--Stack-brightgreen)](https://github.com/abhijitmore)
[![License: ISC](https://img.shields.io/badge/License-ISC-blue.svg)](https://opensource.org/licenses/ISC)
[![React](https://img.shields.io/badge/Frontend-React_18-61DAFB?logo=react)](https://reactjs.org/)
[![Node.js](https://img.shields.io/badge/Backend-Node.js_Express-339933?logo=node.js)](https://nodejs.org/)
[![MongoDB](https://img.shields.io/badge/Database-MongoDB_Mongoose-47A248?logo=mongodb)](https://www.mongodb.com/)

**FoodSource** is a production-grade, full-stack food ordering and delivery web application built with the **MERN Stack (MongoDB, Express.js, React.js, Node.js)**. Transformed from a static prototype into a scalable web application, FoodSource features real-time REST API integration, JWT token authentication, MongoDB data modeling, dynamic shopping cart management, user order tracking, and a dedicated Administrator Management Dashboard.

---

## 🌟 Key Features

### 👤 Customer Features
- **User Authentication**: Secure user registration and login with bcrypt password hashing and JWT token authorization.
- **Dynamic Food Menu & Categories**: Browse dishes by category (Pizza, Burger, Sandwich, etc.), filter in real-time, and search by food name.
- **Detailed Item View**: Inspect ingredient descriptions, price breakdowns, ratings, and quantity selectors.
- **Interactive Shopping Cart**: Add, remove, update item quantities with instant total calculations (persisted via DB for logged-in users and LocalStorage for guest users).
- **Seamless Checkout Flow**: Complete delivery address details, contact information, and select Cash on Delivery (COD).
- **Order History & Real-Time Status**: View detailed order summaries with live status updates (*Pending*, *Confirmed*, *Preparing*, *Out for Delivery*, *Delivered*, *Cancelled*).
- **User Profile**: Account details and role indicator.

### 🛡️ Admin Dashboard Features
- **Overview Analytics**: Real-time summary metric cards for Total Revenue, Total Orders, Total Menu Items, and Total Registered Customers.
- **Food Catalog Management (CRUD)**: Create new dishes, edit prices/descriptions, upload/set image URLs, toggle item availability (In Stock / Out of Stock), and delete items.
- **Customer Order Management**: View all customer orders, inspect delivery addresses, view ordered items breakdown, and update live order status with a simple dropdown selector.

---

## 🛠️ Technology Stack

| Layer | Technology |
| :--- | :--- |
| **Frontend** | React 18, React Router v6, Axios, Lucide React Icons, CSS3 (CSS Variables & Flex/Grid) |
| **Backend** | Node.js, Express.js, JWT (`jsonwebtoken`), `bcryptjs`, CORS, Dotenv |
| **Database** | MongoDB, Mongoose ORM |
| **Dev Tools** | Vite, Nodemon, Concurrently |

---

## 📁 Project Structure

```
FoodSource/
├── client/                      # React Frontend App (Vite)
│   ├── public/                  # Static assets & food images
│   │   └── img/                 # Category and Food images
│   ├── src/
│   │   ├── assets/              # Master stylesheet (style.css)
│   │   ├── components/          # Reusable UI (Navbar, Footer, FoodCard, CartDrawer, etc.)
│   │   ├── context/             # React Context API (AuthContext, CartContext)
│   │   ├── pages/               # Application Pages (Home, Menu, Cart, Checkout, Admin, etc.)
│   │   ├── services/            # Axios API client setup (api.js)
│   │   ├── App.jsx              # Main App layout & React Router config
│   │   └── main.jsx             # React DOM root entry
│   └── package.json
│
├── server/                      # Express Backend API
│   ├── config/                  # MongoDB Database connection (db.js)
│   ├── controllers/             # Business logic (auth, food, cart, order, admin)
│   ├── middleware/              # JWT protection & Admin authorization middlewares
│   ├── models/                  # Mongoose Schemas (User, Food, Category, Cart, Order)
│   ├── routes/                  # REST API Endpoints
│   ├── seed/                    # Database Seeder script (seeder.js)
│   ├── server.js                # Express app entry point
│   ├── package.json
│   └── .env.example
│
├── package.json                 # Monorepo scripts (concurrently dev runner)
├── .gitignore                   # Excluded dependencies & secrets
└── README.md                    # Project Documentation
```

---

## 🔑 Environment Variables

Create a `.env` file inside the `server/` directory (or copy from `server/.env.example`):

```env
PORT=5000
MONGO_URI=mongodb://127.0.0.1:27017/foodsource
JWT_SECRET=super_secret_foodsource_jwt_key_2026
```

> **Note**: Replace `MONGO_URI` with your MongoDB Atlas URI string if using a cloud database cluster.

---

## 🚀 Quick Start & Installation

### 1. Clone the Repository
```bash
git clone https://github.com/abhijitmore/FoodSource.join
cd FoodSource
```

### 2. Install Dependencies
Install dependencies for root, backend server, and frontend client:
```bash
npm run setup
```

### 3. Seed Database Sample Data
Populate MongoDB with default categories, food items, test customer account, and admin account:
```bash
npm run seed
```

#### Demo Login Credentials:
- **Customer Account**: `user@foodsource.com` / `userpassword123`
- **Admin Account**: `admin@foodsource.com` / `adminpassword123`

### 4. Run Application (Concurrent Frontend & Backend)
```bash
npm run dev
```
- **Frontend App**: `http://localhost:3000`
- **Backend API**: `http://localhost:5000`

---

## 📡 REST API Documentation

### 🔐 Authentication API (`/api/auth`)
| Method | Endpoint | Description | Auth Required |
| :--- | :--- | :--- | :--- |
| `POST` | `/api/auth/register` | Register a new user | No |
| `POST` | `/api/auth/login` | Authenticate user & get JWT token | No |
| `GET` | `/api/auth/me` | Fetch logged-in user profile | Yes |

### 🍕 Foods API (`/api/foods`)
| Method | Endpoint | Description | Auth Required |
| :--- | :--- | :--- | :--- |
| `GET` | `/api/foods` | Fetch all foods (supports `?keyword=` and `?category=`) | No |
| `GET` | `/api/foods/:id` | Fetch single food item details | No |
| `POST` | `/api/foods` | Add new food item | Admin |
| `PUT` | `/api/foods/:id` | Update food item details / availability | Admin |
| `DELETE` | `/api/foods/:id` | Remove food item | Admin |

### 📁 Categories API (`/api/categories`)
| Method | Endpoint | Description | Auth Required |
| :--- | :--- | :--- | :--- |
| `GET` | `/api/categories` | Fetch all categories | No |
| `POST` | `/api/categories` | Create category | Admin |

### 🛒 Cart API (`/api/cart`)
| Method | Endpoint | Description | Auth Required |
| :--- | :--- | :--- | :--- |
| `GET` | `/api/cart` | Get user's cart items | Yes |
| `POST` | `/api/cart` | Add / increment item in cart | Yes |
| `PUT` | `/api/cart/:itemId` | Update cart item quantity | Yes |
| `DELETE` | `/api/cart/:itemId` | Remove single item from cart | Yes |
| `DELETE` | `/api/cart` | Clear entire cart | Yes |

### 📦 Orders API (`/api/orders`)
| Method | Endpoint | Description | Auth Required |
| :--- | :--- | :--- | :--- |
| `POST` | `/api/orders` | Place new order & clear cart | Yes |
| `GET` | `/api/orders` | Fetch logged-in user order history | Yes |
| `GET` | `/api/orders/:id` | Fetch single order details | Yes |

### 🛡️ Admin API (`/api/admin`)
| Method | Endpoint | Description | Auth Required |
| :--- | :--- | :--- | :--- |
| `GET` | `/api/admin/stats` | Fetch system metrics (revenue, counts) | Admin |
| `GET` | `/api/admin/orders` | Fetch all customer orders | Admin |
| `PUT` | `/api/admin/orders/:id/status` | Update customer order status | Admin |

---

## 💼 Resume & Interview Project Description

> **FoodSource – Full-Stack MERN Food Delivery Application**
> - Developed a full-stack food delivery application using React 18, Node.js, Express.js, and MongoDB.
> - Implemented secure JWT authentication and password hashing with `bcryptjs` for protected customer and admin routes.
> - Engineered dynamic state management using React Context API for shopping cart persistence across sessions and guest storage.
> - Designed responsive UI components utilizing custom modular CSS, responsive grids, sliding cart drawer, and interactive filter tabs.
> - Built comprehensive Admin Management Module enabling CRUD operations on food menu items and live order status management.

---

## 👨‍💻 Author

**Abhijit More**
- GitHub: [@abhijitmore](https://github.com/abhijitmore)
- LinkedIn: [Abhijit More](https://www.linkedin.com/in/abhijit-more-700139368/)
