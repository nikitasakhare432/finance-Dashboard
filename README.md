# Finance Data Processing and Access Control Backend

A backend system for managing financial records, users, roles, and dashboard analytics.

This project demonstrates backend design, API structure, role-based access control, validation, pagination, and dashboard data aggregation.

---

## Features

- User registration and login (JWT authentication)
- Role-based access control (Viewer, Analyst, Admin)
- User management (Admin only)
- Financial record CRUD operations
- Filtering and pagination
- Dashboard summary APIs
- Validation and error handling
- Clean architecture (controllers, services, utils)

---

## Tech Stack

- Node.js
- Express.js
- MongoDB
- Mongoose
- JWT
- bcryptjs

---

## Folder Structure
# Finance Data Processing and Access Control Backend

A backend system for managing financial records, users, roles, and dashboard analytics.

This project demonstrates backend design, API structure, role-based access control, validation, pagination, and dashboard data aggregation.
 
src/
├── config/
│   └── db.js
├── controllers/
│   ├── auth.controller.js
│   ├── dashboard.controller.js
│   ├── record.controller.js
│   └── user.controller.js
├── middlewares/
│   ├── auth.middleware.js
│   ├── error.middleware.js
│   └── role.middleware.js
├── models/
│   ├── FinancialRecord.js
│   └── User.js
├── routes/
│   ├── auth.routes.js
│   ├── dashboard.routes.js
│   ├── protected.routes.js
│   ├── record.routes.js
│   └── user.routes.js
├── services/
│   ├── auth.service.js
│   ├── record.service.js
│   └── user.service.js
├── utils/
│   ├── ApiError.js
│   ├── ApiResponse.js
│   └── generateToken.js
├── validators/
│   ├── auth.validator.js
│   ├── record.validator.js
│   └── user.validator.js
├── app.js
└── server.js

---

Installation and Setup

1. Clone the repository
git clone <your-repository-url>
cd finance-backend

2. Install dependencies
npm install

3. Create .env file in the root directory
PORT=5000
MONGO_URI=mongodb://127.0.0.1:27017/finance_dashboard
JWT_SECRET=supersecretkey

4. Start the server
npm run dev

Server will run at:

http://localhost:5000

---

# Authentication

This project uses JWT-based authentication.

After login, a token is returned.
This token must be sent in protected requests using the Authorization header.

Example:

Authorization: Bearer YOUR_TOKEN

---
# Role Matrix Access 

| Action                         | Viewer | Analyst | Admin |
| ------------------------------ | ------ | ------- | ----- |
| Register / Login               | Yes    | Yes     | Yes   |
| View dashboard summary         | Yes    | Yes     | Yes   |
| View recent dashboard activity | Yes    | Yes     | Yes   |
| View category breakdown        | No     | Yes     | Yes   |
| View monthly trends            | No     | Yes     | Yes   |
| View financial records         | No     | Yes     | Yes   |
| Create financial records       | No     | No      | Yes   |
| Update financial records       | No     | No      | Yes   |
| Delete financial records       | No     | No      | Yes   |
| View all users                 | No     | No      | Yes   |
| View single user               | No     | No      | Yes   |
| Update user role/status        | No     | No      | Yes   |
| Delete user                    | No     | No      | Yes   |

---
# Assumptions

Authentication is implemented using JWT tokens.
Only admin users can manage users.
Viewer users can only access dashboard-level data.
Analyst users can view financial records and analytics.
Admin users have full access to records and users.
Inactive users are not allowed to access protected APIs.
Financial records are shared across the system for analytics and summaries.
Dates are expected in ISO-compatible format such as YYYY-MM-DD.
Hard delete is used for records and users for simplicity.

---
# Design Decisions / Tradeoffs

MongoDB was chosen for simplicity and quick development.
REST APIs were used instead of GraphQL for clarity and ease of testing.
Validation is implemented using custom middleware to keep the project lightweight.
Hard delete was used instead of soft delete to keep the implementation straightforward.
Service and utility layers were added to improve separation of concerns and maintainability.

---

# 📡 API Endpoints

# Auth APIs

# 1. Register
POST /api/auth/register

# 2. Login
POST /api/auth/login

---

# 👤 User Management (Admin Only)


| Method | Endpoint       | Description    |
| ------ | -------------- | -------------- |
| GET    | /api/users     | Get all users  |
| GET    | /api/users/:id | Get user by ID |
| PUT    | /api/users/:id | Update user    |
| DELETE | /api/users/:id | Delete user    |

# 💰 Financial Records

| Method | Endpoint         | Access         |
| ------ | ---------------- | -------------- |
| POST   | /api/records     | Admin          |
| GET    | /api/records     | Admin, Analyst |
| GET    | /api/records/:id | Admin, Analyst |
| PUT    | /api/records/:id | Admin          |
| DELETE | /api/records/:id | Admin          |

# Query Parameters

?page=1
&limit=5
&type=income
&category=Food
&startDate=2026-01-01
&endDate=2026-04-01

# 📊 Dashboard APIs

| Endpoint                    | Access         |
| --------------------------- | -------------- |
| GET /api/dashboard/summary  | All roles      |
| GET /api/dashboard/recent   | All roles      |
| GET /api/dashboard/category | Analyst, Admin |
| GET /api/dashboard/monthly  | Analyst, Admin |

# 🔒 Protected Routes

| Endpoint              | Access              |
| --------------------- | ------------------- |
| /api/protected        | Authenticated users |
| /api/admin-only       | Admin               |
| /api/analyst-or-admin | Analyst, Admin      |

---

✅ Validation Rules
# Auth
Email must be valid
Password ≥ 6 characters
Role must be valid

# Financial Records
Amount > 0
Type: income/expense
Category required
Valid date

# User Update
Role must be valid
Status: active/inactive


# ⚠️ Error Handling

Example:

{
  "success": false,
  "message": "Invalid credentials"
}

# Status Codes
200 → Success
201 → Created
400 → Bad Request
401 → Unauthorized
403 → Forbidden
404 → Not Found
500 → Server Error


# Sample Test Users

Admin
{
  "name": "Admin User",
  "email": "admin@gmail.com",
  "password": "123456",
  "role": "admin"
}


Analyst
{
  "name": "Analyst User",
  "email": "analyst@gmail.com",
  "password": "123456",
  "role": "analyst"
}

Viewer
{
  "name": "Viewer User",
  "email": "viewer@gmail.com",
  "password": "123456",
  "role": "viewer"
}


# ✨ Enhancements Implemented

JWT authentication
Pagination
RBAC (Role-Based Access Control)
Global error handling
Service + utility layers

# 👩‍💻 Author

Nikita Sakhare
📧 nikitasakhare432@gmail.com

🔗 GitHub: https://github.com/nikitasakhare432



