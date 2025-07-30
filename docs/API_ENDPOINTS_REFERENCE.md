# API Endpoints Reference

## Authentication Endpoints

### POST /api/auth/login
**Description:** Admin user login
**Request Body:**
```json
{
  "email": "admin@hcc.com",
  "password": "securepassword"
}
```
**Response:**
```json
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "id": "uuid",
    "email": "admin@hcc.com",
    "firstName": "John",
    "lastName": "Doe",
    "role": "admin"
  }
}
```

### POST /api/auth/logout
**Description:** Admin user logout
**Headers:** `Authorization: Bearer <token>`
**Response:** `{ "message": "Logged out successfully" }`

### GET /api/auth/profile
**Description:** Get current user profile
**Headers:** `Authorization: Bearer <token>`
**Response:**
```json
{
  "id": "uuid",
  "email": "admin@hcc.com",
  "firstName": "John",
  "lastName": "Doe",
  "role": "admin",
  "lastLogin": "2024-01-15T10:30:00Z"
}
```

## Billing & Insurance Endpoints

### POST /api/insurance/verify
**Description:** Verify insurance coverage in real-time
**Headers:** `Authorization: Bearer <token>`
**Request Body:**
```json
{
  "provider": "Aetna",
  "memberId": "AET123456789",
  "group": "HCC-2024",
  "dateOfBirth": "1985-04-12"
}
```
**Response:**
```json
{
  "status": "verified",
  "coverage": {
    "active": true,
    "effectiveDate": "2024-01-01",
    "expirationDate": "2024-12-31",
    "deductible": 500,
    "copay": 25,
    "coverageType": "PPO",
    "benefits": ["Cardiology", "Preventive Care", "Lab Tests"]
  },
  "patient": {
    "name": "John Doe",
    "memberId": "AET123456789",
    "group": "HCC-2024"
  }
}
```

### POST /api/payments/process
**Description:** Process payment for patient account
**Headers:** `Authorization: Bearer <token>`
**Request Body:**
```json
{
  "amount": "150.00",
  "cardNumber": "4111111111111111",
  "expiryDate": "12/25",
  "cvv": "123",
  "patientId": "uuid"
}
```
**Response:**
```json
{
  "status": "success",
  "transactionId": "txn_abc123def456",
  "amount": 150.00,
  "method": "credit_card",
  "timestamp": "2024-01-15T10:30:00Z",
  "patientId": "uuid"
}
```

### GET /api/billing/patients
**Description:** Get patient billing accounts with balances
**Headers:** `Authorization: Bearer <token>`
**Query Parameters:**
- `page` (number): Page number (default: 1)
- `limit` (number): Items per page (default: 20)
- `status` (string): Filter by account status (current, overdue, paid)

**Response:**
```json
{
  "patients": [
    {
      "id": "uuid",
      "name": "Sarah Johnson",
      "balance": 150.00,
      "status": "overdue",
      "lastPayment": "2024-01-01T10:30:00Z",
      "insurance": {
        "provider": "Aetna",
        "memberId": "AET123456789",
        "active": true
      }
    }
  ],
  "pagination": {
    "page": 1,
    "limit": 20,
    "total": 150,
    "totalPages": 8
  }
}
```

### GET /api/billing/transactions
**Description:** Get transaction history
**Headers:** `Authorization: Bearer <token>`
**Query Parameters:**
- `page` (number): Page number (default: 1)
- `limit` (number): Items per page (default: 20)
- `patientId` (string): Filter by patient ID
- `dateFrom` (string): Filter from date (ISO format)
- `dateTo` (string): Filter to date (ISO format)

**Response:**
```json
{
  "transactions": [
    {
      "id": "uuid",
      "patientId": "uuid",
      "patientName": "Sarah Johnson",
      "amount": 150.00,
      "type": "payment",
      "method": "credit_card",
      "status": "completed",
      "timestamp": "2024-01-15T10:30:00Z",
      "transactionId": "txn_abc123def456"
    }
  ],
  "pagination": {
    "page": 1,
    "limit": 20,
    "total": 150,
    "totalPages": 8
  }
}
```

### GET /api/claims
**Description:** Get insurance claims
**Headers:** `Authorization: Bearer <token>`
**Query Parameters:**
- `page` (number): Page number (default: 1)
- `limit` (number): Items per page (default: 20)
- `status` (string): Filter by claim status (pending, submitted, approved, denied)
- `patientId` (string): Filter by patient ID

**Response:**
```json
{
  "claims": [
    {
      "id": "uuid",
      "patientId": "uuid",
      "patientName": "Sarah Johnson",
      "insuranceProvider": "Aetna",
      "memberId": "AET123456789",
      "amount": 500.00,
      "status": "submitted",
      "submittedDate": "2024-01-15T10:30:00Z",
      "responseDate": null
    }
  ],
  "pagination": {
    "page": 1,
    "limit": 20,
    "total": 150,
    "totalPages": 8
  }
}
```

### POST /api/claims/submit
**Description:** Submit new insurance claim
**Headers:** `Authorization: Bearer <token>`
**Request Body:**
```json
{
  "patientId": "uuid",
  "insuranceProvider": "Aetna",
  "memberId": "AET123456789",
  "amount": 500.00,
  "serviceDate": "2024-01-15",
  "serviceType": "consultation"
}
```
**Response:**
```json
{
  "id": "uuid",
  "status": "submitted",
  "submittedDate": "2024-01-15T10:30:00Z",
  "claimNumber": "CLM20240115001"
}
```

### GET /api/integrations/status
**Description:** Get API integration status
**Headers:** `Authorization: Bearer <token>`
**Response:**
```json
{
  "insurance": {
    "status": "connected",
    "lastCheck": "2024-01-15T10:30:00Z",
    "responseTime": 250
  },
  "payment": {
    "status": "connected",
    "lastCheck": "2024-01-15T10:30:00Z",
    "responseTime": 150
  },
  "claims": {
    "status": "connected",
    "lastCheck": "2024-01-15T10:30:00Z",
    "responseTime": 300
  }
}
```

### POST /api/automation/billing/configure
**Description:** Configure automated billing settings
**Headers:** `Authorization: Bearer <token>`
**Request Body:**
```json
{
  "enabled": true,
  "frequency": "monthly",
  "reminderDays": 7,
  "autoCharge": false,
  "paymentMethod": "credit_card"
}
```
**Response:**
```json
{
  "status": "configured",
  "settings": {
    "enabled": true,
    "frequency": "monthly",
    "reminderDays": 7,
    "autoCharge": false,
    "paymentMethod": "credit_card"
  }
}
```

### POST /api/automation/claims/configure
**Description:** Configure claims automation settings
**Headers:** `Authorization: Bearer <token>`
**Request Body:**
```json
{
  "enabled": true,
  "autoSubmit": true,
  "followUpDays": 30,
  "denialRetry": true,
  "maxRetries": 3
}
```
**Response:**
```json
{
  "status": "configured",
  "settings": {
    "enabled": true,
    "autoSubmit": true,
    "followUpDays": 30,
    "denialRetry": true,
    "maxRetries": 3
  }
}
```

## Patient Endpoints

### GET /api/patients
**Description:** List patients with pagination and filters
**Headers:** `Authorization: Bearer <token>`
**Query Parameters:**
- `page` (number): Page number (default: 1)
- `limit` (number): Items per page (default: 20)
- `search` (string): Search by name or MRN
- `status` (string): Filter by status (active, inactive)
- `doctor` (string): Filter by assigned doctor ID

**Response:**
```json
{
  "patients": [
    {
      "id": "uuid",
      "mrn": "MRN20240115001",
      "firstName": "Sarah",
      "lastName": "Johnson",
      "dateOfBirth": "1985-04-12",
      "email": "sarah.johnson@email.com",
      "phone": "(555) 123-4567",
      "status": "active",
      "assignedDoctor": {
        "id": "uuid",
        "firstName": "Asif",
        "lastName": "Ali"
      },
      "lastVisit": "2024-01-15",
      "nextAppointment": "2024-02-20"
    }
  ],
  "pagination": {
    "page": 1,
    "limit": 20,
    "total": 150,
    "totalPages": 8
  }
}
```

### GET /api/patients/:id
**Description:** Get patient details with all related data
**Headers:** `Authorization: Bearer <token>`
**Response:**
```json
{
  "id": "uuid",
  "mrn": "MRN20240115001",
  "firstName": "Sarah",
  "lastName": "Johnson",
  "dateOfBirth": "1985-04-12",
  "email": "sarah.johnson@email.com",
  "phone": "(555) 123-4567",
  "address": "123 Main St, Houston, TX 77001",
  "emergencyContact": {
    "name": "Michael Johnson",
    "relationship": "Spouse",
    "phone": "(555) 987-6543"
  },
  "insurance": {
    "provider": "Aetna",
    "memberId": "AET123456789",
    "group": "HCC-2024",
    "status": "Active"
  },
  "assignedDoctor": {
    "id": "uuid",
    "firstName": "Asif",
    "lastName": "Ali"
  },
  "status": "active",
  "lastVisit": "2024-01-15",
  "nextAppointment": "2024-02-20",
  "outstandingBalance": 150.00,
  "recentActivity": [...],
  "medicalHistory": {
    "conditions": ["Hypertension", "Type 2 Diabetes"],
    "allergies": ["Penicillin"],
    "medications": ["Lisinopril 10mg daily", "Metformin 500mg twice daily"]
  },
  "quickStats": {
    "totalAppointments": 12,
    "pendingDocuments": 2,
    "activePrescriptions": 3,
    "unreadMessages": 1
  }
}
```

### POST /api/patients
**Description:** Create new patient
**Headers:** `Authorization: Bearer <token>`
**Request Body:**
```json
{
  "firstName": "John",
  "lastName": "Doe",
  "dateOfBirth": "1990-01-01",
  "email": "john.doe@email.com",
  "phone": "(555) 123-4567",
  "address": "456 Oak St, Houston, TX 77002",
  "emergencyContactName": "Jane Doe",
  "emergencyContactPhone": "(555) 987-6543",
  "emergencyContactRelationship": "Spouse",
  "assignedDoctorId": "uuid"
}
```

### PUT /api/patients/:id
**Description:** Update patient information
**Headers:** `Authorization: Bearer <token>`
**Request Body:** Same as POST but all fields optional

### DELETE /api/patients/:id
**Description:** Deactivate patient (soft delete)
**Headers:** `Authorization: Bearer <token>`
**Response:** `{ "message": "Patient deactivated successfully" }`

## Appointment Endpoints

### GET /api/appointments
**Description:** List appointments with filters
**Headers:** `Authorization: Bearer <token>`
**Query Parameters:**
- `page` (number): Page number
- `limit` (number): Items per page
- `date` (string): Filter by date (YYYY-MM-DD)
- `status` (string): Filter by status
- `doctor` (string): Filter by doctor ID
- `patient` (string): Filter by patient ID

**Response:**
```json
{
  "appointments": [
    {
      "id": "uuid",
      "patient": {
        "id": "uuid",
        "name": "Sarah Johnson",
        "mrn": "MRN20240115001"
      },
      "doctor": {
        "id": "uuid",
        "name": "Dr. Asif Ali"
      },
      "appointmentDate": "2024-02-20",
      "appointmentTime": "10:00:00",
      "durationMinutes": 30,
      "type": "Follow-up Consultation",
      "status": "scheduled",
      "notes": "Review blood pressure medication effectiveness"
    }
  ],
  "pagination": {
    "page": 1,
    "limit": 20,
    "total": 45,
    "totalPages": 3
  }
}
```

### POST /api/appointments
**Description:** Create new appointment
**Headers:** `Authorization: Bearer <token>`
**Request Body:**
```json
{
  "patientId": "uuid",
  "doctorId": "uuid",
  "appointmentDate": "2024-02-20",
  "appointmentTime": "10:00:00",
  "durationMinutes": 30,
  "type": "Follow-up Consultation",
  "notes": "Review blood pressure medication effectiveness"
}
```

### PUT /api/appointments/:id
**Description:** Update appointment
**Headers:** `Authorization: Bearer <token>`
**Request Body:** Same as POST but all fields optional

### DELETE /api/appointments/:id
**Description:** Cancel appointment
**Headers:** `Authorization: Bearer <token>`
**Response:** `{ "message": "Appointment cancelled successfully" }`

## Message Endpoints

### GET /api/messages/threads
**Description:** List message threads
**Headers:** `Authorization: Bearer <token>`
**Query Parameters:**
- `page` (number): Page number
- `limit` (number): Items per page
- `status` (string): Filter by status (open, closed, in-progress)
- `priority` (string): Filter by priority (low, medium, high)
- `category` (string): Filter by category

**Response:**
```json
{
  "threads": [
    {
      "id": "uuid",
      "patient": {
        "id": "uuid",
        "name": "Sarah Johnson",
        "email": "sarah.johnson@email.com"
      },
      "subject": "Blood Pressure Medication Refill Request",
      "category": "medication",
      "priority": "medium",
      "status": "open",
      "assignedTo": {
        "id": "uuid",
        "name": "Dr. Asif Ali"
      },
      "lastMessageTime": "2024-01-15T10:30:00Z",
      "unreadCount": 1
    }
  ],
  "pagination": {
    "page": 1,
    "limit": 20,
    "total": 25,
    "totalPages": 2
  }
}
```

### GET /api/messages/threads/:id
**Description:** Get thread with all messages
**Headers:** `Authorization: Bearer <token>`
**Response:**
```json
{
  "id": "uuid",
  "patient": {
    "id": "uuid",
    "name": "Sarah Johnson",
    "email": "sarah.johnson@email.com"
  },
  "subject": "Blood Pressure Medication Refill Request",
  "category": "medication",
  "priority": "medium",
  "status": "open",
  "assignedTo": {
    "id": "uuid",
    "name": "Dr. Asif Ali"
  },
  "messages": [
    {
      "id": "uuid",
      "from": "patient",
      "sender": "Sarah Johnson",
      "content": "Hi Dr. Ali, I need a refill for my blood pressure medication...",
      "timestamp": "2024-01-15T10:30:00Z",
      "isRead": true
    },
    {
      "id": "uuid",
      "from": "admin",
      "sender": "Dr. Asif Ali",
      "content": "I'll send the prescription to your pharmacy...",
      "timestamp": "2024-01-15T11:00:00Z",
      "isRead": false
    }
  ]
}
```

### POST /api/messages/threads/:id/reply
**Description:** Add reply to thread
**Headers:** `Authorization: Bearer <token>`
**Request Body:**
```json
{
  "content": "I'll send the prescription to your pharmacy today."
}
```

## Prescription Endpoints

### GET /api/prescriptions
**Description:** List prescriptions
**Headers:** `Authorization: Bearer <token>`
**Query Parameters:**
- `page` (number): Page number
- `limit` (number): Items per page
- `status` (string): Filter by status (active, discontinued, expired)
- `patient` (string): Filter by patient ID
- `doctor` (string): Filter by doctor ID

**Response:**
```json
{
  "prescriptions": [
    {
      "id": "uuid",
      "patient": {
        "id": "uuid",
        "name": "Sarah Johnson"
      },
      "doctor": {
        "id": "uuid",
        "name": "Dr. Asif Ali"
      },
      "medicationName": "Lisinopril",
      "dosage": "10mg",
      "frequency": "Once daily",
      "duration": "30 days",
      "refillsRemaining": 2,
      "status": "active",
      "pharmacyInfo": "CVS Pharmacy",
      "prescribedDate": "2024-01-15",
      "notes": "Take with food"
    }
  ],
  "pagination": {
    "page": 1,
    "limit": 20,
    "total": 30,
    "totalPages": 2
  }
}
```

### POST /api/prescriptions
**Description:** Create new prescription
**Headers:** `Authorization: Bearer <token>`
**Request Body:**
```json
{
  "patientId": "uuid",
  "medicationName": "Lisinopril",
  "dosage": "10mg",
  "frequency": "Once daily",
  "duration": "30 days",
  "refillsRemaining": 2,
  "pharmacyInfo": "CVS Pharmacy",
  "notes": "Take with food"
}
```

### POST /api/prescriptions/:id/refill
**Description:** Request prescription refill
**Headers:** `Authorization: Bearer <token>`
**Response:** `{ "message": "Refill request submitted successfully" }`

## Care Plan Endpoints

### GET /api/care-plans
**Description:** List care plans
**Headers:** `Authorization: Bearer <token>`
**Query Parameters:**
- `page` (number): Page number
- `limit` (number): Items per page
- `status` (string): Filter by status (active, completed, archived)
- `patient` (string): Filter by patient ID
- `type` (string): Filter by care plan type

**Response:**
```json
{
  "carePlans": [
    {
      "id": "uuid",
      "patient": {
        "id": "uuid",
        "name": "Sarah Johnson"
      },
      "doctor": {
        "id": "uuid",
        "name": "Dr. Asif Ali"
      },
      "type": "Cardiovascular Health",
      "status": "active",
      "summary": "Preventive care plan focused on blood pressure and cholesterol management.",
      "progressPercentage": 75,
      "startDate": "2024-01-15",
      "nextReviewDate": "2024-03-15",
      "goals": [
        "Reduce blood pressure to target range",
        "Improve cardiovascular fitness",
        "Maintain healthy diet"
      ],
      "medications": [
        {
          "name": "Metoprolol",
          "dosage": "50mg",
          "frequency": "1 tablet daily"
        }
      ]
    }
  ],
  "pagination": {
    "page": 1,
    "limit": 20,
    "total": 15,
    "totalPages": 1
  }
}
```

### POST /api/care-plans
**Description:** Create new care plan
**Headers:** `Authorization: Bearer <token>`
**Request Body:**
```json
{
  "patientId": "uuid",
  "type": "Cardiovascular Health",
  "summary": "Preventive care plan focused on blood pressure management.",
  "startDate": "2024-01-15",
  "nextReviewDate": "2024-03-15",
  "goals": [
    "Reduce blood pressure to target range",
    "Improve cardiovascular fitness"
  ],
  "medications": [
    {
      "name": "Metoprolol",
      "dosage": "50mg",
      "frequency": "1 tablet daily"
    }
  ]
}
```

## Document Endpoints

### GET /api/documents
**Description:** List documents
**Headers:** `Authorization: Bearer <token>`
**Query Parameters:**
- `page` (number): Page number
- `limit` (number): Items per page
- `type` (string): Filter by document type
- `status` (string): Filter by status (pending, reviewed, available)
- `patient` (string): Filter by patient ID

**Response:**
```json
{
  "documents": [
    {
      "id": "uuid",
      "patient": {
        "id": "uuid",
        "name": "Sarah Johnson"
      },
      "uploadedBy": {
        "id": "uuid",
        "name": "Dr. Asif Ali"
      },
      "filename": "cardiac_stress_test_20240115.pdf",
      "originalFilename": "Cardiac Stress Test Results.pdf",
      "fileSize": 2048576,
      "mimeType": "application/pdf",
      "documentType": "Test Result",
      "status": "available",
      "uploadedDate": "2024-01-15T10:30:00Z",
      "notes": "Stress test shows normal cardiac function"
    }
  ],
  "pagination": {
    "page": 1,
    "limit": 20,
    "total": 50,
    "totalPages": 3
  }
}
```

### POST /api/documents
**Description:** Upload document
**Headers:** `Authorization: Bearer <token>`
**Content-Type:** `multipart/form-data`
**Form Data:**
- `file`: File to upload
- `patientId`: Patient ID
- `documentType`: Type of document
- `notes`: Optional notes

### GET /api/documents/:id/download
**Description:** Download document
**Headers:** `Authorization: Bearer <token>`
**Response:** File stream

## Billing Endpoints

### GET /api/billing/patients
**Description:** List patient billing information
**Headers:** `Authorization: Bearer <token>`
**Query Parameters:**
- `page` (number): Page number
- `limit` (number): Items per page
- `status` (string): Filter by billing status (current, overdue, pending)

**Response:**
```json
{
  "patients": [
    {
      "id": "uuid",
      "name": "Sarah Johnson",
      "email": "sarah.johnson@email.com",
      "phone": "(555) 123-4567",
      "balance": 150.00,
      "status": "current",
      "insurance": {
        "provider": "Aetna",
        "status": "Active",
        "memberId": "AET123456789"
      },
      "lastPayment": "2024-01-10",
      "nextAppointment": "2024-02-20"
    }
  ],
  "pagination": {
    "page": 1,
    "limit": 20,
    "total": 100,
    "totalPages": 5
  }
}
```

### GET /api/billing/transactions
**Description:** List billing transactions
**Headers:** `Authorization: Bearer <token>`
**Query Parameters:**
- `page` (number): Page number
- `limit` (number): Items per page
- `patient` (string): Filter by patient ID
- `type` (string): Filter by transaction type (charge, payment, adjustment)
- `dateFrom` (string): Filter from date
- `dateTo` (string): Filter to date

**Response:**
```json
{
  "transactions": [
    {
      "id": "uuid",
      "patient": {
        "id": "uuid",
        "name": "Sarah Johnson"
      },
      "appointment": {
        "id": "uuid",
        "type": "Consultation"
      },
      "amount": 75.00,
      "transactionType": "payment",
      "paymentMethod": "Credit Card",
      "description": "Consultation fee payment",
      "status": "completed",
      "transactionDate": "2024-01-10T14:30:00Z"
    }
  ],
  "pagination": {
    "page": 1,
    "limit": 20,
    "total": 200,
    "totalPages": 10
  }
}
```

### POST /api/billing/payments
**Description:** Record payment
**Headers:** `Authorization: Bearer <token>`
**Request Body:**
```json
{
  "patientId": "uuid",
  "appointmentId": "uuid",
  "amount": 75.00,
  "paymentMethod": "Credit Card",
  "description": "Consultation fee payment"
}
```

## Error Responses

All endpoints may return the following error responses:

### 400 Bad Request
```json
{
  "error": "Validation error",
  "details": [
    {
      "field": "email",
      "message": "Invalid email format"
    }
  ]
}
```

### 401 Unauthorized
```json
{
  "error": "Invalid credentials"
}
```

### 403 Forbidden
```json
{
  "error": "Insufficient permissions"
}
```

### 404 Not Found
```json
{
  "error": "Resource not found"
}
```

### 500 Internal Server Error
```json
{
  "error": "Internal server error"
}
```

## Rate Limiting

All endpoints are subject to rate limiting:
- **Window:** 15 minutes
- **Limit:** 100 requests per window
- **Headers:** 
  - `X-RateLimit-Limit`: Request limit
  - `X-RateLimit-Remaining`: Remaining requests
  - `X-RateLimit-Reset`: Reset time (Unix timestamp)

## Authentication

All endpoints (except `/api/auth/login`) require authentication via Bearer token:
```
Authorization: Bearer <jwt_token>
```

## Pagination

All list endpoints support pagination with the following response format:
```json
{
  "data": [...],
  "pagination": {
    "page": 1,
    "limit": 20,
    "total": 100,
    "totalPages": 5
  }
}
``` 