# Full Stack Portfolio Website

Modern responsive developer portfolio built with React (frontend), Node.js/Express (backend), MongoDB, and Resend for email notifications.

## Project Structure

```
portfolio-website1/
├── client/          # React frontend
│   ├── public/      # Static assets & Resume PDF
│   └── src/         # React components and styling
└── server/          # Express backend & MongoDB
    ├── models/      # Mongoose Contact model
    └── server.js    # Express server & Resend email integration
```

## Getting Started

### 1. Server Setup
```bash
cd server
npm install
```
Configure `server/.env`:
```env
PORT=5000
MONGO_URI=mongodb://127.0.0.1:27017/portfolio
RESEND_API_KEY=your_resend_api_key
NOTIFICATION_EMAIL=your_email@example.com
```
Run the server:
```bash
npm start
```

### 2. Client Setup
```bash
cd client
npm install
npm start
```
The React frontend will run at `http://localhost:3000`.

## Features
- **Responsive Navigation**: Smooth scrolling to Home, About, Skills, Projects, and Contact.
- **Resume Integration**: View or download CV directly from the navbar and hero section.
- **Contact Form**: Saves messages to MongoDB and delivers instant email notifications via Resend.
