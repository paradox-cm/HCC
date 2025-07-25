import React from "react"
import { cn } from "@/lib/utils"

interface SectionWrapperProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode
}

export const SectionWrapper = React.forwardRef<
  HTMLDivElement,
  SectionWrapperProps
>(function SectionWrapper({ children, className, ...props }, ref) {
  return (
    <section ref={ref} className={cn("py-12 md:py-20", className)} {...props}>
      <div className="px-4 md:px-8 lg:px-8 xl:px-8 2xl:px-8 max-w-7xl mx-auto">{children}</div>
    </section>
  )
}) 