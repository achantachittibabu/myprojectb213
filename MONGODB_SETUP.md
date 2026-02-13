# MongoDB Setup Guide

## Local MongoDB Installation

### Windows

#### Download and Install
1. Visit https://www.mongodb.com/try/download/community
2. Select Windows, MSI
3. Download and run the installer
4. Choose "Complete" installation
5. Choose "Run MongoDB as a Windows Service" (recommended)

#### Verify Installation
```bash
mongod --version
```

#### Start MongoDB
If installed as a service, it starts automatically. Otherwise:
```bash
mongod
```

#### Connect with MongoDB Compass (GUI)
1. Download https://www.mongodb.com/products/compass
2. Open and connect to `mongodb://localhost:27017`

### macOS

```bash
# Using Homebrew
brew tap mongodb/brew
brew install mongodb-community
brew services start mongodb-community
```

### Linux (Ubuntu/Debian)

```bash
# Add MongoDB repository
wget -qO - https://www.mongodb.org/static/pgp/server-6.0.asc | sudo apt-key add -
echo "deb [ arch=amd64,arm64 ] https://repo.mongodb.org/apt/ubuntu focal/mongodb-org/6.0 multiverse" | sudo tee /etc/apt/sources.list.d/mongodb-org-6.0.list

# Install MongoDB
sudo apt-get update
sudo apt-get install -y mongodb-org

# Start MongoDB
sudo systemctl start mongod
sudo systemctl enable mongod
```

## MongoDB Atlas (Cloud)

### Setup Steps

1. **Create Account**
   - Visit https://www.mongodb.com/cloud/atlas
   - Sign up for free tier

2. **Create Organization & Project**
   - Create new organization
   - Create project (e.g., "ReactNativeApp")

3. **Create Cluster**
   - Click "Build a Cluster"
   - Choose "M0 Free" tier
   - Select your preferred region
   - Cluster will be created (takes 5-10 minutes)

4. **Add Database User**
   - Go to "Database Access"
   - Click "Add New Database User"
   - Username: (choose your own)
   - Password: (strong password)
   - Click "Add User"

5. **Add IP Whitelist**
   - Go to "Network Access"
   - Click "Add IP Address"
   - For development: "Allow access from anywhere" (0.0.0.0/0)
   - For production: Add your server IP

6. **Get Connection String**
   - Go to "Clusters" → "Connect"
   - Click "Connect Your Application"
   - Copy connection string
   - Replace `<password>` with your database user password
   - Replace `myFirstDatabase` with `reactnative_app`

### Connection String Format

```
mongodb+srv://username:password@cluster.mongodb.net/reactnative_app?retryWrites=true&w=majority
```

### Update .env

```env
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/reactnative_app
```

## Connection Testing

### Using Node.js
```bash
node -e "const m=require('mongoose');m.connect('mongodb://localhost:27017/test').then(()=>console.log('Connected!')).catch(e=>console.log('Error:',e.message))"
```

### Using MongoDB Compass
1. Download MongoDB Compass from https://www.mongodb.com/products/compass
2. Enter connection string
3. Click "Connect"

### Using Command Line
```bash
# Local
mongosh mongodb://localhost:27017

# Atlas
mongosh "mongodb+srv://username:password@cluster.mongodb.net/reactnative_app"
```

## MongoDB Basic Commands

```bash
# Connect to database
mongosh mongodb://localhost:27017

# List databases
show dbs

# Use specific database
use reactnative_app

# List collections
show collections

# View data in collection
db.users.find()

# Count documents
db.users.countDocuments()

# Clear collection
db.users.deleteMany({})
```

## Mongoose Connection Settings

The backend uses Mongoose with these settings:

```javascript
mongoose.connect(MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
```

## Database Models

### Users Collection
- username (unique, required)
- email (unique, required)
- password (hashed, required)
- firstName, lastName, phone
- isActive, role
- timestamps (createdAt, updatedAt)

### Products Collection
- name (required)
- description
- price (required)
- category
- stock
- sku (unique)
- image
- isActive
- rating
- reviews array
- timestamps (createdAt, updatedAt)

## Best Practices

✅ Always keep MongoDB URI in .env file
✅ Use environment-specific connection strings
✅ Implement proper error handling
✅ Monitor connection pool
✅ Use meaningful collection names
✅ Create indexes for frequently queried fields
✅ Regular backups for production data

❌ Don't expose connection strings in code
❌ Don't use admin credentials for application
❌ Don't skip MongoDB security configuration
❌ Don't hardcode database names

## Monitoring

### MongoDB Compass (Local/Atlas)
- Visual database explorer
- Query builder
- Real-time statistics
- Document editor

### MongoDB Atlas UI
- Cluster monitoring
- Error logs
- Performance insights
- Backup management

## Backup & Recovery

### Local MongoDB
```bash
# Backup
mongodump --db reactnative_app --out ./backup

# Restore
mongorestore ./backup
```

### MongoDB Atlas
- Automatic daily backups included
- Manual snapshots available
- Point-in-time recovery
- Restore to new cluster

## Performance Tips

1. **Create Indexes**
   ```javascript
   // In model files
   userSchema.index({ email: 1 });
   productSchema.index({ category: 1, price: 1 });
   ```

2. **Connection Pooling**
   - Already configured in mongoose
   - Default: 100 connections

3. **Query Optimization**
   - Use projection to select fields
   - Limit results when possible
   - Create compound indexes for common queries

## Troubleshooting

### Connection Refused
- Ensure MongoDB is running
- Check connection string
- Verify firewall settings

### Authentication Failed
- Verify username/password
- Check encoding of special characters
- Ensure user has access to database

### Slow Queries
- Create appropriate indexes
- Use MongoDB explain() to analyze
- Check connection pool usage

## Resources

- MongoDB Documentation: https://docs.mongodb.com/
- Mongoose Documentation: https://mongoosejs.com/
- MongoDB University: https://university.mongodb.com/
