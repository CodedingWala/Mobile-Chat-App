ChatApp — React Native Real-Time Chat Application
A real-time chat application built with React Native (Expo) and a Node.js backend using Socket.io for live messaging.

Live Backend URL
https://mobile-chat-app-tde5.onrender.com/health

Chat History Approach
Option B — Server-side storage (MongoDB Atlas)
Messages are stored in MongoDB Atlas. When the chat screen opens, message history is fetched from the backend. New messages are saved to the database by the server and delivered to clients via Socket.io in real time.

Test Credentials
AccountEmailPasswordUser 1Person1@gmail.com123456User 2Person2@gmail.com098765

Tech Stack
Frontend

React Native with Expo
Expo Router 
Socket.io-client (real-time messaging)
TanStack React Query (data fetching and caching)
NativeWind / Tailwind CSS (styling)
Zustand (socket state management)
expo-secure-store (JWT token storage)
TypeScript

Backend

Node.js + Express.js
Socket.io (real-time communication)
MongoDB Atlas (database)
JWT (jsonwebtoken) for authentication
bcrypt for password hashing
Deployed on Render (free tier)


Project Structure
Chat_App/
├── mobile/                   # React Native Expo app
│   ├── app/
│   │   ├── (auth)/           # Login & Register screens
│   │   ├── (tabs)/           # Main tab screens (Chats, Profile)
│   │   ├── chat/             # Chat detail screen [id].tsx
│   │   ├── new-chat.tsx      # New chat screen
│   │   └── _layout.tsx       # Root layout
│   ├── components/           # Reusable UI components
│   ├── hooks/                # Custom React hooks
│   ├── lib/                  # Axios, Socket store
│   ├── types/                # TypeScript types
│   └── assets/               # Images, fonts, icons
│
└── backend/                  # Node.js Express server
    ├── src/
    │   ├── routes/           # Auth, Chat, Message, User routes
    │   ├── controller/       # Route controllers
    │   ├── models/           # Mongoose models
    │   ├── middleware/        # Auth middleware
    │   └── utils/            # JWT helper, cron job
    └── index.ts

Backend API Routes
Auth Routes /api/auth

POST /register — Register a new user
POST /login — Login and receive a JWT token
GET /me — Get the currently logged-in user (protected)

Chat Routes /api/chat

GET / — Get all chats for the logged-in user
POST / — Create a new chat with another user

Message Routes /api/message

GET /chat/:chatId — Get all messages for a specific chat

User Routes /api/user

GET / — Get all registered users


How to Run Locally
Prerequisites

Bun package manager installed
Expo Go app installed on your phone
Node.js 18+

1. Clone the repository
bashgit clone <your-github-repo-url>
cd Chat_App
2. Run the Backend
bashcd backend
bun install
bun run dev
Create a .env file in the backend folder:
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
PORT=3000
NODE_ENV=development
3. Run the Mobile App
bashcd mobile
bun install
bunx expo start --tunnel

Note: The --tunnel flag requires @expo/ws-tunnel which is already included in package.json. This allows your phone to connect to the dev server from anywhere on the network.

Scan the QR code with the Expo Go app on your phone and the app will launch.

How to Use the App

Open the app — you will see the Login screen
Enter your credentials or tap Create Account to register
After login you will be redirected to the Chats screen
If you have no chats yet, tap the pencil icon (top right) to start a new chat
Select a user from the list to open a conversation
Type a message and hit Send — messages appear in real time on both devices


Features

User registration and login with JWT authentication
Persistent login — stays logged in after closing and reopening the app
Real-time messaging via Socket.io
Chat history loaded from MongoDB on screen open
Online/offline user status indicators
Sent messages on the right, received on the left
Auto-scroll to the latest message
Keyboard-aware input bar
New chat creation with any registered user
Custom app icon and splash screen


Submission

GitHub Repository: <your-repo-link>
Screen Recording: <your-loom-link>
Backend URL      :https://mobile-chat-app-tde5.onrender.com/health
APK File: <your-apk-download-link>
