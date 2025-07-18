"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"

const doctorBios = {
  "Dr. Abdul": {
    fullName: "Dr. Abdul Ali, MD, FACC",
    title: "Founder | Senior Cardiologist | Mentor in Cardiovascular Excellence",
    certification: "Board-Certified in Cardiovascular Disease",
    bio: `Dr. Abdul Ali is the visionary founder of Houston Cardiology Consultants and a cornerstone of cardiovascular care in Houston since 1979. With nearly five decades of clinical experience, he has earned a reputation for delivering compassionate, deeply personalized heart care to thousands of patients across generations.

Dr. Ali received his medical degree from Dow Medical College in Pakistan and completed his residency and fellowship training in the United States. A Fellow of the American College of Cardiology (FACC), he was trained under the legendary Dr. Denton Cooley—an experience that helped shape his enduring commitment to clinical excellence and mentorship.

A pioneer in both invasive and non-invasive cardiology, Dr. Ali is known for developing individualized treatment plans that meet the unique needs of each patient. He integrates evidence-based care with intuitive understanding, ensuring patients are treated not just with expertise, but with empathy and respect.

Under Dr. Ali's leadership, Houston Cardiology Consultants has grown into a premier cardiovascular center that blends academic rigor with cutting-edge technologies. His influence remains present in every facet of the practice—from its core values to its dedication to advanced diagnostics and prevention.

Today, Dr. Ali continues to care for both long-standing and new patients while mentoring the next generation of cardiologists. His legacy is reflected in the trust he has earned, the lives he has improved, and his enduring mission to help every patient live a healthier, heart-conscious life.`,
  },
  "Dr. Asif": {
    fullName: "Dr. Asif Ali, MD",
    title: "Cardiologist | Clinical Assistant Professor | Dysautonomia & POTS Specialist",
    certification: "Board-Certified in Cardiovascular Disease",
    bio: `Dr. Asif Ali is a highly regarded cardiovascular specialist and a key leader at Houston Cardiology Consultants. Known for his clinical expertise, academic involvement, and entrepreneurial innovation, Dr. Ali has been instrumental in the practice’s growth into the Memorial and Spring Branch communities of Houston.

A graduate of McGovern Medical School’s prestigious cardiology fellowship program, Dr. Ali continues to serve as a Clinical Assistant Professor at the institution, where he mentors future physicians and contributes to advancing cardiovascular research.

He is recognized nationally as a renowned expert in Postural Orthostatic Tachycardia Syndrome (POTS) and dysautonomia care. His practice draws patients from across the region seeking comprehensive evaluation and treatment of these complex autonomic conditions. His innovative approach to managing POTS integrates leading-edge diagnostics, lifestyle-based protocols, and emerging therapies.

Dr. Ali also plays a significant role in shaping the future of cardiac care as a member of the national health technology advisory group for the American Heart Association. His insights help guide advancements in cardiovascular innovation and digital health integration.

Beyond clinical practice, Dr. Ali is a serial healthcare entrepreneur. He is the founder of Cena Ventures, a business advisory firm that supports growth-stage healthcare technology companies, reflecting his passion for improving healthcare systems at scale.

He is widely recognized as a thought leader on topics such as student athlete cardiac arrest, personalized medicine, and the use of digital tools in chronic disease management. He is a frequent speaker at national forums, an active clinical trial investigator, and a published author of experimental papers on the future of cardiovascular healthcare.

Under Dr. Ali’s leadership, Houston Cardiology Consultants provides flexible, customized care plans tailored to each patient’s unique needs, with a special focus on prevention, education, and long-term wellness.`,
  },
  "Dr. Sajid": {
    fullName: "Dr. Sajid Ali, MD, FSCAI",
    title: "Interventional Cardiologist | Clinical Educator | Researcher",
    certification: "Board-Certified in Cardiovascular Disease & Interventional Cardiology",
    bio: `Dr. Sajid Ali is a distinguished Interventional Cardiologist at Houston Cardiology Consultants, known for his clinical precision, academic leadership, and dedication to advancing cardiovascular care. His practice combines leading-edge procedures with evidence-based medicine to deliver exceptional outcomes for patients with complex heart and vascular conditions.

Dr. Ali completed his Interventional Cardiology fellowship at Wayne State University within the Detroit Medical Center, where he also served as Chief Resident in Internal Medicine and later as Chief Fellow in Cardiology—testaments to his exceptional leadership and expertise.

An active Clinical Teaching Physician at the University of Houston College of Medicine, Dr. Ali previously served as an Associate Professor at the University of Texas Medical Branch at Galveston. His academic focus remains centered on developing future cardiologists while integrating research and innovation into everyday care.

Dr. Ali is a principal investigator in ongoing experimental trials and regularly contributes to peer-reviewed publications, with a focus on interventional techniques, vascular therapies, and emerging technologies. His research enhances the evolving landscape of cardiovascular medicine.

In practice, Dr. Ali performs a wide range of advanced interventional procedures, including coronary and peripheral stenting, vein ablations, and diagnostic catheterizations. He is deeply committed to minimally invasive approaches that improve quality of life and reduce recovery times.

Under his guidance, Houston Cardiology Consultants continues to evolve as a hub for high-tech, personalized cardiovascular care. Dr. Ali’s work ensures that each patient receives a flexible, customized treatment plan grounded in the most current clinical evidence and delivered with compassion.`,
  },
}

export function DoctorProfileCard({ name, title }: { name: string; title: string }) {
  const doctor = doctorBios[name as keyof typeof doctorBios]

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Card className="text-center transition-all hover:shadow-md hover:-translate-y-1 cursor-pointer h-full flex flex-col">
          <CardContent className="p-6 flex-grow flex flex-col justify-center">
            <div className="mx-auto mb-4 h-32 w-32 rounded-full bg-muted flex items-center justify-center text-muted-foreground">
              Photo
            </div>
            <h3 className="text-xl font-semibold">{name}</h3>
            <p className="text-primary">{title}</p>
            <p className="mt-2 text-sm text-muted-foreground">
              Click to learn more about {name}'s background, expertise, and approach to patient care.
            </p>
          </CardContent>
        </Card>
      </DialogTrigger>
      <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <div className="flex flex-col sm:flex-row items-start gap-6">
            <div className="h-24 w-24 rounded-full bg-muted flex items-center justify-center text-muted-foreground flex-shrink-0">
              Photo
            </div>
            <div className="text-left">
              <DialogTitle className="text-2xl font-bold">{doctor.fullName}</DialogTitle>
              <p className="text-primary font-semibold mt-1">{doctor.title}</p>
              <p className="text-sm text-muted-foreground mt-1">{doctor.certification}</p>
            </div>
          </div>
        </DialogHeader>
        <div className="mt-6">
          <div className="prose prose-sm max-w-none">
            {doctor.bio.split("\n\n").map((paragraph, index) => (
              <p key={index} className="mb-4 text-muted-foreground leading-relaxed">
                {paragraph}
              </p>
            ))}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
