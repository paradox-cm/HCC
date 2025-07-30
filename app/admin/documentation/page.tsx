"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { 
  BookOpen, 
  Code, 
  Users, 
  FileText, 
  Download, 
  ExternalLink,
  ChevronRight,
  Search,
  Filter,
  BarChart3,
  Settings,
  Shield,
  Zap,
  Smartphone,
  Monitor,
  Database,
  Server
} from "lucide-react"

export default function DocumentationPage() {
  const [activeTab, setActiveTab] = useState("overview")

  const documentationSections = [
    {
      id: "overview",
      title: "Documentation Overview",
      icon: BookOpen,
      description: "Complete guide to the HCC Admin Portal documentation",
      content: (
        <div className="space-y-6">
          <div className="prose prose-gray max-w-none">
            <h2>Welcome to HCC Admin Portal Documentation</h2>
            <p>
              Welcome to the comprehensive documentation for the HCC Admin Portal - a modern, scalable healthcare management system designed to streamline patient care coordination and administrative tasks.
            </p>
            
            <h3>System Overview</h3>
            <p>The HCC Admin Portal is a comprehensive healthcare management system built with modern web technologies that provides an intuitive interface for managing patient data, analytics, and administrative functions.</p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 my-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Users className="h-5 w-5 text-blue-600" />
                    Patient-Centric Workflow
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-2">
                  <div className="flex items-center gap-2">
                    <ChevronRight className="h-4 w-4 text-muted-foreground" />
                    <span>Streamline patient care coordination</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <ChevronRight className="h-4 w-4 text-muted-foreground" />
                    <span>Comprehensive patient management</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <ChevronRight className="h-4 w-4 text-muted-foreground" />
                    <span>Integrated appointment scheduling</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <ChevronRight className="h-4 w-4 text-muted-foreground" />
                    <span>Patient communication hub</span>
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Settings className="h-5 w-5 text-green-600" />
                    Administrative Efficiency
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-2">
                  <div className="flex items-center gap-2">
                    <ChevronRight className="h-4 w-4 text-muted-foreground" />
                    <span>Reduce administrative overhead</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <ChevronRight className="h-4 w-4 text-muted-foreground" />
                    <span>Data-driven insights</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <ChevronRight className="h-4 w-4 text-muted-foreground" />
                    <span>Scalable architecture</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <ChevronRight className="h-4 w-4 text-muted-foreground" />
                    <span>Mobile-first design</span>
                  </div>
                </CardContent>
              </Card>
            </div>

            <h3>Documentation Overview</h3>
            <p>This documentation suite provides everything you need to understand, use, and develop the HCC Admin Portal:</p>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 my-6">
              <Card>
                <CardHeader className="pb-3">
                  <div className="flex items-center gap-2">
                    <Code className="h-5 w-5 text-blue-600" />
                    <CardTitle className="text-lg">For Developers</CardTitle>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">
                    Technical implementation guides, architecture documentation, and development patterns.
                  </p>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader className="pb-3">
                  <div className="flex items-center gap-2">
                    <Users className="h-5 w-5 text-green-600" />
                    <CardTitle className="text-lg">For End Users</CardTitle>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">
                    Step-by-step user guides, workflow instructions, and troubleshooting help.
                  </p>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader className="pb-3">
                  <div className="flex items-center gap-2">
                    <Settings className="h-5 w-5 text-purple-600" />
                    <CardTitle className="text-lg">For Administrators</CardTitle>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">
                    System administration, security considerations, and deployment guides.
                  </p>
                </CardContent>
              </Card>
            </div>

            <h3>Key Features</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 my-6">
              <Card>
                <CardHeader>
                  <CardTitle className="text-sm">Patient Management</CardTitle>
                </CardHeader>
                <CardContent className="space-y-2">
                  <Badge variant="outline">Comprehensive patient profiles</Badge>
                  <Badge variant="outline">Advanced search and filtering</Badge>
                  <Badge variant="outline">Bulk operations</Badge>
                  <Badge variant="outline">Real-time updates</Badge>
                  <Badge variant="outline">Tabbed interface</Badge>
                  <Badge variant="outline">Contextual modals</Badge>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle className="text-sm">Analytics & Reporting</CardTitle>
                </CardHeader>
                <CardContent className="space-y-2">
                  <Badge variant="outline">Interactive analytics dashboard</Badge>
                  <Badge variant="outline">Distribution analysis</Badge>
                  <Badge variant="outline">Trend analysis</Badge>
                  <Badge variant="outline">Export capabilities</Badge>
                  <Badge variant="outline">Key insights</Badge>
                  <Badge variant="outline">Performance metrics</Badge>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle className="text-sm">Billing & Insurance</CardTitle>
                </CardHeader>
                <CardContent className="space-y-2">
                  <Badge variant="outline">Patient account management</Badge>
                  <Badge variant="outline">Insurance verification API</Badge>
                  <Badge variant="outline">Payment processing integration</Badge>
                  <Badge variant="outline">Automated billing cycles</Badge>
                  <Badge variant="outline">Claims automation</Badge>
                  <Badge variant="outline">Financial reporting</Badge>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle className="text-sm">Integration & Automation</CardTitle>
                </CardHeader>
                <CardContent className="space-y-2">
                  <Badge variant="outline">API connections monitoring</Badge>
                  <Badge variant="outline">Real-time insurance verification</Badge>
                  <Badge variant="outline">Automated payment processing</Badge>
                  <Badge variant="outline">Claims submission automation</Badge>
                  <Badge variant="outline">HIPAA-compliant integrations</Badge>
                  <Badge variant="outline">Audit logging</Badge>
                </CardContent>
              </Card>
            </div>

            <h3>System Requirements</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 my-6">
              <Card>
                <CardHeader>
                  <CardTitle className="text-sm">Browser Requirements</CardTitle>
                </CardHeader>
                <CardContent className="space-y-2">
                  <div className="flex items-center gap-2">
                    <Monitor className="h-4 w-4 text-blue-600" />
                    <span>Chrome 90+</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Monitor className="h-4 w-4 text-blue-600" />
                    <span>Firefox 88+</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Monitor className="h-4 w-4 text-blue-600" />
                    <span>Safari 14+</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Monitor className="h-4 w-4 text-blue-600" />
                    <span>Edge 90+</span>
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle className="text-sm">Device Support</CardTitle>
                </CardHeader>
                <CardContent className="space-y-2">
                  <div className="flex items-center gap-2">
                    <Smartphone className="h-4 w-4 text-green-600" />
                    <span>Mobile phones (iOS/Android)</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Monitor className="h-4 w-4 text-green-600" />
                    <span>Tablets (iPad, Android)</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Monitor className="h-4 w-4 text-green-600" />
                    <span>Desktop computers</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Monitor className="h-4 w-4 text-green-600" />
                    <span>Laptops</span>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      )
    },
    {
      id: "architecture",
      title: "Architecture Documentation",
      icon: Code,
      description: "System architecture, design principles, and technical implementation",
      content: (
        <div className="space-y-6">
          <div className="prose prose-gray max-w-none">
            <h2>System Architecture</h2>
            
            <h3>Hybrid Patient-Centric & Global Management Approach</h3>
            <p>The admin portal follows a hybrid architecture that balances patient-centric workflows with global administrative capabilities.</p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 my-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Users className="h-5 w-5 text-blue-600" />
                    Primary Navigation (Patient-Centric)
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-2">
                  <div className="flex items-center gap-2">
                    <ChevronRight className="h-4 w-4 text-muted-foreground" />
                    <span>Dashboard</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <ChevronRight className="h-4 w-4 text-muted-foreground" />
                    <span>Patients</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <ChevronRight className="h-4 w-4 text-muted-foreground" />
                    <span>Appointments</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <ChevronRight className="h-4 w-4 text-muted-foreground" />
                    <span>Messages</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <ChevronRight className="h-4 w-4 text-muted-foreground" />
                    <span>Billing & Insurance</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <ChevronRight className="h-4 w-4 text-muted-foreground" />
                    <span>Integrations</span>
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Settings className="h-5 w-5 text-purple-600" />
                    Secondary Navigation (Admin Tools)
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-2">
                  <div className="flex items-center gap-2">
                    <ChevronRight className="h-4 w-4 text-muted-foreground" />
                    <span>Prescriptions</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <ChevronRight className="h-4 w-4 text-muted-foreground" />
                    <span>Care Plans</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <ChevronRight className="h-4 w-4 text-muted-foreground" />
                    <span>Documents</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <ChevronRight className="h-4 w-4 text-muted-foreground" />
                    <span>Settings</span>
                  </div>
                </CardContent>
              </Card>
            </div>

            <h3>Information Architecture</h3>
            <div className="bg-gray-50 dark:bg-gray-900 p-4 rounded-lg my-6">
              <pre className="text-sm font-mono">
{`Admin Portal
├── Dashboard (Overview & Analytics)
├── Patient Management
│   ├── Patient List (Search, Filter, Bulk Actions)
│   └── Patient Detail (Tabbed Interface)
│       ├── Overview
│       ├── Appointments
│       ├── Prescriptions
│       ├── Care Plans
│       ├── Documents
│       ├── Messages
│       └── Billing
├── Appointment Management
├── Communication Hub
├── Billing & Insurance
│   ├── Patient Accounts
│   ├── Transactions
│   ├── Insurance Claims
│   ├── Reports
│   └── Integrations
│       ├── API Connections
│       ├── Automated Billing
│       ├── Claims Automation
│       └── Payment Processing
└── Administrative Tools`}
              </pre>
            </div>

            <h3>Technology Stack</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 my-6">
              <Card>
                <CardHeader className="pb-3">
                  <CardTitle className="text-sm">Frontend Framework</CardTitle>
                </CardHeader>
                <CardContent className="space-y-2">
                  <Badge variant="outline">Next.js 15</Badge>
                  <Badge variant="outline">TypeScript</Badge>
                  <Badge variant="outline">React 19</Badge>
                  <Badge variant="outline">App Router</Badge>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader className="pb-3">
                  <CardTitle className="text-sm">Styling & UI</CardTitle>
                </CardHeader>
                <CardContent className="space-y-2">
                  <Badge variant="outline">Tailwind CSS</Badge>
                  <Badge variant="outline">Shadcn/ui</Badge>
                  <Badge variant="outline">Lucide React</Badge>
                  <Badge variant="outline">Remix Icons</Badge>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader className="pb-3">
                  <CardTitle className="text-sm">State Management</CardTitle>
                </CardHeader>
                <CardContent className="space-y-2">
                  <Badge variant="outline">React Hooks</Badge>
                  <Badge variant="outline">Context API</Badge>
                  <Badge variant="outline">Local Storage</Badge>
                  <Badge variant="outline">useMemo/useCallback</Badge>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader className="pb-3">
                  <CardTitle className="text-sm">Performance</CardTitle>
                </CardHeader>
                <CardContent className="space-y-2">
                  <Badge variant="outline">Memoization</Badge>
                  <Badge variant="outline">Pagination</Badge>
                  <Badge variant="outline">Real-time Updates</Badge>
                  <Badge variant="outline">Virtual Scrolling</Badge>
                </CardContent>
              </Card>
            </div>

            <h3>Core Features & Capabilities</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 my-6">
              <Card>
                <CardHeader>
                  <CardTitle className="text-sm">Enhanced Patient Management</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div>
                    <h5 className="font-medium text-sm">Patient List Features</h5>
                    <div className="space-y-1 mt-2">
                      <Badge variant="outline" className="text-xs">Advanced Search</Badge>
                      <Badge variant="outline" className="text-xs">Multi-Dimensional Filtering</Badge>
                      <Badge variant="outline" className="text-xs">Bulk Operations</Badge>
                      <Badge variant="outline" className="text-xs">Pagination</Badge>
                      <Badge variant="outline" className="text-xs">Real-time Updates</Badge>
                    </div>
                  </div>
                  <div>
                    <h5 className="font-medium text-sm">Patient Detail Features</h5>
                    <div className="space-y-1 mt-2">
                      <Badge variant="outline" className="text-xs">Tabbed Interface</Badge>
                      <Badge variant="outline" className="text-xs">Comprehensive Data</Badge>
                      <Badge variant="outline" className="text-xs">Quick Actions</Badge>
                      <Badge variant="outline" className="text-xs">Contextual Modals</Badge>
                    </div>
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle className="text-sm">Advanced Analytics & Insights</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div>
                    <h5 className="font-medium text-sm">Key Metrics Dashboard</h5>
                    <div className="space-y-1 mt-2">
                      <Badge variant="outline" className="text-xs">Total Patients</Badge>
                      <Badge variant="outline" className="text-xs">Active Patients</Badge>
                      <Badge variant="outline" className="text-xs">Recent Activity</Badge>
                      <Badge variant="outline" className="text-xs">Inactive Patients</Badge>
                    </div>
                  </div>
                  <div>
                    <h5 className="font-medium text-sm">Business Intelligence</h5>
                    <div className="space-y-1 mt-2">
                      <Badge variant="outline" className="text-xs">Key Insights</Badge>
                      <Badge variant="outline" className="text-xs">Performance Metrics</Badge>
                      <Badge variant="outline" className="text-xs">Trend Analysis</Badge>
                      <Badge variant="outline" className="text-xs">Distribution Analytics</Badge>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            <h3>Performance Metrics</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 my-6">
              <Card>
                <CardContent className="pt-6">
                  <div className="flex items-center gap-2">
                    <Zap className="h-5 w-5 text-green-600" />
                    <span className="font-semibold">Initial Load Time</span>
                  </div>
                  <p className="text-2xl font-bold text-green-600 mt-2">&lt; 2 seconds</p>
                </CardContent>
              </Card>
              
              <Card>
                <CardContent className="pt-6">
                  <div className="flex items-center gap-2">
                    <Zap className="h-5 w-5 text-blue-600" />
                    <span className="font-semibold">Page Transitions</span>
                  </div>
                  <p className="text-2xl font-bold text-blue-600 mt-2">&lt; 500ms</p>
                </CardContent>
              </Card>
              
              <Card>
                <CardContent className="pt-6">
                  <div className="flex items-center gap-2">
                    <Search className="h-5 w-5 text-purple-600" />
                    <span className="font-semibold">Search Response</span>
                  </div>
                  <p className="text-2xl font-bold text-purple-600 mt-2">&lt; 100ms</p>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      )
    },
    {
      id: "user-guide",
      title: "User Guide",
      icon: Users,
      description: "Step-by-step instructions for using the admin portal",
      content: (
        <div className="space-y-6">
          <div className="prose prose-gray max-w-none">
            <h2>User Guide</h2>
            
            <h3>Getting Started</h3>
            <div className="p-4 bg-blue-50 rounded-lg my-6">
              <h4 className="font-semibold text-blue-900 mb-3">Accessing the Admin Portal</h4>
              <ol className="list-decimal list-inside text-blue-800 space-y-2">
                <li>Open your web browser and navigate to the HCC website</li>
                <li>Click on "Admin Portal" in the main navigation</li>
                <li>Enter your credentials (username and password)</li>
                <li>Click "Sign In" to access the portal</li>
                <li>You'll be redirected to the Dashboard overview</li>
              </ol>
            </div>

            <h3>Navigation Overview</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 my-6">
              <Card>
                <CardHeader>
                  <CardTitle className="text-sm">Primary Navigation (Patient-Centric)</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div>
                    <h5 className="font-medium">Dashboard</h5>
                    <p className="text-sm text-muted-foreground">Overview of key metrics and recent activity</p>
                  </div>
                  <div>
                    <h5 className="font-medium">Patients</h5>
                    <p className="text-sm text-muted-foreground">Comprehensive patient management</p>
                  </div>
                  <div>
                    <h5 className="font-medium">Appointments</h5>
                    <p className="text-sm text-muted-foreground">Schedule and manage appointments</p>
                  </div>
                  <div>
                    <h5 className="font-medium">Messages</h5>
                    <p className="text-sm text-muted-foreground">Patient communication hub</p>
                  </div>
                  <div>
                    <h5 className="font-medium">Billing & Insurance</h5>
                    <p className="text-sm text-muted-foreground">Financial management and insurance integration</p>
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle className="text-sm">Secondary Navigation (Admin Tools)</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div>
                    <h5 className="font-medium">Prescriptions</h5>
                    <p className="text-sm text-muted-foreground">Medication management</p>
                  </div>
                  <div>
                    <h5 className="font-medium">Care Plans</h5>
                    <p className="text-sm text-muted-foreground">Treatment plan coordination</p>
                  </div>
                  <div>
                    <h5 className="font-medium">Documents</h5>
                    <p className="text-sm text-muted-foreground">File management</p>
                  </div>
                  <div>
                    <h5 className="font-medium">Settings</h5>
                    <p className="text-sm text-muted-foreground">System configuration</p>
                  </div>
                </CardContent>
              </Card>
            </div>

            <h3>Patient Management Workflows</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 my-6">
              <Card>
                <CardHeader>
                  <CardTitle className="text-sm">Patient Search & Discovery</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="space-y-2">
                    <h5 className="font-medium text-sm">Basic Search</h5>
                    <div className="text-sm text-muted-foreground space-y-1">
                      <div>• Use the search bar to find patients by name</div>
                      <div>• Search supports partial matches</div>
                      <div>• Results update in real-time</div>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <h5 className="font-medium text-sm">Advanced Filtering</h5>
                    <div className="text-sm text-muted-foreground space-y-1">
                      <div>• Filter by status, doctor, insurance</div>
                      <div>• Use date ranges for visit history</div>
                      <div>• Combine multiple filters</div>
                    </div>
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle className="text-sm">Patient Detail Management</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="space-y-2">
                    <h5 className="font-medium text-sm">Tabbed Interface</h5>
                    <div className="text-sm text-muted-foreground space-y-1">
                      <div>• Overview: Quick summary and actions</div>
                      <div>• Appointments: Schedule and manage visits</div>
                      <div>• Messages: Communication history</div>
                      <div>• Documents: File management</div>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <h5 className="font-medium text-sm">Quick Actions</h5>
                    <div className="text-sm text-muted-foreground space-y-1">
                      <div>• Schedule new appointments</div>
                      <div>• Send messages to patients</div>
                      <div>• Update patient information</div>
                      <div>• View billing details</div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            <h3>Billing & Insurance Workflows</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 my-6">
              <Card>
                <CardHeader>
                  <CardTitle className="text-sm">Patient Account Management</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="space-y-2">
                    <h5 className="font-medium text-sm">Account Overview</h5>
                    <div className="text-sm text-muted-foreground space-y-1">
                      <div>• View patient balances and payment history</div>
                      <div>• Track insurance coverage and claims</div>
                      <div>• Monitor payment status and overdue accounts</div>
                      <div>• Generate financial reports</div>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <h5 className="font-medium text-sm">Payment Processing</h5>
                    <div className="text-sm text-muted-foreground space-y-1">
                      <div>• Process credit card payments</div>
                      <div>• Record cash and check payments</div>
                      <div>• Apply payment plans and discounts</div>
                      <div>• Generate payment receipts</div>
                    </div>
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle className="text-sm">Insurance Integration</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="space-y-2">
                    <h5 className="font-medium text-sm">Insurance Verification</h5>
                    <div className="text-sm text-muted-foreground space-y-1">
                      <div>• Real-time insurance coverage verification</div>
                      <div>• Check eligibility and benefits</div>
                      <div>• Verify deductibles and copays</div>
                      <div>• Track coverage effective dates</div>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <h5 className="font-medium text-sm">Claims Management</h5>
                    <div className="text-sm text-muted-foreground space-y-1">
                      <div>• Submit insurance claims electronically</div>
                      <div>• Track claim status and responses</div>
                      <div>• Handle claim denials and appeals</div>
                      <div>• Generate claims reports</div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            <h3>Automation & Integration</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 my-6">
              <Card>
                <CardHeader>
                  <CardTitle className="text-sm">Automated Billing</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="space-y-2">
                    <h5 className="font-medium text-sm">Billing Cycles</h5>
                    <div className="text-sm text-muted-foreground space-y-1">
                      <div>• Configure automated billing schedules</div>
                      <div>• Set up payment reminders</div>
                      <div>• Enable auto-charging for saved methods</div>
                      <div>• Monitor billing automation status</div>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <h5 className="font-medium text-sm">Integration Monitoring</h5>
                    <div className="text-sm text-muted-foreground space-y-1">
                      <div>• Monitor API connection status</div>
                      <div>• Track integration performance</div>
                      <div>• View error logs and alerts</div>
                      <div>• Test connection health</div>
                    </div>
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle className="text-sm">Claims Automation</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="space-y-2">
                    <h5 className="font-medium text-sm">Automated Submission</h5>
                    <div className="text-sm text-muted-foreground space-y-1">
                      <div>• Auto-submit new claims</div>
                      <div>• Follow up on pending claims</div>
                      <div>• Retry denied claims automatically</div>
                      <div>• Track automation metrics</div>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <h5 className="font-medium text-sm">Reporting & Analytics</h5>
                    <div className="text-sm text-muted-foreground space-y-1">
                      <div>• Daily claims processing reports</div>
                      <div>• Approval and denial rates</div>
                      <div>• Processing time analytics</div>
                      <div>• Financial impact analysis</div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            <h3>Analytics & Reporting</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 my-6">
              <Card>
                <CardHeader>
                  <CardTitle className="text-sm">Dashboard Analytics</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="space-y-2">
                    <h5 className="font-medium text-sm">Key Metrics</h5>
                    <div className="text-sm text-muted-foreground space-y-1">
                      <div>• Total patient count</div>
                      <div>• Active vs inactive patients</div>
                      <div>• Recent activity trends</div>
                      <div>• Doctor workload distribution</div>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <h5 className="font-medium text-sm">Distribution Analysis</h5>
                    <div className="text-sm text-muted-foreground space-y-1">
                      <div>• Insurance provider breakdown</div>
                      <div>• Age demographic analysis</div>
                      <div>• Geographic distribution</div>
                      <div>• Visit frequency patterns</div>
                    </div>
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle className="text-sm">Export & Reporting</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="space-y-2">
                    <h5 className="font-medium text-sm">Data Export</h5>
                    <div className="text-sm text-muted-foreground space-y-1">
                      <div>• CSV export for spreadsheet analysis</div>
                      <div>• PDF reports for documentation</div>
                      <div>• Filtered data export</div>
                      <div>• Bulk export capabilities</div>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <h5 className="font-medium text-sm">Saved Filters</h5>
                    <div className="text-sm text-muted-foreground space-y-1">
                      <div>• Save frequently used filters</div>
                      <div>• Quick access to common views</div>
                      <div>• Share filters with team members</div>
                      <div>• Scheduled report generation</div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            <h3>Common Workflows</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 my-6">
              <Card>
                <CardHeader>
                  <CardTitle className="text-sm">Daily Patient Review</CardTitle>
                </CardHeader>
                <CardContent className="space-y-2 text-sm">
                  <div>1. Check dashboard for new patients</div>
                  <div>2. Review recent activity</div>
                  <div>3. Check for pending tasks</div>
                  <div>4. Review patient messages</div>
                  <div>5. Update patient statuses</div>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle className="text-sm">Weekly Reporting</CardTitle>
                </CardHeader>
                <CardContent className="space-y-2 text-sm">
                  <div>1. Export patient analytics</div>
                  <div>2. Review doctor workload</div>
                  <div>3. Check insurance distribution</div>
                  <div>4. Generate activity reports</div>
                  <div>5. Update care plans</div>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle className="text-sm">Monthly Maintenance</CardTitle>
                </CardHeader>
                <CardContent className="space-y-2 text-sm">
                  <div>1. Review inactive patients</div>
                  <div>2. Update patient information</div>
                  <div>3. Clean up saved filters</div>
                  <div>4. Backup important data</div>
                  <div>5. Performance optimization</div>
                </CardContent>
              </Card>
            </div>

            <h3>Troubleshooting</h3>
            <div className="p-4 bg-yellow-50 dark:bg-yellow-900/20 rounded-lg my-6">
              <h4 className="font-semibold text-yellow-900 dark:text-yellow-100 mb-3">Common Issues & Solutions</h4>
              <div className="space-y-3 text-sm">
                <div>
                  <h5 className="font-medium text-yellow-900 dark:text-yellow-100">Search Not Working</h5>
                  <p className="text-yellow-800 dark:text-yellow-200">Clear browser cache and try again. Ensure you're using supported browsers.</p>
                </div>
                <div>
                  <h5 className="font-medium text-yellow-900 dark:text-yellow-100">Slow Performance</h5>
                  <p className="text-yellow-800 dark:text-yellow-200">Try reducing the number of filters or use more specific search terms.</p>
                </div>
                <div>
                  <h5 className="font-medium text-yellow-900 dark:text-yellow-100">Export Issues</h5>
                  <p className="text-yellow-800 dark:text-yellow-200">Ensure you have sufficient data selected and try exporting smaller batches.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )
    },
    {
      id: "technical",
      title: "Technical Implementation",
      icon: Code,
      description: "Developer-focused technical documentation and code examples",
      content: (
        <div className="space-y-6">
          <div className="prose prose-gray max-w-none">
            <h2>Technical Implementation Guide</h2>
            
            <h3>Core Architecture Patterns</h3>
            
            <h4>State Management Pattern</h4>
            <div className="bg-gray-900 text-green-400 p-4 rounded-lg my-4 overflow-x-auto">
              <pre className="text-sm">
{`// Local State Management
const [patients, setPatients] = useState<Patient[]>([])
const [search, setSearch] = useState("")
const [filters, setFilters] = useState<Filters>({
  status: "all",
  assignedDoctor: "all", 
  insurance: "all"
})

// Computed State with Memoization
const filtered = useMemo(() => {
  return patients.filter(patient => {
    const matchesSearch = search === "" || 
      patient.name.toLowerCase().includes(search.toLowerCase())
    const matchesStatus = filters.status === "all" || 
      patient.status === filters.status
    return matchesSearch && matchesStatus
  })
}, [patients, search, filters])`}
              </pre>
            </div>

            <h4>Responsive Design Pattern</h4>
            <div className="bg-gray-900 text-green-400 p-4 rounded-lg my-4 overflow-x-auto">
              <pre className="text-sm">
{`// Mobile-First Responsive Layout
<div className="space-y-6">
  <div className="flex flex-col sm:flex-row gap-2 sm:gap-4">
    <Button variant="outline" className="w-full sm:w-auto">
      Export
    </Button>
    <Button variant="outline" className="w-full sm:w-auto">
      Analytics
    </Button>
  </div>
  
  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
    {/* Grid items */}
  </div>
</div>`}
              </pre>
            </div>

            <h3>Billing Integration Patterns</h3>
            <div className="bg-gray-900 text-green-400 p-4 rounded-lg my-4 overflow-x-auto">
              <pre className="text-sm">
{`// Insurance Verification API Integration
const verifyInsurance = async (provider: string, memberId: string) => {
  try {
    const response = await fetch('/api/insurance/verify', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ provider, memberId })
    })
    
    if (!response.ok) throw new Error('Verification failed')
    
    const result = await response.json()
    return {
      status: 'verified',
      coverage: result.coverage,
      patient: result.patient
    }
  } catch (error) {
    console.error('Insurance verification error:', error)
    return { status: 'error', message: error.message }
  }
}

// Payment Processing Integration
const processPayment = async (paymentData: PaymentData) => {
  try {
    const response = await fetch('/api/payments/process', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(paymentData)
    })
    
    if (!response.ok) throw new Error('Payment failed')
    
    const result = await response.json()
    return {
      status: 'success',
      transactionId: result.transactionId,
      amount: result.amount,
      timestamp: result.timestamp
    }
  } catch (error) {
    console.error('Payment processing error:', error)
    return { status: 'error', message: error.message }
  }
}

// Automated Billing State Management
const [automatedBillingSettings, setAutomatedBillingSettings] = useState({
  enabled: false,
  frequency: 'monthly',
  reminderDays: 7,
  autoCharge: false,
  paymentMethod: 'credit_card'
})

const [claimsAutomationSettings, setClaimsAutomationSettings] = useState({
  enabled: false,
  autoSubmit: false,
  followUpDays: 30,
  denialRetry: true,
  maxRetries: 3
})`}
              </pre>
            </div>

            <h3>Advanced State Management</h3>
            <div className="bg-gray-900 text-green-400 p-4 rounded-lg my-4 overflow-x-auto">
              <pre className="text-sm">
{`// Context Provider Pattern
interface PatientContextType {
  patients: Patient[]
  addPatient: (patient: Patient) => void
  updatePatient: (id: number, updates: Partial<Patient>) => void
  deletePatient: (id: number) => void
  getPatientById: (id: number) => Patient | undefined
}

const PatientContext = createContext<PatientContextType | undefined>(undefined)

export const PatientProvider = ({ children }: { children: React.ReactNode }) => {
  const [patients, setPatients] = useState<Patient[]>([])
  
  const addPatient = useCallback((patient: Patient) => {
    setPatients(prev => [...prev, { ...patient, id: Date.now() }])
  }, [])
  
  const updatePatient = useCallback((id: number, updates: Partial<Patient>) => {
    setPatients(prev => prev.map(p => 
      p.id === id ? { ...p, ...updates } : p
    ))
  }, [])
  
  const deletePatient = useCallback((id: number) => {
    setPatients(prev => prev.filter(p => p.id !== id))
  }, [])
  
  const getPatientById = useCallback((id: number) => {
    return patients.find(p => p.id === id)
  }, [patients])
  
  return (
    <PatientContext.Provider value={{
      patients,
      addPatient,
      updatePatient,
      deletePatient,
      getPatientById
    }}>
      {children}
    </PatientContext.Provider>
  )
}`}
              </pre>
            </div>

            <h3>Performance Optimization</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 my-6">
              <Card>
                <CardHeader>
                  <CardTitle className="text-sm">Memoization Strategy</CardTitle>
                </CardHeader>
                <CardContent className="space-y-2 text-sm">
                  <div>• Expensive computations with useMemo</div>
                  <div>• Callback memoization with useCallback</div>
                  <div>• Optimized re-renders</div>
                  <div>• Efficient dependency arrays</div>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle className="text-sm">Virtual Scrolling</CardTitle>
                </CardHeader>
                <CardContent className="space-y-2 text-sm">
                  <div>• Handle large datasets efficiently</div>
                  <div>• Fixed size list components</div>
                  <div>• Optimized memory usage</div>
                  <div>• Smooth scrolling performance</div>
                </CardContent>
              </Card>
            </div>

            <h3>Error Handling & Validation</h3>
            <div className="bg-gray-900 text-green-400 p-4 rounded-lg my-4 overflow-x-auto">
              <pre className="text-sm">
{`// Error Boundary Pattern
class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props)
    this.state = { hasError: false, error: null }
  }
  
  static getDerivedStateFromError(error) {
    return { hasError: true, error }
  }
  
  componentDidCatch(error, errorInfo) {
    console.error('Error caught by boundary:', error, errorInfo)
  }
  
  render() {
    if (this.state.hasError) {
      return (
        <div className="p-4 bg-red-50 border border-red-200 rounded">
          <h2>Something went wrong</h2>
          <p>Please refresh the page or contact support.</p>
        </div>
      )
    }
    
    return this.props.children
  }
}

// Form Validation Pattern
const validatePatient = (data: PatientForm): ValidationErrors => {
  const errors: ValidationErrors = {}
  
  if (!data.name.trim()) {
    errors.name = 'Name is required'
  }
  
  if (!data.email || !/^[^\\s@]+@[^\\s@]+\\.[^\\s@]+$/.test(data.email)) {
    errors.email = 'Valid email is required'
  }
  
  if (!data.phone || !/^\\d{10}$/.test(data.phone.replace(/\\D/g, ''))) {
    errors.phone = 'Valid phone number is required'
  }
  
  return errors
}`}
              </pre>
            </div>

            <h3>Testing Patterns</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 my-6">
              <Card>
                <CardHeader>
                  <CardTitle className="text-sm">Unit Testing</CardTitle>
                </CardHeader>
                <CardContent className="space-y-2 text-sm">
                  <div>• Component rendering tests</div>
                  <div>• Hook testing with @testing-library/react-hooks</div>
                  <div>• Utility function testing</div>
                  <div>• Mock data and fixtures</div>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle className="text-sm">Integration Testing</CardTitle>
                </CardHeader>
                <CardContent className="space-y-2 text-sm">
                  <div>• User interaction flows</div>
                  <div>• API integration testing</div>
                  <div>• State management testing</div>
                  <div>• Error handling scenarios</div>
                </CardContent>
              </Card>
            </div>

            <h3>Accessibility Implementation</h3>
            <div className="bg-gray-900 text-green-400 p-4 rounded-lg my-4 overflow-x-auto">
              <pre className="text-sm">
{`// ARIA Labels and Roles
<button 
  aria-label="Delete patient"
  aria-describedby="delete-warning"
  onClick={handleDelete}
>
  <Trash2 className="h-4 w-4" />
</button>

// Keyboard Navigation
const handleKeyDown = (e: KeyboardEvent) => {
  if (e.key === 'Enter' || e.key === ' ') {
    e.preventDefault()
    handleClick()
  }
}

// Focus Management
useEffect(() => {
  if (isOpen) {
    const firstFocusable = modalRef.current?.querySelector(
      'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
    )
    if (firstFocusable) {
      (firstFocusable as HTMLElement).focus()
    }
  }
}, [isOpen])

// Screen Reader Support
<div role="alert" aria-live="polite">
  {notification}
</div>`}
              </pre>
            </div>
          </div>
        </div>
      )
    },
    {
      id: "security",
      title: "Security & Compliance",
      icon: Shield,
      description: "Security considerations, HIPAA compliance, and data protection",
      content: (
        <div className="space-y-6">
          <div className="prose prose-gray max-w-none">
            <h2>Security & Compliance</h2>
            
            <h3>Data Protection</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 my-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Shield className="h-5 w-5 text-green-600" />
                    HIPAA Compliance
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div>
                    <h5 className="font-medium text-sm">Protected Health Information (PHI)</h5>
                    <p className="text-sm text-muted-foreground">All patient data is encrypted and protected according to HIPAA standards</p>
                  </div>
                  <div>
                    <h5 className="font-medium text-sm">Access Controls</h5>
                    <p className="text-sm text-muted-foreground">Role-based access control ensures only authorized personnel can access patient data</p>
                  </div>
                  <div>
                    <h5 className="font-medium text-sm">Audit Logging</h5>
                    <p className="text-sm text-muted-foreground">Complete audit trail of all data access and modifications</p>
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Shield className="h-5 w-5 text-blue-600" />
                    Encryption & Security
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div>
                    <h5 className="font-medium text-sm">Data Encryption</h5>
                    <p className="text-sm text-muted-foreground">All sensitive data is encrypted at rest and in transit</p>
                  </div>
                  <div>
                    <h5 className="font-medium text-sm">Secure Transmission</h5>
                    <p className="text-sm text-muted-foreground">HTTPS/TLS encryption for all data transmission</p>
                  </div>
                  <div>
                    <h5 className="font-medium text-sm">Authentication</h5>
                    <p className="text-sm text-muted-foreground">Multi-factor authentication and secure session management</p>
                  </div>
                </CardContent>
              </Card>
            </div>

            <h3>Compliance Requirements</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 my-6">
              <Card>
                <CardHeader>
                  <CardTitle className="text-sm">HIPAA Requirements</CardTitle>
                </CardHeader>
                <CardContent className="space-y-2 text-sm">
                  <Badge variant="outline">Privacy Rule</Badge>
                  <Badge variant="outline">Security Rule</Badge>
                  <Badge variant="outline">Breach Notification</Badge>
                  <Badge variant="outline">Enforcement Rule</Badge>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle className="text-sm">Data Backup & Recovery</CardTitle>
                </CardHeader>
                <CardContent className="space-y-2 text-sm">
                  <Badge variant="outline">Regular Backups</Badge>
                  <Badge variant="outline">Secure Storage</Badge>
                  <Badge variant="outline">Recovery Testing</Badge>
                  <Badge variant="outline">Disaster Recovery</Badge>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle className="text-sm">Audit & Monitoring</CardTitle>
                </CardHeader>
                <CardContent className="space-y-2 text-sm">
                  <Badge variant="outline">Access Logs</Badge>
                  <Badge variant="outline">Change Tracking</Badge>
                  <Badge variant="outline">Security Monitoring</Badge>
                  <Badge variant="outline">Compliance Reporting</Badge>
                </CardContent>
              </Card>
            </div>

            <h3>Security Implementation</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 my-6">
              <Card>
                <CardHeader>
                  <CardTitle className="text-sm">Authentication & Authorization</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div>
                    <h5 className="font-medium text-sm">Multi-Factor Authentication</h5>
                    <div className="text-sm text-muted-foreground space-y-1">
                      <div>• SMS/Email verification codes</div>
                      <div>• Authenticator app support</div>
                      <div>• Hardware token integration</div>
                    </div>
                  </div>
                  <div>
                    <h5 className="font-medium text-sm">Role-Based Access Control</h5>
                    <div className="text-sm text-muted-foreground space-y-1">
                      <div>• Admin, Doctor, Staff roles</div>
                      <div>• Granular permissions</div>
                      <div>• Session management</div>
                    </div>
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle className="text-sm">Data Protection</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div>
                    <h5 className="font-medium text-sm">Encryption Standards</h5>
                    <div className="text-sm text-muted-foreground space-y-1">
                      <div>• AES-256 encryption at rest</div>
                      <div>• TLS 1.3 for data in transit</div>
                      <div>• End-to-end encryption</div>
                    </div>
                  </div>
                  <div>
                    <h5 className="font-medium text-sm">Data Classification</h5>
                    <div className="text-sm text-muted-foreground space-y-1">
                      <div>• PHI (Protected Health Information)</div>
                      <div>• PII (Personally Identifiable Information)</div>
                      <div>• Financial data protection</div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            <h3>Security Best Practices</h3>
            <div className="p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg my-6">
              <h4 className="font-semibold text-blue-900 dark:text-blue-100 mb-3">Implementation Guidelines</h4>
              <div className="space-y-3 text-sm">
                <div>
                  <h5 className="font-medium text-blue-900 dark:text-blue-100">Input Validation</h5>
                  <p className="text-blue-800 dark:text-blue-200">Validate all user inputs, sanitize data, and implement proper error handling to prevent injection attacks.</p>
                </div>
                <div>
                  <h5 className="font-medium text-blue-900 dark:text-blue-100">Session Management</h5>
                  <p className="text-blue-800 dark:text-blue-200">Implement secure session handling with automatic timeouts, secure cookies, and proper logout procedures.</p>
                </div>
                <div>
                  <h5 className="font-medium text-blue-900 dark:text-blue-100">Audit Logging</h5>
                  <p className="text-blue-800 dark:text-blue-200">Log all user actions, data access, and system changes for compliance and security monitoring.</p>
                </div>
                <div>
                  <h5 className="font-medium text-blue-900 dark:text-blue-100">Regular Security Updates</h5>
                  <p className="text-blue-800 dark:text-blue-200">Keep all dependencies updated, conduct regular security audits, and implement security patches promptly.</p>
                </div>
              </div>
            </div>

            <h3>Incident Response</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 my-6">
              <Card>
                <CardHeader>
                  <CardTitle className="text-sm">Breach Response Plan</CardTitle>
                </CardHeader>
                <CardContent className="space-y-2 text-sm">
                  <div>1. Immediate containment</div>
                  <div>2. Assessment and investigation</div>
                  <div>3. Notification procedures</div>
                  <div>4. Recovery and restoration</div>
                  <div>5. Post-incident review</div>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle className="text-sm">Contact Information</CardTitle>
                </CardHeader>
                <CardContent className="space-y-2 text-sm">
                  <div>• Security Team: security@hcc.com</div>
                  <div>• IT Support: support@hcc.com</div>
                  <div>• Emergency: (555) 123-4567</div>
                  <div>• Compliance Officer: compliance@hcc.com</div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      )
    },
    {
      id: "integration",
      title: "Backend Integration",
      icon: Database,
      description: "HIPAA-compliant backend API and database implementation guide",
      content: (
        <div className="space-y-6">
          <div className="prose prose-gray max-w-none">
            <h2>Backend Integration Guide</h2>
            <p className="text-lg text-muted-foreground mb-6">
              Comprehensive documentation for implementing a HIPAA-compliant backend API and database setup for the HCC Healthcare Admin Portal.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
              <Card>
                <CardHeader className="pb-3">
                  <div className="flex items-center gap-2">
                    <Server className="h-5 w-5 text-blue-600" />
                    <CardTitle className="text-sm">Technology Stack</CardTitle>
                  </div>
                </CardHeader>
                <CardContent className="space-y-2">
                  <Badge variant="outline">Node.js/Express</Badge>
                  <Badge variant="outline">Supabase PostgreSQL</Badge>
                  <Badge variant="outline">TypeScript</Badge>
                  <Badge variant="outline">JWT Authentication</Badge>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="pb-3">
                  <div className="flex items-center gap-2">
                    <Shield className="h-5 w-5 text-green-600" />
                    <CardTitle className="text-sm">HIPAA Compliance</CardTitle>
                  </div>
                </CardHeader>
                <CardContent className="space-y-2">
                  <Badge variant="outline">Data Encryption</Badge>
                  <Badge variant="outline">Access Controls</Badge>
                  <Badge variant="outline">Audit Logging</Badge>
                  <Badge variant="outline">PHI Protection</Badge>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="pb-3">
                  <div className="flex items-center gap-2">
                    <Code className="h-5 w-5 text-purple-600" />
                    <CardTitle className="text-sm">API Design</CardTitle>
                  </div>
                </CardHeader>
                <CardContent className="space-y-2">
                  <Badge variant="outline">RESTful Endpoints</Badge>
                  <Badge variant="outline">Validation</Badge>
                  <Badge variant="outline">Error Handling</Badge>
                  <Badge variant="outline">Rate Limiting</Badge>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="pb-3">
                  <div className="flex items-center gap-2">
                    <Database className="h-5 w-5 text-orange-600" />
                    <CardTitle className="text-sm">Database</CardTitle>
                  </div>
                </CardHeader>
                <CardContent className="space-y-2">
                  <Badge variant="outline">PostgreSQL Schema</Badge>
                  <Badge variant="outline">Row Level Security</Badge>
                  <Badge variant="outline">Indexes</Badge>
                  <Badge variant="outline">Real-time</Badge>
                </CardContent>
              </Card>
            </div>

            <h3>Documentation Sections</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 my-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <FileText className="h-5 w-5 text-blue-600" />
                    Implementation Guide
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div>
                    <h5 className="font-medium text-sm">HIPAA Backend Implementation</h5>
                    <p className="text-sm text-muted-foreground">Complete guide for implementing a HIPAA-compliant backend API and database setup.</p>
                    <div className="mt-2 space-y-1">
                      <div className="text-xs text-muted-foreground">• API Requirements Analysis</div>
                      <div className="text-xs text-muted-foreground">• Database Schema Design</div>
                      <div className="text-xs text-muted-foreground">• Technology Stack Documentation</div>
                      <div className="text-xs text-muted-foreground">• HIPAA Compliance Implementation</div>
                      <div className="text-xs text-muted-foreground">• Integration Guide</div>
                      <div className="text-xs text-muted-foreground">• Code Examples</div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Code className="h-5 w-5 text-green-600" />
                    API Reference
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div>
                    <h5 className="font-medium text-sm">API Endpoints Reference</h5>
                    <p className="text-sm text-muted-foreground">Detailed API documentation with request/response examples and error handling.</p>
                    <div className="mt-2 space-y-1">
                      <div className="text-xs text-muted-foreground">• Authentication Endpoints</div>
                      <div className="text-xs text-muted-foreground">• Patient Management APIs</div>
                      <div className="text-xs text-muted-foreground">• Appointment & Message APIs</div>
                      <div className="text-xs text-muted-foreground">• Prescription & Care Plan APIs</div>
                      <div className="text-xs text-muted-foreground">• Document & Billing APIs</div>
                      <div className="text-xs text-muted-foreground">• Insurance Verification APIs</div>
                      <div className="text-xs text-muted-foreground">• Payment Processing APIs</div>
                      <div className="text-xs text-muted-foreground">• Claims Automation APIs</div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Code className="h-5 w-5 text-purple-600" />
                    TypeScript Types
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div>
                    <h5 className="font-medium text-sm">TypeScript Types Reference</h5>
                    <p className="text-sm text-muted-foreground">Complete interface definitions and type safety for the entire API.</p>
                    <div className="mt-2 space-y-1">
                      <div className="text-xs text-muted-foreground">• Core Entity Interfaces</div>
                      <div className="text-xs text-muted-foreground">• API Request/Response Types</div>
                      <div className="text-xs text-muted-foreground">• Context Types</div>
                      <div className="text-xs text-muted-foreground">• Utility Types</div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Server className="h-5 w-5 text-orange-600" />
                    Deployment Guide
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div>
                    <h5 className="font-medium text-sm">Deployment & Setup Guide</h5>
                    <p className="text-sm text-muted-foreground">Step-by-step deployment instructions and production setup.</p>
                    <div className="mt-2 space-y-1">
                      <div className="text-xs text-muted-foreground">• Supabase Setup</div>
                      <div className="text-xs text-muted-foreground">• Backend Configuration</div>
                      <div className="text-xs text-muted-foreground">• Vercel Deployment</div>
                      <div className="text-xs text-muted-foreground">• Security Configuration</div>
                      <div className="text-xs text-muted-foreground">• HIPAA Compliance Checklist</div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            <h3>Quick Start Guide</h3>
            <div className="p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg my-6">
              <h4 className="font-semibold text-blue-900 dark:text-blue-100 mb-3">Implementation Steps</h4>
              <div className="space-y-3 text-sm">
                <div className="flex items-start gap-3">
                  <div className="flex-shrink-0 w-6 h-6 bg-blue-600 text-white rounded-full flex items-center justify-center text-xs font-bold">1</div>
                  <div>
                    <h5 className="font-medium text-blue-900 dark:text-blue-100">Set up Supabase Project</h5>
                    <p className="text-blue-800 dark:text-blue-200">Create a new Supabase project and configure the database schema with all required tables and indexes.</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="flex-shrink-0 w-6 h-6 bg-blue-600 text-white rounded-full flex items-center justify-center text-xs font-bold">2</div>
                  <div>
                    <h5 className="font-medium text-blue-900 dark:text-blue-100">Create Backend API</h5>
                    <p className="text-blue-800 dark:text-blue-200">Set up Node.js/Express backend with TypeScript, implement all API endpoints, and configure authentication.</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="flex-shrink-0 w-6 h-6 bg-blue-600 text-white rounded-full flex items-center justify-center text-xs font-bold">3</div>
                  <div>
                    <h5 className="font-medium text-blue-900 dark:text-blue-100">Configure Security</h5>
                    <p className="text-blue-800 dark:text-blue-200">Implement HIPAA compliance measures including encryption, access controls, and audit logging.</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="flex-shrink-0 w-6 h-6 bg-blue-600 text-white rounded-full flex items-center justify-center text-xs font-bold">4</div>
                  <div>
                    <h5 className="font-medium text-blue-900 dark:text-blue-100">Deploy to Production</h5>
                    <p className="text-blue-800 dark:text-blue-200">Deploy the backend to Vercel and configure environment variables for production use.</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="flex-shrink-0 w-6 h-6 bg-blue-600 text-white rounded-full flex items-center justify-center text-xs font-bold">5</div>
                  <div>
                    <h5 className="font-medium text-blue-900 dark:text-blue-100">Update Frontend</h5>
                    <p className="text-blue-800 dark:text-blue-200">Replace mock data with real API calls and implement the new API client in your frontend.</p>
                  </div>
                </div>
              </div>
            </div>

            <h3>Key Features</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 my-6">
              <Card>
                <CardHeader>
                  <CardTitle className="text-sm">HIPAA Compliance Features</CardTitle>
                </CardHeader>
                <CardContent className="space-y-2">
                  <Badge variant="outline">AES-256 Data Encryption</Badge>
                  <Badge variant="outline">Role-Based Access Control</Badge>
                  <Badge variant="outline">Comprehensive Audit Logging</Badge>
                  <Badge variant="outline">PHI Field Encryption</Badge>
                  <Badge variant="outline">Secure Session Management</Badge>
                  <Badge variant="outline">Input Validation & Sanitization</Badge>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-sm">API Features</CardTitle>
                </CardHeader>
                <CardContent className="space-y-2">
                  <Badge variant="outline">RESTful Design</Badge>
                  <Badge variant="outline">JWT Authentication</Badge>
                  <Badge variant="outline">Rate Limiting</Badge>
                  <Badge variant="outline">Pagination Support</Badge>
                  <Badge variant="outline">Real-time Updates</Badge>
                  <Badge variant="outline">File Upload/Download</Badge>
                  <Badge variant="outline">Insurance Integration</Badge>
                  <Badge variant="outline">Payment Processing</Badge>
                  <Badge variant="outline">Claims Automation</Badge>
                </CardContent>
              </Card>
            </div>

            <h3>Technology Stack</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 my-6">
              <Card>
                <CardHeader className="pb-3">
                  <CardTitle className="text-sm">Backend Framework</CardTitle>
                </CardHeader>
                <CardContent className="space-y-2">
                  <Badge variant="outline">Node.js 18+</Badge>
                  <Badge variant="outline">Express.js</Badge>
                  <Badge variant="outline">TypeScript</Badge>
                  <Badge variant="outline">JWT Authentication</Badge>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="pb-3">
                  <CardTitle className="text-sm">Database & Storage</CardTitle>
                </CardHeader>
                <CardContent className="space-y-2">
                  <Badge variant="outline">Supabase PostgreSQL</Badge>
                  <Badge variant="outline">Row Level Security</Badge>
                  <Badge variant="outline">Real-time Subscriptions</Badge>
                  <Badge variant="outline">File Storage</Badge>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="pb-3">
                  <CardTitle className="text-sm">Deployment & Security</CardTitle>
                </CardHeader>
                <CardContent className="space-y-2">
                  <Badge variant="outline">Vercel Deployment</Badge>
                  <Badge variant="outline">HTTPS/TLS</Badge>
                  <Badge variant="outline">CORS Configuration</Badge>
                  <Badge variant="outline">Environment Variables</Badge>
                </CardContent>
              </Card>
            </div>

            <h3>Documentation Files</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 my-6">
              <Card>
                <CardHeader>
                  <CardTitle className="text-sm">Available Documentation</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="flex items-center justify-between p-3 border rounded-lg">
                    <div>
                      <h5 className="font-medium text-sm">HIPAA Backend Implementation</h5>
                      <p className="text-xs text-muted-foreground">Complete implementation guide</p>
                    </div>
                    <Button variant="outline" size="sm">
                      <Download className="h-4 w-4 mr-2" />
                      View
                    </Button>
                  </div>
                  <div className="flex items-center justify-between p-3 border rounded-lg">
                    <div>
                      <h5 className="font-medium text-sm">API Endpoints Reference</h5>
                      <p className="text-xs text-muted-foreground">Detailed API documentation</p>
                    </div>
                    <Button variant="outline" size="sm">
                      <Download className="h-4 w-4 mr-2" />
                      View
                    </Button>
                  </div>
                  <div className="flex items-center justify-between p-3 border rounded-lg">
                    <div>
                      <h5 className="font-medium text-sm">TypeScript Types</h5>
                      <p className="text-xs text-muted-foreground">Complete type definitions</p>
                    </div>
                    <Button variant="outline" size="sm">
                      <Download className="h-4 w-4 mr-2" />
                      View
                    </Button>
                  </div>
                  <div className="flex items-center justify-between p-3 border rounded-lg">
                    <div>
                      <h5 className="font-medium text-sm">Deployment Guide</h5>
                      <p className="text-xs text-muted-foreground">Setup and deployment instructions</p>
                    </div>
                    <Button variant="outline" size="sm">
                      <Download className="h-4 w-4 mr-2" />
                      View
                    </Button>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-sm">Implementation Resources</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="p-3 border rounded-lg">
                    <h5 className="font-medium text-sm mb-2">Database Schema</h5>
                    <p className="text-xs text-muted-foreground mb-2">Complete PostgreSQL schema with all tables, relationships, and indexes</p>
                    <Badge variant="outline" className="text-xs">SQL Scripts</Badge>
                  </div>
                  <div className="p-3 border rounded-lg">
                    <h5 className="font-medium text-sm mb-2">API Code Examples</h5>
                    <p className="text-xs text-muted-foreground mb-2">Ready-to-use code examples for all endpoints</p>
                    <Badge variant="outline" className="text-xs">TypeScript</Badge>
                  </div>
                  <div className="p-3 border rounded-lg">
                    <h5 className="font-medium text-sm mb-2">Security Implementation</h5>
                    <p className="text-xs text-muted-foreground mb-2">HIPAA compliance and security best practices</p>
                    <Badge variant="outline" className="text-xs">Security</Badge>
                  </div>
                  <div className="p-3 border rounded-lg">
                    <h5 className="font-medium text-sm mb-2">Frontend Integration</h5>
                    <p className="text-xs text-muted-foreground mb-2">Guide for integrating with your existing frontend</p>
                    <Badge variant="outline" className="text-xs">React/Next.js</Badge>
                  </div>
                </CardContent>
              </Card>
            </div>

            <div className="p-4 bg-green-50 dark:bg-green-900/20 rounded-lg my-6">
              <h4 className="font-semibold text-green-900 dark:text-green-100 mb-3">Ready to Implement?</h4>
              <p className="text-green-800 dark:text-green-200 text-sm mb-4">
                All documentation is available in the <code className="bg-green-100 dark:bg-green-800 px-1 rounded">docs/</code> directory of your project. 
                The implementation guide provides step-by-step instructions for setting up a production-ready, HIPAA-compliant backend.
              </p>
              <div className="flex gap-2">
                <Button variant="outline" size="sm">
                  <Code className="h-4 w-4 mr-2" />
                  View Implementation Guide
                </Button>
                <Button variant="outline" size="sm">
                  <Server className="h-4 w-4 mr-2" />
                  Setup Instructions
                </Button>
              </div>
            </div>
          </div>
        </div>
      )
    },
    {
      id: "backend",
      title: "Backend Integration",
      icon: Database,
      description: "HIPAA-compliant backend API and database implementation guide",
      content: (
        <div className="space-y-6">
          <div className="prose prose-gray max-w-none">
            <h2>Backend Integration Guide</h2>
            <p className="text-lg text-muted-foreground mb-6">
              Comprehensive documentation for implementing a HIPAA-compliant backend API and database setup for the HCC Healthcare Admin Portal.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
              <Card>
                <CardHeader className="pb-3">
                  <div className="flex items-center gap-2">
                    <Server className="h-5 w-5 text-blue-600" />
                    <CardTitle className="text-sm">Technology Stack</CardTitle>
                  </div>
                </CardHeader>
                <CardContent className="space-y-2">
                  <Badge variant="outline">Node.js/Express</Badge>
                  <Badge variant="outline">Supabase PostgreSQL</Badge>
                  <Badge variant="outline">TypeScript</Badge>
                  <Badge variant="outline">JWT Authentication</Badge>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="pb-3">
                  <div className="flex items-center gap-2">
                    <Shield className="h-5 w-5 text-green-600" />
                    <CardTitle className="text-sm">HIPAA Compliance</CardTitle>
                  </div>
                </CardHeader>
                <CardContent className="space-y-2">
                  <Badge variant="outline">Data Encryption</Badge>
                  <Badge variant="outline">Access Controls</Badge>
                  <Badge variant="outline">Audit Logging</Badge>
                  <Badge variant="outline">PHI Protection</Badge>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="pb-3">
                  <div className="flex items-center gap-2">
                    <Code className="h-5 w-5 text-purple-600" />
                    <CardTitle className="text-sm">API Design</CardTitle>
                  </div>
                </CardHeader>
                <CardContent className="space-y-2">
                  <Badge variant="outline">RESTful Endpoints</Badge>
                  <Badge variant="outline">Validation</Badge>
                  <Badge variant="outline">Error Handling</Badge>
                  <Badge variant="outline">Rate Limiting</Badge>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="pb-3">
                  <div className="flex items-center gap-2">
                    <Database className="h-5 w-5 text-orange-600" />
                    <CardTitle className="text-sm">Database</CardTitle>
                  </div>
                </CardHeader>
                <CardContent className="space-y-2">
                  <Badge variant="outline">PostgreSQL Schema</Badge>
                  <Badge variant="outline">Row Level Security</Badge>
                  <Badge variant="outline">Indexes</Badge>
                  <Badge variant="outline">Real-time</Badge>
                </CardContent>
              </Card>
            </div>

            <h3>Documentation Sections</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 my-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <FileText className="h-5 w-5 text-blue-600" />
                    Implementation Guide
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div>
                    <h5 className="font-medium text-sm">HIPAA Backend Implementation</h5>
                    <p className="text-sm text-muted-foreground">Complete guide for implementing a HIPAA-compliant backend API and database setup.</p>
                    <div className="mt-2 space-y-1">
                      <div className="text-xs text-muted-foreground">• API Requirements Analysis</div>
                      <div className="text-xs text-muted-foreground">• Database Schema Design</div>
                      <div className="text-xs text-muted-foreground">• Technology Stack Documentation</div>
                      <div className="text-xs text-muted-foreground">• HIPAA Compliance Implementation</div>
                      <div className="text-xs text-muted-foreground">• Integration Guide</div>
                      <div className="text-xs text-muted-foreground">• Code Examples</div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Code className="h-5 w-5 text-green-600" />
                    API Reference
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div>
                    <h5 className="font-medium text-sm">API Endpoints Reference</h5>
                    <p className="text-sm text-muted-foreground">Detailed API documentation with request/response examples and error handling.</p>
                    <div className="mt-2 space-y-1">
                      <div className="text-xs text-muted-foreground">• Authentication Endpoints</div>
                      <div className="text-xs text-muted-foreground">• Patient Management APIs</div>
                      <div className="text-xs text-muted-foreground">• Appointment & Message APIs</div>
                      <div className="text-xs text-muted-foreground">• Prescription & Care Plan APIs</div>
                      <div className="text-xs text-muted-foreground">• Document & Billing APIs</div>
                      <div className="text-xs text-muted-foreground">• Insurance Verification APIs</div>
                      <div className="text-xs text-muted-foreground">• Payment Processing APIs</div>
                      <div className="text-xs text-muted-foreground">• Claims Automation APIs</div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Code className="h-5 w-5 text-purple-600" />
                    TypeScript Types
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div>
                    <h5 className="font-medium text-sm">TypeScript Types Reference</h5>
                    <p className="text-sm text-muted-foreground">Complete interface definitions and type safety for the entire API.</p>
                    <div className="mt-2 space-y-1">
                      <div className="text-xs text-muted-foreground">• Core Entity Interfaces</div>
                      <div className="text-xs text-muted-foreground">• API Request/Response Types</div>
                      <div className="text-xs text-muted-foreground">• Context Types</div>
                      <div className="text-xs text-muted-foreground">• Utility Types</div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Server className="h-5 w-5 text-orange-600" />
                    Deployment Guide
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div>
                    <h5 className="font-medium text-sm">Deployment & Setup Guide</h5>
                    <p className="text-sm text-muted-foreground">Step-by-step deployment instructions and production setup.</p>
                    <div className="mt-2 space-y-1">
                      <div className="text-xs text-muted-foreground">• Supabase Setup</div>
                      <div className="text-xs text-muted-foreground">• Backend Configuration</div>
                      <div className="text-xs text-muted-foreground">• Vercel Deployment</div>
                      <div className="text-xs text-muted-foreground">• Security Configuration</div>
                      <div className="text-xs text-muted-foreground">• HIPAA Compliance Checklist</div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            <h3>Quick Start Guide</h3>
            <div className="p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg my-6">
              <h4 className="font-semibold text-blue-900 dark:text-blue-100 mb-3">Implementation Steps</h4>
              <div className="space-y-3 text-sm">
                <div className="flex items-start gap-3">
                  <div className="flex-shrink-0 w-6 h-6 bg-blue-600 text-white rounded-full flex items-center justify-center text-xs font-bold">1</div>
                  <div>
                    <h5 className="font-medium text-blue-900 dark:text-blue-100">Set up Supabase Project</h5>
                    <p className="text-blue-800 dark:text-blue-200">Create a new Supabase project and configure the database schema with all required tables and indexes.</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="flex-shrink-0 w-6 h-6 bg-blue-600 text-white rounded-full flex items-center justify-center text-xs font-bold">2</div>
                  <div>
                    <h5 className="font-medium text-blue-900 dark:text-blue-100">Create Backend API</h5>
                    <p className="text-blue-800 dark:text-blue-200">Set up Node.js/Express backend with TypeScript, implement all API endpoints, and configure authentication.</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="flex-shrink-0 w-6 h-6 bg-blue-600 text-white rounded-full flex items-center justify-center text-xs font-bold">3</div>
                  <div>
                    <h5 className="font-medium text-blue-900 dark:text-blue-100">Configure Security</h5>
                    <p className="text-blue-800 dark:text-blue-200">Implement HIPAA compliance measures including encryption, access controls, and audit logging.</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="flex-shrink-0 w-6 h-6 bg-blue-600 text-white rounded-full flex items-center justify-center text-xs font-bold">4</div>
                  <div>
                    <h5 className="font-medium text-blue-900 dark:text-blue-100">Deploy to Production</h5>
                    <p className="text-blue-800 dark:text-blue-200">Deploy the backend to Vercel and configure environment variables for production use.</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="flex-shrink-0 w-6 h-6 bg-blue-600 text-white rounded-full flex items-center justify-center text-xs font-bold">5</div>
                  <div>
                    <h5 className="font-medium text-blue-900 dark:text-blue-100">Update Frontend</h5>
                    <p className="text-blue-800 dark:text-blue-200">Replace mock data with real API calls and implement the new API client in your frontend.</p>
                  </div>
                </div>
              </div>
            </div>

            <h3>Key Features</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 my-6">
              <Card>
                <CardHeader>
                  <CardTitle className="text-sm">HIPAA Compliance Features</CardTitle>
                </CardHeader>
                <CardContent className="space-y-2">
                  <Badge variant="outline">AES-256 Data Encryption</Badge>
                  <Badge variant="outline">Role-Based Access Control</Badge>
                  <Badge variant="outline">Comprehensive Audit Logging</Badge>
                  <Badge variant="outline">PHI Field Encryption</Badge>
                  <Badge variant="outline">Secure Session Management</Badge>
                  <Badge variant="outline">Input Validation & Sanitization</Badge>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-sm">API Features</CardTitle>
                </CardHeader>
                <CardContent className="space-y-2">
                  <Badge variant="outline">RESTful Design</Badge>
                  <Badge variant="outline">JWT Authentication</Badge>
                  <Badge variant="outline">Rate Limiting</Badge>
                  <Badge variant="outline">Pagination Support</Badge>
                  <Badge variant="outline">Real-time Updates</Badge>
                  <Badge variant="outline">File Upload/Download</Badge>
                  <Badge variant="outline">Insurance Integration</Badge>
                  <Badge variant="outline">Payment Processing</Badge>
                  <Badge variant="outline">Claims Automation</Badge>
                </CardContent>
              </Card>
            </div>

            <h3>Technology Stack</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 my-6">
              <Card>
                <CardHeader className="pb-3">
                  <CardTitle className="text-sm">Backend Framework</CardTitle>
                </CardHeader>
                <CardContent className="space-y-2">
                  <Badge variant="outline">Node.js 18+</Badge>
                  <Badge variant="outline">Express.js</Badge>
                  <Badge variant="outline">TypeScript</Badge>
                  <Badge variant="outline">JWT Authentication</Badge>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="pb-3">
                  <CardTitle className="text-sm">Database & Storage</CardTitle>
                </CardHeader>
                <CardContent className="space-y-2">
                  <Badge variant="outline">Supabase PostgreSQL</Badge>
                  <Badge variant="outline">Row Level Security</Badge>
                  <Badge variant="outline">Real-time Subscriptions</Badge>
                  <Badge variant="outline">File Storage</Badge>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="pb-3">
                  <CardTitle className="text-sm">Deployment & Security</CardTitle>
                </CardHeader>
                <CardContent className="space-y-2">
                  <Badge variant="outline">Vercel Deployment</Badge>
                  <Badge variant="outline">HTTPS/TLS</Badge>
                  <Badge variant="outline">CORS Configuration</Badge>
                  <Badge variant="outline">Environment Variables</Badge>
                </CardContent>
              </Card>
            </div>

            <h3>Documentation Files</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 my-6">
              <Card>
                <CardHeader>
                  <CardTitle className="text-sm">Available Documentation</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="flex items-center justify-between p-3 border rounded-lg">
                    <div>
                      <h5 className="font-medium text-sm">HIPAA Backend Implementation</h5>
                      <p className="text-xs text-muted-foreground">Complete implementation guide</p>
                    </div>
                    <Button variant="outline" size="sm">
                      <Download className="h-4 w-4 mr-2" />
                      View
                    </Button>
                  </div>
                  <div className="flex items-center justify-between p-3 border rounded-lg">
                    <div>
                      <h5 className="font-medium text-sm">API Endpoints Reference</h5>
                      <p className="text-xs text-muted-foreground">Detailed API documentation</p>
                    </div>
                    <Button variant="outline" size="sm">
                      <Download className="h-4 w-4 mr-2" />
                      View
                    </Button>
                  </div>
                  <div className="flex items-center justify-between p-3 border rounded-lg">
                    <div>
                      <h5 className="font-medium text-sm">TypeScript Types</h5>
                      <p className="text-xs text-muted-foreground">Complete type definitions</p>
                    </div>
                    <Button variant="outline" size="sm">
                      <Download className="h-4 w-4 mr-2" />
                      View
                    </Button>
                  </div>
                  <div className="flex items-center justify-between p-3 border rounded-lg">
                    <div>
                      <h5 className="font-medium text-sm">Deployment Guide</h5>
                      <p className="text-xs text-muted-foreground">Setup and deployment instructions</p>
                    </div>
                    <Button variant="outline" size="sm">
                      <Download className="h-4 w-4 mr-2" />
                      View
                    </Button>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-sm">Implementation Resources</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="p-3 border rounded-lg">
                    <h5 className="font-medium text-sm mb-2">Database Schema</h5>
                    <p className="text-xs text-muted-foreground mb-2">Complete PostgreSQL schema with all tables, relationships, and indexes</p>
                    <Badge variant="outline" className="text-xs">SQL Scripts</Badge>
                  </div>
                  <div className="p-3 border rounded-lg">
                    <h5 className="font-medium text-sm mb-2">API Code Examples</h5>
                    <p className="text-xs text-muted-foreground mb-2">Ready-to-use code examples for all endpoints</p>
                    <Badge variant="outline" className="text-xs">TypeScript</Badge>
                  </div>
                  <div className="p-3 border rounded-lg">
                    <h5 className="font-medium text-sm mb-2">Security Implementation</h5>
                    <p className="text-xs text-muted-foreground mb-2">HIPAA compliance and security best practices</p>
                    <Badge variant="outline" className="text-xs">Security</Badge>
                  </div>
                  <div className="p-3 border rounded-lg">
                    <h5 className="font-medium text-sm mb-2">Frontend Integration</h5>
                    <p className="text-xs text-muted-foreground mb-2">Guide for integrating with your existing frontend</p>
                    <Badge variant="outline" className="text-xs">React/Next.js</Badge>
                  </div>
                </CardContent>
              </Card>
            </div>

            <div className="p-4 bg-green-50 dark:bg-green-900/20 rounded-lg my-6">
              <h4 className="font-semibold text-green-900 dark:text-green-100 mb-3">Ready to Implement?</h4>
              <p className="text-green-800 dark:text-green-200 text-sm mb-4">
                All documentation is available in the <code className="bg-green-100 dark:bg-green-800 px-1 rounded">docs/</code> directory of your project. 
                The implementation guide provides step-by-step instructions for setting up a production-ready, HIPAA-compliant backend.
              </p>
              <div className="flex gap-2">
                <Button variant="outline" size="sm">
                  <Code className="h-4 w-4 mr-2" />
                  View Implementation Guide
                </Button>
                <Button variant="outline" size="sm">
                  <Server className="h-4 w-4 mr-2" />
                  Setup Instructions
                </Button>
              </div>
            </div>
          </div>
        </div>
      )
    },
    {
      id: "backend",
      title: "Backend Integration",
      icon: Database,
      description: "HIPAA-compliant backend API and database implementation guide",
      content: (
        <div className="space-y-6">
          <div className="prose prose-gray max-w-none">
            <h2>Backend Integration Guide</h2>
            <p className="text-lg text-muted-foreground mb-6">
              Comprehensive documentation for implementing a HIPAA-compliant backend API and database setup for the HCC Healthcare Admin Portal.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
              <Card>
                <CardHeader className="pb-3">
                  <div className="flex items-center gap-2">
                    <Server className="h-5 w-5 text-blue-600" />
                    <CardTitle className="text-sm">Technology Stack</CardTitle>
                  </div>
                </CardHeader>
                <CardContent className="space-y-2">
                  <Badge variant="outline">Node.js/Express</Badge>
                  <Badge variant="outline">Supabase PostgreSQL</Badge>
                  <Badge variant="outline">TypeScript</Badge>
                  <Badge variant="outline">JWT Authentication</Badge>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="pb-3">
                  <div className="flex items-center gap-2">
                    <Shield className="h-5 w-5 text-green-600" />
                    <CardTitle className="text-sm">HIPAA Compliance</CardTitle>
                  </div>
                </CardHeader>
                <CardContent className="space-y-2">
                  <Badge variant="outline">Data Encryption</Badge>
                  <Badge variant="outline">Access Controls</Badge>
                  <Badge variant="outline">Audit Logging</Badge>
                  <Badge variant="outline">PHI Protection</Badge>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="pb-3">
                  <div className="flex items-center gap-2">
                    <Code className="h-5 w-5 text-purple-600" />
                    <CardTitle className="text-sm">API Design</CardTitle>
                  </div>
                </CardHeader>
                <CardContent className="space-y-2">
                  <Badge variant="outline">RESTful Endpoints</Badge>
                  <Badge variant="outline">Validation</Badge>
                  <Badge variant="outline">Error Handling</Badge>
                  <Badge variant="outline">Rate Limiting</Badge>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="pb-3">
                  <div className="flex items-center gap-2">
                    <Database className="h-5 w-5 text-orange-600" />
                    <CardTitle className="text-sm">Database</CardTitle>
                  </div>
                </CardHeader>
                <CardContent className="space-y-2">
                  <Badge variant="outline">PostgreSQL Schema</Badge>
                  <Badge variant="outline">Row Level Security</Badge>
                  <Badge variant="outline">Indexes</Badge>
                  <Badge variant="outline">Real-time</Badge>
                </CardContent>
              </Card>
            </div>

            <h3>Documentation Sections</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 my-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <FileText className="h-5 w-5 text-blue-600" />
                    Implementation Guide
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div>
                    <h5 className="font-medium text-sm">HIPAA Backend Implementation</h5>
                    <p className="text-sm text-muted-foreground">Complete guide for implementing a HIPAA-compliant backend API and database setup.</p>
                    <div className="mt-2 space-y-1">
                      <div className="text-xs text-muted-foreground">• API Requirements Analysis</div>
                      <div className="text-xs text-muted-foreground">• Database Schema Design</div>
                      <div className="text-xs text-muted-foreground">• Technology Stack Documentation</div>
                      <div className="text-xs text-muted-foreground">• HIPAA Compliance Implementation</div>
                      <div className="text-xs text-muted-foreground">• Integration Guide</div>
                      <div className="text-xs text-muted-foreground">• Code Examples</div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Code className="h-5 w-5 text-green-600" />
                    API Reference
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div>
                    <h5 className="font-medium text-sm">API Endpoints Reference</h5>
                    <p className="text-sm text-muted-foreground">Detailed API documentation with request/response examples and error handling.</p>
                    <div className="mt-2 space-y-1">
                      <div className="text-xs text-muted-foreground">• Authentication Endpoints</div>
                      <div className="text-xs text-muted-foreground">• Patient Management APIs</div>
                      <div className="text-xs text-muted-foreground">• Appointment & Message APIs</div>
                      <div className="text-xs text-muted-foreground">• Prescription & Care Plan APIs</div>
                      <div className="text-xs text-muted-foreground">• Document & Billing APIs</div>
                      <div className="text-xs text-muted-foreground">• Insurance Verification APIs</div>
                      <div className="text-xs text-muted-foreground">• Payment Processing APIs</div>
                      <div className="text-xs text-muted-foreground">• Claims Automation APIs</div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Code className="h-5 w-5 text-purple-600" />
                    TypeScript Types
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div>
                    <h5 className="font-medium text-sm">TypeScript Types Reference</h5>
                    <p className="text-sm text-muted-foreground">Complete interface definitions and type safety for the entire API.</p>
                    <div className="mt-2 space-y-1">
                      <div className="text-xs text-muted-foreground">• Core Entity Interfaces</div>
                      <div className="text-xs text-muted-foreground">• API Request/Response Types</div>
                      <div className="text-xs text-muted-foreground">• Context Types</div>
                      <div className="text-xs text-muted-foreground">• Utility Types</div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Server className="h-5 w-5 text-orange-600" />
                    Deployment Guide
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div>
                    <h5 className="font-medium text-sm">Deployment & Setup Guide</h5>
                    <p className="text-sm text-muted-foreground">Step-by-step deployment instructions and production setup.</p>
                    <div className="mt-2 space-y-1">
                      <div className="text-xs text-muted-foreground">• Supabase Setup</div>
                      <div className="text-xs text-muted-foreground">• Backend Configuration</div>
                      <div className="text-xs text-muted-foreground">• Vercel Deployment</div>
                      <div className="text-xs text-muted-foreground">• Security Configuration</div>
                      <div className="text-xs text-muted-foreground">• HIPAA Compliance Checklist</div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            <h3>Quick Start Guide</h3>
            <div className="p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg my-6">
              <h4 className="font-semibold text-blue-900 dark:text-blue-100 mb-3">Implementation Steps</h4>
              <div className="space-y-3 text-sm">
                <div className="flex items-start gap-3">
                  <div className="flex-shrink-0 w-6 h-6 bg-blue-600 text-white rounded-full flex items-center justify-center text-xs font-bold">1</div>
                  <div>
                    <h5 className="font-medium text-blue-900 dark:text-blue-100">Set up Supabase Project</h5>
                    <p className="text-blue-800 dark:text-blue-200">Create a new Supabase project and configure the database schema with all required tables and indexes.</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="flex-shrink-0 w-6 h-6 bg-blue-600 text-white rounded-full flex items-center justify-center text-xs font-bold">2</div>
                  <div>
                    <h5 className="font-medium text-blue-900 dark:text-blue-100">Create Backend API</h5>
                    <p className="text-blue-800 dark:text-blue-200">Set up Node.js/Express backend with TypeScript, implement all API endpoints, and configure authentication.</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="flex-shrink-0 w-6 h-6 bg-blue-600 text-white rounded-full flex items-center justify-center text-xs font-bold">3</div>
                  <div>
                    <h5 className="font-medium text-blue-900 dark:text-blue-100">Configure Security</h5>
                    <p className="text-blue-800 dark:text-blue-200">Implement HIPAA compliance measures including encryption, access controls, and audit logging.</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="flex-shrink-0 w-6 h-6 bg-blue-600 text-white rounded-full flex items-center justify-center text-xs font-bold">4</div>
                  <div>
                    <h5 className="font-medium text-blue-900 dark:text-blue-100">Deploy to Production</h5>
                    <p className="text-blue-800 dark:text-blue-200">Deploy the backend to Vercel and configure environment variables for production use.</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="flex-shrink-0 w-6 h-6 bg-blue-600 text-white rounded-full flex items-center justify-center text-xs font-bold">5</div>
                  <div>
                    <h5 className="font-medium text-blue-900 dark:text-blue-100">Update Frontend</h5>
                    <p className="text-blue-800 dark:text-blue-200">Replace mock data with real API calls and implement the new API client in your frontend.</p>
                  </div>
                </div>
              </div>
            </div>

            <h3>Key Features</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 my-6">
              <Card>
                <CardHeader>
                  <CardTitle className="text-sm">HIPAA Compliance Features</CardTitle>
                </CardHeader>
                <CardContent className="space-y-2">
                  <Badge variant="outline">AES-256 Data Encryption</Badge>
                  <Badge variant="outline">Role-Based Access Control</Badge>
                  <Badge variant="outline">Comprehensive Audit Logging</Badge>
                  <Badge variant="outline">PHI Field Encryption</Badge>
                  <Badge variant="outline">Secure Session Management</Badge>
                  <Badge variant="outline">Input Validation & Sanitization</Badge>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-sm">API Features</CardTitle>
                </CardHeader>
                <CardContent className="space-y-2">
                  <Badge variant="outline">RESTful Design</Badge>
                  <Badge variant="outline">JWT Authentication</Badge>
                  <Badge variant="outline">Rate Limiting</Badge>
                  <Badge variant="outline">Pagination Support</Badge>
                  <Badge variant="outline">Real-time Updates</Badge>
                  <Badge variant="outline">File Upload/Download</Badge>
                  <Badge variant="outline">Insurance Integration</Badge>
                  <Badge variant="outline">Payment Processing</Badge>
                  <Badge variant="outline">Claims Automation</Badge>
                </CardContent>
              </Card>
            </div>

            <h3>Technology Stack</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 my-6">
              <Card>
                <CardHeader className="pb-3">
                  <CardTitle className="text-sm">Backend Framework</CardTitle>
                </CardHeader>
                <CardContent className="space-y-2">
                  <Badge variant="outline">Node.js 18+</Badge>
                  <Badge variant="outline">Express.js</Badge>
                  <Badge variant="outline">TypeScript</Badge>
                  <Badge variant="outline">JWT Authentication</Badge>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="pb-3">
                  <CardTitle className="text-sm">Database & Storage</CardTitle>
                </CardHeader>
                <CardContent className="space-y-2">
                  <Badge variant="outline">Supabase PostgreSQL</Badge>
                  <Badge variant="outline">Row Level Security</Badge>
                  <Badge variant="outline">Real-time Subscriptions</Badge>
                  <Badge variant="outline">File Storage</Badge>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="pb-3">
                  <CardTitle className="text-sm">Deployment & Security</CardTitle>
                </CardHeader>
                <CardContent className="space-y-2">
                  <Badge variant="outline">Vercel Deployment</Badge>
                  <Badge variant="outline">HTTPS/TLS</Badge>
                  <Badge variant="outline">CORS Configuration</Badge>
                  <Badge variant="outline">Environment Variables</Badge>
                </CardContent>
              </Card>
            </div>

            <h3>Documentation Files</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 my-6">
              <Card>
                <CardHeader>
                  <CardTitle className="text-sm">Available Documentation</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="flex items-center justify-between p-3 border rounded-lg">
                    <div>
                      <h5 className="font-medium text-sm">HIPAA Backend Implementation</h5>
                      <p className="text-xs text-muted-foreground">Complete implementation guide</p>
                    </div>
                    <Button variant="outline" size="sm">
                      <Download className="h-4 w-4 mr-2" />
                      View
                    </Button>
                  </div>
                  <div className="flex items-center justify-between p-3 border rounded-lg">
                    <div>
                      <h5 className="font-medium text-sm">API Endpoints Reference</h5>
                      <p className="text-xs text-muted-foreground">Detailed API documentation</p>
                    </div>
                    <Button variant="outline" size="sm">
                      <Download className="h-4 w-4 mr-2" />
                      View
                    </Button>
                  </div>
                  <div className="flex items-center justify-between p-3 border rounded-lg">
                    <div>
                      <h5 className="font-medium text-sm">TypeScript Types</h5>
                      <p className="text-xs text-muted-foreground">Complete type definitions</p>
                    </div>
                    <Button variant="outline" size="sm">
                      <Download className="h-4 w-4 mr-2" />
                      View
                    </Button>
                  </div>
                  <div className="flex items-center justify-between p-3 border rounded-lg">
                    <div>
                      <h5 className="font-medium text-sm">Deployment Guide</h5>
                      <p className="text-xs text-muted-foreground">Setup and deployment instructions</p>
                    </div>
                    <Button variant="outline" size="sm">
                      <Download className="h-4 w-4 mr-2" />
                      View
                    </Button>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-sm">Implementation Resources</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="p-3 border rounded-lg">
                    <h5 className="font-medium text-sm mb-2">Database Schema</h5>
                    <p className="text-xs text-muted-foreground mb-2">Complete PostgreSQL schema with all tables, relationships, and indexes</p>
                    <Badge variant="outline" className="text-xs">SQL Scripts</Badge>
                  </div>
                  <div className="p-3 border rounded-lg">
                    <h5 className="font-medium text-sm mb-2">API Code Examples</h5>
                    <p className="text-xs text-muted-foreground mb-2">Ready-to-use code examples for all endpoints</p>
                    <Badge variant="outline" className="text-xs">TypeScript</Badge>
                  </div>
                  <div className="p-3 border rounded-lg">
                    <h5 className="font-medium text-sm mb-2">Security Implementation</h5>
                    <p className="text-xs text-muted-foreground mb-2">HIPAA compliance and security best practices</p>
                    <Badge variant="outline" className="text-xs">Security</Badge>
                  </div>
                  <div className="p-3 border rounded-lg">
                    <h5 className="font-medium text-sm mb-2">Frontend Integration</h5>
                    <p className="text-xs text-muted-foreground mb-2">Guide for integrating with your existing frontend</p>
                    <Badge variant="outline" className="text-xs">React/Next.js</Badge>
                  </div>
                </CardContent>
              </Card>
            </div>

            <div className="p-4 bg-green-50 dark:bg-green-900/20 rounded-lg my-6">
              <h4 className="font-semibold text-green-900 dark:text-green-100 mb-3">Ready to Implement?</h4>
              <p className="text-green-800 dark:text-green-200 text-sm mb-4">
                All documentation is available in the <code className="bg-green-100 dark:bg-green-800 px-1 rounded">docs/</code> directory of your project. 
                The implementation guide provides step-by-step instructions for setting up a production-ready, HIPAA-compliant backend.
              </p>
              <div className="flex gap-2">
                <Button variant="outline" size="sm">
                  <Code className="h-4 w-4 mr-2" />
                  View Implementation Guide
                </Button>
                <Button variant="outline" size="sm">
                  <Server className="h-4 w-4 mr-2" />
                  Setup Instructions
                </Button>
              </div>
            </div>
          </div>
        </div>
      )
    }
  ]

  return (
    <div className="container mx-auto py-6 space-y-6">
      {/* Header */}
      <div className="flex flex-col space-y-2">
        <h1 className="text-3xl font-bold tracking-tight">Documentation</h1>
        <p className="text-muted-foreground">
          Comprehensive documentation for the HCC Admin Portal - your complete guide to understanding, using, and developing the healthcare management system.
        </p>
      </div>

      {/* Documentation Navigation */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {documentationSections.map((section) => {
          const Icon = section.icon
          return (
            <Card 
              key={section.id}
              className="cursor-pointer hover:shadow-md transition-shadow"
              onClick={() => setActiveTab(section.id)}
            >
              <CardHeader className="pb-3">
                <div className="flex items-center gap-3">
                  <Icon className="h-6 w-6 text-primary" />
                  <CardTitle className="text-lg">{section.title}</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground mb-4">
                  {section.description}
                </p>
                <Button 
                  variant="outline" 
                  size="sm" 
                  className="w-full"
                  onClick={() => setActiveTab(section.id)}
                >
                  View Documentation
                  <ChevronRight className="h-4 w-4 ml-2" />
                </Button>
              </CardContent>
            </Card>
          )
        })}
      </div>

      <Separator />

      {/* Documentation Content */}
      <div className="min-h-[600px]">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-6">
            {documentationSections.map((section) => (
              <TabsTrigger key={section.id} value={section.id} className="text-xs">
                {section.title.split(' ')[0]}
              </TabsTrigger>
            ))}
          </TabsList>
          
          {documentationSections.map((section) => (
            <TabsContent key={section.id} value={section.id} className="mt-6">
              {section.content}
            </TabsContent>
          ))}
        </Tabs>
      </div>

      {/* Quick Actions */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <ExternalLink className="h-5 w-5" />
            Quick Actions & Resources
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <Button variant="outline" className="w-full">
              <Download className="h-4 w-4 mr-2" />
              Download PDF Guide
            </Button>
            <Button variant="outline" className="w-full">
              <ExternalLink className="h-4 w-4 mr-2" />
              Video Tutorials
            </Button>
            <Button variant="outline" className="w-full">
              <Users className="h-4 w-4 mr-2" />
              Contact Support
            </Button>
            <Button variant="outline" className="w-full">
              <Code className="h-4 w-4 mr-2" />
              API Documentation
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Additional Resources */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <BookOpen className="h-5 w-5" />
              Additional Resources
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="space-y-2">
              <h4 className="font-medium text-sm">External Documentation</h4>
              <div className="space-y-1 text-sm text-muted-foreground">
                <div>• Next.js Documentation</div>
                <div>• React Documentation</div>
                <div>• TypeScript Handbook</div>
                <div>• Tailwind CSS Guide</div>
              </div>
            </div>
            <div className="space-y-2">
              <h4 className="font-medium text-sm">Community Resources</h4>
              <div className="space-y-1 text-sm text-muted-foreground">
                <div>• GitHub Repository</div>
                <div>• Issue Tracker</div>
                <div>• Discussion Forum</div>
                <div>• Contributing Guidelines</div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Settings className="h-5 w-5" />
              System Information
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="space-y-2">
              <h4 className="font-medium text-sm">Version Information</h4>
              <div className="space-y-1 text-sm text-muted-foreground">
                <div>• Admin Portal: v2.1.0</div>
                <div>• Next.js: 15.2.4</div>
                <div>• React: 19.1.0</div>
                <div>• TypeScript: 5.4.2</div>
              </div>
            </div>
            <div className="space-y-2">
              <h4 className="font-medium text-sm">Support & Maintenance</h4>
              <div className="space-y-1 text-sm text-muted-foreground">
                <div>• Regular Updates: Monthly</div>
                <div>• Security Patches: As needed</div>
                <div>• Feature Releases: Quarterly</div>
                <div>• Support Hours: 24/7</div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
} 