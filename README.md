# Real-Time Chat App

This is a real-time chat application built using **React (frontend)** and **Node.js with Socket.IO (backend)**. This project was created as part of a coding challenge to demonstrate my understanding of full-stack development and real-time communication.

### Author
Maddison Kiefer

## Features

- Real-time messaging with Socket.IO
- TypeScript support
- Modular folder structure
- Basic UI for sending/receiving messages

## Technologies Used

- Frontend: React, TypeScript, HTML, CSS
- Backend: Node.js, Express, Socket.IO

## Getting Started

### Prerequisites

- Node.js installed
- Git installed

### Installation

1. Clone the repo:

- git clone https://github.com/mkiefer3711/realtime-chat-app.git
- cd realtime-chat-app
- Install dependencies and start the backend:

2. cd chat-backend
- npm install
- npm run dev

3. Open a new terminal, go to the frontend, and run it:
- cd chat-frontend
- npm install
- npm start
- Visit http://localhost:3000 in your browser.

### Notes
- This project uses simple username-based auth via localStorage. With more time, this would be replaced with OAuth (e.g., Google/MS login) for secure authentication.

### Future Improvements
- Persistent Chat History: Integrate a database (e.g., MongoDB or PostgreSQL) to store and retrieve past messages.
- User Authentication: Implement secure login via OAuth (Google, GitHub, etc.) instead of localStorage-based usernames.
- Responsive Design: Enhance UI to support mobile and tablet views.
- Typing Indicators: Show when a user is typing in the chat.
- Online Users List: Display a list of connected/active users.
- Error Handling: Improve frontend/backend error handling and user feedback.
- Unit & Integration Tests: Add tests using tools like Jest and React Testing Library.
