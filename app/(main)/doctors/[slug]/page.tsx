import type { Metadata } from "next"
import DoctorProfilePageClient from "./DoctorProfilePageClient"

// Doctor data for metadata generation
const DOCTORS = [
  {
    slug: "dr-asif-ali",
    name: "Dr. Asif Ali, MD",
    title: "Cardiologist | Clinical Assistant Professor | Dysautonomia & POTS Specialist",
    bio: "Dr. Asif Ali is a highly regarded cardiovascular specialist and a key leader at Houston Cardiology Consultants. Known for his clinical expertise, academic involvement, and entrepreneurial innovation, Dr. Ali has been instrumental in the practice's growth into the Memorial and Spring Branch communities of Houston.",
  },
  {
    slug: "dr-abdul-ali",
    name: "Dr. Abdul Ali, MD, FACC",
    title: "Founder | Senior Cardiologist | Mentor in Cardiovascular Excellence",
    bio: "Dr. Abdul Ali is the visionary founder of Houston Cardiology Consultants and a cornerstone of cardiovascular care in Houston since 1979. With nearly five decades of clinical experience, he has earned a reputation for delivering compassionate, deeply personalized heart care to thousands of patients across generations.",
  },
  {
    slug: "dr-sajid-ali",
    name: "Dr. Sajid Ali, MD, FSCAI",
    title: "Interventional Cardiologist | Clinical Educator | Researcher",
    bio: "Dr. Sajid Ali is a distinguished Interventional Cardiologist at Houston Cardiology Consultants, known for his clinical precision, academic leadership, and dedication to advancing cardiovascular care. His practice combines leading-edge procedures with evidence-based medicine to deliver exceptional outcomes for patients with complex heart and vascular conditions.",
  },
]

// Generate metadata for each doctor
export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const doctor = DOCTORS.find(d => d.slug === params.slug)
  
  if (!doctor) {
    return {
      title: "Doctor Not Found | Houston Cardiology Consultants",
      description: "The requested doctor profile could not be found.",
    }
  }

  return {
    title: `${doctor.name} | Houston Cardiology Consultants`,
    description: `${doctor.title}. ${doctor.bio.substring(0, 150)}...`,
    keywords: `${doctor.name}, cardiologist, Houston cardiology, heart doctor, cardiovascular specialist, ${doctor.title.toLowerCase()}`,
    openGraph: {
      title: `${doctor.name} | Houston Cardiology Consultants`,
      description: `${doctor.title}. ${doctor.bio.substring(0, 150)}...`,
    },
  }
}

export default function DoctorProfilePage({ params }: { params: { slug: string } }) {
  return <DoctorProfilePageClient params={params} />
} 