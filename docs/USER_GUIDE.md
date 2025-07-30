# HCC Admin Portal - User Guide

## Table of Contents
1. [Getting Started](#getting-started)
2. [Navigation](#navigation)
3. [Patient Management](#patient-management)
4. [Billing & Insurance Management](#billing--insurance-management)
5. [Analytics & Reporting](#analytics--reporting)
6. [Search & Filtering](#search--filtering)
7. [Export & Data Management](#export--data-management)
8. [Troubleshooting](#troubleshooting)

## Getting Started

### Accessing the Admin Portal

1. **Open your web browser** and navigate to the HCC website
2. **Click on "Admin Portal"** in the main navigation
3. **Enter your credentials**:
   - Username: Your admin username
   - Password: Your admin password
4. **Click "Sign In"** to access the portal
5. You'll be redirected to the **Dashboard** overview

### First-Time Setup

If this is your first time accessing the portal:

1. **Review the Dashboard** to understand key metrics
2. **Explore the navigation** to familiarize yourself with available sections
3. **Check your profile settings** in the top-right corner
4. **Review any notifications** or alerts

## Navigation

### Primary Navigation (Patient-Centric)

The primary navigation focuses on patient care workflows:

#### Dashboard
- **Purpose**: Overview of key metrics and recent activity
- **Key Features**: 
  - Total patient count
  - Recent appointments
  - Pending tasks
  - Quick access to common actions

#### Patients
- **Purpose**: Comprehensive patient management
- **Key Features**:
  - Patient list with search and filtering
  - Individual patient profiles
  - Bulk operations
  - Analytics dashboard

#### Appointments
- **Purpose**: Schedule and manage appointments
- **Key Features**:
  - Calendar view
  - Appointment creation and editing
  - Patient scheduling
  - Reminder management

#### Messages
- **Purpose**: Patient communication hub
- **Key Features**:
  - Message threads
  - Patient messaging
  - Notification management
  - Archive system

#### Billing & Insurance
- **Purpose**: Financial management and insurance integration
- **Key Features**:
  - Patient account management
  - Insurance verification API
  - Payment processing integration
  - Automated billing cycles
  - Claims automation
  - Financial reporting and analytics

### Secondary Navigation (Admin Tools)

Access administrative tools through the dropdown menu:

#### Prescriptions
- **Purpose**: Medication management
- **Access**: Admin Tools → Prescriptions

#### Care Plans
- **Purpose**: Treatment plan coordination
- **Access**: Admin Tools → Care Plans

#### Documents
- **Purpose**: File management
- **Access**: Admin Tools → Documents

#### Settings
- **Purpose**: System configuration
- **Access**: Admin Tools → Settings

## Patient Management

### Viewing the Patient List

1. **Navigate to Patients** from the primary navigation
2. **View the patient list** showing:
   - Patient name and photo
   - Contact information
   - Assigned doctor
   - Insurance provider
   - Status (Active/Inactive)
   - Last visit date

### Searching for Patients

#### Basic Search
1. **Locate the search bar** at the top of the patient list
2. **Type any search term**:
   - Patient name
   - Email address
   - Phone number
   - Insurance provider
3. **Results update automatically** as you type
4. **Clear the search** by clicking the "X" or deleting the text

#### Advanced Search Tips
- **Use quotes** for exact phrases: `"John Smith"`
- **Search by partial names**: `"John"` will find "John Smith", "Johnny Doe"
- **Search by insurance**: `"Blue Cross"` will find all Blue Cross patients

### Filtering Patients

#### Using Filters
1. **Click "Filters"** to expand the filter panel
2. **Select filter criteria**:
   - **Status**: Active, Inactive, Pending
   - **Assigned Doctor**: Filter by specific physician
   - **Insurance**: Filter by insurance provider
   - **Last Visit**: Date range selection
3. **Apply multiple filters** simultaneously
4. **View active filters** as badges below the search bar
5. **Clear individual filters** by clicking the "X" on filter badges
6. **Clear all filters** using the "Clear" button

#### Saving Filters
1. **Set up your desired filters** and search terms
2. **Click "Save Filter"** (appears when filters are active)
3. **Enter a name** for your filter (e.g., "Active Blue Cross Patients")
4. **Click "Save"** to store the filter
5. **Access saved filters** from the "Saved Filters" section

### Viewing Patient Details

1. **Click on any patient name** in the list
2. **View the patient detail page** with tabbed sections:
   - **Overview**: Basic information and quick actions
   - **Appointments**: Appointment history and scheduling
   - **Prescriptions**: Medication history and management
   - **Care Plans**: Treatment plans and progress
   - **Documents**: Patient files and records
   - **Messages**: Communication history
   - **Billing**: Financial information and insurance

### Bulk Operations

#### Selecting Multiple Patients
1. **Use checkboxes** to select individual patients
2. **Use "Select All"** checkbox to select all patients on the current page
3. **View selection count** in the header

#### Performing Bulk Actions
1. **Select patients** using checkboxes
2. **Choose an action** from the header:
   - **Delete Selected**: Remove patients from the system
   - **Export Selected**: Export patient data
3. **Confirm the action** in the dialog that appears
4. **Monitor progress** and view results

## Billing & Insurance Management

### Overview

The Billing & Insurance section provides comprehensive financial management capabilities with integrated insurance verification and automated processing.

### Patient Account Management

#### Viewing Patient Accounts
1. **Navigate to Billing & Insurance** section
2. **Select "Patient Accounts"** tab
3. **View patient list** with balance information
4. **Click on a patient** to view detailed account

#### Account Details
- **Current Balance**: Outstanding amount owed
- **Payment History**: Complete transaction history
- **Insurance Information**: Coverage details and status
- **Payment Methods**: Saved payment information

#### Processing Payments
1. **Select a patient** from the account list
2. **Click "Process Payment"** button
3. **Enter payment details**:
   - Amount to pay
   - Payment method (credit card, cash, check)
   - Payment notes
4. **Submit payment** and receive confirmation

### Insurance Verification

#### Real-Time Verification
1. **Navigate to Integrations** tab
2. **Click "Verify Insurance"** button
3. **Enter patient information**:
   - Insurance provider
   - Member ID
   - Group number (if applicable)
   - Date of birth
4. **Submit verification** request
5. **View results** including:
   - Coverage status
   - Effective dates
   - Deductible and copay information
   - Covered benefits

#### Verification Results
- **Active Coverage**: Patient has valid insurance
- **Coverage Details**: Specific benefits and limitations
- **Cost Sharing**: Deductible, copay, and coinsurance
- **Network Status**: In-network vs out-of-network

### Automated Billing

#### Setting Up Automated Billing
1. **Navigate to Integrations** tab
2. **Locate "Automated Billing"** section
3. **Enable automated billing** using the toggle switch
4. **Configure settings**:
   - **Billing Frequency**: Weekly, monthly, or quarterly
   - **Reminder Days**: Days before due date to send reminders
   - **Auto-charge**: Enable automatic charging of saved payment methods

#### Monitoring Automation
- **Status Indicator**: Shows if automation is active
- **Next Run Date**: When the next billing cycle will execute
- **Last Processed**: Number of accounts processed in last run
- **Success Rate**: Percentage of successful transactions

### Claims Automation

#### Setting Up Claims Automation
1. **Navigate to Integrations** tab
2. **Locate "Claims Automation"** section
3. **Enable claims automation** using the toggle switch
4. **Configure settings**:
   - **Auto-submit**: Automatically submit new claims
   - **Follow-up Days**: Days to wait before following up on claims
   - **Denial Retry**: Automatically retry denied claims

#### Claims Monitoring
- **Pending Claims**: Number of claims awaiting processing
- **Submitted Today**: Claims submitted in the current day
- **Approved Today**: Claims approved today
- **Denied Today**: Claims denied today

### Financial Reporting

#### Generating Reports
1. **Navigate to Reports** tab
2. **Select report type**:
   - Patient billing data
   - Transaction history
   - Insurance claims
   - Financial summary
3. **Set date range** for the report
4. **Choose export format**: CSV or PDF
5. **Generate and download** report

#### Report Types
- **Patient Billing Data**: Individual patient account information
- **Transaction History**: Complete payment and charge history
- **Insurance Claims**: Claims submitted and their status
- **Financial Summary**: Overall financial performance metrics

### Integration Monitoring

#### API Connection Status
1. **Navigate to Integrations** tab
2. **View connection status** for:
   - Insurance Providers API
   - Payment Processing API
   - Claims Submission API
3. **Test connections** using refresh buttons
4. **Monitor performance** and error rates

#### Troubleshooting Connections
- **Connection Issues**: Check API credentials and endpoints
- **Performance Problems**: Monitor response times and error rates
- **Security Alerts**: Review authentication and encryption settings

## Analytics & Reporting

### Dashboard Overview

The dashboard provides key metrics at a glance:

#### Key Metrics Cards
- **Total Patients**: Overall patient count
- **Active Patients**: Currently active patients
- **Recent Activity**: Patients with activity in the last 30 days
- **Inactive Patients**: Patients requiring attention

#### Recent Activity Feed
- **Latest patient registrations**
- **Recent appointments**
- **New messages**
- **System updates**

### Detailed Analytics

#### Accessing Analytics
1. **Navigate to Patients** section
2. **Click "Analytics"** button in the header
3. **View comprehensive analytics dashboard**

#### Analytics Sections

##### Key Metrics
- **Patient counts** by status
- **Activity percentages**
- **Trend indicators**

##### Distribution Analytics
- **Patient Distribution by Doctor**: See how patients are allocated
- **Patient Distribution by Insurance**: Insurance provider breakdown
- **Age Distribution**: Demographic analysis

##### Monthly Trends
- **Visit patterns** over the last 6 months
- **Registration trends**
- **Activity patterns**

##### Key Insights
- **Most Active Doctor**: Doctor with most patient interactions
- **Primary Insurance**: Most common insurance provider
- **Patient Retention**: Percentage of returning patients
- **Recent Engagement**: Activity in the last 30 days

### Custom Analytics

#### Filtering Analytics
1. **Apply filters** to the patient list
2. **View analytics** that reflect the filtered data
3. **Compare metrics** between different filter sets

#### Exporting Analytics
1. **Click "Export"** in the analytics section
2. **Choose format**: CSV or Report
3. **Download** the analytics file

## Search & Filtering

### Advanced Search Techniques

#### Multi-Field Search
The search bar searches across multiple fields:
- **Patient names** (first, last, full)
- **Email addresses**
- **Phone numbers**
- **Insurance providers**

#### Search Operators
- **Exact match**: Use quotes `"John Smith"`
- **Partial match**: Type part of a name `"John"`
- **Case insensitive**: Search works regardless of case

### Filter Combinations

#### Status + Doctor Filter
1. **Set Status** to "Active"
2. **Set Assigned Doctor** to specific physician
3. **View results** showing active patients for that doctor

#### Insurance + Date Range Filter
1. **Set Insurance** to specific provider
2. **Set Last Visit** date range
3. **View results** showing patients with that insurance who visited within the date range

#### Multiple Filter Combinations
- **Status + Doctor + Insurance**: Very specific patient groups
- **Date Range + Status**: Activity patterns
- **Doctor + Date Range**: Physician workload analysis

### Saved Filters Management

#### Creating Saved Filters
1. **Set up filters** and search terms
2. **Click "Save Filter"**
3. **Name your filter** descriptively
4. **Save** for future use

#### Managing Saved Filters
1. **Click "Saved Filters"** in the header
2. **View all saved filters** with their criteria
3. **Load a filter** by clicking "Load Filter"
4. **Delete filters** using the "X" button
5. **Edit filters** by loading and modifying them

#### Best Practices for Saved Filters
- **Use descriptive names**: "Active Blue Cross Patients - Dr. Smith"
- **Create filters for common workflows**: "New Patient Registration"
- **Organize by purpose**: "Billing", "Follow-up", "Scheduling"
- **Regular cleanup**: Remove unused filters

## Export & Data Management

### Exporting Patient Data

#### CSV Export
1. **Apply desired filters** to narrow your data
2. **Click "Export"** dropdown in the header
3. **Select "Export to CSV"**
4. **File downloads automatically** with timestamp
5. **Open in Excel** or other spreadsheet software

#### Report Export
1. **Click "Export"** dropdown
2. **Select "Export to Report"**
3. **Download formatted report** with analytics
4. **Use for presentations** or documentation

### Data Management Best Practices

#### Regular Data Review
1. **Review inactive patients** monthly
2. **Update patient information** as needed
3. **Clean up duplicate entries**
4. **Verify insurance information**

#### Backup and Security
1. **Export important data** regularly
2. **Store backups** in secure locations
3. **Follow HIPAA guidelines** for data handling
4. **Use secure connections** when accessing the portal

### Bulk Data Operations

#### Exporting Selected Patients
1. **Select specific patients** using checkboxes
2. **Click "Export Selected"**
3. **Choose export format**
4. **Download filtered data**

#### Bulk Patient Management
1. **Select multiple patients**
2. **Perform bulk actions**:
   - Update status
   - Assign to doctor
   - Export data
   - Delete (with confirmation)

## Troubleshooting

### Common Issues

#### Search Not Working
**Problem**: Search results don't match expectations
**Solutions**:
- Check spelling and case sensitivity
- Try partial searches
- Clear filters that might be interfering
- Refresh the page

#### Filters Not Applying
**Problem**: Filters don't seem to work
**Solutions**:
- Ensure filters are properly selected
- Check for conflicting filters
- Clear all filters and start over
- Verify data exists for the filter criteria

#### Export Issues
**Problem**: Export doesn't work or file is corrupted
**Solutions**:
- Check browser download settings
- Try a different browser
- Ensure sufficient disk space
- Contact support if issue persists

#### Performance Issues
**Problem**: Page loads slowly or freezes
**Solutions**:
- Clear browser cache
- Close other browser tabs
- Check internet connection
- Refresh the page

### Getting Help

#### Contact Support
- **Email**: admin-support@hcc.com
- **Phone**: (555) 123-4567
- **Hours**: Monday-Friday, 8 AM - 6 PM

#### System Requirements
- **Browser**: Chrome, Firefox, Safari, Edge (latest versions)
- **Internet**: Stable broadband connection
- **Screen Resolution**: Minimum 1024x768
- **JavaScript**: Must be enabled

#### Training Resources
- **Video Tutorials**: Available in the help section
- **User Manual**: Complete documentation
- **Training Sessions**: Scheduled monthly
- **FAQ**: Common questions and answers

---

## Quick Reference

### Keyboard Shortcuts
- **Ctrl/Cmd + F**: Open search
- **Ctrl/Cmd + S**: Save current view
- **Escape**: Close modals/dialogs
- **Tab**: Navigate between fields

### Common Workflows

#### Daily Patient Review
1. Check dashboard for new patients
2. Review recent activity
3. Check for pending tasks
4. Review patient messages

#### Weekly Reporting
1. Export patient analytics
2. Review doctor workload
3. Check insurance distribution
4. Generate activity reports

#### Monthly Maintenance
1. Review inactive patients
2. Update patient information
3. Clean up saved filters
4. Backup important data

This user guide provides comprehensive instructions for using all features of the HCC Admin Portal. For additional support or training, please contact the administrative team. 