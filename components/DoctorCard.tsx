"use client"

import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Check } from "lucide-react"
import Image from "next/image"

interface DoctorCardProps {
  name: string
  specialty: string
  image: string
  selected: boolean
  onSelect: () => void
}

export function DoctorCard({ name, specialty, image, selected, onSelect }: DoctorCardProps) {
  return (
    <Card 
      className={`p-4 cursor-pointer transition-all duration-200 hover:shadow-lg ${
        selected 
          ? 'ring-2 ring-blue-500 bg-blue-50 dark:bg-blue-950/20' 
          : 'hover:bg-gray-50 dark:hover:bg-gray-800/50'
      }`}
      onClick={onSelect}
    >
      <div className="flex items-start space-x-4">
        <div className="relative">
          <Image
            src={image}
            alt={name}
            width={80}
            height={80}
            className="rounded-lg object-cover"
          />
          {selected && (
            <div className="absolute -top-2 -right-2 bg-blue-500 text-white rounded-full p-1">
              <Check className="h-4 w-4" />
            </div>
          )}
        </div>
        <div className="flex-1 min-w-0">
          <h3 className="font-semibold text-lg text-gray-900 dark:text-white">
            {name}
          </h3>
          <p className="text-sm text-gray-600 dark:text-gray-300 mt-1">
            {specialty}
          </p>
          <Button 
            variant={selected ? "default" : "outline"}
            size="sm"
            className="mt-3"
            onClick={(e) => {
              e.stopPropagation()
              onSelect()
            }}
          >
            {selected ? "Selected" : "Select"}
          </Button>
        </div>
      </div>
    </Card>
  )
} 