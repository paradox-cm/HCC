"use client"

import { Card, CardContent } from "@/components/ui/card"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import Image from "next/image"

const doctorSlugs: Record<string, string> = {
  "Dr. Abdul": "dr-abdul-ali",
  "Dr. Asif": "dr-asif-ali",
  "Dr. Sajid": "dr-sajid-ali",
}

export function DoctorProfileCard({ name, title, photo }: { name: string; title: string; photo?: string }) {
  const slug = doctorSlugs[name] || "";
  return (
    <Link href={slug ? `/doctors/${slug}` : "#"} className="block h-full">
      <Card className="text-center transition-all hover:shadow-md hover:-translate-y-1 cursor-pointer h-full flex flex-col">
        <CardContent className="p-6 flex-grow flex flex-col justify-center">
          <div className="mx-auto mb-4 h-32 w-32 rounded-full bg-muted flex items-center justify-center text-muted-foreground overflow-hidden">
            <Image src={photo || "/images/hcc-logo.png"} alt={name} width={128} height={128} className="rounded-full object-cover" />
          </div>
          <h3 className="text-xl font-semibold">{name}</h3>
          <p className="text-primary">{title}</p>
          <p className="mt-2 text-sm text-muted-foreground">
            Click to view {name}'s full profile.
          </p>
          <Button variant="outline" className="mt-4 mx-auto">View Profile</Button>
        </CardContent>
      </Card>
    </Link>
  )
}
