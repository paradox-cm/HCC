# Technical Implementation Guide

## DataSync Context System

### Overview
The DataSync context system provides centralized data management across all admin portal sections, ensuring real-time synchronization and data consistency.

### Architecture

#### Context Provider Structure
```typescript
<DataSyncProvider>
  <MessageProvider>
    <AppointmentProvider>
      <PrescriptionProvider>
        <DocumentProvider>
          <CarePlanProvider>
            <AdminLayoutClient>{children}</AdminLayoutClient>
          </CarePlanProvider>
        </DocumentProvider>
      </PrescriptionProvider>
    </AppointmentProvider>
  </MessageProvider>
</DataSyncProvider>
```

#### Core Data Types
```typescript
export interface Patient {
  id: string | number
  name: string
  email: string
  phone: string
  dob: string
  address: string
  status: string
  assignedDoctor: string
  outstandingBalance: number
  lastVisit?: string
  nextAppointment?: string
  insurance: {
    provider: string
    memberId: string
    group: string
    status: string
  }
  emergencyContact: {
    name: string
    relationship: string
    phone: string
  }
  medicalHistory: {
    conditions: string[]
    allergies: string[]
    medications: string[]
  }
  quickStats: {
    totalAppointments: number
    pendingDocuments: number
    unreadMessages: number
    activePrescriptions: number
  }
  recentActivity: Array<{
    id: number
    type: string
    title: string
    date: string
    status: string
    description: string
  }>
  billing: {
    lastPayment: {
      amount: number
      date: string
      method: string
    }
    paymentHistory: Array<{
      id: number
      amount: number
      date: string
      method: string
      description: string
    }>
  }
}
```

#### Synchronization Functions
```typescript
interface DataSyncContextType {
  // Centralized data
  patients: Patient[]
  appointments: Appointment[]
  messageThreads: MessageThread[]
  prescriptions: Prescription[]
  documents: Document[]
  carePlans: CarePlan[]
  transactions: Transaction[]
  insuranceClaims: InsuranceClaim[]
  
  // Data synchronization functions
  syncPatientData: (patientId: string | number, updates: Partial<Patient>) => void
  syncAppointmentData: (appointmentId: number, updates: Partial<Appointment>) => void
  syncMessageData: (threadId: number, updates: Partial<MessageThread>) => void
  syncPrescriptionData: (prescriptionId: number, updates: Partial<Prescription>) => void
  syncDocumentData: (documentId: number, updates: Partial<Document>) => void
  syncCarePlanData: (carePlanId: number, updates: Partial<CarePlan>) => void
  syncTransactionData: (transactionId: number, updates: Partial<Transaction>) => void
  syncInsuranceClaimData: (claimId: number, updates: Partial<InsuranceClaim>) => void
  
  // Add new data
  addPatient: (patient: Omit<Patient, 'id'>) => void
  addAppointment: (appointment: Omit<Appointment, 'id'>) => void
  addMessageThread: (thread: Omit<MessageThread, 'id'>) => void
  addPrescription: (prescription: Omit<Prescription, 'id'>) => void
  addDocument: (document: Omit<Document, 'id'>) => void
  addCarePlan: (carePlan: Omit<CarePlan, 'id'>) => void
  addTransaction: (transaction: Omit<Transaction, 'id'>) => void
  addInsuranceClaim: (claim: Omit<InsuranceClaim, 'id'>) => void
  
  // Delete data
  deletePatient: (patientId: string | number) => void
  deleteAppointment: (appointmentId: number) => void
  deleteMessageThread: (threadId: number) => void
  deletePrescription: (prescriptionId: number) => void
  deleteDocument: (documentId: number) => void
  deleteCarePlan: (carePlanId: number) => void
  deleteTransaction: (transactionId: number) => void
  deleteInsuranceClaim: (claimId: number) => void
  
  // Get data by patient
  getPatientAppointments: (patientId: string | number) => Appointment[]
  getPatientMessages: (patientId: string | number) => MessageThread[]
  getPatientPrescriptions: (patientId: string | number) => Prescription[]
  getPatientDocuments: (patientId: string | number) => Document[]
  getPatientCarePlans: (patientId: string | number) => CarePlan[]
  getPatientTransactions: (patientId: string | number) => Transaction[]
  getPatientInsuranceClaims: (patientId: string | number) => InsuranceClaim[]
  
  // Update related data when primary data changes
  updatePatientRelatedData: (patientId: string | number, updates: Partial<Patient>) => void
  updateAppointmentRelatedData: (appointmentId: number, updates: Partial<Appointment>) => void
}
```

### Usage Patterns

#### Basic Data Synchronization
```typescript
const { syncPatientData, updatePatientRelatedData } = useDataSync()

// Update patient data
syncPatientData(patientId, { name: "New Name", email: "new@email.com" })

// Update patient and all related data
updatePatientRelatedData(patientId, { 
  name: "New Name",
  email: "new@email.com" 
})
```

#### Cross-Section Data Flow
```typescript
// Adding appointment with patient sync
const { addAppointment, updatePatientRelatedData } = useDataSync()

const handleScheduleAppointment = () => {
  addAppointment({
    patientId: currentPatient.id,
    patientName: currentPatient.name,
    doctorId: 1,
    doctorName: appointmentData.doctor,
    date: appointmentData.date,
    time: appointmentData.time,
    type: appointmentData.type,
    status: "scheduled",
    notes: appointmentData.notes
  })
  
  // Update patient's next appointment
  updatePatientRelatedData(currentPatient.id, { 
    nextAppointment: appointmentData.date 
  })
}
```

#### Real-time Updates
```typescript
// Message creation appears in messages page
const { addMessageThread } = useDataSync()

const handleSendMessage = () => {
  addMessageThread({
    patientId: currentPatient.id.toString(),
    patientName: currentPatient.name,
    patientEmail: currentPatient.email,
    subject: messageData.subject,
    category: messageData.category,
    priority: messageData.priority,
    status: "unread",
    assignedTo: messageData.assignedTo,
    messages: [
      {
        id: 1,
        from: "admin",
        sender: messageData.assignedTo,
        text: messageData.message,
        timestamp: new Date().toISOString()
      }
    ],
    lastMessageTime: new Date().toISOString()
  })
}
```

## Backend Integration Patterns

### API Client Implementation
```typescript
interface ApiClient {
  // Patient endpoints
  getPatients: (params?: PatientQueryParams) => Promise<Patient[]>
  getPatient: (id: string | number) => Promise<Patient>
  createPatient: (patient: Omit<Patient, 'id'>) => Promise<Patient>
  updatePatient: (id: string | number, updates: Partial<Patient>) => Promise<Patient>
  deletePatient: (id: string | number) => Promise<void>
  
  // Appointment endpoints
  getAppointments: (params?: AppointmentQueryParams) => Promise<Appointment[]>
  getAppointment: (id: number) => Promise<Appointment>
  createAppointment: (appointment: Omit<Appointment, 'id'>) => Promise<Appointment>
  updateAppointment: (id: number, updates: Partial<Appointment>) => Promise<Appointment>
  deleteAppointment: (id: number) => Promise<void>
  
  // Message endpoints
  getMessageThreads: (params?: MessageQueryParams) => Promise<MessageThread[]>
  getMessageThread: (id: number) => Promise<MessageThread>
  createMessageThread: (thread: Omit<MessageThread, 'id'>) => Promise<MessageThread>
  updateMessageThread: (id: number, updates: Partial<MessageThread>) => Promise<MessageThread>
  deleteMessageThread: (id: number) => Promise<void>
  
  // Billing endpoints
  getTransactions: (params?: TransactionQueryParams) => Promise<Transaction[]>
  createTransaction: (transaction: Omit<Transaction, 'id'>) => Promise<Transaction>
  getInsuranceClaims: (params?: ClaimQueryParams) => Promise<InsuranceClaim[]>
  createInsuranceClaim: (claim: Omit<InsuranceClaim, 'id'>) => Promise<InsuranceClaim>
  
  // Authentication
  login: (credentials: LoginCredentials) => Promise<AuthResponse>
  logout: () => Promise<void>
  refreshToken: () => Promise<AuthResponse>
}
```

### DataSync with API Integration
```typescript
// Enhanced DataSync context with API integration
interface DataSyncContextType {
  // ... existing properties
  
  // API integration
  apiClient: ApiClient
  isOnline: boolean
  syncQueue: SyncOperation[]
  
  // Enhanced sync functions with API
  syncPatientDataWithAPI: (patientId: string | number, updates: Partial<Patient>) => Promise<void>
  syncAppointmentDataWithAPI: (appointmentId: number, updates: Partial<Appointment>) => Promise<void>
  
  // Offline support
  queueSyncOperation: (operation: SyncOperation) => void
  processSyncQueue: () => Promise<void>
  
  // Real-time updates
  subscribeToUpdates: (entityType: string, entityId: string | number) => void
  unsubscribeFromUpdates: (entityType: string, entityId: string | number) => void
}
```

### Error Handling and Retry Logic
```typescript
const syncPatientDataWithRetry = async (
  patientId: string | number, 
  updates: Partial<Patient>,
  maxRetries: number = 3
) => {
  let lastError: Error | null = null
  
  for (let attempt = 1; attempt <= maxRetries; attempt++) {
    try {
      await apiClient.updatePatient(patientId, updates)
      syncPatientData(patientId, updates)
      return
    } catch (error) {
      lastError = error as Error
      
      if (attempt < maxRetries) {
        // Exponential backoff
        await new Promise(resolve => 
          setTimeout(resolve, Math.pow(2, attempt) * 1000)
        )
      }
    }
  }
  
  // If all retries failed, queue for later sync
  queueSyncOperation({
    type: 'UPDATE_PATIENT',
    entityId: patientId,
    data: updates,
    timestamp: new Date().toISOString()
  })
  
  throw lastError
}
```

### Real-time Updates with WebSockets
```typescript
interface WebSocketManager {
  connect: () => void
  disconnect: () => void
  subscribe: (channel: string, callback: (data: any) => void) => void
  unsubscribe: (channel: string) => void
  send: (channel: string, data: any) => void
}

// WebSocket integration with DataSync
const useRealTimeUpdates = () => {
  const { syncPatientData, syncAppointmentData } = useDataSync()
  const wsManager = useWebSocketManager()
  
  useEffect(() => {
    // Subscribe to patient updates
    wsManager.subscribe('patient-updates', (data) => {
      syncPatientData(data.patientId, data.updates)
    })
    
    // Subscribe to appointment updates
    wsManager.subscribe('appointment-updates', (data) => {
      syncAppointmentData(data.appointmentId, data.updates)
    })
    
    return () => {
      wsManager.unsubscribe('patient-updates')
      wsManager.unsubscribe('appointment-updates')
    }
  }, [])
}
```

## Performance Optimization

### Data Caching
```typescript
interface CacheManager {
  get: <T>(key: string) => T | null
  set: <T>(key: string, value: T, ttl?: number) => void
  delete: (key: string) => void
  clear: () => void
}

// Cached data fetching
const useCachedData = <T>(
  key: string,
  fetchFn: () => Promise<T>,
  ttl: number = 5 * 60 * 1000 // 5 minutes
) => {
  const [data, setData] = useState<T | null>(null)
  const [loading, setLoading] = useState(true)
  const cache = useCacheManager()
  
  useEffect(() => {
    const fetchData = async () => {
      // Check cache first
      const cached = cache.get<T>(key)
      if (cached) {
        setData(cached)
        setLoading(false)
        return
      }
      
      // Fetch from API
      try {
        const result = await fetchFn()
        cache.set(key, result, ttl)
        setData(result)
      } catch (error) {
        console.error('Failed to fetch data:', error)
      } finally {
        setLoading(false)
      }
    }
    
    fetchData()
  }, [key])
  
  return { data, loading }
}
```

### Optimistic Updates
```typescript
const useOptimisticUpdate = <T>(
  updateFn: (updates: Partial<T>) => Promise<void>,
  rollbackFn: (updates: Partial<T>) => void
) => {
  const [isUpdating, setIsUpdating] = useState(false)
  
  const update = async (updates: Partial<T>) => {
    setIsUpdating(true)
    
    try {
      // Apply optimistic update immediately
      updateFn(updates)
      
      // Attempt API update
      await apiClient.update(updates)
    } catch (error) {
      // Rollback on failure
      rollbackFn(updates)
      throw error
    } finally {
      setIsUpdating(false)
    }
  }
  
  return { update, isUpdating }
}
```

## Security Implementation

### Authentication and Authorization
```typescript
interface AuthManager {
  login: (credentials: LoginCredentials) => Promise<AuthResponse>
  logout: () => void
  refreshToken: () => Promise<AuthResponse>
  isAuthenticated: () => boolean
  hasPermission: (permission: string) => boolean
  getUser: () => User | null
}

// Protected API client
const createProtectedApiClient = (authManager: AuthManager): ApiClient => {
  const baseClient = createApiClient()
  
  return {
    ...baseClient,
    request: async (config: RequestConfig) => {
      if (!authManager.isAuthenticated()) {
        throw new Error('Authentication required')
      }
      
      // Add auth headers
      const token = authManager.getToken()
      config.headers = {
        ...config.headers,
        Authorization: `Bearer ${token}`
      }
      
      try {
        return await baseClient.request(config)
      } catch (error) {
        if (error.status === 401) {
          // Token expired, try to refresh
          await authManager.refreshToken()
          const newToken = authManager.getToken()
          config.headers.Authorization = `Bearer ${newToken}`
          return await baseClient.request(config)
        }
        throw error
      }
    }
  }
}
```

### Data Encryption
```typescript
interface EncryptionManager {
  encrypt: (data: string) => string
  decrypt: (encryptedData: string) => string
  encryptObject: <T>(obj: T) => string
  decryptObject: <T>(encryptedData: string) => T
}

// Encrypted data storage
const useEncryptedStorage = () => {
  const encryptionManager = useEncryptionManager()
  
  const setEncryptedItem = <T>(key: string, value: T) => {
    const encrypted = encryptionManager.encryptObject(value)
    localStorage.setItem(key, encrypted)
  }
  
  const getEncryptedItem = <T>(key: string): T | null => {
    const encrypted = localStorage.getItem(key)
    if (!encrypted) return null
    
    try {
      return encryptionManager.decryptObject<T>(encrypted)
    } catch (error) {
      console.error('Failed to decrypt data:', error)
      return null
    }
  }
  
  return { setEncryptedItem, getEncryptedItem }
}
```

## Testing Strategies

### Unit Testing DataSync Functions
```typescript
describe('DataSync Context', () => {
  let dataSyncContext: DataSyncContextType
  
  beforeEach(() => {
    dataSyncContext = createDataSyncContext()
  })
  
  test('should sync patient data across all sections', () => {
    const patientId = 'P001'
    const updates = { name: 'John Doe' }
    
    dataSyncContext.updatePatientRelatedData(patientId, updates)
    
    // Verify patient data is updated
    const patient = dataSyncContext.patients.find(p => p.id === patientId)
    expect(patient?.name).toBe('John Doe')
    
    // Verify related appointments are updated
    const appointments = dataSyncContext.getPatientAppointments(patientId)
    appointments.forEach(appointment => {
      expect(appointment.patientName).toBe('John Doe')
    })
  })
  
  test('should handle API failures gracefully', async () => {
    const mockApiClient = {
      updatePatient: jest.fn().mockRejectedValue(new Error('API Error'))
    }
    
    const dataSyncWithAPI = createDataSyncContextWithAPI(mockApiClient)
    
    await expect(
      dataSyncWithAPI.syncPatientDataWithAPI('P001', { name: 'John' })
    ).rejects.toThrow('API Error')
    
    // Verify operation was queued for retry
    expect(dataSyncWithAPI.syncQueue).toHaveLength(1)
  })
})
```

### Integration Testing
```typescript
describe('Cross-Section Data Flow', () => {
  test('appointment creation should update patient data', () => {
    const { addAppointment, updatePatientRelatedData } = useDataSync()
    
    const appointment = {
      patientId: 'P001',
      patientName: 'John Doe',
      date: '2024-02-20',
      time: '10:00 AM',
      type: 'Follow-up',
      status: 'scheduled'
    }
    
    addAppointment(appointment)
    updatePatientRelatedData('P001', { nextAppointment: '2024-02-20' })
    
    // Verify patient's next appointment is updated
    const patient = getPatient('P001')
    expect(patient.nextAppointment).toBe('2024-02-20')
  })
})
```

## Deployment Considerations

### Environment Configuration
```typescript
interface EnvironmentConfig {
  apiUrl: string
  wsUrl: string
  encryptionKey: string
  enableRealTime: boolean
  enableOffline: boolean
  cacheTTL: number
  retryAttempts: number
}

const getEnvironmentConfig = (): EnvironmentConfig => {
  const env = process.env.NODE_ENV
  
  switch (env) {
    case 'production':
      return {
        apiUrl: process.env.NEXT_PUBLIC_API_URL!,
        wsUrl: process.env.NEXT_PUBLIC_WS_URL!,
        encryptionKey: process.env.NEXT_PUBLIC_ENCRYPTION_KEY!,
        enableRealTime: true,
        enableOffline: true,
        cacheTTL: 5 * 60 * 1000, // 5 minutes
        retryAttempts: 3
      }
    case 'development':
      return {
        apiUrl: 'http://localhost:3001',
        wsUrl: 'ws://localhost:3001',
        encryptionKey: 'dev-key',
        enableRealTime: false,
        enableOffline: false,
        cacheTTL: 1 * 60 * 1000, // 1 minute
        retryAttempts: 1
      }
    default:
      throw new Error(`Unknown environment: ${env}`)
  }
}
```

### Performance Monitoring
```typescript
interface PerformanceMonitor {
  trackApiCall: (endpoint: string, duration: number, success: boolean) => void
  trackDataSync: (operation: string, duration: number, success: boolean) => void
  trackUserAction: (action: string, duration: number) => void
  getMetrics: () => PerformanceMetrics
}

const usePerformanceMonitoring = () => {
  const monitor = usePerformanceMonitor()
  
  const trackDataSyncOperation = async <T>(
    operation: string,
    syncFn: () => Promise<T>
  ): Promise<T> => {
    const startTime = performance.now()
    
    try {
      const result = await syncFn()
      const duration = performance.now() - startTime
      monitor.trackDataSync(operation, duration, true)
      return result
    } catch (error) {
      const duration = performance.now() - startTime
      monitor.trackDataSync(operation, duration, false)
      throw error
    }
  }
  
  return { trackDataSyncOperation }
}
```

This technical implementation guide provides comprehensive patterns for implementing the DataSync system and preparing for backend integration. The patterns ensure data consistency, performance optimization, and maintainable code structure. 