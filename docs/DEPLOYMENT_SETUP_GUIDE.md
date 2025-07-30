# Deployment & Setup Guide

## Prerequisites

Before setting up the HIPAA-compliant backend, ensure you have:

- Node.js 18+ installed
- npm or pnpm package manager
- Git for version control
- Supabase account (free tier available)
- Vercel account (for deployment)

## 1. Supabase Setup

### Create Supabase Project

1. **Sign up/Login to Supabase**
   - Go to [supabase.com](https://supabase.com)
   - Create account or login

2. **Create New Project**
   - Click "New Project"
   - Choose organization
   - Enter project name: `hcc-healthcare-portal`
   - Enter database password (save this securely)
   - Choose region closest to your users
   - Click "Create new project"

3. **Get Project Credentials**
   - Go to Settings → API
   - Copy the following values:
     - Project URL
     - Anon (public) key
     - Service role (secret) key

### Database Schema Setup

1. **Access SQL Editor**
   - Go to SQL Editor in Supabase dashboard
   - Create new query

2. **Run Schema Scripts**
   ```sql
   -- Enable UUID extension
   CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
   
   -- Create users table
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

   -- Create patients table
   CREATE TABLE patients (
     id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
     mrn VARCHAR(50) UNIQUE NOT NULL,
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

   -- Continue with all other tables from the schema...
   ```

3. **Set up Row Level Security (RLS)**
   ```sql
   -- Enable RLS on all tables
   ALTER TABLE users ENABLE ROW LEVEL SECURITY;
   ALTER TABLE patients ENABLE ROW LEVEL SECURITY;
   ALTER TABLE appointments ENABLE ROW LEVEL SECURITY;
   -- ... enable for all tables

   -- Create policies (example for patients)
   CREATE POLICY "Users can view their own data" ON users
     FOR SELECT USING (auth.uid() = id);

   CREATE POLICY "Admins can view all patients" ON patients
     FOR ALL USING (
       EXISTS (
         SELECT 1 FROM users 
         WHERE users.id = auth.uid() 
         AND users.role IN ('admin', 'doctor')
       )
     );
   ```

4. **Create Indexes**
   ```sql
   -- Performance indexes
   CREATE INDEX idx_patients_mrn ON patients(mrn);
   CREATE INDEX idx_patients_name ON patients(last_name, first_name);
   CREATE INDEX idx_appointments_patient ON appointments(patient_id);
   CREATE INDEX idx_appointments_date ON appointments(appointment_date);
   -- ... all other indexes
   ```

## 2. Backend Setup

### Create Backend Directory

```bash
# Create backend directory
mkdir hcc-backend
cd hcc-backend

# Initialize package.json
npm init -y

# Install dependencies
npm install express @supabase/supabase-js bcryptjs jsonwebtoken zod helmet cors express-rate-limit express-validator multer uuid dotenv

# Install dev dependencies
npm install -D @types/express @types/bcryptjs @types/jsonwebtoken @types/cors @types/multer @types/uuid typescript ts-node nodemon
```

### Project Structure

```
hcc-backend/
├── src/
│   ├── config/
│   │   ├── database.ts
│   │   └── auth.ts
│   ├── middleware/
│   │   ├── auth.ts
│   │   ├── validation.ts
│   │   └── audit.ts
│   ├── routes/
│   │   ├── auth.ts
│   │   ├── patients.ts
│   │   ├── appointments.ts
│   │   ├── messages.ts
│   │   ├── prescriptions.ts
│   │   ├── care-plans.ts
│   │   ├── documents.ts
│   │   └── billing.ts
│   ├── services/
│   │   ├── patientService.ts
│   │   ├── appointmentService.ts
│   │   └── ...
│   ├── utils/
│   │   ├── encryption.ts
│   │   └── validation.ts
│   └── server.ts
├── uploads/
├── .env
├── .env.example
├── package.json
├── tsconfig.json
└── vercel.json
```

### Environment Configuration

Create `.env` file:

```env
# Supabase Configuration
SUPABASE_URL=your_supabase_project_url
SUPABASE_ANON_KEY=your_supabase_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_supabase_service_role_key

# JWT Configuration
JWT_SECRET=your_very_secure_jwt_secret_key_here
JWT_EXPIRES_IN=24h

# Server Configuration
PORT=3001
NODE_ENV=production
FRONTEND_URL=https://your-frontend-domain.com

# File Upload Configuration
MAX_FILE_SIZE=10485760
ALLOWED_FILE_TYPES=pdf,doc,docx,jpg,jpeg,png
UPLOAD_PATH=./uploads

# Rate Limiting
RATE_LIMIT_WINDOW_MS=900000
RATE_LIMIT_MAX_REQUESTS=100

# Encryption (for PHI)
ENCRYPTION_KEY=your_32_character_encryption_key_here
```

### TypeScript Configuration

Create `tsconfig.json`:

```json
{
  "compilerOptions": {
    "target": "ES2020",
    "module": "commonjs",
    "lib": ["ES2020"],
    "outDir": "./dist",
    "rootDir": "./src",
    "strict": true,
    "esModuleInterop": true,
    "skipLibCheck": true,
    "forceConsistentCasingInFileNames": true,
    "resolveJsonModule": true,
    "declaration": true,
    "declarationMap": true,
    "sourceMap": true
  },
  "include": ["src/**/*"],
  "exclude": ["node_modules", "dist"]
}
```

### Package.json Scripts

```json
{
  "scripts": {
    "dev": "nodemon src/server.ts",
    "build": "tsc",
    "start": "node dist/server.js",
    "lint": "eslint src/**/*.ts",
    "test": "jest"
  }
}
```

## 3. Frontend Integration

### Update Frontend Environment

Add to your Next.js `.env.local`:

```env
NEXT_PUBLIC_API_URL=http://localhost:3001/api
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
```

### Install Frontend Dependencies

```bash
# In your frontend directory
npm install @supabase/supabase-js
```

### Create API Client

Create `lib/api-client.ts`:

```typescript
import { ApiClient } from './types';

class ApiClientImpl implements ApiClient {
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

  // Implement all API methods...
}

export const apiClient = new ApiClientImpl();
```

## 4. Vercel Deployment

### Backend Deployment

1. **Create Vercel Project**
   ```bash
   # Install Vercel CLI
   npm i -g vercel

   # Login to Vercel
   vercel login

   # Deploy backend
   cd hcc-backend
   vercel
   ```

2. **Configure Vercel**
   Create `vercel.json`:

   ```json
   {
     "version": 2,
     "builds": [
       {
         "src": "dist/server.js",
         "use": "@vercel/node"
       }
     ],
     "routes": [
       {
         "src": "/api/(.*)",
         "dest": "/dist/server.js"
       }
     ],
     "env": {
       "SUPABASE_URL": "@supabase_url",
       "SUPABASE_ANON_KEY": "@supabase_anon_key",
       "SUPABASE_SERVICE_ROLE_KEY": "@supabase_service_role_key",
       "JWT_SECRET": "@jwt_secret",
       "ENCRYPTION_KEY": "@encryption_key"
     }
   }
   ```

3. **Set Environment Variables**
   ```bash
   vercel env add SUPABASE_URL
   vercel env add SUPABASE_ANON_KEY
   vercel env add SUPABASE_SERVICE_ROLE_KEY
   vercel env add JWT_SECRET
   vercel env add ENCRYPTION_KEY
   ```

### Frontend Deployment

1. **Update API URL**
   ```env
   NEXT_PUBLIC_API_URL=https://your-backend-domain.vercel.app/api
   ```

2. **Deploy to Vercel**
   ```bash
   # In your frontend directory
   vercel --prod
   ```

## 5. Security Configuration

### SSL/TLS Setup

Vercel automatically provides SSL certificates. For custom domains:

1. Add custom domain in Vercel dashboard
2. Configure DNS records
3. Vercel will provision SSL certificate

### CORS Configuration

Update backend CORS settings:

```typescript
// src/server.ts
app.use(cors({
  origin: [
    'https://your-frontend-domain.com',
    'http://localhost:3000' // for development
  ],
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));
```

### Rate Limiting

```typescript
// src/server.ts
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // limit each IP to 100 requests per windowMs
  message: 'Too many requests from this IP',
  standardHeaders: true,
  legacyHeaders: false,
});

app.use('/api/', limiter);
```

## 6. Testing Setup

### Backend Testing

```bash
# Install testing dependencies
npm install -D jest @types/jest supertest @types/supertest

# Create jest.config.js
```

```javascript
// jest.config.js
module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  roots: ['<rootDir>/src'],
  testMatch: ['**/__tests__/**/*.ts', '**/?(*.)+(spec|test).ts'],
  transform: {
    '^.+\\.ts$': 'ts-jest',
  },
};
```

### API Testing

Create test files:

```typescript
// src/__tests__/auth.test.ts
import request from 'supertest';
import { app } from '../server';

describe('Auth Endpoints', () => {
  test('POST /api/auth/login should authenticate user', async () => {
    const response = await request(app)
      .post('/api/auth/login')
      .send({
        email: 'admin@hcc.com',
        password: 'password123'
      });

    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty('token');
    expect(response.body).toHaveProperty('user');
  });
});
```

## 7. Monitoring & Logging

### Error Monitoring

1. **Set up Sentry**
   ```bash
   npm install @sentry/node @sentry/integrations
   ```

   ```typescript
   // src/server.ts
   import * as Sentry from '@sentry/node';

   Sentry.init({
     dsn: 'your-sentry-dsn',
     integrations: [
       new Sentry.Integrations.Http({ tracing: true }),
       new Sentry.Integrations.Express({ app }),
     ],
     tracesSampleRate: 1.0,
   });

   app.use(Sentry.Handlers.requestHandler());
   app.use(Sentry.Handlers.errorHandler());
   ```

### Health Checks

```typescript
// src/routes/health.ts
router.get('/health', async (req, res) => {
  try {
    // Check database connection
    const { data, error } = await supabase.from('users').select('count').limit(1);
    
    if (error) {
      return res.status(503).json({
        status: 'error',
        database: 'disconnected',
        timestamp: new Date().toISOString()
      });
    }

    res.json({
      status: 'healthy',
      database: 'connected',
      timestamp: new Date().toISOString()
    });
  } catch (error) {
    res.status(503).json({
      status: 'error',
      message: 'Health check failed',
      timestamp: new Date().toISOString()
    });
  }
});
```

## 8. HIPAA Compliance Checklist

### Technical Safeguards

- [ ] **Access Control**: Implement role-based access control
- [ ] **Audit Logging**: All PHI access is logged
- [ ] **Encryption**: Data encrypted at rest and in transit
- [ ] **Authentication**: Multi-factor authentication for admin access
- [ ] **Session Management**: Secure session handling with JWT
- [ ] **Input Validation**: All inputs validated and sanitized
- [ ] **Rate Limiting**: Prevent brute force attacks
- [ ] **CORS**: Proper CORS configuration
- [ ] **HTTPS**: All communications encrypted

### Administrative Safeguards

- [ ] **Security Policies**: Document security procedures
- [ ] **Training**: Staff training on HIPAA compliance
- [ ] **Incident Response**: Plan for security incidents
- [ ] **Business Associate Agreements**: With all third-party services
- [ ] **Risk Assessment**: Regular security assessments

### Physical Safeguards

- [ ] **Data Center Security**: Vercel provides this
- [ ] **Workstation Security**: Secure admin workstations
- [ ] **Device Control**: Control access to devices

## 9. Maintenance & Updates

### Regular Tasks

1. **Security Updates**
   ```bash
   # Weekly security updates
   npm audit
   npm update
   ```

2. **Database Backups**
   - Supabase provides automatic backups
   - Set up additional backup strategy if needed

3. **Monitoring**
   - Monitor error rates
   - Check performance metrics
   - Review audit logs

4. **Compliance Reviews**
   - Quarterly HIPAA compliance reviews
   - Annual security assessments
   - Update policies as needed

### Update Procedures

1. **Backend Updates**
   ```bash
   # Pull latest changes
   git pull origin main

   # Install dependencies
   npm install

   # Run tests
   npm test

   # Deploy
   vercel --prod
   ```

2. **Database Migrations**
   ```sql
   -- Run in Supabase SQL Editor
   -- Always backup before migrations
   ```

This deployment guide provides a complete setup for your HIPAA-compliant healthcare admin portal backend. Follow each section carefully and ensure all security measures are properly implemented before going live with patient data. 