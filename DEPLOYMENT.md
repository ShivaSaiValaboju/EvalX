# Deployment Instructions for Render/Railway

1. Push your code to a GitHub repository.
2. Go to Render.com or Railway.app and create a new Web Service.
3. Connect your GitHub repo and select this project.
4. Set environment variables in the dashboard:
   - PORT
   - MONGO_URI
   - JWT_SECRET
   - CLOUDINARY_CLOUD_NAME
   - CLOUDINARY_API_KEY
   - CLOUDINARY_API_SECRET
5. Ensure your `Procfile` is present with: `web: node server.js`
6. Click Deploy. Your API will be live at the provided URL.

## Example Environment Variables
```
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret
```

## Health Check
- Test `/api/auth/login` and `/api/exams` endpoints to verify deployment.
