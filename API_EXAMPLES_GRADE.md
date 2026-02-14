# Grade API - REST Request Examples

## Base URL
```
http://localhost:5000/api/grades
```

---

## 1. CREATE Grade Record (POST)

### Request
```http
POST http://localhost:5000/api/grades
Content-Type: application/json
```

### Required Fields Request Body
```json
{
  "username": "john_student",
  "userType": "student",
  "class": "10-A",
  "subject": "Mathematics",
  "marksObtained": 85,
  "gradePoint": "A",
  "gradePercentage": 85,
  "examType": "final",
  "examDate": "2026-02-10"
}
```

### Full Request Body (with all optional fields)
```json
{
  "student": "507f1f77bcf86cd799439011",
  "username": "john_student",
  "userType": "student",
  "class": "10-A",
  "section": "Section-1",
  "subject": "Mathematics",
  "marksObtained": 85,
  "totalMarks": 100,
  "gradePoint": "A",
  "gradePercentage": 85,
  "examType": "final",
  "examDate": "2026-02-10",
  "remarks": "Excellent performance in final exam",
  "recordedBy": "teacher_admin"
}
```

### Success Response (201 Created)
```json
{
  "success": true,
  "message": "Grade created successfully",
  "data": {
    "_id": "507f1f77bcf86cd799439015",
    "student": "507f1f77bcf86cd799439011",
    "username": "john_student",
    "userType": "student",
    "class": "10-A",
    "section": "Section-1",
    "subject": "Mathematics",
    "marksObtained": 85,
    "totalMarks": 100,
    "gradePoint": "A",
    "gradePercentage": 85,
    "examType": "final",
    "examDate": "2026-02-10T00:00:00.000Z",
    "remarks": "Excellent performance in final exam",
    "recordedBy": "teacher_admin",
    "createdAt": "2026-02-13T10:30:45.123Z",
    "updatedAt": "2026-02-13T10:30:45.123Z"
  }
}
```

### Error Response (400 Bad Request)
```json
{
  "success": false,
  "message": "Please provide all required fields"
}
```

---

## 2. GET All Grades (GET)

### Request
```http
GET http://localhost:5000/api/grades
```

### Success Response (200 OK)
```json
{
  "success": true,
  "data": [
    {
      "_id": "507f1f77bcf86cd799439015",
      "student": {
        "_id": "507f1f77bcf86cd799439011",
        "username": "john_student",
        "email": "john@example.com"
      },
      "username": "john_student",
      "userType": "student",
      "class": "10-A",
      "section": "Section-1",
      "subject": "Mathematics",
      "marksObtained": 85,
      "totalMarks": 100,
      "gradePoint": "A",
      "gradePercentage": 85,
      "examType": "final",
      "examDate": "2026-02-10T00:00:00.000Z",
      "remarks": "Excellent performance",
      "recordedBy": "teacher_admin",
      "createdAt": "2026-02-13T10:30:45.123Z",
      "updatedAt": "2026-02-13T10:30:45.123Z"
    }
  ],
  "count": 1
}
```

---

## 3. GET Grade by ID (GET)

### Request
```http
GET http://localhost:5000/api/grades/507f1f77bcf86cd799439015
```

### Success Response (200 OK)
```json
{
  "success": true,
  "data": {
    "_id": "507f1f77bcf86cd799439015",
    "student": {
      "_id": "507f1f77bcf86cd799439011",
      "username": "john_student",
      "email": "john@example.com"
    },
    "username": "john_student",
    "userType": "student",
    "class": "10-A",
    "section": "Section-1",
    "subject": "Mathematics",
    "marksObtained": 85,
    "totalMarks": 100,
    "gradePoint": "A",
    "gradePercentage": 85,
    "examType": "final",
    "examDate": "2026-02-10T00:00:00.000Z",
    "remarks": "Excellent performance",
    "recordedBy": "teacher_admin",
    "createdAt": "2026-02-13T10:30:45.123Z",
    "updatedAt": "2026-02-13T10:30:45.123Z"
  }
}
```

---

## 4. GET Grades by Username (GET)

### Request
```http
GET http://localhost:5000/api/grades/username/john_student
```

### Success Response (200 OK)
```json
{
  "success": true,
  "data": [
    {
      "_id": "507f1f77bcf86cd799439015",
      "username": "john_student",
      "userType": "student",
      "class": "10-A",
      "subject": "Mathematics",
      "marksObtained": 85,
      "gradePoint": "A",
      "gradePercentage": 85,
      "examType": "final",
      "examDate": "2026-02-10T00:00:00.000Z"
    }
  ],
  "count": 1
}
```

---

## 5. GET Grades by User Type (GET)

### Request
```http
GET http://localhost:5000/api/grades/usertype/student
```

### Success Response (200 OK)
```json
{
  "success": true,
  "data": [
    {
      "_id": "507f1f77bcf86cd799439015",
      "username": "john_student",
      "userType": "student",
      "class": "10-A",
      "subject": "Mathematics",
      "marksObtained": 85,
      "gradePoint": "A"
    }
  ],
  "count": 1
}
```

---

## 6. GET Grades by Class (GET)

### Request
```http
GET http://localhost:5000/api/grades/class/10-A
```

### Success Response (200 OK)
```json
{
  "success": true,
  "data": [
    {
      "_id": "507f1f77bcf86cd799439015",
      "username": "john_student",
      "userType": "student",
      "class": "10-A",
      "subject": "Mathematics",
      "marksObtained": 85,
      "gradePoint": "A"
    }
  ],
  "count": 1
}
```

---

## 7. UPDATE Grade by ID (PUT)

### Request
```http
PUT http://localhost:5000/api/grades/507f1f77bcf86cd799439015
Content-Type: application/json
```

### Request Body
```json
{
  "marksObtained": 90,
  "gradePoint": "A+",
  "gradePercentage": 90,
  "remarks": "Updated - Exceptional performance",
  "recordedBy": "teacher_admin_updated"
}
```

### Success Response (200 OK)
```json
{
  "success": true,
  "message": "Grade updated successfully",
  "data": {
    "_id": "507f1f77bcf86cd799439015",
    "student": "507f1f77bcf86cd799439011",
    "username": "john_student",
    "userType": "student",
    "class": "10-A",
    "section": "Section-1",
    "subject": "Mathematics",
    "marksObtained": 90,
    "totalMarks": 100,
    "gradePoint": "A+",
    "gradePercentage": 90,
    "examType": "final",
    "examDate": "2026-02-10T00:00:00.000Z",
    "remarks": "Updated - Exceptional performance",
    "recordedBy": "teacher_admin_updated",
    "createdAt": "2026-02-13T10:30:45.123Z",
    "updatedAt": "2026-02-13T11:45:23.456Z"
  }
}
```

---

## 8. DELETE Grade by ID (DELETE)

### Request
```http
DELETE http://localhost:5000/api/grades/507f1f77bcf86cd799439015
```

### Success Response (200 OK)
```json
{
  "success": true,
  "message": "Grade deleted successfully",
  "data": {
    "_id": "507f1f77bcf86cd799439015",
    "username": "john_student",
    "userType": "student",
    "class": "10-A",
    "subject": "Mathematics",
    "marksObtained": 90,
    "gradePoint": "A+"
  }
}
```

---

## Field Reference

| Field | Type | Required | Enum Values | Description |
|-------|------|----------|-------------|-------------|
| student | ObjectId | No | - | Reference to User MongoDB ID |
| username | String | Yes | - | Username of the student |
| userType | String | Yes | student, teacher, admin, parent | Type of user |
| class | String | Yes | - | Class name (e.g., 10-A, 9-B) |
| section | String | No | - | Section/Division name |
| subject | String | Yes | - | Subject name |
| marksObtained | Number | Yes | 0-100 | Marks obtained by student |
| totalMarks | Number | No | Default: 100 | Total marks for the exam |
| gradePoint | String | Yes | A+, A, B+, B, C+, C, D, E, F | Letter grade |
| gradePercentage | Number | Yes | 0-100 | Percentage score |
| examType | String | Yes | midterm, final, unit-test, periodic-test, assignment | Type of examination |
| examDate | Date | Yes | - | Date of the exam (ISO 8601 format) |
| remarks | String | No | Max 500 chars | Additional comments |
| recordedBy | String | Yes | - | Name of person recording the grade |

---

## Example: Creating Multiple Grade Records

```bash
# Create grade for Mathematics
curl -X POST http://localhost:5000/api/grades \
  -H "Content-Type: application/json" \
  -d '{
    "username": "john_student",
    "userType": "student",
    "class": "10-A",
    "subject": "Mathematics",
    "marksObtained": 85,
    "gradePoint": "A",
    "gradePercentage": 85,
    "examType": "final",
    "examDate": "2026-02-10",
    "recordedBy": "teacher_admin"
  }'

# Create grade for English
curl -X POST http://localhost:5000/api/grades \
  -H "Content-Type: application/json" \
  -d '{
    "username": "john_student",
    "userType": "student",
    "class": "10-A",
    "subject": "English",
    "marksObtained": 78,
    "gradePoint": "B+",
    "gradePercentage": 78,
    "examType": "final",
    "examDate": "2026-02-11",
    "recordedBy": "teacher_admin"
  }'
```
