# Steps to Debug and Fix: 403 Forbidden Error in Build Mode

This document outlines the steps to debug and resolve the `403 Forbidden` error encountered when trying to like a video in the build mode of the application.

---

## **Error Summary**

- **Error**: `PUT http://0.0.0.0:3000/api/videos/003.mp4/like 403 (Forbidden)`
- **Cause**: The server is rejecting the request due to missing or invalid authentication, incorrect API URL, or misconfigured backend routes.

---

## **Steps to Debug and Fix**

### **1. Verify Backend Authentication Middleware**
- Ensure the backend route for `PUT /api/videos/:videoId/like` is protected by an authentication middleware.
- Example middleware:
  ```javascript
  const authenticateToken = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];

    if (!token) return res.status(403).json({ message: 'Forbidden: No token provided' });

    jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
      if (err) return res.status(403).json({ message: 'Forbidden: Invalid token' });
      req.user = user;
      next();
    });
  };
  ```

- Ensure the middleware is applied to the route:
  ```javascript
  router.put("/:videoId/like", authenticateToken, async (req, res) => {
    // Route logic
  });
  ```

---

### **2. Check Frontend API Requests**
- Ensure the frontend sends the `Authorization` header with a valid token:
  ```javascript
  const handleLike = async (videoId, userId) => {
    try {
      const token = localStorage.getItem("token");
      const response = await fetch(`/api/videos/${videoId}/like`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`,
        },
        body: JSON.stringify({ userId }),
      });

      if (!response.ok) {
        throw new Error("Failed to like");
      }

      console.log("Video liked successfully");
    } catch (error) {
      console.error("Error liking video:", error);
    }
  };
  ```

- Verify that the token is valid and not expired.

---

### **3. Fix the Hostname**
- The request is being sent to `http://0.0.0.0:3000`, which is not a valid hostname for production.
- Update the frontend to use the correct backend URL:
  - Add a `.env` file in the frontend:
    ```env
    VITE_API_BASE_URL=http://localhost:3000
    ```
  - Update the API calls in the frontend to use the environment variable:
    ```javascript
    const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

    const handleLike = async (videoId, userId) => {
      try {
        const token = localStorage.getItem("token");
        const response = await fetch(`${API_BASE_URL}/api/videos/${videoId}/like`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`,
          },
          body: JSON.stringify({ userId }),
        });

        if (!response.ok) {
          throw new Error("Failed to like");
        }

        console.log("Video liked successfully");
      } catch (error) {
        console.error("Error liking video:", error);
      }
    };
    ```

---

### **4. Test Backend Route**
- Use a tool like Postman or `curl` to test the backend route directly:
  ```bash
  curl -X PUT http://localhost:3000/api/videos/003/like \
    -H "Content-Type: application/json" \
    -H "Authorization: Bearer <your-token>" \
    -d '{"userId": "12345"}'
  ```
- If this fails, check the backend logs for errors.

---

### **5. Check Backend Logs**
- Run the backend server and check the logs when the `PUT` request is made. Look for:
  - Missing or invalid token.
  - Authorization errors.
  - Route not being hit.

---

### **6. Verify Static File Serving**
- If the backend is serving static files (e.g., videos), ensure it does not conflict with API routes. For example:
  ```javascript
  app.use(express.static("public"));
  app.use("/api/videos", videosRoute);
  ```

---

## **Summary of Fixes**
1. **Authentication**:
   - Ensure the frontend sends the `Authorization` header with a valid token.
   - Verify the backend's `authenticateToken` middleware is applied to the route.

2. **Hostname**:
   - Replace `0.0.0.0` with the correct backend URL (e.g., `http://localhost:3000`).

3. **Frontend API Calls**:
   - Use environment variables to configure the API base URL.

4. **Backend Route**:
   - Test the `PUT /api/videos/:videoId/like` route directly using Postman or `curl`.

5. **Static File Conflicts**:
   - Ensure static file serving does not conflict with API routes.

---

Let me know if further assistance is needed!
