"use client"

import { SectionWrapper } from "@/components/section-wrapper"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { useState } from "react"

// Testimonials data organized by doctor and platform
const testimonials = {
  "Dr. Asif Ali": {
    "Yelp": [
      {
        reviewer: "Courtney W.",
        date: "January 18, 2018",
        review: "I am SO impressed with Dr Asif Ali and his staff!! He truly listened to all my symptoms and went in a systematic way running tests to rule things out instead of doing things… the fast way."
      },
      {
        reviewer: "Toni B.",
        date: "May 31, 2023",
        review: "Dr. Ali is [the] most amazing doctor I have ever encountered! He is a trailblazer in cardiology and he still manages to be pleasant and accommodating!"
      },
      {
        reviewer: "Casey B.",
        date: "October 25, 2017",
        review: "Dr. Ali has been my cardiologist for almost three years and I owe him everything. He has even helped diagnose syndromes and disorders that were outside of his medical specialty of cardiology."
      }
    ],
    "Vitals": [
      {
        reviewer: "Anonymous",
        date: "October 7, 2018",
        review: "He took my unusual symptoms and made a quick diagnosis of a pretty rare disease… couldn't be more grateful."
      },
      {
        reviewer: "Anonymous",
        date: "September 17, 2018",
        review: "Started me on a preventative holistic approach without medication… blood pressure now completely normal."
      },
      {
        reviewer: "Anonymous",
        date: "August 1, 2017",
        review: "First doctor to fix my chronic medical issues with a listening and caring attitude."
      },
      {
        reviewer: "Anonymous",
        date: "June 7, 2017",
        review: "He helped me get my blood pressure under control when I was struggling with two other doctors."
      },
      {
        reviewer: "Anonymous",
        date: "February 17, 2017",
        review: "Very confident in his knowledge… staff very professional."
      },
      {
        reviewer: "Anonymous",
        date: "August 27, 2016",
        review: "One of the best cardiologists in Houston… He solves the problem with attention to care."
      },
      {
        reviewer: "Anonymous",
        date: "July 3, 2012",
        review: "He found a surgeon for my 90-year-old father when no one else would operate."
      },
      {
        reviewer: "Anonymous",
        date: "August 1, 2016",
        review: "Excellent doctor."
      },
      {
        reviewer: "Anonymous",
        date: "February 21, 2015",
        review: "Treated us like family."
      }
    ],
    "Facebook": [
      {
        reviewer: "Janelle Nelson",
        date: "Unknown",
        review: "Luckily I have a pretty good cardiologist in my corner, Dr Asif Ali @ Houston Cardiology Consultants."
      }
    ]
  },
  "Dr. Sajid Ali": {
    "Yelp": [
      {
        reviewer: "Nothing But The Trut H.",
        date: "May 3, 2024",
        review: "My doctor is Dr. Sajid Ali. His staff and himself were pretty professional, attentive, great listener, polite, etc. at the very beginning. I had to do a bunch of tests…"
      }
    ]
  },
  "Dr. Abdul Ali": {
    "Vitals": [
      {
        reviewer: "Anonymous",
        date: "January 29, 2015",
        review: "This doctor has been a healthy asset to my life – he and his sons are excellent."
      },
      {
        reviewer: "Anonymous",
        date: "January 11, 2010",
        review: "Dr. Ali is a caring physician who is always there for his patients… He has kept me healthy and out of the hospital."
      }
    ]
  },
  "General / HCC Group": {
    "Yelp": [
      {
        reviewer: "Cynthia B.",
        date: "December 5, 2024",
        review: "Love Doctor Ali – amazing staff and he not only listens but he looks at all data… he cares! He cares about me as a patient… I highly recommend Dr Ali."
      },
      {
        reviewer: "Melissa A.",
        date: "December 28, 2023",
        review: "Dr Ali is great. Very thoughtful and caring. Appreciate the time he takes with patients and his friendliness."
      },
      {
        reviewer: "Google-sourced Testimonial",
        date: "Unknown",
        review: "I came across Houston Cardiology Consultants (Spring Branch) due to their great reviews on Google… I met Dr. Ali recently for the first time after spending a night at the emergency room with a suspected heart attack. I want to say straight away that in 10 years in the USA I have never met a top notch professional with a 'heart' like him!"
      }
    ],
    "Google": [
      {
        reviewer: "Sohail Rizki",
        date: "a month ago",
        review: "I recently visited Houston Cardiology Consultants and was thoroughly impressed with every aspect of my experience. From the moment I arrived, the access department greeted me with genuine politeness and made the check-in process smooth..."
      },
      {
        reviewer: "Donna Reiners",
        date: "7 months ago",
        review: "I appreciate how Doctor Ali listens to you, treats you like a human being, actually hears what you have to say and responds. I appreciate how he researches and yet he does not poo poo on holistic methods as long as they have scientific..."
      },
      {
        reviewer: "Tina Ruff",
        date: "10 months ago",
        review: "Dr Ali and his staff are incredible. I had some issues earlier this year in March and Dr. Ali was so thorough and spent time answering my questions and explained things clearly. He heard my concerns and gave me a plan moving forward..."
      },
      {
        reviewer: "Gabriela Bollich",
        date: "8 months ago",
        review: "I came to Dr. Asif Ali after being diagnosed with an unusual cardiomyopathy. I had previously met with three other cardiologists and consulted with two others but they were not able to effectively explain nor treat my heart condition..."
      },
      {
        reviewer: "Christine Owens",
        date: "a year ago",
        review: "It was my first time visiting this office, the office staff was so friendly and helpful in spite of them being busy with other patients, they still had time for a one-on-one conversation with me to explain the process..."
      },
      {
        reviewer: "Abigail Foust",
        date: "a year ago",
        review: "Polite and knowledgeable staff, amazing providers! My provider was able to catch a few things missed by a different office, and correct my medication based on that..."
      },
      {
        reviewer: "Amy Hair",
        date: "a year ago",
        review: "Dr. Ali is a wonderful physician. I went to him for a second opinion. He listened to all of my concerns and answered all of my questions. I am doing so much better now on his treatment plan..."
      },
      {
        reviewer: "Cheryl Leary",
        date: "a year ago",
        review: "The staff are very helpful, personable, and supportive. Most importantly, I was impressed by the level of expertise of the doctors. My physician took the time to communicate, explain and listen to my concerns..."
      },
      {
        reviewer: "C D",
        date: "11 months ago",
        review: "Dr. Asif Ali is a godsend. Patient, kind and willing to sit down and teach you about your condition and next steps. He never shames you, makes you feel bad or goes out of his way to gaslight you..."
      },
      {
        reviewer: "Lauren Rieke",
        date: "a year ago",
        review: "I had a great experience at Dr Ali's office. Parking was easy and the office very easy to find. The office staff was helpful and kind. Dr. Ali was professional..."
      },
      {
        reviewer: "Sylvia Tsang",
        date: "a year ago",
        review: "UPDATE Dr. Ali and his team had apologized to me. There was some miscommunications but now it is all good..."
      },
      {
        reviewer: "Nessie Edwards",
        date: "a year ago",
        review: "I can say that my experience was very good. First off, the front staff were very kind by allowing me to be seen even though I was running a little late..."
      },
      {
        reviewer: "S Jackson",
        date: "a year ago",
        review: "I was previously seeing a HF specialist at Houston Methodist and I felt left in the dark on my diagnosis and it made me feel lost and confused..."
      },
      {
        reviewer: "Emely Pelaez",
        date: "9 months ago",
        review: "Dr Asif Ali is such a great doctor, I'm blessed to have him as my provider, he explained my diagnosis and gave me a treatment plan..."
      },
      {
        reviewer: "Alkaia Joe",
        date: "2 years ago",
        review: "I like that my wait time wasn't too long. My checkup appointment was for 8:30am on a Friday. I was called to back within 10 minutes..."
      },
      {
        reviewer: "Denise Lopez",
        date: "a year ago",
        review: "My cardiovascular Dr.Asif Ali and his father are very patient, experience and excellent Doctors. Who do their best to meet your needs..."
      },
      {
        reviewer: "Sarah Coulter",
        date: "a year ago",
        review: "The care provided by Dr. Ali and his team is excellent! The visit to the doctor was smooth and efficient..."
      },
      {
        reviewer: "Stacie Wickersham",
        date: "2 years ago",
        review: "I came in as a new patient. The facility was very nice and clean. All the staff I came in contact with were very nice and professional. Dr. Asif Ali was so kind and took his time with me..."
      },
      {
        reviewer: "Rodneshia Broades",
        date: "2 years ago",
        review: "I rated this office as a 4-star practice. The doctor, I would rate 6-stars! Dr. Ali was kind and courteous of our time..."
      },
      {
        reviewer: "Michael McCarty",
        date: "2 years ago",
        review: "I am a new patient, my office visit was as pleasant as an office visit to a cardiologist could be. The staff is very professional..."
      },
      {
        reviewer: "Frances Degruy",
        date: "a year ago",
        review: "They were very busy with many patients which is very understandable. The whole staff were very kind and gentle..."
      },
      {
        reviewer: "Patricia Vasquez",
        date: "2 years ago",
        review: "I went in for a simple test and consult and during my appointment needed additional tests. They allowed me to get those tests in prior to leaving..."
      },
      {
        reviewer: "Matt Jaouhari",
        date: "2 years ago",
        review: "I visited Dr. Ali's office after a procedure and it's always great being his patient as he is very knowledgeable and goes beyond to help..."
      },
      {
        reviewer: "Bernie Robinett",
        date: "a year ago",
        review: "Dr. Ali is a professional and also has a friendly personality. He listens to patients and considers their points of view..."
      },
      {
        reviewer: "Princess Lyssie",
        date: "a year ago",
        review: "As a new patient it was easy to get an appointment. All office staff and Doctors were great. Definitely was a wonderful experience..."
      },
      {
        reviewer: "Mimi Palacios",
        date: "a year ago",
        review: "Everyone in the office were professional and caring. The attentiveness from the staff including the cardiologist was quick and to the point..."
      },
      {
        reviewer: "lotie ferguson",
        date: "a year ago",
        review: "Dr. Sajid Ali MD - Cardiologist is incredibly knowledgeable but also took the time to address all my questions and concerns..."
      },
      {
        reviewer: "Lucas Suggs",
        date: "2 years ago",
        review: "My visit with Dr. Ali was so validating. I appreciate that he took the time to explain the cause of my symptoms..."
      },
      {
        reviewer: "Nicholas Hindlet",
        date: "a year ago",
        review: "Doctor Ali and his staff were fast and thorough. I felt like he really cared and took the time to listen to me..."
      },
      {
        reviewer: "Jettie Greene",
        date: "3 years ago",
        review: "5 stars (+). My friend who referred me was correct about the service, treatment and care. Dr Ali is smart, easy to communicate with..."
      },
      {
        reviewer: "Gmail Leefamily",
        date: "2 years ago",
        review: "Dr. Ali has great confidence in his ability and transfers that to his patient (me). He is a good listener even though he is so busy..."
      },
      {
        reviewer: "Pennie Bannister",
        date: "3 years ago",
        review: "I met Dr. Asif at Signature Care after being checked in for high blood and dizziness. He was very calm, direct, and honest with me..."
      },
      {
        reviewer: "Jessie Hernandez",
        date: "2 years ago",
        review: "I am so grateful I was referred to Dr. Ali! As a new patient and first time experiencing heart concerns, it was reassuring..."
      },
      {
        reviewer: "munkeyu4",
        date: "2 years ago",
        review: "Dr. Ali and his staff are great! Dr. Ali is willing to listen and provide feedback on the root causes of your symptoms..."
      },
      {
        reviewer: "Yeny Villegas",
        date: "2 years ago",
        review: "It was my first time at Houston Cardiology Consultants and I could not have been more impressed..."
      },
      {
        reviewer: "Bo King",
        date: "2 years ago",
        review: "Dr. Ali is the most knowledgeable Cardiologist I have ever been to. He makes sure you understand everything..."
      },
      {
        reviewer: "beverly fisher",
        date: "2 years ago",
        review: "My experience went smoothly. The staff was friendly and professional. Dr. Ali was very helpful in his explanations..."
      }
    ]
  }
}

const platformColors = {
  "Yelp": "bg-red-100 text-red-800 border-red-200",
  "Vitals": "bg-blue-100 text-blue-800 border-blue-200",
  "Healthgrades": "bg-green-100 text-green-800 border-green-200",
  "Google": "bg-yellow-100 text-yellow-800 border-yellow-200",
  "Facebook": "bg-indigo-100 text-indigo-800 border-indigo-200"
}

const platformLinks = {
  "Google": "https://g.co/kgs/BMCmqkW",
  "Yelp": "https://www.yelp.com/biz/houston-cardiology-consultants-houston-2",
  "Vitals": "https://www.vitals.com/doctors/Dr_Asif_Ali.html",
  "Healthgrades": "https://www.healthgrades.com/physician/dr-abdul-ali-xgc5q",
  "Facebook": "https://www.facebook.com/HoustonCardiologyConsultants"
}

export default function TestimonialsPage() {
  const [expandedPlatforms, setExpandedPlatforms] = useState<{[key: string]: boolean}>({})

  const togglePlatform = (platform: string) => {
    setExpandedPlatforms(prev => ({
      ...prev,
      [platform]: !prev[platform]
    }))
  }

  return (
    <>
      <SectionWrapper className="bg-muted/20">
        <div className="text-center">
          <h1 className="text-2xl font-bold tracking-tighter sm:text-4xl md:text-5xl mb-4 fade-in-up">Patient Testimonials</h1>
          <p className="mt-4 max-w-3xl mx-auto text-muted-foreground md:text-xl">
            Read what our patients have to say about their experience with our cardiologists and the care they received at Houston Cardiology Consultants.
          </p>
        </div>
      </SectionWrapper>

      {Object.entries(testimonials).map(([doctorName, platforms]) => (
        <SectionWrapper key={doctorName} className="py-8">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-2xl font-bold mb-8 text-center">{doctorName}</h2>
            
            <div className="grid gap-6">
              {Object.entries(platforms).map(([platform, reviews]) => (
                <Card key={platform} className="overflow-hidden">
                  <CardHeader className="bg-muted/20">
                    <div className="flex items-center justify-between">
                      <CardTitle className="flex items-center gap-3">
                        <Badge className={`${platformColors[platform as keyof typeof platformColors]} border`}>
                          {platform}
                        </Badge>
                        <span>{reviews.length} review{reviews.length !== 1 ? 's' : ''}</span>
                        <Link 
                          href={platformLinks[platform as keyof typeof platformLinks] || "#"}
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="text-xs text-primary hover:underline ml-auto"
                        >
                          View {platform} Reviews →
                        </Link>
                      </CardTitle>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => togglePlatform(`${doctorName}-${platform}`)}
                        className="text-sm"
                      >
                        {expandedPlatforms[`${doctorName}-${platform}`] ? 'Show Less' : 'Show All'}
                      </Button>
                    </div>
                  </CardHeader>
                  <CardContent className="p-6">
                    <div className="space-y-4">
                      {reviews.slice(0, expandedPlatforms[`${doctorName}-${platform}`] ? reviews.length : 3).map((review, index) => (
                        <div key={index} className="border-l-4 border-primary/20 pl-4 py-2">
                          <div className="flex items-start justify-between mb-2">
                            <div>
                              <p className="font-medium text-sm">{review.reviewer}</p>
                              <p className="text-xs text-muted-foreground">{review.date}</p>
                            </div>
                          </div>
                          <p className="text-sm text-muted-foreground leading-relaxed">
                            "{review.review}"
                          </p>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </SectionWrapper>
      ))}

      <SectionWrapper className="bg-gradient-to-r from-primary/10 to-primary/5">
        <div className="text-center max-w-4xl mx-auto">
          <h2 className="text-2xl font-bold mb-4">Share Your Experience</h2>
          <p className="text-muted-foreground mb-6">
            We value your feedback and would love to hear about your experience with our team.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild>
              <Link href="/appointments">Schedule Appointment</Link>
            </Button>
            <Button variant="outline" asChild>
              <Link href="/contact">Contact Us</Link>
            </Button>
          </div>
        </div>
      </SectionWrapper>
    </>
  )
}
