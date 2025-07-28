"use client"

import type React from "react"
import { SectionWrapper } from "@/components/section-wrapper"
import { HeaderAnimation } from "@/components/HeaderAnimation"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import StethoscopeFillIcon from 'remixicon-react/StethoscopeFillIcon';
import CheckLineIcon from 'remixicon-react/CheckLineIcon';
import ArrowDownSFillIcon from 'remixicon-react/ArrowDownSFillIcon';
import ArrowUpSFillIcon from 'remixicon-react/ArrowUpSFillIcon';
import HeartPulseFillIcon from 'remixicon-react/HeartPulseFillIcon';
import ScanFillIcon from 'remixicon-react/ScanFillIcon';
import PulseFillIcon from 'remixicon-react/PulseFillIcon';
import HeartFillIcon from 'remixicon-react/HeartFillIcon';
import ShieldCheckFillIcon from 'remixicon-react/ShieldCheckFillIcon';
import Link from "next/link"
import { useState, useEffect } from "react"
import { useRef } from "react"
import { Select, SelectTrigger, SelectContent, SelectItem, SelectValue } from "@/components/ui/select"
import { useIsMobile } from "@/hooks/use-mobile"

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
        duration: "10 minutes",
      },
      {
        name: "Echocardiogram",
        defaultDescription:
          "An ultrasound imaging test that provides detailed pictures of your heart's structure, function, and blood flow through the heart chambers and valves.",
        detailedDescription:
          "An ultrasound of your heart performed while you lie on your side. A technician moves a probe across your chest to visualize heart structure and function. No preparation needed. Takes 30–45 minutes. It helps detect valve issues, heart failure, and congenital defects.",
        duration: "30–45 minutes",
      },
      {
        name: "Doppler Ultrasound",
        defaultDescription:
          "A non-invasive imaging test that uses sound waves to evaluate blood flow through your arteries and veins, helping detect blockages or circulation problems.",
        detailedDescription:
          "This test evaluates blood flow through vessels using sound waves. A gel is applied to the skin and a handheld probe is used to scan. Non-invasive and painless. Lasts about 30 minutes. Often used to check for clots, venous insufficiency, or blocked arteries.",
        duration: "30 minutes",
      },
      {
        name: "ABI (Ankle-Brachial Index)",
        defaultDescription:
          "A simple test that compares blood pressure in your arms and ankles to screen for peripheral artery disease and circulation problems in your legs.",
        detailedDescription:
          "Blood pressure cuffs are placed on your arms and ankles to assess circulation. Typically completed in 15–20 minutes. No fasting needed. Identifies peripheral artery disease early, especially in patients with leg pain or diabetes.",
        duration: "15–20 minutes",
      },
      {
        name: "Cardiac CT",
        defaultDescription:
          "Advanced imaging that creates detailed 3D pictures of your heart and coronary arteries to assess calcium buildup and detect blockages.",
        detailedDescription:
          "A fast, high-resolution X-ray that provides a 3D image of your heart and arteries. Often requires a contrast dye and fasting for 4 hours prior. The scan itself takes 10–15 minutes. Commonly used to evaluate calcium scores and coronary anatomy.",
        duration: "10–15 minutes",
      },
      {
        name: "Cardiac PET/CT",
        defaultDescription:
          "A sophisticated imaging test that combines two technologies to evaluate blood flow to your heart muscle and detect areas of damage or disease.",
        detailedDescription:
          "A powerful imaging test combining PET and CT scans to assess blood flow and detect damage or disease in heart tissue. You may need to avoid caffeine or beta-blockers before the exam. Total time: 1.5–2 hours. Very effective in diagnosing coronary artery disease and viability of heart muscle.",
        duration: "1.5–2 hours",
      },
      {
        name: "Nuclear Stress Test",
        defaultDescription:
          "A comprehensive test that evaluates how well blood flows to your heart muscle during rest and stress, helping identify blockages in coronary arteries.",
        detailedDescription:
          "Involves a resting scan, a stress phase (via treadmill or medication), and another scan after activity. Radioactive dye is used to trace blood flow. Duration: 2–4 hours. Detailed instructions are provided ahead of time. Excellent for detecting blockages or ischemia.",
        duration: "2–4 hours",
      },
      {
        name: "AAA Screening",
        defaultDescription:
          "A quick ultrasound screening to check for abdominal aortic aneurysm, an enlargement of the main artery in your abdomen that can be life-threatening if undetected.",
        detailedDescription:
          "An ultrasound of the abdomen to screen for abdominal aortic aneurysm. Non-invasive, takes 10–15 minutes. Recommended for men over 65 or those with a smoking history. No prep needed unless specified.",
        duration: "10–15 minutes",
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
        duration: "1 hour per session",
      },
      {
        name: "Vein Ablation",
        defaultDescription:
          "A minimally invasive procedure to treat varicose veins and venous insufficiency by closing problematic veins, improving circulation and reducing leg pain.",
        detailedDescription:
          "A catheter-based procedure using heat or chemicals to close varicose or incompetent veins. Done under local anesthesia in 30–60 minutes. You may wear compression stockings afterward. Quick return to activities. Often improves leg pain and swelling.",
        duration: "30–60 minutes",
      },
      {
        name: "Pacemaker Services",
        defaultDescription:
          "Comprehensive care for patients with slow or irregular heart rhythms, including pacemaker implantation, monitoring, and ongoing device management.",
        detailedDescription:
          "For patients with slow or irregular heart rhythms, we offer pacemaker implantation and ongoing management. The procedure takes 1–2 hours under mild sedation. Follow-up includes regular device checks and adjustments as needed.",
        duration: "1–2 hours",
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
          "Comprehensive workups that include blood pressure, labs, EKGs, and risk factor analysis. Takes about 60–90 minutes. Useful for individuals with family history or early signs of heart disease. Patients leave with actionable recommendations.",
        duration: "60–90 minutes",
      },
      {
        name: "Intensive Cardiac Rehab",
        defaultDescription:
          "A medically supervised program combining exercise, education, and lifestyle counseling to help patients recover from heart events and improve long-term outcomes.",
        detailedDescription:
          "A structured program over several weeks involving supervised exercise, dietary counseling, stress management, and education. Sessions are 1 hour, 2–3 times per week. Proven to reduce hospital readmissions and improve quality of life.",
        duration: "1 hour per session",
      },
      {
        name: "Lifestyle & Risk Assessments",
        defaultDescription:
          "Personalized consultations focused on identifying cardiovascular risk factors and creating tailored lifestyle modification plans for optimal heart health.",
        detailedDescription:
          "30–60 minute consultations reviewing lifestyle habits, family history, and risk scores. Includes education on diet, activity, smoking cessation, and stress. Custom prevention plans are developed.",
        duration: "30–60 minutes",
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
          "Remote visits via secure video from your home or office. Ideal for follow-ups or medication discussions. Scheduled in 15–30 minute slots. No special setup—just a phone, tablet, or computer with internet.",
        duration: "15–30 minutes",
      },
      {
        name: "Preoperative Clearances",
        defaultDescription:
          "Rapid cardiovascular assessments required before non-cardiac surgery to ensure your heart is ready for the procedure and minimize surgical risks.",
        detailedDescription:
          "Comprehensive cardiovascular assessment required before non-cardiac surgery. Includes history review, physical exam, EKG, and possibly imaging. Coordinated quickly, often within 24–48 hours. Reports are sent directly to your surgical team.",
        duration: "24–48 hours (coordination)",
      },
    ],
  },
]

export default function ServicesPageClient() {
  const [expandedCard, setExpandedCard] = useState<string | null>(null)
  const [expandedSections, setExpandedSections] = useState<{ [category: string]: boolean }>(() => {
    const initial: { [category: string]: boolean } = {}
    services.forEach(s => { initial[s.category] = true })
    return initial
  })
  const isMobile = useIsMobile()
  const [showFixedSubnav, setShowFixedSubnav] = useState(false)

  // Refs for scrolling and active category
  const sectionRefs = useRef<{ [category: string]: HTMLDivElement | null }>({})
  const potsSectionRef = useRef<HTMLDivElement | null>(null)
  const potsSectionWrapperRef = useRef<HTMLElement | null>(null)
  const completeServicesRef = useRef<HTMLDivElement | null>(null)
  const [activeCategory, setActiveCategory] = useState<string>(services[0].category)

  const handleScrollTo = (category: string) => {
    const el = sectionRefs.current[category]
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "start" })
    }
  }

  const handleScrollToPOTS = () => {
    if (potsSectionRef.current) {
      const rect = potsSectionRef.current.getBoundingClientRect()
      const scrollTop = window.pageYOffset || document.documentElement.scrollTop
      const targetScrollTop = scrollTop + rect.top - 240 // Match the activation threshold
      window.scrollTo({ top: targetScrollTop, behavior: "smooth" })
    }
  }

  const handleScrollToCompleteServices = () => {
    if (completeServicesRef.current) {
      const rect = completeServicesRef.current.getBoundingClientRect()
      const scrollTop = window.pageYOffset || document.documentElement.scrollTop
      const targetScrollTop = scrollTop + rect.top - 200 // Match the activation threshold
      window.scrollTo({ top: targetScrollTop, behavior: "smooth" })
    }
  }

  // Active category highlight on scroll
  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      let found = "";
      
      // Check Complete Services section first - if visible, no button should be active
      if (completeServicesRef.current) {
        const rect = completeServicesRef.current.getBoundingClientRect();
        if (rect.top <= 200 && rect.bottom > 150) {
          setActiveCategory("");
          return;
        }
      }
      
      // Check POTS section
      if (potsSectionRef.current) {
        const rect = potsSectionRef.current.getBoundingClientRect();
        if (rect.top <= 240 && rect.bottom > 150) {
          setActiveCategory("pots");
          return;
        }
      }
      
      // Check service categories in reverse order (bottom to top) to get the most recent one
      for (let i = services.length - 1; i >= 0; i--) {
        const s = services[i];
        const ref = sectionRefs.current[s.category];
        if (ref) {
          const rect = ref.getBoundingClientRect();
          // Only consider expanded sections with significant content
          if (rect.top <= 200 && rect.bottom > 150 && expandedSections[s.category] && rect.height > 100) {
            setActiveCategory(s.category);
            return;
          }
        }
      }
      
      // If no section is found, don't highlight any button
      setActiveCategory("");
    };
    
    // Initial call to set the correct active category on load
    handleScroll();
    
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [expandedSections]);

  // Show fixed subnav when original is out of view, but hide when in Complete Services section
  useEffect(() => {
    const handleScroll = () => {
      const subnav = document.getElementById("category-subnav-anchor")
      if (subnav) {
        const { top } = subnav.getBoundingClientRect()
        const shouldShow = top <= 80 // 80px header height
        
        // Check if Complete Services section is visible
        if (completeServicesRef.current) {
          const rect = completeServicesRef.current.getBoundingClientRect()
          if (rect.top <= 200 && rect.bottom > 150) {
          setShowFixedSubnav(false)
          return
          }
        }
        
        setShowFixedSubnav(shouldShow)
      }
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <>
      {/* Anchor for subnav position */}
      <div id="category-subnav-anchor"></div>
      {/* Fixed subnav (appears after scroll) */}
      {showFixedSubnav && (
        <div className="fixed top-20 left-0 w-full z-50 flex justify-center mt-4 pointer-events-none">
          {isMobile ? (
            <div className="pointer-events-auto max-w-7xl w-full px-4">
              <Select value={activeCategory} onValueChange={val => {
                if (val === "pots") {
                  handleScrollToPOTS()
                } else {
                  handleScrollTo(val)
                }
              }}>
                <SelectTrigger className="w-full rounded-lg border bg-white/70 dark:bg-background/80 backdrop-blur shadow-sm">
                  <SelectValue placeholder="Select Category" />
                </SelectTrigger>
                <SelectContent>
                  {services.map((serviceCategory) => (
                    <SelectItem key={serviceCategory.category} value={serviceCategory.category}>
                      {serviceCategory.category}
                    </SelectItem>
                  ))}
                  <SelectItem value="pots">POTS & Dysautonomia</SelectItem>
                </SelectContent>
              </Select>
            </div>
          ) : (
            <div className="w-full px-4 md:px-8 lg:px-8 xl:px-8 2xl:px-8">
              <nav
                className="pointer-events-auto w-full max-w-7xl mx-auto rounded-lg border bg-white/70 dark:bg-background/80 backdrop-blur shadow-sm"
                aria-label="Service Categories"
              >
                <ul className="flex flex-wrap justify-center gap-2 py-2">
                  {services.map((serviceCategory, idx) => (
                    <li key={serviceCategory.category}>
                      <button
                        onClick={() => handleScrollTo(serviceCategory.category)}
                        className={`px-4 py-2 rounded-full text-sm font-medium border border-muted-foreground/20 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-primary/60
                          ${activeCategory === serviceCategory.category
                            ? "bg-primary text-primary-foreground shadow"
                            : "bg-muted hover:bg-primary hover:text-primary-foreground"
                          }`}
                        type="button"
                        aria-current={activeCategory === serviceCategory.category ? "page" : undefined}
                      >
                        {serviceCategory.category}
                      </button>
                    </li>
                  ))}
                  <li>
                    <button
                      onClick={handleScrollToPOTS}
                      className={`px-4 py-2 rounded-full text-sm font-medium border border-muted-foreground/20 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-primary/60
                        ${activeCategory === "pots"
                          ? "bg-primary text-primary-foreground shadow"
                          : "bg-muted hover:bg-primary hover:text-primary-foreground"
                        }`}
                      type="button"
                      aria-current={activeCategory === "pots" ? "page" : undefined}
                    >
                      POTS & Dysautonomia
                    </button>
                  </li>

                </ul>
              </nav>
            </div>
          )}
        </div>
      )}
      <SectionWrapper className="bg-muted/20 relative overflow-hidden">
        <HeaderAnimation 
          type="ripple-heartbeat" 
          intensity="medium" 
          colorScheme="blue" 
          responsive={true}
        />
        <div className="text-center relative z-10">
          <h1 className="text-2xl font-bold tracking-tighter sm:text-4xl md:text-5xl mb-4 fade-in-up">Our Services</h1>
          <p className="mt-4 max-w-3xl mx-auto text-muted-foreground md:text-xl">
            We offer a full spectrum of cardiology services, diagnostics, and therapies tailored to your specific needs.
            All care is delivered with precision, compassion, and the latest medical technologies.
          </p>
          {/* Original subnav (in flow) - hide on scroll */}
          <nav
            className={`py-2 mb-2 transition-opacity duration-200 ${showFixedSubnav ? 'opacity-0 pointer-events-none' : 'opacity-100'}`}
            aria-label="Service Categories"
          >
            <ul className="flex flex-wrap justify-center gap-2">
              {services.map((serviceCategory) => (
                <li key={serviceCategory.category}>
                  <button
                    onClick={() => handleScrollTo(serviceCategory.category)}
                    className="px-4 py-2 rounded-full text-sm font-medium border border-muted-foreground/20 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-primary/60 bg-muted hover:bg-primary hover:text-primary-foreground"
                    type="button"
                  >
                    {serviceCategory.category}
                  </button>
                </li>
              ))}
              <li>
                <button
                  onClick={handleScrollToPOTS}
                  className={`px-4 py-2 rounded-full text-sm font-medium border border-muted-foreground/20 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-primary/60
                    ${activeCategory === "pots"
                      ? "bg-primary text-primary-foreground shadow"
                      : "bg-muted hover:bg-primary hover:text-primary-foreground"
                    }`}
                  type="button"
                  aria-current={activeCategory === "pots" ? "page" : undefined}
                >
                  POTS & Dysautonomia
                </button>
              </li>

            </ul>
            <div className="flex justify-center mt-6">
              <button
                onClick={handleScrollToCompleteServices}
                className="text-sm text-muted-foreground hover:text-primary transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-primary/60 underline decoration-dotted underline-offset-4"
                type="button"
              >
                View All Services
              </button>
            </div>
          </nav>
        </div>
      </SectionWrapper>

      {services.map((serviceCategory) => (
        <SectionWrapper
          key={serviceCategory.category}
          className="py-4 md:py-8 mb-0 mt-0 relative z-0 !bg-transparent"
        >
          <div
            ref={el => { sectionRefs.current[serviceCategory.category] = el; }}
            id={serviceCategory.category.replace(/\s+/g, "-").toLowerCase()}
            className="scroll-mt-[152px]"
          >
            <div className="flex items-center justify-between mb-2 border-b pb-2">
              <h2 className="text-xl font-bold tracking-tight text-left sm:text-2xl md:text-3xl mt-4">
                {serviceCategory.category}
              </h2>
              <button
                type="button"
                aria-label={expandedSections[serviceCategory.category] ? `Collapse ${serviceCategory.category}` : `Expand ${serviceCategory.category}`}
                aria-expanded={expandedSections[serviceCategory.category]}
                aria-controls={serviceCategory.category.replace(/\s+/g, "-").toLowerCase() + "-section"}
                onClick={() => setExpandedSections(s => ({ ...s, [serviceCategory.category]: !s[serviceCategory.category] }))}
                className="ml-2 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary/60"
              >
                {expandedSections[serviceCategory.category] ? <ArrowUpSFillIcon className="w-6 h-6" /> : <ArrowDownSFillIcon className="w-6 h-6" />}
              </button>
            </div>
            {/* Category description (generic, by type) */}
            <p className="text-muted-foreground text-sm mb-4 text-left">
              {serviceCategory.category === "Diagnostics" &&
                "Comprehensive tests and imaging to evaluate your heart's structure, function, and blood flow, helping diagnose a wide range of cardiovascular conditions."
              }
              {serviceCategory.category === "Treatments & Therapies" &&
                "Advanced procedures and therapies designed to treat heart disease, improve circulation, and support your recovery and long-term heart health."
              }
              {serviceCategory.category === "Cardiac Wellness" &&
                "Preventive care, lifestyle guidance, and rehabilitation programs to help you maintain optimal heart health and reduce your risk of future problems."
              }
              {serviceCategory.category === "Special Services" &&
                "Personalized and innovative services, including telemedicine and preoperative clearances, to meet unique patient needs and provide convenient, accessible care."
              }
            </p>
            <div
              id={serviceCategory.category.replace(/\s+/g, "-").toLowerCase() + "-section"}
              className={`transition-[max-height,opacity] duration-300 ease-in-out overflow-hidden ${expandedSections[serviceCategory.category] ? 'max-h-[2000px] opacity-100' : 'max-h-0 opacity-0'}`}
              aria-hidden={!expandedSections[serviceCategory.category]}
            >
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 pt-4">
                {serviceCategory.items.map((item) => (
                  <ServiceCard
                    key={item.name}
                    name={item.name}
                    defaultDescription={item.defaultDescription}
                    detailedDescription={item.detailedDescription}
                    duration={item.duration}
                    expanded={expandedCard === item.name}
                    onExpand={() => setExpandedCard(expandedCard === item.name ? null : item.name)}
                    isMobile={isMobile}
                  />
                ))}
              </div>
            </div>
          </div>
        </SectionWrapper>
      ))}

      <SectionWrapper ref={potsSectionWrapperRef} className="bg-gradient-to-br from-muted/30 to-muted/10 border-t-2 border-b-2 border-muted/50 py-16 mb-0 mt-0">
        <div className="w-full" ref={potsSectionRef}>
          {/* Header Section */}
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold tracking-tight mb-4">Specialized Care for POTS & Dysautonomia</h2>
            <div className="flex items-center justify-center gap-2 mb-6">
              <div className="w-16 h-px bg-muted-foreground/30"></div>
              <span className="text-primary font-semibold">Led by Dr. Asif Ali</span>
              <div className="w-16 h-px bg-muted-foreground/30"></div>
            </div>
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto leading-relaxed">
              Board-Certified Expert in Autonomic Disorders
            </p>
            <p className="mt-6 max-w-4xl mx-auto text-muted-foreground leading-relaxed">
              Our program offers a center of excellence for diagnosing and treating complex autonomic disorders like POTS. 
              We combine cutting-edge diagnostics with personalized, compassionate care to help patients regain control 
              and improve their quality of life.
            </p>
          </div>

          {/* Tabs Section */}
          <Tabs defaultValue="diagnostics" className="w-full">
            <TabsList className="grid w-full grid-cols-1 sm:grid-cols-3 h-auto bg-background/50 backdrop-blur-sm border">
              <TabsTrigger value="diagnostics" className="py-3 text-sm font-medium data-[state=active]:bg-primary data-[state=active]:text-primary-foreground data-[state=active]:shadow-md data-[state=active]:border-primary/20">
                <div className="flex items-center gap-2">
                  <ScanFillIcon className="h-4 w-4" />
                  Comprehensive Diagnostics
                </div>
              </TabsTrigger>
              <TabsTrigger value="treatment" className="py-3 text-sm font-medium data-[state=active]:bg-primary data-[state=active]:text-primary-foreground data-[state=active]:shadow-md data-[state=active]:border-primary/20">
                <div className="flex items-center gap-2">
                  <HeartFillIcon className="h-4 w-4" />
                  Personalized Treatment
                </div>
              </TabsTrigger>
              <TabsTrigger value="support" className="py-3 text-sm font-medium data-[state=active]:bg-primary data-[state=active]:text-primary-foreground data-[state=active]:shadow-md data-[state=active]:border-primary/20">
                <div className="flex items-center gap-2">
                  <ShieldCheckFillIcon className="h-4 w-4" />
                  Ongoing Support
                </div>
              </TabsTrigger>
            </TabsList>
            
            <TabsContent value="diagnostics" className="mt-8">
              <Card className="border-0 shadow-lg bg-background/80 backdrop-blur-sm">
                <CardHeader className="bg-gradient-to-r from-primary/5 to-primary/10 border-b">
                  <CardTitle className="flex items-center gap-3">
                    <ScanFillIcon className="h-6 w-6 text-primary" />
                    Comprehensive Diagnostic Testing
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-8">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <ul className="space-y-4">
                      <FeatureListItem>POTS protocol evaluations</FeatureListItem>
                      <FeatureListItem>Autonomic function testing</FeatureListItem>
                    </ul>
                    <ul className="space-y-4">
                      <FeatureListItem>Blood volume and hemodynamic assessment</FeatureListItem>
                      <FeatureListItem>Specialized lab work</FeatureListItem>
                    </ul>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="treatment" className="mt-8">
              <Card className="border-0 shadow-lg bg-background/80 backdrop-blur-sm">
                <CardHeader className="bg-gradient-to-r from-primary/5 to-primary/10 border-b">
                  <CardTitle className="flex items-center gap-3">
                    <HeartFillIcon className="h-6 w-6 text-primary" />
                    Personalized Treatment Plans
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-8">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <ul className="space-y-4">
                      <FeatureListItem>Medication management</FeatureListItem>
                      <FeatureListItem>IV hydration therapy</FeatureListItem>
                    </ul>
                    <ul className="space-y-4">
                      <FeatureListItem>Lifestyle/dietary modifications</FeatureListItem>
                      <FeatureListItem>Exercise reconditioning programs</FeatureListItem>
                    </ul>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="support" className="mt-8">
              <Card className="border-0 shadow-lg bg-background/80 backdrop-blur-sm">
                <CardHeader className="bg-gradient-to-r from-primary/5 to-primary/10 border-b">
                  <CardTitle className="flex items-center gap-3">
                    <ShieldCheckFillIcon className="h-6 w-6 text-primary" />
                    Ongoing Support & Accessible Care
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-8">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <ul className="space-y-4">
                      <FeatureListItem>Initial and follow-up appointments</FeatureListItem>
                      <FeatureListItem>Telemedicine options</FeatureListItem>
                    </ul>
                    <ul className="space-y-4">
                      <FeatureListItem>Real-time treatment adjustments</FeatureListItem>
                      <FeatureListItem>Patient education and interdisciplinary care coordination</FeatureListItem>
                    </ul>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>


        </div>
      </SectionWrapper>

      {/* Comprehensive Services List Section */}
      <SectionWrapper className="bg-gradient-to-br from-background to-muted/30 mb-0 mt-0" ref={completeServicesRef}>
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold tracking-tight mb-4">Complete Services Directory</h2>
          <p className="max-w-3xl mx-auto text-muted-foreground text-lg">
            Explore our comprehensive range of cardiovascular services, from routine screenings to advanced interventional procedures.
            Each service is designed to provide the highest quality care with the latest medical technology.
          </p>
        </div>

        <TooltipProvider delayDuration={0} skipDelayDuration={0}>
          <div className="max-w-7xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-8">
              {[
                {
                  category: "General Services",
                  icon: HeartPulseFillIcon,
                  services: [
                    { name: "Cardiovascular Screening", tooltip: "Routine tests to assess heart disease risk." },
                    { name: "Arrhythmias", tooltip: "Evaluation and management of irregular heart rhythms." },
                    { name: "Pre Op Clearance", tooltip: "Cardiac assessments before surgical procedures." },
                    { name: "Diagnostic Testing", tooltip: "In-depth testing to identify heart-related conditions." },
                    { name: "Cardiovascular Testing", tooltip: "Comprehensive exams to evaluate heart function." },
                    { name: "Advance Lipid Testing", tooltip: "Detailed cholesterol analysis for heart risk." },
                    { name: "ECP Therapy", tooltip: "Non-invasive treatment to improve blood flow and reduce angina." }
                  ]
                },
                {
                  category: "Imaging Services",
                  icon: ScanFillIcon,
                  services: [
                    { name: "2D Echo Cardiogram", tooltip: "Ultrasound imaging to view heart structure and function." },
                    { name: "Carotid Doppler", tooltip: "Ultrasound to detect blockages in neck arteries." },
                    { name: "Abdominal", tooltip: "Imaging of abdominal arteries for vascular health." },
                    { name: "Renal", tooltip: "Ultrasound to assess blood flow to the kidneys." },
                    { name: "Upper/Lower Arterial Doppler", tooltip: "Tests blood flow in limbs' arteries." },
                    { name: "Upper/Lower Venous Doppler", tooltip: "Checks for clots or blockages in veins." },
                    { name: "ABI Screening", tooltip: "Compares blood pressure in arms and legs to detect PAD." },
                    { name: "AAA Screening", tooltip: "Detects abdominal aortic aneurysms early." }
                  ]
                },
                {
                  category: "Electrophysiology",
                  icon: PulseFillIcon,
                  services: [
                    { name: "Electrocardiography (ECG)", tooltip: "Measures electrical activity of the heart." },
                    { name: "Pacemaker Check/Follow Up", tooltip: "Evaluates pacemaker performance and settings." },
                    { name: "ICD Check/Follow Up", tooltip: "Reviews implanted defibrillator function." },
                    { name: "24/48 hour Holter Monitor", tooltip: "Portable ECG to monitor heart rhythm over time." },
                    { name: "T-Wave Alternans", tooltip: "Identifies risk of serious arrhythmias." },
                    { name: "Tilt Table", tooltip: "Assesses causes of fainting or dizziness." }
                  ]
                },
                {
                  category: "Stress Testing",
                  icon: HeartFillIcon,
                  services: [
                    { name: "Nuclear Stress Test", tooltip: "Uses imaging and exercise to assess heart blood flow." },
                    { name: "Stress Echo Cardiogram", tooltip: "Ultrasound during stress to evaluate heart function." }
                  ]
                },
                {
                  category: "Interventional Cardiology",
                  icon: ShieldCheckFillIcon,
                  services: [
                    { name: "Heart Catheterization +/- Intervention", tooltip: "Procedure to diagnose or treat heart conditions via catheter." },
                    { name: "Angioplasty and Stenting", tooltip: "Opens blocked arteries using a balloon and stent." },
                    { name: "Peripheral Intervention", tooltip: "Treats narrowed vessels in the limbs or body." },
                    { name: "Pace Maker", tooltip: "Device implanted to regulate slow heartbeats." },
                    { name: "Defibrillator", tooltip: "Device to correct life-threatening heart rhythms." }
                  ]
                },
                {
                  category: "Non Invasive Cardiology",
                  icon: StethoscopeFillIcon,
                  services: [
                    { name: "Carotid Angiography", tooltip: "Imaging of neck arteries using contrast dye." },
                    { name: "Right / Left Heart Catheterization", tooltip: "Measures pressures and flow in heart chambers." },
                    { name: "Renal Catheterization", tooltip: "Examines kidney arteries for narrowing or blockage." }
                  ]
                }
              ].map((category) => {
                const CategoryIcon = category.icon;
                return (
                  <Card key={category.category} className="overflow-hidden hover:shadow-lg transition-all duration-300">
                    <CardHeader className="bg-muted/20 border-b">
                      <CardTitle className="text-xl flex items-center gap-3">
                        <CategoryIcon className="h-6 w-6 text-primary" />
                        {category.category}
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="p-6">
                      <div className="mb-4">
                        <span className="text-sm text-muted-foreground">
                          {category.services.length} service{category.services.length !== 1 ? 's' : ''}
                        </span>
                      </div>
                      
                      <ul className="space-y-3">
                        {category.services.map((service, index) => (
                          <li key={index} className="flex items-start gap-3 group">
                            <CheckLineIcon className="h-5 w-5 text-muted-foreground mt-0.5 flex-shrink-0 group-hover:scale-110 transition-transform" />
                            <Tooltip>
                              <TooltipTrigger asChild>
                                <span 
                                  className="text-sm leading-relaxed group-hover:text-primary transition-colors"
                                >
                                  {service.name}
                                </span>
                              </TooltipTrigger>
                              <TooltipContent side="top" className="max-w-xs z-50 bg-popover text-popover-foreground border shadow-lg">
                                <p className="text-sm">{service.tooltip}</p>
                              </TooltipContent>
                            </Tooltip>
                          </li>
                        ))}
                      </ul>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </div>
        </TooltipProvider>

        <div className="text-center mt-12">
          <div className="bg-gradient-to-r from-primary/10 to-primary/5 rounded-lg p-8 max-w-4xl mx-auto">
            <h3 className="text-2xl font-bold mb-4">Ready to Get Started?</h3>
            <p className="text-muted-foreground mb-6">
              Our team of experienced cardiologists is here to provide you with the highest quality cardiovascular care.
              Contact us today to schedule your consultation or learn more about any of our services.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" asChild>
                <Link href="/appointments">Schedule Appointment</Link>
              </Button>
              <Button size="lg" variant="outline" asChild>
                <Link href="/contact">Contact Us</Link>
              </Button>
            </div>
          </div>
        </div>
        
        <div className="text-center mt-8">
          <button
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            className="text-sm text-muted-foreground hover:text-primary transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-primary/60 underline decoration-dotted underline-offset-4"
            type="button"
          >
            Back To Top
          </button>
        </div>
      </SectionWrapper>
    </>
  )
}

function ServiceCard({
  name,
  defaultDescription,
  detailedDescription,
  duration,
  expanded,
  onExpand,
  isMobile,
}: {
  name: string
  defaultDescription: string
  detailedDescription: string
  duration?: string
  expanded?: boolean
  onExpand?: () => void
  isMobile?: boolean
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

  // Responsive: mobile = accordion, md+ = hover/expand
  return (
    <Card className={"overflow-hidden transition-all duration-300 flex flex-col group z-10 hover:z-20 " + (expanded ? "shadow-lg -translate-y-1" : "") + " " + (isMobile ? "cursor-pointer" : "hover:shadow-lg hover:-translate-y-1")}> 
      {/* Mobile: Accordion */}
      <div
        className={
          "flex flex-col " +
          (isMobile ? "" : "group-hover:hidden min-h-[480px] h-full")
        }
        style={isMobile ? { minHeight: 0, height: 'auto' } : {}}
        onClick={isMobile ? onExpand : undefined}
      >
        <CardContent className="p-6 flex flex-col h-full">
          <div className="flex items-center justify-between">
            <h3 className="text-xl font-semibold mb-4">{name}</h3>
            {isMobile && (
              <button type="button" className="ml-2" onClick={onExpand} aria-label={expanded ? "Collapse" : "Expand"}>
                {expanded ? <ArrowUpSFillIcon className="w-5 h-5" /> : <ArrowDownSFillIcon className="w-5 h-5" />}
              </button>
            )}
          </div>
          <p className="text-muted-foreground leading-relaxed flex-grow">{defaultDescription}</p>
        </CardContent>
      </div>
      {/* Mobile: Expanded details */}
      {isMobile && expanded && (
        <div className="flex flex-col">
          <CardContent className="p-6 pt-0 flex flex-col">
            <div className="w-full h-32 bg-gradient-to-r from-primary/10 to-primary/20 flex items-center justify-center flex-shrink-0 mb-4 rounded-lg">
              <StethoscopeFillIcon className="h-8 w-8 text-primary/60" />
            </div>
            <p className="text-muted-foreground text-sm leading-relaxed mb-4 flex-grow">{detailedDescription}</p>
            <div className="space-y-3 pt-4 border-t border-muted flex-shrink-0">
              {duration && (
                <div className="flex items-start gap-2">
                  <div className="w-2 h-2 rounded-full bg-red-600 mt-2 flex-shrink-0"></div>
                  <div>
                    <span className="text-xs font-medium text-red-600 uppercase tracking-wide">Duration</span>
                    <p className="text-sm text-red-600">{duration}</p>
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
      )}
      {/* Desktop/Tablet: Hover View */}
      {!isMobile && (
        <div className="hidden group-hover:flex group-hover:flex-col min-h-[480px] h-full">
          <CardContent className="p-6 flex flex-col flex-grow">
            <h3 className="text-xl font-semibold mb-4">{name}</h3>
            {/* Image placeholder - full width */}
            <div className="w-full h-32 bg-gradient-to-r from-primary/10 to-primary/20 flex items-center justify-center flex-shrink-0 mb-4 rounded-lg">
              <StethoscopeFillIcon className="h-8 w-8 text-primary/60" />
            </div>
            {/* Main description */}
            <p className="text-muted-foreground text-sm leading-relaxed mb-4 flex-grow">{detailedDescription}</p>
            {/* Key details section */}
            <div className="space-y-3 pt-4 border-t border-muted flex-shrink-0">
              {duration && (
                <div className="flex items-start gap-2">
                  <div className="w-2 h-2 rounded-full bg-red-600 mt-2 flex-shrink-0"></div>
                  <div>
                    <span className="text-xs font-medium text-red-600 uppercase tracking-wide">Duration</span>
                    <p className="text-sm text-red-600">{duration}</p>
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
      )}
    </Card>
  )
}

function FeatureListItem({ children }: { children: React.ReactNode }) {
  return (
    <li className="flex items-start gap-3">
      <CheckLineIcon className="h-5 w-5 text-muted-foreground mt-1 flex-shrink-0" />
      <span>{children}</span>
    </li>
  )
} 