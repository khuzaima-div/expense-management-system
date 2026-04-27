# Expense Management System

Role-based expense approval system with a Node/Express + MongoDB backend and a React + Vite frontend.

## Tech stack

- **Backend**: Node.js, Express, MongoDB (Mongoose), JWT, Nodemailer
- **Frontend**: React, Vite

## Project structure

- `server/` - Express API
- `client/vite-project/` - frontend workspace (React/Vite)

## Setup

### 1) Backend (server)

```bash
cd server
npm install
npm start
```

Create a `.env` file in `server/` (example keys):

```env
PORT=5000
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
EMAIL_USER=your_email
EMAIL_PASS=your_email_password_or_app_password
```

### 2) Frontend (client)

```bash
cd client/vite-project
npm install
npm run dev
```

## Deployment

- `vercel.json` is included for deployment configuration (update as needed).

