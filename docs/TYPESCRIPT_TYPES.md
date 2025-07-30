# TypeScript Types Reference

## Core Interfaces

### User Types
```typescript
export interface User {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  role: UserRole;
  isActive: boolean;
  lastLogin?: string;
  createdAt: string;
  updatedAt: string;
}

export type UserRole = 'admin' | 'doctor' | 'nurse' | 'receptionist';

export interface CreateUserData {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  role: UserRole;
}

export interface UpdateUserData {
  email?: string;
  firstName?: string;
  lastName?: string;
  role?: UserRole;
  isActive?: boolean;
}
```

### Patient Types
```typescript
export interface Patient {
  id: string;
  mrn: string; // Medical Record Number
  firstName: string;
  lastName: string;
  dateOfBirth: string;
  email?: string;
  phone?: string;
  address?: string;
  emergencyContact?: EmergencyContact;
  insurance?: InsuranceInfo;
  assignedDoctor?: User;
  status: PatientStatus;
  lastVisit?: string;
  nextAppointment?: string;
  outstandingBalance?: number;
  recentActivity?: ActivityItem[];
  medicalHistory?: MedicalHistory;
  quickStats?: QuickStats;
  createdAt: string;
  updatedAt: string;
}

export interface EmergencyContact {
  name: string;
  relationship: string;
  phone: string;
}

export interface InsuranceInfo {
  id: string;
  provider: string;
  memberId: string;
  groupNumber?: string;
  status: InsuranceStatus;
  effectiveDate?: string;
  expirationDate?: string;
}

export type PatientStatus = 'active' | 'inactive' | 'deceased';
export type InsuranceStatus = 'active' | 'inactive' | 'expired';

export interface ActivityItem {
  id: string;
  type: ActivityType;
  title: string;
  date: string;
  status: ActivityStatus;
  description: string;
}

export type ActivityType = 'appointment' | 'message' | 'document' | 'payment' | 'prescription';
export type ActivityStatus = 'completed' | 'pending' | 'cancelled';

export interface MedicalHistory {
  conditions: string[];
  allergies: string[];
  medications: string[];
}

export interface QuickStats {
  totalAppointments: number;
  pendingDocuments: number;
  activePrescriptions: number;
  unreadMessages: number;
}

export interface CreatePatientData {
  firstName: string;
  lastName: string;
  dateOfBirth: string;
  email?: string;
  phone?: string;
  address?: string;
  emergencyContactName?: string;
  emergencyContactPhone?: string;
  emergencyContactRelationship?: string;
  assignedDoctorId?: string;
}

export interface UpdatePatientData extends Partial<CreatePatientData> {
  status?: PatientStatus;
}
```

### Appointment Types
```typescript
export interface Appointment {
  id: string;
  patient: Patient;
  doctor: User;
  appointmentDate: string;
  appointmentTime: string;
  durationMinutes: number;
  type: string;
  status: AppointmentStatus;
  notes?: string;
  createdAt: string;
  updatedAt: string;
}

export type AppointmentStatus = 'scheduled' | 'confirmed' | 'completed' | 'cancelled' | 'no-show';

export interface CreateAppointmentData {
  patientId: string;
  doctorId: string;
  appointmentDate: string;
  appointmentTime: string;
  durationMinutes?: number;
  type: string;
  notes?: string;
}

export interface UpdateAppointmentData extends Partial<CreateAppointmentData> {
  status?: AppointmentStatus;
}
```

### Message Types
```typescript
export interface MessageThread {
  id: string;
  patient: Patient;
  subject: string;
  category: MessageCategory;
  priority: MessagePriority;
  status: MessageStatus;
  assignedTo?: User;
  messages: Message[];
  lastMessageTime: string;
  unreadCount: number;
  createdAt: string;
  updatedAt: string;
}

export interface Message {
  id: string;
  threadId: string;
  senderId?: string;
  senderType: SenderType;
  sender: string;
  content: string;
  isRead: boolean;
  timestamp: string;
}

export type MessageCategory = 'appointment' | 'medication' | 'billing' | 'general' | 'urgent';
export type MessagePriority = 'low' | 'medium' | 'high';
export type MessageStatus = 'open' | 'in-progress' | 'closed';
export type SenderType = 'patient' | 'admin';

export interface CreateMessageThreadData {
  patientId: string;
  subject: string;
  category: MessageCategory;
  priority?: MessagePriority;
  assignedToId?: string;
  initialMessage: string;
}

export interface ReplyToThreadData {
  content: string;
}
```

### Prescription Types
```typescript
export interface Prescription {
  id: string;
  patient: Patient;
  doctor: User;
  medicationName: string;
  dosage: string;
  frequency: string;
  duration?: string;
  refillsRemaining: number;
  status: PrescriptionStatus;
  pharmacyInfo?: string;
  notes?: string;
  prescribedDate: string;
  createdAt: string;
  updatedAt: string;
}

export type PrescriptionStatus = 'active' | 'discontinued' | 'expired' | 'completed';

export interface CreatePrescriptionData {
  patientId: string;
  medicationName: string;
  dosage: string;
  frequency: string;
  duration?: string;
  refillsRemaining?: number;
  pharmacyInfo?: string;
  notes?: string;
}

export interface UpdatePrescriptionData extends Partial<CreatePrescriptionData> {
  status?: PrescriptionStatus;
}
```

### Care Plan Types
```typescript
export interface CarePlan {
  id: string;
  patient: Patient;
  doctor: User;
  type: string;
  status: CarePlanStatus;
  summary: string;
  progressPercentage: number;
  startDate: string;
  endDate?: string;
  nextReviewDate?: string;
  goals: CarePlanGoal[];
  medications: CarePlanMedication[];
  appointments: CarePlanAppointment[];
  createdAt: string;
  updatedAt: string;
}

export interface CarePlanGoal {
  id: string;
  goalText: string;
  isCompleted: boolean;
}

export interface CarePlanMedication {
  name: string;
  dosage: string;
  frequency: string;
}

export interface CarePlanAppointment {
  type: string;
  doctor: string;
  date: string;
  time: string;
}

export type CarePlanStatus = 'active' | 'completed' | 'archived';

export interface CreateCarePlanData {
  patientId: string;
  type: string;
  summary: string;
  startDate: string;
  endDate?: string;
  nextReviewDate?: string;
  goals: string[];
  medications: CarePlanMedication[];
  appointments: CarePlanAppointment[];
}

export interface UpdateCarePlanData extends Partial<CreateCarePlanData> {
  status?: CarePlanStatus;
  progressPercentage?: number;
}
```

### Document Types
```typescript
export interface Document {
  id: string;
  patient: Patient;
  uploadedBy: User;
  filename: string;
  originalFilename: string;
  filePath: string;
  fileSize: number;
  mimeType: string;
  documentType: DocumentType;
  status: DocumentStatus;
  notes?: string;
  uploadedDate: string;
  createdAt: string;
  updatedAt: string;
}

export type DocumentType = 'lab_result' | 'imaging' | 'test_result' | 'insurance' | 'forms' | 'prescription' | 'referral' | 'other';
export type DocumentStatus = 'pending' | 'reviewed' | 'available' | 'archived';

export interface CreateDocumentData {
  patientId: string;
  documentType: DocumentType;
  notes?: string;
}

export interface UpdateDocumentData {
  documentType?: DocumentType;
  status?: DocumentStatus;
  notes?: string;
}
```

### Billing Types
```typescript
export interface BillingTransaction {
  id: string;
  patient: Patient;
  appointment?: Appointment;
  amount: number;
  transactionType: TransactionType;
  paymentMethod?: PaymentMethod;
  description?: string;
  status: TransactionStatus;
  transactionDate: string;
  createdAt: string;
}

export type TransactionType = 'charge' | 'payment' | 'adjustment' | 'refund';
export type PaymentMethod = 'credit_card' | 'debit_card' | 'cash' | 'check' | 'insurance' | 'online';
export type TransactionStatus = 'pending' | 'completed' | 'failed' | 'cancelled';

export interface CreateTransactionData {
  patientId: string;
  appointmentId?: string;
  amount: number;
  transactionType: TransactionType;
  paymentMethod?: PaymentMethod;
  description?: string;
}

export interface PatientBillingInfo {
  id: string;
  name: string;
  email: string;
  phone: string;
  balance: number;
  status: BillingStatus;
  insurance?: InsuranceInfo;
  lastPayment?: string;
  nextAppointment?: string;
}

export type BillingStatus = 'current' | 'overdue' | 'pending';
```

## API Response Types

### Pagination
```typescript
export interface PaginationInfo {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
}

export interface PaginatedResponse<T> {
  data: T[];
  pagination: PaginationInfo;
}
```

### Authentication
```typescript
export interface LoginRequest {
  email: string;
  password: string;
}

export interface LoginResponse {
  token: string;
  user: User;
}

export interface AuthUser {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  role: UserRole;
  lastLogin?: string;
}
```

### Error Types
```typescript
export interface ApiError {
  error: string;
  details?: ValidationError[];
  code?: string;
}

export interface ValidationError {
  field: string;
  message: string;
}

export class ApiError extends Error {
  constructor(
    public status: number,
    public message: string,
    public code?: string,
    public details?: ValidationError[]
  ) {
    super(message);
    this.name = 'ApiError';
  }
}
```

## Request/Response Types

### Patient Endpoints
```typescript
// GET /api/patients
export interface GetPatientsQuery {
  page?: number;
  limit?: number;
  search?: string;
  status?: PatientStatus;
  doctor?: string;
}

export interface GetPatientsResponse extends PaginatedResponse<Patient> {
  patients: Patient[];
}

// GET /api/patients/:id
export interface GetPatientResponse extends Patient {
  appointments: Appointment[];
  prescriptions: Prescription[];
  carePlans: CarePlan[];
  documents: Document[];
  messages: MessageThread[];
}

// POST /api/patients
export interface CreatePatientRequest extends CreatePatientData {}
export interface CreatePatientResponse extends Patient {}

// PUT /api/patients/:id
export interface UpdatePatientRequest extends UpdatePatientData {}
export interface UpdatePatientResponse extends Patient {}
```

### Appointment Endpoints
```typescript
// GET /api/appointments
export interface GetAppointmentsQuery {
  page?: number;
  limit?: number;
  date?: string;
  status?: AppointmentStatus;
  doctor?: string;
  patient?: string;
}

export interface GetAppointmentsResponse extends PaginatedResponse<Appointment> {
  appointments: Appointment[];
}

// POST /api/appointments
export interface CreateAppointmentRequest extends CreateAppointmentData {}
export interface CreateAppointmentResponse extends Appointment {}
```

### Message Endpoints
```typescript
// GET /api/messages/threads
export interface GetMessageThreadsQuery {
  page?: number;
  limit?: number;
  status?: MessageStatus;
  priority?: MessagePriority;
  category?: MessageCategory;
}

export interface GetMessageThreadsResponse extends PaginatedResponse<MessageThread> {
  threads: MessageThread[];
}

// POST /api/messages/threads/:id/reply
export interface ReplyToThreadRequest extends ReplyToThreadData {}
export interface ReplyToThreadResponse extends Message {}
```

### Prescription Endpoints
```typescript
// GET /api/prescriptions
export interface GetPrescriptionsQuery {
  page?: number;
  limit?: number;
  status?: PrescriptionStatus;
  patient?: string;
  doctor?: string;
}

export interface GetPrescriptionsResponse extends PaginatedResponse<Prescription> {
  prescriptions: Prescription[];
}

// POST /api/prescriptions
export interface CreatePrescriptionRequest extends CreatePrescriptionData {}
export interface CreatePrescriptionResponse extends Prescription {}
```

### Care Plan Endpoints
```typescript
// GET /api/care-plans
export interface GetCarePlansQuery {
  page?: number;
  limit?: number;
  status?: CarePlanStatus;
  patient?: string;
  type?: string;
}

export interface GetCarePlansResponse extends PaginatedResponse<CarePlan> {
  carePlans: CarePlan[];
}

// POST /api/care-plans
export interface CreateCarePlanRequest extends CreateCarePlanData {}
export interface CreateCarePlanResponse extends CarePlan {}
```

### Document Endpoints
```typescript
// GET /api/documents
export interface GetDocumentsQuery {
  page?: number;
  limit?: number;
  type?: DocumentType;
  status?: DocumentStatus;
  patient?: string;
}

export interface GetDocumentsResponse extends PaginatedResponse<Document> {
  documents: Document[];
}

// POST /api/documents
export interface UploadDocumentRequest extends CreateDocumentData {
  file: File;
}
export interface UploadDocumentResponse extends Document {}
```

### Billing Endpoints
```typescript
// GET /api/billing/patients
export interface GetBillingPatientsQuery {
  page?: number;
  limit?: number;
  status?: BillingStatus;
}

export interface GetBillingPatientsResponse extends PaginatedResponse<PatientBillingInfo> {
  patients: PatientBillingInfo[];
}

// GET /api/billing/transactions
export interface GetTransactionsQuery {
  page?: number;
  limit?: number;
  patient?: string;
  type?: TransactionType;
  dateFrom?: string;
  dateTo?: string;
}

export interface GetTransactionsResponse extends PaginatedResponse<BillingTransaction> {
  transactions: BillingTransaction[];
}

// POST /api/billing/payments
export interface CreatePaymentRequest extends CreateTransactionData {}
export interface CreatePaymentResponse extends BillingTransaction {}
```

## Utility Types

```typescript
// Generic CRUD operations
export interface CrudOperations<T, CreateData, UpdateData> {
  list(query?: any): Promise<PaginatedResponse<T>>;
  getById(id: string): Promise<T>;
  create(data: CreateData): Promise<T>;
  update(id: string, data: UpdateData): Promise<T>;
  delete(id: string): Promise<void>;
}

// API Client interface
export interface ApiClient {
  // Authentication
  login(credentials: LoginRequest): Promise<LoginResponse>;
  logout(): Promise<void>;
  getProfile(): Promise<AuthUser>;
  
  // Patients
  getPatients(query?: GetPatientsQuery): Promise<GetPatientsResponse>;
  getPatient(id: string): Promise<GetPatientResponse>;
  createPatient(data: CreatePatientRequest): Promise<CreatePatientResponse>;
  updatePatient(id: string, data: UpdatePatientRequest): Promise<UpdatePatientResponse>;
  deletePatient(id: string): Promise<void>;
  
  // Appointments
  getAppointments(query?: GetAppointmentsQuery): Promise<GetAppointmentsResponse>;
  getAppointment(id: string): Promise<Appointment>;
  createAppointment(data: CreateAppointmentRequest): Promise<CreateAppointmentResponse>;
  updateAppointment(id: string, data: UpdateAppointmentData): Promise<Appointment>;
  deleteAppointment(id: string): Promise<void>;
  
  // Messages
  getMessageThreads(query?: GetMessageThreadsQuery): Promise<GetMessageThreadsResponse>;
  getMessageThread(id: string): Promise<MessageThread>;
  createMessageThread(data: CreateMessageThreadData): Promise<MessageThread>;
  replyToThread(id: string, data: ReplyToThreadRequest): Promise<ReplyToThreadResponse>;
  
  // Prescriptions
  getPrescriptions(query?: GetPrescriptionsQuery): Promise<GetPrescriptionsResponse>;
  getPrescription(id: string): Promise<Prescription>;
  createPrescription(data: CreatePrescriptionRequest): Promise<CreatePrescriptionResponse>;
  updatePrescription(id: string, data: UpdatePrescriptionData): Promise<Prescription>;
  deletePrescription(id: string): Promise<void>;
  requestRefill(id: string): Promise<void>;
  
  // Care Plans
  getCarePlans(query?: GetCarePlansQuery): Promise<GetCarePlansResponse>;
  getCarePlan(id: string): Promise<CarePlan>;
  createCarePlan(data: CreateCarePlanRequest): Promise<CreateCarePlanResponse>;
  updateCarePlan(id: string, data: UpdateCarePlanData): Promise<CarePlan>;
  deleteCarePlan(id: string): Promise<void>;
  
  // Documents
  getDocuments(query?: GetDocumentsQuery): Promise<GetDocumentsResponse>;
  getDocument(id: string): Promise<Document>;
  uploadDocument(data: UploadDocumentRequest): Promise<UploadDocumentResponse>;
  updateDocument(id: string, data: UpdateDocumentData): Promise<Document>;
  deleteDocument(id: string): Promise<void>;
  downloadDocument(id: string): Promise<Blob>;
  
  // Billing
  getBillingPatients(query?: GetBillingPatientsQuery): Promise<GetBillingPatientsResponse>;
  getTransactions(query?: GetTransactionsQuery): Promise<GetTransactionsResponse>;
  createPayment(data: CreatePaymentRequest): Promise<CreatePaymentResponse>;
}
```

## Context Types

```typescript
// React Context types for state management
export interface PatientContextType {
  patients: Patient[];
  loading: boolean;
  error: string | null;
  fetchPatients: (params?: GetPatientsQuery) => Promise<void>;
  getPatient: (id: string) => Promise<Patient>;
  createPatient: (data: CreatePatientRequest) => Promise<Patient>;
  updatePatient: (id: string, data: UpdatePatientRequest) => Promise<Patient>;
  deletePatient: (id: string) => Promise<void>;
}

export interface AppointmentContextType {
  appointments: Appointment[];
  loading: boolean;
  error: string | null;
  fetchAppointments: (params?: GetAppointmentsQuery) => Promise<void>;
  createAppointment: (data: CreateAppointmentRequest) => Promise<Appointment>;
  updateAppointment: (id: string, data: UpdateAppointmentData) => Promise<Appointment>;
  deleteAppointment: (id: string) => Promise<void>;
}

export interface MessageContextType {
  messageThreads: MessageThread[];
  loading: boolean;
  error: string | null;
  fetchMessageThreads: (params?: GetMessageThreadsQuery) => Promise<void>;
  getMessageThread: (id: string) => Promise<MessageThread>;
  createMessageThread: (data: CreateMessageThreadData) => Promise<MessageThread>;
  replyToThread: (id: string, data: ReplyToThreadRequest) => Promise<Message>;
  markThreadAsRead: (id: string) => Promise<void>;
}

export interface PrescriptionContextType {
  prescriptions: Prescription[];
  loading: boolean;
  error: string | null;
  fetchPrescriptions: (params?: GetPrescriptionsQuery) => Promise<void>;
  createPrescription: (data: CreatePrescriptionRequest) => Promise<Prescription>;
  updatePrescription: (id: string, data: UpdatePrescriptionData) => Promise<Prescription>;
  deletePrescription: (id: string) => Promise<void>;
  requestRefill: (id: string) => Promise<void>;
}

export interface CarePlanContextType {
  carePlans: CarePlan[];
  loading: boolean;
  error: string | null;
  fetchCarePlans: (params?: GetCarePlansQuery) => Promise<void>;
  createCarePlan: (data: CreateCarePlanRequest) => Promise<CarePlan>;
  updateCarePlan: (id: string, data: UpdateCarePlanData) => Promise<CarePlan>;
  deleteCarePlan: (id: string) => Promise<void>;
}

export interface DocumentContextType {
  documents: Document[];
  loading: boolean;
  error: string | null;
  fetchDocuments: (params?: GetDocumentsQuery) => Promise<void>;
  uploadDocument: (data: UploadDocumentRequest) => Promise<Document>;
  updateDocument: (id: string, data: UpdateDocumentData) => Promise<Document>;
  deleteDocument: (id: string) => Promise<void>;
  downloadDocument: (id: string) => Promise<Blob>;
}
```

This comprehensive TypeScript types reference provides all the interfaces and types needed for implementing the HIPAA-compliant backend API and frontend integration. 