# REST API Axios Examples for All Modules

## Base URL
```
http://localhost:5000/api
```

---

## 1. Timetable APIs

### Create Timetable
```javascript
axios.post('/timetable', {
  username: 'teacher123',
  userType: 'teacher',
  class: '10A',
  section: 'A',
  day: 'Monday',
  period: 1,
  subject: 'Mathematics',
  teacher: 'Mr. John Doe',
  startTime: '09:00 AM',
  endTime: '10:00 AM',
  room: 'Room-101',
  remarks: 'Regular class'
})
```

### Get All Timetables
```javascript
axios.get('/timetable')
```

### Get by Username
```javascript
axios.get('/timetable/username/teacher123')
```

### Get by ID
```javascript
axios.get('/timetable/507f1f77bcf86cd799439012')
```

### Update Timetable
```javascript
axios.put('/timetable/507f1f77bcf86cd799439012', {
  subject: 'Science',
  room: 'Room-102'
})
```

### Delete Timetable
```javascript
axios.delete('/timetable/507f1f77bcf86cd799439012')
```

---

## 2. Assignments APIs

### Create Assignment
```javascript
axios.post('/assignments', {
  username: 'student123',
  userType: 'student',
  title: 'Math Assignment 1',
  description: 'Solve algebra problems',
  class: '10A',
  subject: 'Mathematics',
  teacher: 'Mr. John Doe',
  dueDate: '2026-02-20',
  marks: 50,
  status: 'pending',
  remarks: 'Important assignment'
})
```

### Get All Assignments
```javascript
axios.get('/assignments')
```

### Get by Username
```javascript
axios.get('/assignments/username/student123')
```

### Get by ID
```javascript
axios.get('/assignments/507f1f77bcf86cd799439012')
```

### Update Assignment
```javascript
axios.put('/assignments/507f1f77bcf86cd799439012', {
  status: 'submitted',
  marks: 45
})
```

### Delete Assignment
```javascript
axios.delete('/assignments/507f1f77bcf86cd799439012')
```

---

## 3. Exams APIs

### Create Exam
```javascript
axios.post('/exams', {
  username: 'student123',
  userType: 'student',
  examName: 'Midterm Exam',
  class: '10A',
  subject: 'Mathematics',
  examDate: '2026-02-25',
  startTime: '10:00 AM',
  endTime: '12:00 PM',
  room: 'Hall-1',
  maxMarks: 100,
  duration: 120,
  examType: 'midterm',
  syllabus: 'Chapter 1-5',
  invigilator: 'Mr. Smith'
})
```

### Get All Exams
```javascript
axios.get('/exams')
```

### Get by Username
```javascript
axios.get('/exams/username/student123')
```

### Get by ID
```javascript
axios.get('/exams/507f1f77bcf86cd799439012')
```

### Update Exam
```javascript
axios.put('/exams/507f1f77bcf86cd799439012', {
  room: 'Hall-2',
  invigilator: 'Mr. Johnson'
})
```

### Delete Exam
```javascript
axios.delete('/exams/507f1f77bcf86cd799439012')
```

---

## 4. Library APIs

### Create Library Record
```javascript
axios.post('/library', {
  username: 'student123',
  userType: 'student',
  bookId: 'BOOK-001',
  bookTitle: 'Introduction to Python',
  author: 'Mark Lutz',
  isbn: '978-1449355739',
  publisher: 'O\'Reilly',
  edition: '5th',
  category: 'Programming',
  availableCopies: 5,
  totalCopies: 10,
  issueDate: '2026-02-01',
  returnDate: '2026-02-15',
  status: 'issued',
  remarks: 'Regular issue'
})
```

### Get All Library Records
```javascript
axios.get('/library')
```

### Get by Username
```javascript
axios.get('/library/username/student123')
```

### Get by ID
```javascript
axios.get('/library/507f1f77bcf86cd799439012')
```

### Update Library Record
```javascript
axios.put('/library/507f1f77bcf86cd799439012', {
  status: 'returned',
  availableCopies: 6
})
```

### Delete Library Record
```javascript
axios.delete('/library/507f1f77bcf86cd799439012')
```

---

## 5. Fee Payments APIs

### Create Fee Payment
```javascript
axios.post('/feepayments', {
  username: 'parent123',
  userType: 'parent',
  studentName: 'John Smith',
  class: '10A',
  section: 'A',
  feeType: 'Tuition',
  amount: 5000,
  paidAmount: 2500,
  pendingAmount: 2500,
  dueDate: '2026-02-28',
  paymentDate: '2026-02-10',
  paymentMethod: 'online',
  transactionId: 'TXN-2026-001',
  status: 'partial',
  remarks: 'Payment in progress'
})
```

### Get All Fee Payments
```javascript
axios.get('/feepayments')
```

### Get by Username
```javascript
axios.get('/feepayments/username/parent123')
```

### Get by ID
```javascript
axios.get('/feepayments/507f1f77bcf86cd799439012')
```

### Update Fee Payment
```javascript
axios.put('/feepayments/507f1f77bcf86cd799439012', {
  paidAmount: 5000,
  pendingAmount: 0,
  status: 'paid'
})
```

### Delete Fee Payment
```javascript
axios.delete('/feepayments/507f1f77bcf86cd799439012')
```

---

## 6. Transport APIs

### Create Transport Record
```javascript
axios.post('/transport', {
  username: 'student123',
  userType: 'student',
  studentName: 'John Smith',
  class: '10A',
  routeNumber: 'RT-001',
  routeName: 'Downtown Route',
  busNumber: 'BUS-101',
  driverName: 'Mr. Ahmed',
  driverPhone: '9876543210',
  pickupPoint: 'Main Gate',
  pickupTime: '07:30 AM',
  dropPoint: 'Bus Stop-1',
  dropTime: '03:00 PM',
  fee: 1000,
  status: 'active',
  remarks: 'Regular transport'
})
```

### Get All Transport Records
```javascript
axios.get('/transport')
```

### Get by Username
```javascript
axios.get('/transport/username/student123')
```

### Get by ID
```javascript
axios.get('/transport/507f1f77bcf86cd799439012')
```

### Update Transport Record
```javascript
axios.put('/transport/507f1f77bcf86cd799439012', {
  status: 'inactive',
  remarks: 'Suspended due to fees'
})
```

### Delete Transport Record
```javascript
axios.delete('/transport/507f1f77bcf86cd799439012')
```

---

## 7. Messages APIs

### Create Message
```javascript
axios.post('/messages', {
  username: 'teacher123',
  userType: 'teacher',
  sender: 'teacher123',
  recipient: 'student123',
  subject: 'Assignment Submission',
  message: 'Please submit your assignment by Friday',
  messageType: 'notification',
  priority: 'high',
  status: 'sent',
  remarks: 'Urgent message'
})
```

### Get All Messages
```javascript
axios.get('/messages')
```

### Get by Username
```javascript
axios.get('/messages/username/student123')
```

### Get by ID
```javascript
axios.get('/messages/507f1f77bcf86cd799439012')
```

### Update Message
```javascript
axios.put('/messages/507f1f77bcf86cd799439012', {
  isRead: true,
  readAt: new Date(),
  status: 'read'
})
```

### Delete Message
```javascript
axios.delete('/messages/507f1f77bcf86cd799439012')
```

---

## 8. Settings APIs

### Create Setting
```javascript
axios.post('/settings', {
  username: 'student123',
  userType: 'student',
  settingType: 'notification',
  settingKey: 'emailNotifications',
  settingValue: 'enabled',
  category: 'Preferences',
  description: 'Enable email notifications',
  isActive: true,
  isPublic: false,
  notificationEnabled: true,
  emailEnabled: true,
  smsEnabled: false,
  language: 'English',
  theme: 'light',
  timezone: 'GMT+5:30',
  remarks: 'Default settings'
})
```

### Get All Settings
```javascript
axios.get('/settings')
```

### Get by Username
```javascript
axios.get('/settings/username/student123')
```

### Get by ID
```javascript
axios.get('/settings/507f1f77bcf86cd799439012')
```

### Update Setting
```javascript
axios.put('/settings/507f1f77bcf86cd799439012', {
  theme: 'dark',
  language: 'Spanish',
  emailEnabled: false
})
```

### Delete Setting
```javascript
axios.delete('/settings/507f1f77bcf86cd799439012')
```

---

## Response Format

All endpoints return JSON in the following format:

**Success Response:**
```json
{
  "success": true,
  "message": "Operation successful",
  "data": { /* Record details */ },
  "count": 1
}
```

**Error Response:**
```json
{
  "success": false,
  "message": "Error message describing the issue"
}
```

---

## Error Codes

- `400` - Bad Request (Invalid input)
- `404` - Not Found
- `500` - Server Error
