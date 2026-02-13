# API Endpoints Reference

## Quick Test Commands

### Using cURL

#### Health Check
```bash
curl http://localhost:5000/api/health
```

#### Create User
```bash
curl -X POST http://localhost:5000/api/users \
  -H "Content-Type: application/json" \
  -d '{
    "username": "john_doe",
    "email": "john@example.com",
    "password": "password123",
    "firstName": "John",
    "lastName": "Doe",
    "phone": "1234567890"
  }'
```

#### Login
```bash
curl -X POST http://localhost:5000/api/users/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "john@example.com",
    "password": "password123"
  }'
```

#### Get All Users
```bash
curl http://localhost:5000/api/users
```

#### Create Product
```bash
curl -X POST http://localhost:5000/api/products \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Laptop",
    "description": "High performance laptop",
    "price": 999.99,
    "category": "Electronics",
    "stock": 50,
    "sku": "LAPTOP-001",
    "image": "https://example.com/laptop.jpg"
  }'
```

#### Get All Products
```bash
curl http://localhost:5000/api/products
```

#### Search Products
```bash
curl "http://localhost:5000/api/products?search=laptop&minPrice=500&maxPrice=1500"
```

#### Add Product Review
```bash
curl -X POST http://localhost:5000/api/products/{product_id}/reviews \
  -H "Content-Type: application/json" \
  -d '{
    "userId": "user_id_here",
    "comment": "Great product!",
    "rating": 5
  }'
```

## Response Formats

### Success Response
```json
{
  "success": true,
  "message": "Operation successful",
  "data": { /* Object or Array */ },
  "count": 10
}
```

### Error Response
```json
{
  "success": false,
  "message": "Error description"
}
```

## Sample Data for Testing

### User Sample
```json
{
  "username": "testuser",
  "email": "test@example.com",
  "password": "Test123!",
  "firstName": "Test",
  "lastName": "User",
  "phone": "9876543210"
}
```

### Product Sample
```json
{
  "name": "Wireless Headphones",
  "description": "Premium noise-cancelling headphones",
  "price": 299.99,
  "category": "Electronics",
  "stock": 100,
  "sku": "WH-001",
  "image": "https://example.com/headphones.jpg"
}
```

## HTTP Status Codes
- 200: OK - Request successful
- 201: Created - Resource created successfully
- 400: Bad Request - Invalid input
- 401: Unauthorized - Authentication failed
- 404: Not Found - Resource not found
- 500: Internal Server Error - Server error

## Important Notes
- All passwords are hashed using bcryptjs
- User passwords are not returned in GET requests
- Timestamps are automatically added to all records
- Email and username must be unique
- Prices must be non-negative numbers
