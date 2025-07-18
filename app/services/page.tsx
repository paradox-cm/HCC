"use client"

import type React from "react"
import { SectionWrapper } from "@/components/section-wrapper"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Stethoscope, CheckCircle } from "lucide-react"
import Link from "next/link"

const services = [
  {
    category: "Diagnostics",
    items: [
      {
        name: "EKG / ECG",
        defaultDescription:
          "A quick, painless test that records your heart's electrical activity to detect rhythm abnormalities, previous heart attacks, and other cardiac conditions.",
        detailedDescription:
          "A 10-minute test where small electrodes are attached to your chest, arms, and legs to record your heart's electrical activity. It's painless and requires no special preparation. It helps detect arrhythmias, previous heart attacks, and overall heart rhythm abnormalities.",
      },
      {
        name: "Echocardiogram",
        defaultDescription:
          "An ultrasound imaging test that provides detailed pictures of your heart's structure, function, and blood flow through the heart chambers and valves.",
        detailedDescription:
          "An ultrasound of your heart performed while you lie on your side. A technician moves a probe across your chest to visualize heart structure and function. No preparation needed. It helps detect valve issues, heart failure, and congenital defects.",
      },
      {
        name: "Doppler Ultrasound",
        defaultDescription:
          "A non-invasive imaging test that uses sound waves to evaluate blood flow through your arteries and veins, helping detect blockages or circulation problems.",
        detailedDescription:
          "This test evaluates blood flow through vessels using sound waves. A gel is applied to the skin and a handheld probe is used to scan. Non-invasive and painless. Often used to check for clots, venous insufficiency, or blocked arteries.",
      },
      {
        name: "ABI (Ankle-Brachial Index)",
        defaultDescription:
          "A simple test that compares blood pressure in your arms and ankles to screen for peripheral artery disease and circulation problems in your legs.",
        detailedDescription:
          "Blood pressure cuffs are placed on your arms and ankles to assess circulation. No fasting needed. Identifies peripheral artery disease early, especially in patients with leg pain or diabetes.",
      },
      {
        name: "Cardiac CT",
        defaultDescription:
          "Advanced imaging that creates detailed 3D pictures of your heart and coronary arteries to assess calcium buildup and detect blockages.",
        detailedDescription:
          "A fast, high-resolution X-ray that provides a 3D image of your heart and arteries. Often requires a contrast dye and fasting for 4 hours prior. Commonly used to evaluate calcium scores and coronary anatomy.",
      },
      {
        name: "Cardiac PET/CT",
        defaultDescription:
          "A sophisticated imaging test that combines two technologies to evaluate blood flow to your heart muscle and detect areas of damage or disease.",
        detailedDescription:
          "A powerful imaging test combining PET and CT scans to assess blood flow and detect damage or disease in heart tissue. You may need to avoid caffeine or beta-blockers before the exam. Very effective in diagnosing coronary artery disease and viability of heart muscle.",
      },
      {
        name: "Nuclear Stress Test",
        defaultDescription:
          "A comprehensive test that evaluates how well blood flows to your heart muscle during rest and stress, helping identify blockages in coronary arteries.",
        detailedDescription:
          "Involves a resting scan, a stress phase (via treadmill or medication), and another scan after activity. Radioactive dye is used to trace blood flow. Detailed instructions are provided ahead of time. Excellent for detecting blockages or ischemia.",
      },
      {
        name: "AAA Screening",
        defaultDescription:
          "A quick ultrasound screening to check for abdominal aortic aneurysm, an enlargement of the main artery in your abdomen that can be life-threatening if undetected.",
        detailedDescription:
          "An ultrasound of the abdomen to screen for abdominal aortic aneurysm. Non-invasive. Recommended for men over 65 or those with a smoking history. No prep needed unless specified.",
      },
    ],
  },
  {
    category: "Treatments & Therapies",
    items: [
      {
        name: "EECP Therapy",
        defaultDescription:
          "A non-invasive treatment that improves blood flow to your heart by using external pressure cuffs, helping reduce chest pain and improve exercise tolerance.",
        detailedDescription:
          "Enhanced External Counterpulsation is a series of one-hour sessions where cuffs inflate on your legs in sync with your heartbeat. Non-invasive, done daily for about 7 weeks. No downtime. Improves circulation, especially in those with angina or heart failure.",
      },
      {
        name: "Vein Ablation",
        defaultDescription:
          "A minimally invasive procedure to treat varicose veins and venous insufficiency by closing problematic veins, improving circulation and reducing leg pain.",
        detailedDescription:
          "A catheter-based procedure using heat or chemicals to close varicose or incompetent veins. Done under local anesthesia. You may wear compression stockings afterward. Quick return to activities. Often improves leg pain and swelling.",
      },
      {
        name: "Pacemaker Services",
        defaultDescription:
          "Comprehensive care for patients with slow or irregular heart rhythms, including pacemaker implantation, monitoring, and ongoing device management.",
        detailedDescription:
          "For patients with slow or irregular heart rhythms, we offer pacemaker implantation and ongoing management. The procedure is done under mild sedation. Follow-up includes regular device checks and adjustments as needed.",
      },
    ],
  },
  {
    category: "Cardiac Wellness",
    items: [
      {
        name: "Preventive Heart Evaluations",
        defaultDescription:
          "Comprehensive cardiovascular risk assessments designed to identify potential heart problems early and develop personalized prevention strategies.",
        detailedDescription:
          "Comprehensive workups that include blood pressure, labs, EKGs, and risk factor analysis. Useful for individuals with family history or early signs of heart disease. Patients leave with actionable recommendations.",
      },
      {
        name: "Intensive Cardiac Rehab",
        defaultDescription:
          "A medically supervised program combining exercise, education, and lifestyle counseling to help patients recover from heart events and improve long-term outcomes.",
        detailedDescription:
          "A structured program over several weeks involving supervised exercise, dietary counseling, stress management, and education. Proven to reduce hospital readmissions and improve quality of life.",
      },
      {
        name: "Lifestyle & Risk Assessments",
        defaultDescription:
          "Personalized consultations focused on identifying cardiovascular risk factors and creating tailored lifestyle modification plans for optimal heart health.",
        detailedDescription:
          "30–60 minute consultations reviewing lifestyle habits, family history, and risk scores. Includes education on diet, activity, smoking cessation, and stress. Custom prevention plans are developed.",
      },
    ],
  },
  {
    category: "Special Services",
    items: [
      {
        name: "Concierge Cardiology",
        defaultDescription:
          "Premium membership-based cardiovascular care offering enhanced access, personalized attention, and comprehensive health management for busy professionals.",
        detailedDescription:
          "Membership-based access to your cardiologist with priority scheduling, extended visits, and proactive follow-ups. Tailored for executives, frequent travelers, or those who want enhanced privacy and convenience.",
      },
      {
        name: "Telemedicine",
        defaultDescription:
          "Convenient virtual consultations with your cardiologist from the comfort of your home or office, perfect for follow-ups and medication management.",
        detailedDescription:
          "Remote visits via secure video from your home or office. Ideal for follow-ups or medication discussions. No special setup—just a phone, tablet, or computer with internet.",
      },
      {
        name: "Preoperative Clearances",
        defaultDescription:
          "Rapid cardiovascular assessments required before non-cardiac surgery to ensure your heart is ready for the procedure and minimize surgical risks.",
        detailedDescription:
          "Comprehensive cardiovascular assessment required before non-cardiac surgery. Includes history review, physical exam, EKG, and possibly imaging. Coordinated quickly, often within 24–48 hours. Reports are sent directly to your surgical team.",
      },
    ],
  },
]

export default function ServicesPage() {
  return (
    <>
      <SectionWrapper className="bg-muted/20">
        <div className="text-center">
          <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl">Our Services</h1>
          <p className="mt-4 max-w-3xl mx-auto text-muted-foreground md:text-xl">
            We offer a full spectrum of cardiology services, diagnostics, and therapies tailored to your specific needs.
            All care is delivered with precision, compassion, and the latest medical technologies.
          </p>
        </div>
      </SectionWrapper>

      {services.map((serviceCategory) => (
        <SectionWrapper key={serviceCategory.category} className="py-12 md:py-20">
          <h2 className="text-3xl font-bold tracking-tight text-center mb-12">{serviceCategory.category}</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {serviceCategory.items.map((item) => (
              <ServiceCard
                key={item.name}
                name={item.name}
                defaultDescription={item.defaultDescription}
                detailedDescription={item.detailedDescription}
              />
            ))}
          </div>
        </SectionWrapper>
      ))}

      <SectionWrapper className="bg-muted/20">
        <div className="text-center">
          <h2 className="text-3xl font-bold tracking-tight">Specialized Care for POTS & Dysautonomia</h2>
          <p className="mt-2 text-primary font-semibold">
            Led by Dr. Asif Ali — Board-Certified Expert in Autonomic Disorders
          </p>
          <p className="mt-4 max-w-3xl mx-auto text-muted-foreground">
            Our program, led by Dr. Asif Ali, offers a center of excellence for diagnosing and treating complex
            autonomic disorders like POTS. We combine cutting-edge diagnostics with personalized, compassionate care to
            help patients regain control and improve their quality of life.
          </p>
        </div>

        <Tabs defaultValue="diagnostics" className="w-full max-w-4xl mx-auto mt-12">
          <TabsList className="grid w-full grid-cols-1 sm:grid-cols-3 h-auto">
            <TabsTrigger value="diagnostics" className="py-2">
              Comprehensive Diagnostics
            </TabsTrigger>
            <TabsTrigger value="treatment" className="py-2">
              Personalized Treatment
            </TabsTrigger>
            <TabsTrigger value="support" className="py-2">
              Ongoing Support
            </TabsTrigger>
          </TabsList>
          <TabsContent value="diagnostics">
            <Card>
              <CardHeader>
                <CardTitle>Comprehensive Diagnostic Testing</CardTitle>
              </CardHeader>
              <CardContent className="text-muted-foreground">
                <ul className="space-y-4">
                  <FeatureListItem>POTS protocol evaluations</FeatureListItem>
                  <FeatureListItem>Autonomic function testing</FeatureListItem>
                  <FeatureListItem>Blood volume and hemodynamic assessment</FeatureListItem>
                  <FeatureListItem>Specialized lab work</FeatureListItem>
                </ul>
              </CardContent>
            </Card>
          </TabsContent>
          <TabsContent value="treatment">
            <Card>
              <CardHeader>
                <CardTitle>Personalized Treatment Plans</CardTitle>
              </CardHeader>
              <CardContent className="text-muted-foreground">
                <ul className="space-y-4">
                  <FeatureListItem>Medication management</FeatureListItem>
                  <FeatureListItem>IV hydration therapy</FeatureListItem>
                  <FeatureListItem>Lifestyle/dietary modifications</FeatureListItem>
                  <FeatureListItem>Exercise reconditioning programs</FeatureListItem>
                </ul>
              </CardContent>
            </Card>
          </TabsContent>
          <TabsContent value="support">
            <Card>
              <CardHeader>
                <CardTitle>Ongoing Support & Accessible Care</CardTitle>
              </CardHeader>
              <CardContent className="text-muted-foreground">
                <ul className="space-y-4">
                  <FeatureListItem>Initial and follow-up appointments</FeatureListItem>
                  <FeatureListItem>Telemedicine options</FeatureListItem>
                  <FeatureListItem>Real-time treatment adjustments</FeatureListItem>
                  <FeatureListItem>Patient education and interdisciplinary care coordination</FeatureListItem>
                </ul>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        <div className="text-center mt-12">
          <Button size="lg" asChild>
            <Link href="/appointments">Schedule a Consultation</Link>
          </Button>
        </div>
      </SectionWrapper>
    </>
  )
}

function ServiceCard({
  name,
  defaultDescription,
  detailedDescription,
}: {
  name: string
  defaultDescription: string
  detailedDescription: string
}) {
  // Parse the detailed description to extract key information for hover state
  const parseServiceInfo = (desc: string) => {
    const durationMatch = desc.match(
      /(\d+[-–]\d+\s*(minutes?|hours?)|Takes?\s+about\s+\d+[-–]\d+\s*(minutes?|hours?)|Duration:\s*\d+[-–]\d+\s*(minutes?|hours?)|Lasts?\s+about\s+\d+\s*(minutes?|hours?)|The scan itself takes \d+[-–]\d+\s*(minutes?|hours?)|Total time:\s*\d+\.?\d*[-–]\d+\.?\d*\s*(hours?)|Sessions are \d+\s*(hour|minutes?)|Takes \d+[-–]\d+\s*(minutes?|hours?))/i,
    )
    const preparationMatch = desc.match(
      /(No preparation needed|requires.*fasting|avoid caffeine|No prep needed|No special preparation|may need to avoid|Detailed instructions are provided)/i,
    )
    const processMatch = desc.match(
      /(painless|Non-invasive|under.*anesthesia|electrodes are attached|probe.*moved|cuffs.*placed|involves.*scan)/i,
    )

    return {
      duration: durationMatch ? durationMatch[0] : null,
      preparation: preparationMatch ? preparationMatch[0] : null,
      process: processMatch ? processMatch[0] : null,
      mainDescription: desc.split(".")[0] + ".",
    }
  }

  const serviceInfo = parseServiceInfo(detailedDescription)

  return (
    <Card className="overflow-hidden transition-all duration-300 hover:shadow-lg hover:-translate-y-1 flex flex-col group">
      {/* Default View */}
      <div className="group-hover:hidden flex flex-col h-[480px]">
        <CardContent className="p-6 flex flex-col h-full">
          <h3 className="text-xl font-semibold mb-4">{name}</h3>
          <p className="text-muted-foreground leading-relaxed flex-grow">{defaultDescription}</p>
        </CardContent>
      </div>

      {/* Hover View */}
      <div className="hidden group-hover:flex group-hover:flex-col h-[480px]">
        {/* Image placeholder - full width */}
        <div className="w-full h-32 bg-gradient-to-r from-primary/10 to-primary/20 flex items-center justify-center flex-shrink-0">
          <Stethoscope className="h-8 w-8 text-primary/60" />
        </div>

        <CardContent className="p-6 flex flex-col flex-grow">
          <h3 className="text-xl font-semibold mb-4">{name}</h3>

          {/* Main description */}
          <p className="text-muted-foreground text-sm leading-relaxed mb-4 flex-grow">{detailedDescription}</p>

          {/* Key details section */}
          <div className="space-y-3 pt-4 border-t border-muted flex-shrink-0">
            {serviceInfo.duration && (
              <div className="flex items-start gap-2">
                <div className="w-2 h-2 rounded-full bg-primary mt-2 flex-shrink-0"></div>
                <div>
                  <span className="text-xs font-medium text-primary uppercase tracking-wide">Duration</span>
                  <p className="text-sm text-muted-foreground">{serviceInfo.duration}</p>
                </div>
              </div>
            )}

            {serviceInfo.preparation && (
              <div className="flex items-start gap-2">
                <div className="w-2 h-2 rounded-full bg-green-500 mt-2 flex-shrink-0"></div>
                <div>
                  <span className="text-xs font-medium text-green-700 uppercase tracking-wide">Preparation</span>
                  <p className="text-sm text-muted-foreground">{serviceInfo.preparation}</p>
                </div>
              </div>
            )}

            {serviceInfo.process && (
              <div className="flex items-start gap-2">
                <div className="w-2 h-2 rounded-full bg-blue-500 mt-2 flex-shrink-0"></div>
                <div>
                  <span className="text-xs font-medium text-blue-700 uppercase tracking-wide">What to Expect</span>
                  <p className="text-sm text-muted-foreground">{serviceInfo.process}</p>
                </div>
              </div>
            )}
          </div>
        </CardContent>
      </div>
    </Card>
  )
}

function FeatureListItem({ children }: { children: React.ReactNode }) {
  return (
    <li className="flex items-start gap-3">
      <CheckCircle className="h-5 w-5 text-green-500 mt-1 flex-shrink-0" />
      <span>{children}</span>
    </li>
  )
}
