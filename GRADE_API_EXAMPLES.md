# Grade API - REST Examples

## Base URL
```
http://localhost:5000/api/grades
```

---

## 1. CREATE Grade Record
### Request
```http
POST /api/grades
Content-Type: application/json

{
  "student": "65f1a2b3c4d5e6f7g8h9i0j1",
  "username": "john.doe",
  "userType": "student",
  "class": "10-A",
  "gradeId": "GRADE-2024-001",
  "section": "A",
  "subject": "Mathematics",
  "marksObtained": 85,
  "totalMarks": 100,
  "gradePoint": "A",
  "gradePercentage": 85,
  "examType": "final",
  "examDate": "2024-02-13",
  "remarks": "Excellent performance in final exam",
  "recordedBy": "teacher.smith"
}
```

### Response (Success)
```json
{
  "success": true,
  "message": "Grade created successfully",
  "data": {
    "_id": "65f2c3d4e5f6g7h8i9j0k1l2",
    "student": "65f1a2b3c4d5e6f7g8h9i0j1",
    "username": "john.doe",
    "userType": "student",
    "class": "10-A",
    "gradeId": "GRADE-2024-001",
    "section": "A",
    "subject": "Mathematics",
    "marksObtained": 85,
    "totalMarks": 100,
    "gradePoint": "A",
    "gradePercentage": 85,
    "examType": "final",
    "examDate": "2024-02-13T00:00:00.000Z",
    "remarks": "Excellent performance in final exam",
    "recordedBy": "teacher.smith",
    "createdAt": "2024-02-13T10:30:00.000Z",
    "updatedAt": "2024-02-13T10:30:00.000Z",
    "__v": 0
  }
}
```

---

## 2. GET All Grades
### Request
```http
GET /api/grades
```

### Response
```json
{
  "success": true,
  "data": [
    {
      "_id": "65f2c3d4e5f6g7h8i9j0k1l2",
      "username": "john.doe",
      "userType": "student",
      "class": "10-A",
      "gradeId": "GRADE-2024-001",
      "subject": "Mathematics",
      "marksObtained": 85,
      "gradePoint": "A",
      "gradePercentage": 85,
      "examType": "final"
    }
  ],
  "count": 1
}
```

---

## 3. GET Grade by ID
### Request
```http
GET /api/grades/65f2c3d4e5f6g7h8i9j0k1l2
```

### Response
```json
{
  "success": true,
  "data": {
    "_id": "65f2c3d4e5f6g7h8i9j0k1l2",
    "student": "65f1a2b3c4d5e6f7g8h9i0j1",
    "username": "john.doe",
    "userType": "student",
    "class": "10-A",
    "gradeId": "GRADE-2024-001",
    "subject": "Mathematics",
    "marksObtained": 85,
    "totalMarks": 100,
    "gradePoint": "A",
    "gradePercentage": 85,
    "examType": "final",
    "examDate": "2024-02-13T00:00:00.000Z",
    "remarks": "Excellent performance in final exam",
    "recordedBy": "teacher.smith"
  }
}
```

---

## 4. GET Grades by Username
### Request
```http
GET /api/grades/username/john.doe
```

### Response
```json
{
  "success": true,
  "data": [
    {
      "_id": "65f2c3d4e5f6g7h8i9j0k1l2",
      "username": "john.doe",
      "class": "10-A",
      "subject": "Mathematics",
      "gradePoint": "A",
      "gradePercentage": 85
    }
  ],
  "count": 1
}
```

---

## 5. GET Grades by User Type
### Request
```http
GET /api/grades/usertype/student
```

### Response
```json
{
  "success": true,
  "data": [...],
  "count": 5
}
```

---

## 6. GET Grades by Class
### Request
```http
GET /api/grades/class/10-A
```

### Response
```json
{
  "success": true,
  "data": [...],
  "count": 3
}
```

---

## 7. GET Grades by Student ID
### Request
```http
GET /api/grades/student/65f1a2b3c4d5e6f7g8h9i0j1
```

### Response
```json
{
  "success": true,
  "data": [...],
  "count": 4
}
```

---

## 8. UPDATE Grade Record
### Request
```http
PUT /api/grades/65f2c3d4e5f6g7h8i9j0k1l2
Content-Type: application/json

{
  "marksObtained": 88,
  "gradePoint": "A+",
  "gradePercentage": 88,
  "remarks": "Updated: Excellent performance",
  "recordedBy": "teacher.smith"
}
```

### Response
```json
{
  "success": true,
  "message": "Grade updated successfully",
  "data": {
    "_id": "65f2c3d4e5f6g7h8i9j0k1l2",
    "marksObtained": 88,
    "gradePoint": "A+",
    "gradePercentage": 88,
    "remarks": "Updated: Excellent performance",
    "updatedAt": "2024-02-13T11:00:00.000Z"
  }
}
```

---

## 9. DELETE Grade Record
### Request
```http
DELETE /api/grades/65f2c3d4e5f6g7h8i9j0k1l2
```

### Response
```json
{
  "success": true,
  "message": "Grade deleted successfully",
  "data": {
    "_id": "65f2c3d4e5f6g7h8i9j0k1l2",
    "username": "john.doe",
    "subject": "Mathematics"
  }
}
```

---

## Required Fields for POST Request

| Field | Type | Required | Enum/Constraints |
|-------|------|----------|------------------|
| student | ObjectId | Yes | Reference to User |
| username | String | Yes | - |
| userType | String | Yes | ['student', 'teacher', 'admin', 'parent'] |
| class | String | Yes | - |
| gradeId | String | Yes | - |
| section | String | No | - |
| subject | String | Yes | - |
| marksObtained | Number | Yes | 0-100 |
| totalMarks | Number | Yes | Default: 100, Min: 1 |
| gradePoint | String | Yes | ['A+', 'A', 'B+', 'B', 'C+', 'C', 'D', 'E', 'F'] |
| gradePercentage | Number | Yes | 0-100 |
| examType | String | Yes | ['midterm', 'final', 'unit-test', 'periodic-test', 'assignment'] |
| examDate | Date | Yes | ISO 8601 format |
| remarks | String | No | Max: 500 chars |
| recordedBy | String | Yes | - |

---

## cURL Examples

### Create Grade Record
```bash
curl -X POST http://localhost:5000/api/grades \
  -H "Content-Type: application/json" \
  -d '{
    "student": "65f1a2b3c4d5e6f7g8h9i0j1",
    "username": "john.doe",
    "userType": "student",
    "class": "10-A",
    "gradeId": "GRADE-2024-001",
    "section": "A",
    "subject": "Mathematics",
    "marksObtained": 85,
    "totalMarks": 100,
    "gradePoint": "A",
    "gradePercentage": 85,
    "examType": "final",
    "examDate": "2024-02-13",
    "remarks": "Excellent performance",
    "recordedBy": "teacher.smith"
  }'
```

### Get All Grades
```bash
curl http://localhost:5000/api/grades
```

### Get Grade by ID
```bash
curl http://localhost:5000/api/grades/65f2c3d4e5f6g7h8i9j0k1l2
```

### Update Grade
```bash
curl -X PUT http://localhost:5000/api/grades/65f2c3d4e5f6g7h8i9j0k1l2 \
  -H "Content-Type: application/json" \
  -d '{
    "marksObtained": 90,
    "gradePoint": "A+",
    "gradePercentage": 90
  }'
```

### Delete Grade
```bash
curl -X DELETE http://localhost:5000/api/grades/65f2c3d4e5f6g7h8i9j0k1l2
```
