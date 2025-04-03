# Samvaad - Real-time Chat Application

![Samvaad Logo](https://via.placeholder.com/200x80?text=Samvaad)

Samvaad is a real-time chat application built with React Native and Firebase, allowing users to connect and communicate seamlessly. The name "Samvaad" derives from Sanskrit, meaning "conversation" or "dialogue."

## Features

- 🔐 User authentication
- 👤 User profiles with avatars
- 💬 Real-time messaging
- 🔍 User search functionality
- 🌓 Dark/light theme support
- 📱 Cross-platform (iOS and Android)

## Tech Stack

- **Frontend:** React Native, React Native Paper
- **State Management:** Zustand, Redux (for theme)
- **Backend & Database:** Firebase (Authentication, Firestore)
- **Navigation:** React Navigation

## Screenshots

<div style="display: flex; flex-direction: row; flex-wrap: wrap; gap: 10px; justify-content: center;">
  <img src="https://via.placeholder.com/200x400?text=Login" alt="Login Screen" width="200"/>
  <img src="https://via.placeholder.com/200x400?text=Chat+List" alt="Chat List Screen" width="200"/>
  <img src="https://via.placeholder.com/200x400?text=Chat" alt="Chat Screen" width="200"/>
</div>

## Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/samvaad.git
   cd samvaad
   ```

2. Install dependencies:
   ```bash
   npm install
   # or
   yarn install
   ```

3. Create a `.env` file in the root directory with your Firebase config:
   ```
   API_KEY=your_api_key
   AUTH_DOMAIN=your_auth_domain
   PROJECT_ID=your_project_id
   STORAGE_BUCKET=your_storage_bucket
   MESSAGING_SENDER_ID=your_messaging_sender_id
   APP_ID=your_app_id
   ```

4. Start the development server:
   ```bash
   npm start
   # or
   yarn start
   ```

5. Run on iOS or Android:
   ```bash
   # For iOS
   npm run ios
   # or
   yarn ios

   # For Android
   npm run android
   # or
   yarn android
   ```

## Project Structure

```
samvaad/
├── assets/              # Images, fonts, etc.
├── components/          # Reusable components
├── firebase/            # Firebase config and services
├── global/              # Global state management
│   ├── useAuthStore.js  # Authentication state
│   ├── useChatStore.js  # Chat messages state
│   └── useUserStore.js  # User data state
├── navigation/          # Navigation setup
├── screens/             # App screens
│   ├── AuthScreen.js
│   ├── ChatListScreen.js
│   ├── ChatScreen.js
│   └── ...
└── App.js               # Entry point
```

## Firebase Setup

1. Create a new Firebase project
2. Enable Authentication (Email/Password)
3. Set up Firestore Database with the following collections:
   - `users`: Store user information
   - `messages`: Store chat messages

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request


## Acknowledgments

- [React Native](https://reactnative.dev/)
- [Firebase](https://firebase.google.com/)
- [React Native Paper](https://callstack.github.io/react-native-paper/)
- [Zustand](https://github.com/pmndrs/zustand)

## Contact

Project Link: [https://github.com/nishu-02/Samvaad]

---
