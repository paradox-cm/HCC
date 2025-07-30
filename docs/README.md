# HCC Healthcare Admin Portal

A comprehensive, HIPAA-compliant healthcare administration portal for Houston Cardiology Consultants (HCC). Built with Next.js, TypeScript, and modern UI components.

## Current Version: 2.2.0

### Latest Features (v2.2.0)
- **DataSync Context System**: Centralized data management across all admin portal sections
- **Cross-Section Data Synchronization**: Real-time data consistency between patient detail, appointments, messages, billing, and more
- **Enhanced Billing & Insurance**: Complete billing management with insurance verification and claims automation
- **Patient Analytics**: Advanced analytics dashboard with patient insights and trends
- **Import/Export Functionality**: Bulk data import and export capabilities for all sections
- **Responsive Design**: Optimized for all device sizes with mobile-first approach

### Previous Features (v2.1.0)
- **Billing & Insurance Management**: Complete billing system with patient accounts, insurance verification, and automated claims
- **Integration & Automation**: API integration, payment processing, and claims automation
- **Advanced Reporting**: Financial reports, patient billing analytics, and insurance claims tracking
- **Enhanced Patient Management**: Improved patient detail pages with comprehensive data views

## Key Features

### 🏥 **Patient Management**
- Comprehensive patient profiles with medical history
- Real-time patient data synchronization across all sections
- Advanced search and filtering capabilities
- Patient analytics and insights dashboard
- Bulk import/export functionality

### 📅 **Appointment Management**
- Calendar-based appointment scheduling
- Real-time availability tracking
- Automated reminders and notifications
- Appointment history and analytics
- Integration with patient data

### 💬 **Message Management**
- Secure patient-provider communication
- Message threading and categorization
- Priority-based message handling
- Real-time message synchronization
- Archive and search functionality

### 💊 **Prescription Management**
- Digital prescription creation and tracking
- Refill management and pharmacy integration
- Medication history and interactions
- Prescription analytics and reporting
- Integration with patient medical records

### 📋 **Care Plan Management**
- Comprehensive care plan creation and tracking
- Goal setting and progress monitoring
- Medication and appointment integration
- Care plan analytics and reporting
- Patient outcome tracking

### 📄 **Document Management**
- Secure document upload and storage
- Document categorization and tagging
- Version control and audit trails
- Document sharing and access controls
- Integration with patient records

### 💰 **Billing & Insurance**
- Complete billing management system
- Insurance verification and claims processing
- Payment processing and tracking
- Automated billing and claims submission
- Financial reporting and analytics
- Integration with patient accounts

### 🔄 **DataSync System**
- **Centralized Data Management**: Single source of truth for all patient data
- **Real-time Synchronization**: Changes in one section immediately reflect in others
- **Cross-Section Data Flow**: Patient detail ↔ Appointments ↔ Messages ↔ Billing
- **Consistent Data Types**: Unified interfaces across all sections
- **Scalable Architecture**: Ready for backend API integration

## Technology Stack

### Frontend
- **Next.js 14**: React framework with App Router
- **TypeScript**: Type-safe development
- **Tailwind CSS**: Utility-first CSS framework
- **Shadcn/ui**: Modern component library
- **Lucide React**: Icon library
- **Remix Icons**: Additional icon set

### Data Management
- **DataSync Context**: Centralized state management
- **React Context API**: Component state sharing
- **Local Storage**: Client-side data persistence
- **Mock Data**: Development and testing data

### Development Tools
- **ESLint**: Code linting
- **Prettier**: Code formatting
- **TypeScript**: Static type checking
- **Next.js Dev Tools**: Development utilities

## Getting Started

### Prerequisites
- Node.js 18+ 
- pnpm (recommended) or npm
- Git

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd hcc
   ```

2. **Install dependencies**
   ```bash
   pnpm install
   ```

3. **Start the development server**
   ```bash
   pnpm dev
   ```

4. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

### Environment Setup

Create a `.env.local` file in the root directory:

```env
# Development environment variables
NEXT_PUBLIC_APP_URL=http://localhost:3000
NEXT_PUBLIC_APP_NAME=HCC Admin Portal
```

## Project Structure

```
hcc/
├── app/                    # Next.js App Router
│   ├── (main)/            # Main application routes
│   ├── admin/             # Admin portal routes
│   ├── admin-login/       # Admin authentication
│   └── api/               # API routes
├── components/            # Reusable UI components
│   ├── ui/               # Shadcn/ui components
│   ├── layout/           # Layout components
│   └── forms/            # Form components
├── contexts/             # React Context providers
│   ├── DataSyncContext.tsx    # Centralized data management
│   ├── MessageContext.tsx     # Message management
│   ├── AppointmentContext.tsx # Appointment management
│   └── ...               # Other context providers
├── lib/                  # Utility functions
├── docs/                 # Documentation files
└── public/              # Static assets
```

## DataSync System Architecture

### Context Provider Structure
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

### Key Data Types
- **Patient**: Complete patient information with all related data
- **Appointment**: Appointment details with patient and doctor references
- **MessageThread**: Message threads with patient and admin messages
- **Prescription**: Prescription details with patient and medication info
- **Document**: Document management with patient references
- **CarePlan**: Care plan details with goals, medications, and appointments
- **Transaction**: Billing transactions with patient references
- **InsuranceClaim**: Insurance claims with patient and provider info

### Synchronization Functions
- **Sync Functions**: `syncPatientData`, `syncAppointmentData`, etc.
- **Add Functions**: `addPatient`, `addAppointment`, `addMessageThread`, etc.
- **Delete Functions**: `deletePatient`, `deleteAppointment`, `deleteMessageThread`, etc.
- **Get Functions**: `getPatientAppointments`, `getPatientMessages`, etc.
- **Update Related Data**: `updatePatientRelatedData`, `updateAppointmentRelatedData`

## Backend Integration Roadmap

### Phase 1: API Endpoint Mapping
- Map DataSync functions to REST API endpoints
- Implement API client for data operations
- Add authentication and authorization
- Replace mock data with real API calls

### Phase 2: Database Schema
- Design database tables matching DataSync types
- Implement foreign key relationships
- Add indexes for performance optimization
- Set up data migration scripts

### Phase 3: Real-time Updates
- Implement WebSocket connections for live updates
- Add optimistic updates for better UX
- Handle offline/online synchronization
- Implement conflict resolution strategies

### Phase 4: Performance & Security
- Implement data caching strategies
- Add rate limiting and request throttling
- Implement audit logging for data changes
- Add data validation and sanitization

## Development Guidelines

### Code Style
- Use TypeScript for all new code
- Follow ESLint and Prettier configurations
- Use meaningful variable and function names
- Add JSDoc comments for complex functions

### Component Guidelines
- Use functional components with hooks
- Implement proper error boundaries
- Follow the single responsibility principle
- Use TypeScript interfaces for props

### Data Management
- Use DataSync context for all data operations
- Implement proper error handling
- Add loading states for async operations
- Use optimistic updates where appropriate

## Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is proprietary software for Houston Cardiology Consultants.

## Support

For support and questions, please contact the development team or refer to the documentation in the `docs/` directory.

---

**Built with ❤️ for Houston Cardiology Consultants** 