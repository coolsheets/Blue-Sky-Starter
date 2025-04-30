# Clean-Up Recommendations

This document outlines steps to improve the clarity, consistency, and maintainability of the project by renaming files, reorganizing the folder structure, removing unused modules, and trimming redundant code.

---

## **1. File and Folder Renaming**
Renaming files and folders for clarity and consistency:

### **Client-Side**
- Rename `main.jsx` → `index.jsx` (standard entry point naming).
- Rename `App.jsx` → `App.js` (if no JSX-specific syntax is used).
- Rename `component/` → `components/` (plural for consistency).
- Rename CSS files to match their components:
  - `App.css` → `App.module.css`
  - `Navbar.css` → `Navbar.module.css`
  - `FrontPage.css` → `FrontPage.module.css`
  - `Gallery.css` → `Gallery.module.css`

### **Server-Side**
- Rename `server.js` → `index.js` (standard entry point naming).
- Rename `routes/` → `api/` (to better reflect their purpose).
- Rename route files for clarity:
  - `videos.js` → `videoRoutes.js`
  - `reactionsRoutes.js` → `reactionRoutes.js`
  - `userRoutes.js` → `authRoutes.js`
  - `frontPageRoutes.js` → `cameraRoutes.js`
  - `superHeroRoutes.js` → `superheroRoutes.js`
  - `cityRoutes.js` → `cityRoutes.js` (unchanged for clarity).

---

## **2. Folder Structure Simplification**
Reorganize the project for better readability and maintainability:

### **Proposed Structure**
```
/client
  /public
  /src
    /components
      Navbar.jsx
      Footer.jsx
      VideoReactionCard.jsx
      Login.jsx
      Register.jsx
      SharePopup.jsx
    /pages
      FrontPage.jsx
      Gallery.jsx
      SuperheroRegistry.jsx
      TrafficVideo.jsx
    App.jsx
    index.jsx
    styles/
      App.module.css
      Navbar.module.css
      FrontPage.module.css
      Gallery.module.css

/server
  /api
    videoRoutes.js
    reactionRoutes.js
    authRoutes.js
    cameraRoutes.js
    superheroRoutes.js
    cityRoutes.js
  /models
    video.js
    cameraLocations.js
    superheroes.js
    cities.js
  /controllers
    interactionControllers.js
  /utils
    db.js
  index.js

/scripts
  generateVideoIndex.js
  listCities.js
  listHeroes.js

/docs
  pre-mortem.md
  timeLapse.md
  flowChart.md
```

---

## **3. Remove Unused Modules**
Identify and remove unused or redundant files and modules:

### **Client-Side**
- Check for unused components in `/components/` (e.g., `SharePopup.jsx` if not used).
- Remove unused CSS files or styles.
- Remove any old or unused assets in `/public`.

### **Server-Side**
- Check `/routes/` for unused or redundant routes.
- Remove unused models in `/models/` (e.g., `cities.js` if not used).
- Remove old or unused utility scripts in `/utils/`.

### **Scripts**
- Remove any outdated or redundant CLI scripts in `/scripts/` (e.g., `listHeroes.js` if no longer needed).

---

## **4. Update Imports**
After renaming files and folders, update all imports to reflect the new structure. For example:

### Example: Update `main.jsx` → `index.jsx`
```javascript
import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';

ReactDOM.render(<App />, document.getElementById('root'));
```

### Example: Update `routes/videos.js` → `api/videoRoutes.js`
```javascript
import videoRoutes from './api/videoRoutes.js';
app.use('/api/videos', videoRoutes);
```

---

## **5. Add Comments and Documentation**
- Add comments to key files (e.g., `index.js`, `App.jsx`) to explain their purpose.
- Update the `README.md` file to reflect the new structure and provide instructions for running the project.

---

## **6. Test Thoroughly**
After making these changes:
1. Run the client and server to ensure everything works.
2. Test all routes and components to verify functionality.
3. Check for broken imports or missing dependencies.

---

## **7. Additional Recommendations**
- **Environment Variables**: Use `.env` files to manage environment-specific settings (e.g., API base URL, database connection string).
- **Code Linting**: Add ESLint and Prettier to enforce consistent coding standards.
- **Dependency Audit**: Run `npm audit` to identify and fix vulnerabilities in dependencies.

---

By following these recommendations, the project will be more organized, maintainable, and easier to scale.

