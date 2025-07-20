"use client"

import { useRouter } from "next/navigation"
import { SectionWrapper } from "@/components/section-wrapper"
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { ArrowLeft } from "lucide-react"
import Image from "next/image"
import { GraduationCap, Award, UserCheck, BookOpen } from "lucide-react"

// Placeholder doctor data (replace with real data or fetch logic)
const DOCTORS = [
  {
    slug: "dr-asif-ali",
    name: "Dr. Asif Ali, MD",
    photo: "/images/hcc-logo.png",
    title: "Cardiologist | Clinical Assistant Professor | Dysautonomia & POTS Specialist",
    certification: "Board-Certified in Cardiovascular Disease",
    bio: `Dr. Asif Ali is a highly regarded cardiovascular specialist and a key leader at Houston Cardiology Consultants. Known for his clinical expertise, academic involvement, and entrepreneurial innovation, Dr. Ali has been instrumental in the practice’s growth into the Memorial and Spring Branch communities of Houston.\n\nA graduate of McGovern Medical School’s prestigious cardiology fellowship program, Dr. Ali continues to serve as a Clinical Assistant Professor at the institution, where he mentors future physicians and contributes to advancing cardiovascular research.\n\nHe is recognized nationally as a renowned expert in Postural Orthostatic Tachycardia Syndrome (POTS) and dysautonomia care. His practice draws patients from across the region seeking comprehensive evaluation and treatment of these complex autonomic conditions. His innovative approach to managing POTS integrates leading-edge diagnostics, lifestyle-based protocols, and emerging therapies.\n\nDr. Ali also plays a significant role in shaping the future of cardiac care as a member of the national health technology advisory group for the American Heart Association. His insights help guide advancements in cardiovascular innovation and digital health integration.\n\nBeyond clinical practice, Dr. Ali is a serial healthcare entrepreneur. He is the founder of Cena Ventures, a business advisory firm that supports growth-stage healthcare technology companies, reflecting his passion for improving healthcare systems at scale.\n\nHe is widely recognized as a thought leader on topics such as student athlete cardiac arrest, personalized medicine, and the use of digital tools in chronic disease management. He is a frequent speaker at national forums, an active clinical trial investigator, and a published author of experimental papers on the future of cardiovascular healthcare.\n\nUnder Dr. Ali’s leadership, Houston Cardiology Consultants provides flexible, customized care plans tailored to each patient’s unique needs, with a special focus on prevention, education, and long-term wellness.`,
    credentials: [
      "MD, Board-Certified in Cardiovascular Disease",
      "Clinical Assistant Professor, McGovern Medical School",
      "National Expert in Dysautonomia & POTS",
      "Member, American Heart Association Health Technology Advisory Group"
    ],
    education: [
      "Cardiology Fellowship: McGovern Medical School",
      "Residency: Houston Medical Center"
    ],
    awards: [],
  },
  {
    slug: "dr-abdul",
    name: "Dr. Abdul Ali, MD, FACC",
    photo: "/images/hcc-logo.png",
    title: "Founder | Senior Cardiologist | Mentor in Cardiovascular Excellence",
    certification: "Board-Certified in Cardiovascular Disease",
    bio: `Dr. Abdul Ali is the visionary founder of Houston Cardiology Consultants and a cornerstone of cardiovascular care in Houston since 1979. With nearly five decades of clinical experience, he has earned a reputation for delivering compassionate, deeply personalized heart care to thousands of patients across generations.\n\nDr. Ali received his medical degree from Dow Medical College in Pakistan and completed his residency and fellowship training in the United States. A Fellow of the American College of Cardiology (FACC), he was trained under the legendary Dr. Denton Cooley—an experience that helped shape his enduring commitment to clinical excellence and mentorship.\n\nA pioneer in both invasive and non-invasive cardiology, Dr. Ali is known for developing individualized treatment plans that meet the unique needs of each patient. He integrates evidence-based care with intuitive understanding, ensuring patients are treated not just with expertise, but with empathy and respect.\n\nUnder Dr. Ali's leadership, Houston Cardiology Consultants has grown into a premier cardiovascular center that blends academic rigor with cutting-edge technologies. His influence remains present in every facet of the practice—from its core values to its dedication to advanced diagnostics and prevention.\n\nToday, Dr. Ali continues to care for both long-standing and new patients while mentoring the next generation of cardiologists. His legacy is reflected in the trust he has earned, the lives he has improved, and his enduring mission to help every patient live a healthier, heart-conscious life.`,
    credentials: ["MD, FACC", "Board-Certified in Cardiovascular Disease", "Fellow, American College of Cardiology"],
    education: ["Medical Degree: Dow Medical College, Pakistan", "Residency & Fellowship: United States (under Dr. Denton Cooley)"],
    awards: [],
  },
  {
    slug: "dr-sajid",
    name: "Dr. Sajid Ali, MD, FSCAI",
    photo: "/images/hcc-logo.png",
    title: "Interventional Cardiologist | Clinical Educator | Researcher",
    certification: "Board-Certified in Cardiovascular Disease & Interventional Cardiology",
    bio: `Dr. Sajid Ali is a distinguished Interventional Cardiologist at Houston Cardiology Consultants, known for his clinical precision, academic leadership, and dedication to advancing cardiovascular care. His practice combines leading-edge procedures with evidence-based medicine to deliver exceptional outcomes for patients with complex heart and vascular conditions.\n\nDr. Ali completed his Interventional Cardiology fellowship at Wayne State University within the Detroit Medical Center, where he also served as Chief Resident in Internal Medicine and later as Chief Fellow in Cardiology—testaments to his exceptional leadership and expertise.\n\nAn active Clinical Teaching Physician at the University of Houston College of Medicine, Dr. Ali previously served as an Associate Professor at the University of Texas Medical Branch at Galveston. His academic focus remains centered on developing future cardiologists while integrating research and innovation into everyday care.\n\nDr. Ali is a principal investigator in ongoing experimental trials and regularly contributes to peer-reviewed publications, with a focus on interventional techniques, vascular therapies, and emerging technologies. His research enhances the evolving landscape of cardiovascular medicine.\n\nIn practice, Dr. Ali performs a wide range of advanced interventional procedures, including coronary and peripheral stenting, vein ablations, and diagnostic catheterizations. He is deeply committed to minimally invasive approaches that improve quality of life and reduce recovery times.\n\nUnder his guidance, Houston Cardiology Consultants continues to evolve as a hub for high-tech, personalized cardiovascular care. Dr. Ali’s work ensures that each patient receives a flexible, customized treatment plan grounded in the most current clinical evidence and delivered with compassion.`,
    credentials: [
      "MD, FSCAI",
      "Board-Certified in Cardiovascular Disease & Interventional Cardiology",
      "Chief Resident, Internal Medicine, Detroit Medical Center",
      "Chief Fellow, Cardiology, Detroit Medical Center",
      "Clinical Teaching Physician, University of Houston College of Medicine"
    ],
    education: [
      "Interventional Cardiology Fellowship: Wayne State University, Detroit Medical Center",
      "Residency: Internal Medicine, Detroit Medical Center"
    ],
    awards: [],
  },
]

export default function DoctorProfilePage({ params }: { params: { slug: string } }) {
  const router = useRouter()
  const doctor = DOCTORS.find(d => d.slug === params.slug)

  if (!doctor) {
    return (
      <SectionWrapper className="pt-6 pb-10">
        <Card className="max-w-xl mx-auto">
          <CardHeader>
            <CardTitle>Doctor Not Found</CardTitle>
          </CardHeader>
          <CardContent>
            <Button variant="outline" onClick={() => router.back()} className="mb-2">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back
            </Button>
            <div className="text-muted-foreground">Sorry, we couldn't find this doctor profile.</div>
          </CardContent>
        </Card>
      </SectionWrapper>
    )
  }

  return (
    <>
      <div className="px-4 md:px-8 lg:px-8 xl:px-8 2xl:px-8 max-w-7xl mx-auto pt-2 md:pt-0">
        <Button variant="outline" onClick={() => router.back()} className="mb-2">
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back
        </Button>
      </div>
      {/* Hero Section */}
      <div className="w-full bg-gradient-to-r from-primary/10 to-primary/5 py-8 mb-0">
        <div className="max-w-2xl mx-auto flex flex-col items-center">
          <Image src={doctor.photo} alt={doctor.name} width={175} height={175} className="rounded-full border-4 border-primary shadow mb-4" />
          <h1 className="text-3xl md:text-4xl font-bold text-center mb-1">{doctor.name}</h1>
          <div className="text-primary font-semibold text-lg mb-1 mt-2 text-center">
            {doctor.title}
          </div>
          <div className="text-muted-foreground text-center text-base mb-2">{doctor.certification}</div>
          <Button asChild size="lg" className="mt-2" variant="default">
            <Link href="/appointments">Book Appointment</Link>
          </Button>
        </div>
      </div>
      <SectionWrapper className="pt-4 md:pt-6 pb-10">
        <Card className="max-w-2xl mx-auto shadow-lg">
          <CardContent>
            {/* Bio Section */}
            <div className="mb-8 pt-6">
              <h2 className="text-2xl font-semibold mb-3 flex items-center gap-2"><BookOpen className="h-6 w-6 text-primary" />Biography</h2>
              <div className="text-base text-muted-foreground leading-relaxed whitespace-pre-line">
                {doctor.bio}
              </div>
            </div>
            {/* Philosophy/Quote Section */}
            {doctor.slug === "dr-abdul" && (
              <div className="mb-8">
                <blockquote className="border-l-4 border-primary pl-4 italic text-lg text-muted-foreground bg-muted/50 py-3 rounded">
                  "His legacy is reflected in the trust he has earned, the lives he has improved, and his enduring mission to help every patient live a healthier, heart-conscious life."
                </blockquote>
              </div>
            )}
            {doctor.slug === "dr-asif-ali" && (
              <div className="mb-8">
                <blockquote className="border-l-4 border-primary pl-4 italic text-lg text-muted-foreground bg-muted/50 py-3 rounded">
                  "Dr. Ali is widely recognized as a thought leader on topics such as student athlete cardiac arrest, personalized medicine, and the use of digital tools in chronic disease management."
                </blockquote>
              </div>
            )}
            {doctor.slug === "dr-sajid" && (
              <div className="mb-8">
                <blockquote className="border-l-4 border-primary pl-4 italic text-lg text-muted-foreground bg-muted/50 py-3 rounded">
                  "Dr. Ali’s work ensures that each patient receives a flexible, customized treatment plan grounded in the most current clinical evidence and delivered with compassion."
                </blockquote>
              </div>
            )}
            <hr className="my-8 border-t border-muted" />
            {/* Credentials Section */}
            <div className="mb-8">
              <h2 className="text-2xl font-semibold mb-3 flex items-center gap-2"><Award className="h-6 w-6 text-primary" />Credentials</h2>
              <ul className="list-disc list-inside text-base text-muted-foreground">
                {doctor.credentials.map((c, i) => <li key={i}>{c}</li>)}
              </ul>
            </div>
            <hr className="my-8 border-t border-muted" />
            {/* Education Section */}
            <div className="mb-4">
              <h2 className="text-2xl font-semibold mb-3 flex items-center gap-2"><GraduationCap className="h-6 w-6 text-primary" />Education</h2>
              <ul className="list-disc list-inside text-base text-muted-foreground">
                {doctor.education.map((e, i) => <li key={i}>{e}</li>)}
              </ul>
            </div>
          </CardContent>
        </Card>
      </SectionWrapper>
    </>
  )
} 