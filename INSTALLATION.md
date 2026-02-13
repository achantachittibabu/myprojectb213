# Backend Setup & Installation Guide

## Quick Start

### Step 1: Navigate to Backend Folder
```bash
cd backend
```

### Step 2: Copy Environment Configuration
Copy `.env.example` to `.env` and update with your settings:
```bash
copy .env.example .env
```

### Step 3: Install Dependencies
```bash
npm install
```

If you encounter issues with npm install, try:
```bash
npm install --legacy-peer-deps
```

Or clean install:
```bash
rm -r node_modules package-lock.json
npm install
```

### Step 4: Configure MongoDB

#### Option A: Local MongoDB
1. Install MongoDB from https://www.mongodb.com/try/download/community
2. Start MongoDB service
3. Update `.env`:
```env
MONGODB_URI=mongodb://localhost:27017/reactnative_app
```

#### Option B: MongoDB Atlas (Cloud)
1. Create account at https://www.mongodb.com/cloud/atlas
2. Create a cluster
3. Get connection string
4. Update `.env`:
```env
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/reactnative_app
```

### Step 5: Start the Server

#### Development Mode
```bash
npm run dev
```
Server runs with auto-reload using nodemon

#### Production Mode
```bash
npm start
```

## Project Structure

```
backend/
├── server.js              # Main server entry point
├── package.json           # Dependencies
├── .env.example           # Configuration template
├── .gitignore             # Git ignore file
├── setup.bat              # Windows setup script
├── README.md              # Full documentation
├── API_ENDPOINTS.md       # API reference
├── INSTALLATION.md        # This file
│
├── models/
│   ├── User.js           # User schema with password hashing
│   └── Product.js        # Product schema with reviews
│
├── routes/
│   ├── users.js          # User CRUD + login
│   ├── products.js       # Product CRUD + reviews
│   └── health.js         # Health check
│
└── node_modules/         # Installed dependencies
```

## Features Included

✅ Express.js server with CORS support
✅ MongoDB integration with Mongoose
✅ User authentication with bcryptjs password hashing
✅ Product management system
✅ Review system for products
✅ Input validation
✅ Error handling middleware
✅ Environment configuration
✅ Health check endpoint

## Available Scripts

```bash
npm start          # Start production server
npm run dev        # Start with nodemon (auto-reload)
npm test           # Run tests (not configured yet)
```

## Dependencies

### Production
- **express** - Web framework
- **mongoose** - MongoDB ODM
- **cors** - Cross-Origin Resource Sharing
- **body-parser** - Request body parser
- **bcryptjs** - Password hashing
- **jsonwebtoken** - JWT for authentication
- **dotenv** - Environment variables

### Development
- **nodemon** - Auto-reload on file changes

## Testing the API

### Using Postman
1. Import the API endpoints from API_ENDPOINTS.md
2. Test each endpoint with sample data

### Using cURL
```bash
# Health check
curl http://localhost:5000/api/health

# Create user
curl -X POST http://localhost:5000/api/users \
  -H "Content-Type: application/json" \
  -d '{"username":"test","email":"test@example.com","password":"pass123"}'

# Get all products
curl http://localhost:5000/api/products
```

## Environment Variables

```env
# MongoDB
MONGODB_URI=mongodb://localhost:27017/reactnative_app

# Server
PORT=5000
NODE_ENV=development

# Authentication
JWT_SECRET=your_secret_key_change_this
JWT_EXPIRE=7d

# CORS
CORS_ORIGIN=http://localhost:3000,http://localhost:8081
```

## Troubleshooting

### Port Already in Use
Error: `Error: listen EADDRINUSE: address already in use :::5000`

Solution:
```bash
# Windows - Find process using port 5000
netstat -ano | findstr :5000
taskkill /PID <PID> /F

# Or change PORT in .env to 5001
```

### MongoDB Connection Error
Error: `MongooseServerSelectionError: connection refused`

Solution:
- Ensure MongoDB is running
- Check connection string in .env
- Verify MongoDB credentials for Atlas

### npm install Issues
Try:
```bash
npm cache clean --force
npm install --legacy-peer-deps
```

## Next Steps

1. ✅ Backend API is ready
2. ⏭️ Connect React Native frontend from `app/` folder
3. ⏭️ Implement JWT authentication middleware
4. ⏭️ Add request validation
5. ⏭️ Add unit tests
6. ⏭️ Deploy to production

## API Documentation

See [API_ENDPOINTS.md](API_ENDPOINTS.md) for detailed endpoint documentation with examples.

## Support

For issues:
1. Check TROUBLESHOOTING.md in root directory
2. Review error logs in console
3. Check MongoDB connection
4. Verify .env configuration
