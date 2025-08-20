import React from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { 
  Database, 
  Smartphone, 
  Zap, 
  Shield, 
  FileText, 
  Download 
} from "lucide-react"

export default function IntegrationContent() {
  return (
    <div className="space-y-6">
      <div className="prose prose-gray max-w-none">
        <h2>eClinicalWorks EMR & Healow App Integration Analysis</h2>
        <p className="text-lg text-muted-foreground mb-6">
          Comprehensive analysis of integrating eClinicalWorks EMR and Healow patient portal with the HCC Healthcare Admin Portal.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <Card>
            <CardHeader className="pb-3">
              <div className="flex items-center gap-2">
                <Database className="h-5 w-5 text-blue-600" />
                <CardTitle className="text-sm">eClinicalWorks EMR</CardTitle>
              </div>
            </CardHeader>
            <CardContent className="space-y-2">
              <Badge variant="outline">Patient Records</Badge>
              <Badge variant="outline">Appointment Management</Badge>
              <Badge variant="outline">Clinical Documentation</Badge>
              <Badge variant="outline">E-prescribing</Badge>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-3">
              <div className="flex items-center gap-2">
                <Smartphone className="h-5 w-5 text-green-600" />
                <CardTitle className="text-sm">Healow Patient Portal</CardTitle>
              </div>
            </CardHeader>
            <CardContent className="space-y-2">
              <Badge variant="outline">Patient Scheduling</Badge>
              <Badge variant="outline">Secure Messaging</Badge>
              <Badge variant="outline">Health Records</Badge>
              <Badge variant="outline">Telemedicine</Badge>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-3">
              <div className="flex items-center gap-2">
                <Zap className="h-5 w-5 text-purple-600" />
                <CardTitle className="text-sm">Integration Features</CardTitle>
              </div>
            </CardHeader>
            <CardContent className="space-y-2">
              <Badge variant="outline">Data Synchronization</Badge>
              <Badge variant="outline">API Integration</Badge>
              <Badge variant="outline">Real-time Updates</Badge>
              <Badge variant="outline">HIPAA Compliance</Badge>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-3">
              <div className="flex items-center gap-2">
                <Shield className="h-5 w-5 text-orange-600" />
                <CardTitle className="text-sm">Security & Compliance</CardTitle>
              </div>
            </CardHeader>
            <CardContent className="space-y-2">
              <Badge variant="outline">Data Encryption</Badge>
              <Badge variant="outline">Access Controls</Badge>
              <Badge variant="outline">Audit Logging</Badge>
              <Badge variant="outline">PHI Protection</Badge>
            </CardContent>
          </Card>
        </div>

        <h3>Platform Overview</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 my-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Database className="h-5 w-5 text-blue-600" />
                eClinicalWorks EMR
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div>
                <h5 className="font-medium text-sm">Core Features</h5>
                <div className="text-sm text-muted-foreground space-y-1">
                  <div>• Patient demographics and medical history</div>
                  <div>• Appointment scheduling and management</div>
                  <div>• Clinical documentation and progress notes</div>
                  <div>• E-prescribing capabilities</div>
                  <div>• Billing and claims management</div>
                  <div>• Lab results integration</div>
                </div>
              </div>
              <div>
                <h5 className="font-medium text-sm">Integration Capabilities</h5>
                <div className="text-sm text-muted-foreground space-y-1">
                  <div>• RESTful API endpoints</div>
                  <div>• HL7 FHIR support</div>
                  <div>• Real-time data synchronization</div>
                  <div>• Custom data mapping</div>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Smartphone className="h-5 w-5 text-green-600" />
                Healow Patient Portal
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div>
                <h5 className="font-medium text-sm">Patient Features</h5>
                <div className="text-sm text-muted-foreground space-y-1">
                  <div>• Patient appointment scheduling</div>
                  <div>• Secure messaging with providers</div>
                  <div>• Access to medical records and lab results</div>
                  <div>• Prescription refill requests</div>
                  <div>• Bill payment and insurance information</div>
                  <div>• Telemedicine capabilities</div>
                </div>
              </div>
              <div>
                <h5 className="font-medium text-sm">Integration Benefits</h5>
                <div className="text-sm text-muted-foreground space-y-1">
                  <div>• Unified patient experience</div>
                  <div>• Seamless data flow</div>
                  <div>• Enhanced patient engagement</div>
                  <div>• Improved care coordination</div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <h3>Integration Architecture</h3>
        <div className="bg-gray-50 dark:bg-gray-900 p-4 rounded-lg my-6">
          <pre className="text-sm font-mono">
{"┌─────────────────┐    ┌──────────────────┐    ┌─────────────────┐\n" +
"│   HCC Admin     │    │  eClinicalWorks  │    │    Healow       │\n" +
"│     Portal      │◄──►│      EMR         │◄──►│   Patient App   │\n" +
"└─────────────────┘    └──────────────────┘    └─────────────────┘\n" +
"         │                       │                       │\n" +
"         │                       │                       │\n" +
"         ▼                       ▼                       ▼\n" +
"┌─────────────────┐    ┌──────────────────┐    ┌─────────────────┐\n" +
"│   HCC Patient   │    │   Integration    │    │   Patient       │\n" +
"│     Portal      │    │     Layer        │    │   Experience    │\n" +
"└─────────────────┘    └──────────────────┘    └─────────────────┘"}
          </pre>
        </div>

        <h3>Implementation Strategy</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 my-6">
          <Card>
            <CardHeader>
              <CardTitle className="text-sm">Phase 1: Foundation</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2 text-sm">
              <div>• eClinicalWorks API integration</div>
              <div>• Core data synchronization</div>
              <div>• Security and compliance setup</div>
              <div>• Data mapping and transformation</div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle className="text-sm">Phase 2: Patient Portal</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2 text-sm">
              <div>• Healow functionality integration</div>
              <div>• Unified patient authentication</div>
              <div>• Seamless user experience</div>
              <div>• Testing and validation</div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle className="text-sm">Phase 3: Advanced Features</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2 text-sm">
              <div>• Automated workflows</div>
              <div>• Advanced analytics</div>
              <div>• Performance optimization</div>
              <div>• User training</div>
            </CardContent>
          </Card>
        </div>

        <div className="p-4 bg-green-50 dark:bg-green-900/20 rounded-lg my-6">
          <h4 className="font-semibold text-green-900 dark:text-green-100 mb-3">Complete Analysis Available</h4>
          <p className="text-green-800 dark:text-green-200 text-sm mb-4">
            A comprehensive analysis document is available in the <code className="bg-green-100 dark:bg-green-800 px-1 rounded">docs/</code> directory: 
            <strong>ECLINICALWORKS_HEALOW_INTEGRATION_ANALYSIS.md</strong>
          </p>
          <div className="flex gap-2">
            <Button variant="outline" size="sm">
              <FileText className="h-4 w-4 mr-2" />
              View Full Analysis
            </Button>
            <Button variant="outline" size="sm">
              <Download className="h-4 w-4 mr-2" />
              Download PDF
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
} 