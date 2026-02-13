# Frontend Integration Guide

## Connecting React Native Frontend to Backend API

This guide explains how to connect the React Native app to the backend API.

## Backend URL

Update the API base URL in your React Native app:

```
http://localhost:5000/api
```

For production, use your deployed backend URL.

## API Integration Examples

### 1. User Authentication

#### Login
```javascript
// In your React Native app
const login = async (email, password) => {
  try {
    const response = await fetch('http://localhost:5000/api/users/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        email,
        password
      })
    });

    const data = await response.json();
    if (data.success) {
      // Store user data and token
      await AsyncStorage.setItem('user', JSON.stringify(data.data));
      return data.data;
    } else {
      throw new Error(data.message);
    }
  } catch (error) {
    console.error('Login error:', error);
  }
};
```

#### Register
```javascript
const register = async (userDetails) => {
  try {
    const response = await fetch('http://localhost:5000/api/users', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(userDetails)
    });

    const data = await response.json();
    if (data.success) {
      return data.data;
    } else {
      throw new Error(data.message);
    }
  } catch (error) {
    console.error('Registration error:', error);
  }
};
```

### 2. Product Fetching

#### Get All Products
```javascript
const getAllProducts = async () => {
  try {
    const response = await fetch('http://localhost:5000/api/products');
    const data = await response.json();
    if (data.success) {
      return data.data;
    }
  } catch (error) {
    console.error('Error fetching products:', error);
  }
};
```

#### Search Products
```javascript
const searchProducts = async (searchTerm, minPrice, maxPrice) => {
  try {
    const query = new URLSearchParams({
      search: searchTerm,
      minPrice,
      maxPrice
    });

    const response = await fetch(
      `http://localhost:5000/api/products?${query}`
    );
    const data = await response.json();
    return data.data;
  } catch (error) {
    console.error('Error searching products:', error);
  }
};
```

#### Get Product Details
```javascript
const getProductDetails = async (productId) => {
  try {
    const response = await fetch(
      `http://localhost:5000/api/products/${productId}`
    );
    const data = await response.json();
    if (data.success) {
      return data.data;
    }
  } catch (error) {
    console.error('Error fetching product details:', error);
  }
};
```

### 3. User Profile

#### Get User Profile
```javascript
const getUserProfile = async (userId) => {
  try {
    const response = await fetch(
      `http://localhost:5000/api/users/${userId}`
    );
    const data = await response.json();
    if (data.success) {
      return data.data;
    }
  } catch (error) {
    console.error('Error fetching user profile:', error);
  }
};
```

#### Update Profile
```javascript
const updateProfile = async (userId, updates) => {
  try {
    const response = await fetch(
      `http://localhost:5000/api/users/${userId}`,
      {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(updates)
      }
    );

    const data = await response.json();
    if (data.success) {
      return data.data;
    }
  } catch (error) {
    console.error('Error updating profile:', error);
  }
};
```

### 4. Product Reviews

#### Add Review
```javascript
const addReview = async (productId, review) => {
  try {
    const response = await fetch(
      `http://localhost:5000/api/products/${productId}/reviews`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          userId: currentUserId,
          comment: review.comment,
          rating: review.rating
        })
      }
    );

    const data = await response.json();
    if (data.success) {
      return data.data;
    }
  } catch (error) {
    console.error('Error adding review:', error);
  }
};
```

## API Service Layer

Create a service file in your React Native app for cleaner code:

```javascript
// services/ApiService.js
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

const API_BASE_URL = 'http://localhost:5000/api';

const apiClient = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json'
  }
});

// Add token to requests
apiClient.interceptors.request.use(
  async (config) => {
    const token = await AsyncStorage.getItem('authToken');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Handle responses
apiClient.interceptors.response.use(
  (response) => response.data,
  (error) => {
    if (error.response?.status === 401) {
      // Handle unauthorized
      AsyncStorage.removeItem('authToken');
      // Redirect to login
    }
    return Promise.reject(error);
  }
);

export default apiClient;
```

## Environment Configuration

Create environment-specific configuration:

```javascript
// config/api.js
const API_BASE_URL = __DEV__
  ? 'http://localhost:5000/api'  // Development
  : 'https://api.example.com/api'; // Production

export default {
  API_BASE_URL,
  TIMEOUT: 10000
};
```

## Error Handling

```javascript
const handleApiError = (error) => {
  if (error.response) {
    // Server responded with error status
    console.error('Error:', error.response.data.message);
  } else if (error.request) {
    // Request made but no response
    console.error('Network error:', error.message);
  } else {
    // Error setting up request
    console.error('Error:', error.message);
  }
};
```

## Testing the Integration

### 1. Check Backend is Running
```bash
cd backend
npm run dev
```

### 2. Test Endpoints with Postman
- Import endpoints from API_ENDPOINTS.md
- Test CRUD operations

### 3. Test from React Native
- Use your API service functions
- Check network requests in debugger
- Verify responses in console logs

## Network Configuration

### iOS (Info.plist)
Add insecure domain for development:
```xml
<key>NSAppTransportSecurity</key>
<dict>
  <key>NSExceptionDomains</key>
  <dict>
    <key>localhost</key>
    <dict>
      <key>NSIncludesSubdomains</key>
      <true/>
      <key>NSTemporaryExceptionAllowsInsecureHTTPLoads</key>
      <true/>
    </dict>
  </dict>
</dict>
```

### Android (AndroidManifest.xml)
```xml
<uses-permission android:name="android.permission.INTERNET" />
```

## Common Issues

### CORS Error
Solution: CORS is already configured in backend. If error persists:
1. Check CORS_ORIGIN in backend .env
2. Verify frontend origin matches

### Connection Refused
- Ensure backend is running
- Check backend URL in frontend config
- Verify port 5000 is accessible

### Timeout Error
- Increase timeout in API client
- Check network connectivity
- Verify backend response time

## Production Deployment

1. **Update API URL**
   - Change to deployed backend URL
   - Use environment variables

2. **Enable HTTPS**
   - Backend should use HTTPS in production
   - Update CORS configuration

3. **Implement Authentication**
   - Use JWT tokens
   - Refresh tokens implementation
   - Secure token storage

4. **Error Logging**
   - Implement error tracking (Sentry, LogRocket)
   - Monitor API performance

## Resources

- React Native Documentation: https://reactnative.dev/
- Fetch API: https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API
- Axios: https://axios-http.com/
- AsyncStorage: https://react-native-async-storage.github.io/async-storage/
