# Project Overview

This document provides a detailed explanation of the project structure, including workspace information, file/component/module links, and a comparison of development mode versus build mode.

---

## **Workspace Information**

The project is organized into two main directories:
- **`client/`**: Contains the React frontend application.
- **`server/`**: Contains the Express backend application.

The frontend and backend are connected via API routes, with the backend serving as the data provider and the frontend handling user interactions.

---

## **Client-Side Files and Components**

### **Core Files**
- **`vite.config.js`**: Configures Vite with React and sets up a proxy for `/api` requests to `http://localhost:3000`.
- **`index.html`**: Entry point for the client application.
- **`main.jsx`**: Renders the root React component (`App`).
- **`App.jsx`**: Main application component, includes routes for:
  - **FrontPage**
  - **Gallery**
  - **SuperheroRegistry**
  - **TrafficVideo**

### **Components**
- **`Navbar.jsx`**: Navigation bar component.
- **`Footer.jsx`**: Footer component.
- **`FrontPage.jsx`**: Displays the homepage with top-liked videos and modals for login and registration.
- **`Gallery.jsx`**: Displays a gallery of videos with lazy loading and a modal for video reactions.
- **`SuperheroRegistry.jsx`**: Allows users to register superheroes.
- **`TrafficVideo.jsx`**: Displays a traffic camera time-lapse video.
- **`component/VideoReactionCard.jsx`**: Handles video reactions (likes, comments, ratings, etc.).
- **`component/Login.jsx`**: Login form component.
- **`component/Register.jsx`**: Registration form component.
- **`component/SharePopup.jsx`**: Popup for sharing videos on social media.

### **Styles**
- **`App.css`**: Styles for the main application.
- **`Navbar.css`**: Styles for the navigation bar.
- **`FrontPage.css`**: Styles for the front page.
- **`Gallery.css`**: Styles for the gallery page.

---

## **Server-Side Files and Modules**

### **Core Files**
- **`server.js`**: Main server file, sets up routes and middleware.
- **`db.js`**: Handles database connection.

### **Routes**
- **`routes/videos.js`**: Routes for video-related operations.
- **`routes/reactionsRoutes.js`**: Routes for handling video reactions.
- **`routes/userRoutes.js`**: Routes for user authentication and management.
- **`routes/frontPageRoutes.js`**: Routes for front page data.
- **`routes/cameraLocations.js`**: Routes for camera location data.
- **`routes/superHeroRoutes.js`**: Routes for superhero data.
- **`routes/cityRoutes.js`**: Routes for city data.

### **Models**
- **`models/video.js`**: Mongoose model for videos.
- **`models/cameralocations.js`**: Mongoose model for camera locations.
- **`models/superheroes.js`**: Mongoose model for superheroes.
- **`models/cities.js`**: Mongoose model for cities.

### **Controllers**
- **`controllers/interactionsControllers.js`**: Handles interactions like likes, comments, and ratings.

### **CLI Scripts**
- **`cli/generateVideoIndex.js`**: CLI script to generate a JSON index of videos.
- **`cli/listCities.js`**: CLI script to list all cities.
- **`cli/listHeroes.js`**: CLI script to list all superheroes.

---

## **Utility and Miscellaneous**

- **`TonyO/pullTrafficCamerasAPI.js`**: Script to fetch and save traffic camera images.
- **`docs/001_Project/pre-mortem.md`**: Pre-mortem document for the project.
- **`timeLapse.md`**: Instructions for renaming time-lapse images and generating a JSON index.
- **`flowChart.md`**: Project flowchart in Mermaid syntax.

---

## **Important Settings**

### **Frontend**
- **Proxy Configuration**: In `vite.config.js`, API requests to `/api` and `/users` are proxied to `http://localhost:3000` during development.
- **Build Output**: The build output is configured to be placed in `../server/public` for integration with the backend.

### **Backend**
- **Static File Serving**: The backend serves static files from the `public` directory.
- **Database Connection**: The database connection is handled in `db.js` using Mongoose.

---

## **Development Mode vs. Build Mode**

### **Development Mode**
- **Frontend**: The Vite dev server runs on `http://localhost:5173` and proxies API requests to the backend (`http://localhost:3000`).
- **Backend**: The backend runs on `http://localhost:3000` and serves API routes and static files.
- **Hot Module Replacement (HMR)**: Enabled in development for faster frontend updates.

### **Build Mode**
- **Frontend**: The React app is built using Vite, and the output is placed in `server/public`.
- **Backend**: The backend serves the static files from `server/public` and handles API requests.
- **No Proxy**: In build mode, the frontend directly communicates with the backend without a proxy.

---

This structure ensures a clear separation of concerns while allowing seamless integration between the frontend and backend. Let me know if you need further clarification or additional details!