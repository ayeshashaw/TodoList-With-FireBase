# Todo List React Application

## Overview
A modern Todo List application built with React and Firebase, providing real-time data synchronization

## Tech Stack
- React - Frontend library
- Vite - Build tool and development server
- Firebase - Backend and Authentication
  - Firestore - Database
  - Firebase Auth - User Authentication
- CSS - Styling

## Prerequisites
1. Node.js installed on your system
2. Firebase account and project setup
3. npm or yarn package manager

## Firebase Setup
1. Create a Firebase project at [Firebase Console](https://console.firebase.google.com/)
2. Enable Firestore Database and Authentication services
3. Configure your Firebase credentials in `src/firebase/config.js`

## Project Structure
```
├── src/
│   ├── components/     # React components
│   ├── context/        # React context
│   ├── assets/         # Static assets
│   ├── firebase/       # Firebase configuration
│   ├── App.jsx         # Main App component
│   └── main.jsx        # Application entry point
├── public/             # Public static files
└── index.html          # HTML entry point
```

## Installation
1. Clone the repository
2. Install dependencies:
```bash
npm install
```

## Firebase Configuration
The application uses Firebase for backend services. The configuration is located in `src/firebase/config.js`. Make sure to update it with your Firebase project credentials:

```javascript
const firebaseConfig = {
  databaseURL: "your-database-url",
  projectId: "your-project-id"
  // Add other Firebase config options as needed
};
```

## Available Scripts
- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build

## Features
- Real-time data synchronization with Firebase
- User authentication
- Todo CRUD operations
- Responsive design

## Development
To start the development server:
```bash
npm run dev
```

## Building for Production
To create a production build:
```bash
npm run build
```

## License
MIT
