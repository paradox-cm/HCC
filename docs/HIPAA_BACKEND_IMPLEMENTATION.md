# HIPAA-Compliant Backend Implementation Guide

## Overview

This document provides comprehensive guidance for implementing a HIPAA-compliant backend API and database setup for the HCC Healthcare Admin Portal. The implementation uses Node.js/Express with Supabase PostgreSQL, designed for Cursor and Vercel deployment.

## 1. API Requirements Analysis

### Core Entities & Endpoints

#### Patients
```typescript
// GET /api/patients - List patients (with pagination, search, filters)
// GET /api/patients/:id - Get patient details
// POST /api/patients - Create new patient
// PUT /api/patients/:id - Update patient
// DELETE /api/patients/:id - Deactivate patient (soft delete)
// GET /api/patients/:id/activity - Get patient activity history
```

#### Appointments
```typescript
// GET /api/appointments - List appointments
// GET /api/appointments/:id - Get appointment details
// POST /api/appointments - Create appointment
// PUT /api/appointments/:id - Update appointment
// DELETE /api/appointments/:id - Cancel appointment
// GET /api/patients/:id/appointments - Get patient appointments
```

#### Messages
```typescript
// GET /api/messages/threads - List message threads
// GET /api/messages/threads/:id - Get thread with messages
// POST /api/messages/threads - Create new thread
// POST /api/messages/threads/:id/reply - Add reply to thread
// PUT /api/messages/threads/:id/status - Update thread status
```

#### Prescriptions
```typescript
// GET /api/prescriptions - List prescriptions
// GET /api/prescriptions/:id - Get prescription details
// POST /api/prescriptions - Create prescription
// PUT /api/prescriptions/:id - Update prescription
// DELETE /api/prescriptions/:id - Discontinue prescription
// POST /api/prescriptions/:id/refill - Request refill
```

#### Care Plans
```typescript
// GET /api/care-plans - List care plans
// GET /api/care-plans/:id - Get care plan details
// POST /api/care-plans - Create care plan
// PUT /api/care-plans/:id - Update care plan
// DELETE /api/care-plans/:id - Archive care plan
```

#### Documents
```typescript
// GET /api/documents - List documents
// GET /api/documents/:id - Get document details
// POST /api/documents - Upload document
// PUT /api/documents/:id - Update document metadata
// DELETE /api/documents/:id - Delete document
// GET /api/documents/:id/download - Download document
```

#### Billing & Insurance
```typescript
// GET /api/billing/patients - List patient billing info
// GET /api/billing/patients/:id - Get patient billing details
// POST /api/billing/payments - Record payment
// GET /api/billing/transactions - List transactions
// PUT /api/billing/insurance/:id - Update insurance info
```

### Authentication Endpoints
```typescript
// POST /api/auth/login - Admin login
// POST /api/auth/logout - Admin logout
// POST /api/auth/refresh - Refresh token
// GET /api/auth/profile - Get current user profile
// PUT /api/auth/profile - Update profile
```

## 2. Database Schema Design

### Core Tables

#### users (Admin Users)
```sql
CREATE TABLE users (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  email VARCHAR(255) UNIQUE NOT NULL,
  password_hash VARCHAR(255) NOT NULL,
  first_name VARCHAR(100) NOT NULL,
  last_name VARCHAR(100) NOT NULL,
  role VARCHAR(50) NOT NULL DEFAULT 'admin',
  is_active BOOLEAN DEFAULT true,
  last_login TIMESTAMP,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);
```

#### patients
```sql
CREATE TABLE patients (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  mrn VARCHAR(50) UNIQUE NOT NULL, -- Medical Record Number
  first_name VARCHAR(100) NOT NULL,
  last_name VARCHAR(100) NOT NULL,
  date_of_birth DATE NOT NULL,
  email VARCHAR(255),
  phone VARCHAR(20),
  address TEXT,
  emergency_contact_name VARCHAR(200),
  emergency_contact_phone VARCHAR(20),
  emergency_contact_relationship VARCHAR(100),
  assigned_doctor_id UUID REFERENCES users(id),
  status VARCHAR(50) DEFAULT 'active',
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);
```

#### insurance_info
```sql
CREATE TABLE insurance_info (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  patient_id UUID REFERENCES patients(id) ON DELETE CASCADE,
  provider VARCHAR(100) NOT NULL,
  member_id VARCHAR(100) NOT NULL,
  group_number VARCHAR(100),
  status VARCHAR(50) DEFAULT 'active',
  effective_date DATE,
  expiration_date DATE,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);
```

#### appointments
```sql
CREATE TABLE appointments (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  patient_id UUID REFERENCES patients(id) ON DELETE CASCADE,
  doctor_id UUID REFERENCES users(id),
  appointment_date DATE NOT NULL,
  appointment_time TIME NOT NULL,
  duration_minutes INTEGER DEFAULT 30,
  type VARCHAR(100) NOT NULL,
  status VARCHAR(50) DEFAULT 'scheduled',
  notes TEXT,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);
```

#### message_threads
```sql
CREATE TABLE message_threads (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  patient_id UUID REFERENCES patients(id) ON DELETE CASCADE,
  subject VARCHAR(255) NOT NULL,
  category VARCHAR(50) NOT NULL,
  priority VARCHAR(20) DEFAULT 'medium',
  status VARCHAR(50) DEFAULT 'open',
  assigned_to UUID REFERENCES users(id),
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);
```

#### messages
```sql
CREATE TABLE messages (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  thread_id UUID REFERENCES message_threads(id) ON DELETE CASCADE,
  sender_id UUID REFERENCES users(id),
  sender_type VARCHAR(20) NOT NULL, -- 'patient' or 'admin'
  content TEXT NOT NULL,
  is_read BOOLEAN DEFAULT false,
  created_at TIMESTAMP DEFAULT NOW()
);
```

#### prescriptions
```sql
CREATE TABLE prescriptions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  patient_id UUID REFERENCES patients(id) ON DELETE CASCADE,
  doctor_id UUID REFERENCES users(id),
  medication_name VARCHAR(200) NOT NULL,
  dosage VARCHAR(100) NOT NULL,
  frequency VARCHAR(100) NOT NULL,
  duration VARCHAR(100),
  refills_remaining INTEGER DEFAULT 0,
  status VARCHAR(50) DEFAULT 'active',
  pharmacy_info TEXT,
  notes TEXT,
  prescribed_date DATE NOT NULL,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);
```

#### care_plans
```sql
CREATE TABLE care_plans (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  patient_id UUID REFERENCES patients(id) ON DELETE CASCADE,
  doctor_id UUID REFERENCES users(id),
  type VARCHAR(100) NOT NULL,
  status VARCHAR(50) DEFAULT 'active',
  summary TEXT,
  progress_percentage INTEGER DEFAULT 0,
  start_date DATE NOT NULL,
  end_date DATE,
  next_review_date DATE,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);
```

#### care_plan_goals
```sql
CREATE TABLE care_plan_goals (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  care_plan_id UUID REFERENCES care_plans(id) ON DELETE CASCADE,
  goal_text TEXT NOT NULL,
  is_completed BOOLEAN DEFAULT false,
  created_at TIMESTAMP DEFAULT NOW()
);
```

#### documents
```sql
CREATE TABLE documents (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  patient_id UUID REFERENCES patients(id) ON DELETE CASCADE,
  uploaded_by UUID REFERENCES users(id),
  filename VARCHAR(255) NOT NULL,
  original_filename VARCHAR(255) NOT NULL,
  file_path VARCHAR(500) NOT NULL,
  file_size BIGINT NOT NULL,
  mime_type VARCHAR(100) NOT NULL,
  document_type VARCHAR(100) NOT NULL,
  status VARCHAR(50) DEFAULT 'pending',
  notes TEXT,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);
```

#### billing_transactions
```sql
CREATE TABLE billing_transactions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  patient_id UUID REFERENCES patients(id) ON DELETE CASCADE,
  appointment_id UUID REFERENCES appointments(id),
  amount DECIMAL(10,2) NOT NULL,
  transaction_type VARCHAR(50) NOT NULL, -- 'charge', 'payment', 'adjustment'
  payment_method VARCHAR(50),
  description TEXT,
  status VARCHAR(50) DEFAULT 'pending',
  transaction_date TIMESTAMP DEFAULT NOW(),
  created_at TIMESTAMP DEFAULT NOW()
);
```

### Audit Tables

#### audit_logs
```sql
CREATE TABLE audit_logs (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES users(id),
  action VARCHAR(100) NOT NULL,
  table_name VARCHAR(100) NOT NULL,
  record_id UUID,
  old_values JSONB,
  new_values JSONB,
  ip_address INET,
  user_agent TEXT,
  created_at TIMESTAMP DEFAULT NOW()
);
```

### Indexes for Performance
```sql
-- Patient indexes
CREATE INDEX idx_patients_mrn ON patients(mrn);
CREATE INDEX idx_patients_name ON patients(last_name, first_name);
CREATE INDEX idx_patients_doctor ON patients(assigned_doctor_id);
CREATE INDEX idx_patients_status ON patients(status);

-- Appointment indexes
CREATE INDEX idx_appointments_patient ON appointments(patient_id);
CREATE INDEX idx_appointments_doctor ON appointments(doctor_id);
CREATE INDEX idx_appointments_date ON appointments(appointment_date);
CREATE INDEX idx_appointments_status ON appointments(status);

-- Message indexes
CREATE INDEX idx_messages_thread ON messages(thread_id);
CREATE INDEX idx_messages_sender ON messages(sender_id);
CREATE INDEX idx_message_threads_patient ON message_threads(patient_id);

-- Document indexes
CREATE INDEX idx_documents_patient ON documents(patient_id);
CREATE INDEX idx_documents_type ON documents(document_type);
CREATE INDEX idx_documents_status ON documents(status);

-- Audit indexes
CREATE INDEX idx_audit_logs_user ON audit_logs(user_id);
CREATE INDEX idx_audit_logs_table ON audit_logs(table_name);
CREATE INDEX idx_audit_logs_created ON audit_logs(created_at);
```

## 3. Technology Stack Documentation

### Backend Setup

#### Package.json Dependencies
```json
{
  "dependencies": {
    "express": "^4.18.2",
    "@supabase/supabase-js": "^2.39.0",
    "bcryptjs": "^2.4.3",
    "jsonwebtoken": "^9.0.2",
    "zod": "^3.22.4",
    "helmet": "^7.1.0",
    "cors": "^2.8.5",
    "express-rate-limit": "^7.1.5",
    "express-validator": "^7.0.1",
    "multer": "^1.4.5-lts.1",
    "uuid": "^9.0.1",
    "dotenv": "^16.3.1"
  },
  "devDependencies": {
    "@types/express": "^4.17.21",
    "@types/bcryptjs": "^2.4.6",
    "@types/jsonwebtoken": "^9.0.5",
    "@types/cors": "^2.8.17",
    "@types/multer": "^1.4.11",
    "@types/uuid": "^9.0.7",
    "typescript": "^5.3.3",
    "ts-node": "^10.9.2",
    "nodemon": "^3.0.2"
  }
}
```

#### Environment Variables
```env
# Supabase Configuration
SUPABASE_URL=your_supabase_project_url
SUPABASE_ANON_KEY=your_supabase_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_supabase_service_role_key

# JWT Configuration
JWT_SECRET=your_jwt_secret_key
JWT_EXPIRES_IN=24h

# Server Configuration
PORT=3001
NODE_ENV=production

# File Upload Configuration
MAX_FILE_SIZE=10485760
ALLOWED_FILE_TYPES=pdf,doc,docx,jpg,jpeg,png
UPLOAD_PATH=./uploads

# Rate Limiting
RATE_LIMIT_WINDOW_MS=900000
RATE_LIMIT_MAX_REQUESTS=100
```

#### Express Server Setup
```typescript
// server.ts
import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import rateLimit from 'express-rate-limit';
import dotenv from 'dotenv';

dotenv.config();

const app = express();

// Security middleware
app.use(helmet());
app.use(cors({
  origin: process.env.FRONTEND_URL,
  credentials: true
}));

// Rate limiting
const limiter = rateLimit({
  windowMs: parseInt(process.env.RATE_LIMIT_WINDOW_MS || '900000'),
  max: parseInt(process.env.RATE_LIMIT_MAX_REQUESTS || '100')
});
app.use(limiter);

// Body parsing
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true }));

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/patients', patientRoutes);
app.use('/api/appointments', appointmentRoutes);
app.use('/api/messages', messageRoutes);
app.use('/api/prescriptions', prescriptionRoutes);
app.use('/api/care-plans', carePlanRoutes);
app.use('/api/documents', documentRoutes);
app.use('/api/billing', billingRoutes);

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
```

## 4. HIPAA Compliance Implementation

### Data Encryption
- **At Rest**: Supabase provides AES-256 encryption for all data
- **In Transit**: TLS 1.3 for all API communications
- **Field-level Encryption**: Sensitive PHI fields encrypted with application-level keys

### Access Controls
```typescript
// Role-based access control middleware
const requireRole = (roles: string[]) => {
  return (req: Request, res: Response, next: NextFunction) => {
    const userRole = req.user?.role;
    if (!roles.includes(userRole)) {
      return res.status(403).json({ error: 'Insufficient permissions' });
    }
    next();
  };
};

// Usage: app.get('/api/patients', requireRole(['admin', 'doctor']), patientController.list);
```

### Audit Logging
```typescript
// Audit middleware
const auditLog = (action: string, tableName: string) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    const originalSend = res.send;
    res.send = function(data) {
      // Log after response is sent
      const auditData = {
        user_id: req.user?.id,
        action,
        table_name: tableName,
        record_id: req.params.id,
        old_values: req.body.oldValues,
        new_values: req.body,
        ip_address: req.ip,
        user_agent: req.get('User-Agent')
      };
      
      // Async audit logging
      supabase.from('audit_logs').insert(auditData).catch(console.error);
      
      return originalSend.call(this, data);
    };
    next();
  };
};
```

### PHI Handling
```typescript
// PHI field encryption/decryption utilities
import crypto from 'crypto';

const encryptPHI = (text: string): string => {
  const algorithm = 'aes-256-cbc';
  const key = Buffer.from(process.env.ENCRYPTION_KEY!, 'hex');
  const iv = crypto.randomBytes(16);
  
  const cipher = crypto.createCipher(algorithm, key);
  let encrypted = cipher.update(text, 'utf8', 'hex');
  encrypted += cipher.final('hex');
  
  return iv.toString('hex') + ':' + encrypted;
};

const decryptPHI = (encryptedText: string): string => {
  const algorithm = 'aes-256-cbc';
  const key = Buffer.from(process.env.ENCRYPTION_KEY!, 'hex');
  const [ivHex, encrypted] = encryptedText.split(':');
  const iv = Buffer.from(ivHex, 'hex');
  
  const decipher = crypto.createDecipher(algorithm, key);
  let decrypted = decipher.update(encrypted, 'hex', 'utf8');
  decrypted += decipher.final('utf8');
  
  return decrypted;
};
```

## 5. Integration Guide

### Frontend API Integration

#### API Client Setup
```typescript
// lib/api-client.ts
class ApiClient {
  private baseURL: string;
  private token: string | null;

  constructor() {
    this.baseURL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001/api';
    this.token = typeof window !== 'undefined' ? localStorage.getItem('admin_token') : null;
  }

  private async request<T>(endpoint: string, options: RequestInit = {}): Promise<T> {
    const url = `${this.baseURL}${endpoint}`;
    const headers: HeadersInit = {
      'Content-Type': 'application/json',
      ...options.headers,
    };

    if (this.token) {
      headers.Authorization = `Bearer ${this.token}`;
    }

    const response = await fetch(url, {
      ...options,
      headers,
    });

    if (!response.ok) {
      throw new Error(`API Error: ${response.status} ${response.statusText}`);
    }

    return response.json();
  }

  // Patient methods
  async getPatients(params?: any): Promise<Patient[]> {
    const queryString = new URLSearchParams(params).toString();
    return this.request<Patient[]>(`/patients?${queryString}`);
  }

  async getPatient(id: string): Promise<Patient> {
    return this.request<Patient>(`/patients/${id}`);
  }

  async createPatient(data: CreatePatientData): Promise<Patient> {
    return this.request<Patient>('/patients', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  }

  // Add other entity methods...
}

export const apiClient = new ApiClient();
```

#### Context Integration
```typescript
// contexts/PatientContext.tsx
import { apiClient } from '@/lib/api-client';

export const usePatients = () => {
  const [patients, setPatients] = useState<Patient[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchPatients = async (params?: any) => {
    setLoading(true);
    setError(null);
    try {
      const data = await apiClient.getPatients(params);
      setPatients(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch patients');
    } finally {
      setLoading(false);
    }
  };

  const createPatient = async (patientData: CreatePatientData) => {
    try {
      const newPatient = await apiClient.createPatient(patientData);
      setPatients(prev => [...prev, newPatient]);
      return newPatient;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to create patient');
      throw err;
    }
  };

  return {
    patients,
    loading,
    error,
    fetchPatients,
    createPatient,
  };
};
```

### Error Handling Patterns
```typescript
// lib/error-handler.ts
export class ApiError extends Error {
  constructor(
    public status: number,
    public message: string,
    public code?: string
  ) {
    super(message);
    this.name = 'ApiError';
  }
}

export const handleApiError = (error: unknown): ApiError => {
  if (error instanceof ApiError) {
    return error;
  }
  
  if (error instanceof Error) {
    return new ApiError(500, error.message);
  }
  
  return new ApiError(500, 'An unexpected error occurred');
};
```

### Real-time Updates with Supabase
```typescript
// lib/supabase-realtime.ts
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

export const subscribeToTable = (
  table: string,
  callback: (payload: any) => void
) => {
  return supabase
    .channel(`public:${table}`)
    .on('postgres_changes', 
      { event: '*', schema: 'public', table },
      callback
    )
    .subscribe();
};

// Usage in components
useEffect(() => {
  const subscription = subscribeToTable('appointments', (payload) => {
    if (payload.eventType === 'INSERT') {
      // Handle new appointment
    } else if (payload.eventType === 'UPDATE') {
      // Handle appointment update
    }
  });

  return () => {
    subscription.unsubscribe();
  };
}, []);
```

## 6. Code Examples

### API Route Implementation
```typescript
// routes/patients.ts
import express from 'express';
import { z } from 'zod';
import { supabase } from '../lib/supabase';
import { requireAuth, requireRole } from '../middleware/auth';
import { auditLog } from '../middleware/audit';

const router = express.Router();

// Validation schemas
const createPatientSchema = z.object({
  first_name: z.string().min(1).max(100),
  last_name: z.string().min(1).max(100),
  date_of_birth: z.string().regex(/^\d{4}-\d{2}-\d{2}$/),
  email: z.string().email().optional(),
  phone: z.string().optional(),
  address: z.string().optional(),
  emergency_contact_name: z.string().optional(),
  emergency_contact_phone: z.string().optional(),
  emergency_contact_relationship: z.string().optional(),
  assigned_doctor_id: z.string().uuid().optional(),
});

// GET /api/patients
router.get('/', requireAuth, requireRole(['admin', 'doctor']), async (req, res) => {
  try {
    const { page = 1, limit = 20, search, status } = req.query;
    const offset = (Number(page) - 1) * Number(limit);

    let query = supabase
      .from('patients')
      .select('*, users(first_name, last_name)')
      .range(offset, offset + Number(limit) - 1);

    if (search) {
      query = query.or(`first_name.ilike.%${search}%,last_name.ilike.%${search}%,mrn.ilike.%${search}%`);
    }

    if (status) {
      query = query.eq('status', status);
    }

    const { data, error, count } = await query;

    if (error) throw error;

    res.json({
      patients: data,
      pagination: {
        page: Number(page),
        limit: Number(limit),
        total: count,
        totalPages: Math.ceil((count || 0) / Number(limit))
      }
    });
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch patients' });
  }
});

// POST /api/patients
router.post('/', 
  requireAuth, 
  requireRole(['admin', 'doctor']), 
  auditLog('CREATE', 'patients'),
  async (req, res) => {
    try {
      const validatedData = createPatientSchema.parse(req.body);
      
      // Generate MRN
      const mrn = `MRN${Date.now()}${Math.random().toString(36).substr(2, 5).toUpperCase()}`;
      
      const { data, error } = await supabase
        .from('patients')
        .insert([{ ...validatedData, mrn }])
        .select()
        .single();

      if (error) throw error;

      res.status(201).json(data);
    } catch (error) {
      if (error instanceof z.ZodError) {
        res.status(400).json({ error: 'Validation error', details: error.errors });
      } else {
        res.status(500).json({ error: 'Failed to create patient' });
      }
    }
  }
);

export default router;
```

### Database Queries
```typescript
// lib/database.ts
export class PatientService {
  async getPatientWithDetails(id: string) {
    const { data, error } = await supabase
      .from('patients')
      .select(`
        *,
        users!patients_assigned_doctor_id_fkey(first_name, last_name),
        insurance_info(*),
        appointments(*),
        prescriptions(*),
        care_plans(*),
        documents(*)
      `)
      .eq('id', id)
      .single();

    if (error) throw error;
    return data;
  }

  async getPatientActivity(id: string, limit = 10) {
    const { data, error } = await supabase
      .from('audit_logs')
      .select('*')
      .eq('record_id', id)
      .or(`table_name.eq.appointments,table_name.eq.prescriptions,table_name.eq.documents`)
      .order('created_at', { ascending: false })
      .limit(limit);

    if (error) throw error;
    return data;
  }
}
```

### Authentication Flow
```typescript
// routes/auth.ts
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    // Get user from database
    const { data: user, error } = await supabase
      .from('users')
      .select('*')
      .eq('email', email)
      .eq('is_active', true)
      .single();

    if (error || !user) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    // Verify password
    const isValidPassword = await bcrypt.compare(password, user.password_hash);
    if (!isValidPassword) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    // Generate JWT token
    const token = jwt.sign(
      { 
        userId: user.id, 
        email: user.email, 
        role: user.role 
      },
      process.env.JWT_SECRET!,
      { expiresIn: process.env.JWT_EXPIRES_IN }
    );

    // Update last login
    await supabase
      .from('users')
      .update({ last_login: new Date().toISOString() })
      .eq('id', user.id);

    res.json({
      token,
      user: {
        id: user.id,
        email: user.email,
        firstName: user.first_name,
        lastName: user.last_name,
        role: user.role
      }
    });
  } catch (error) {
    res.status(500).json({ error: 'Login failed' });
  }
});
```

## Deployment Guide

### Vercel Configuration
```json
// vercel.json
{
  "version": 2,
  "builds": [
    {
      "src": "server.ts",
      "use": "@vercel/node"
    }
  ],
  "routes": [
    {
      "src": "/api/(.*)",
      "dest": "/server.ts"
    }
  ],
  "env": {
    "SUPABASE_URL": "@supabase_url",
    "SUPABASE_ANON_KEY": "@supabase_anon_key",
    "SUPABASE_SERVICE_ROLE_KEY": "@supabase_service_role_key",
    "JWT_SECRET": "@jwt_secret"
  }
}
```

### Environment Setup
1. Create Supabase project
2. Set up database schema
3. Configure environment variables
4. Deploy to Vercel
5. Update frontend API endpoints

This documentation provides a comprehensive foundation for implementing a HIPAA-compliant backend for your healthcare admin portal. The implementation prioritizes security, scalability, and maintainability while ensuring compliance with healthcare data regulations. 