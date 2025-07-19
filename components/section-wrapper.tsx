import type React from "react"
import { cn } from "@/lib/utils"

interface SectionWrapperProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode
}

export function SectionWrapper({ children, className, ...props }: SectionWrapperProps) {
  return (
    <section className={cn("py-12 md:py-20", className)} {...props}>
      <div className="px-4 md:px-8 lg:px-8 xl:px-8 2xl:px-8 max-w-7xl mx-auto">{children}</div>
    </section>
  )
}
