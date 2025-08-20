"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Checkbox } from "@/components/ui/checkbox"
import { Textarea } from "@/components/ui/textarea"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import { AlertTriangle, Heart, Clock, Info } from "lucide-react"

interface SymptomTriageFormProps {
  onComplete: (context: string) => void
}

const commonSymptoms = [
  { id: "chest-pain", label: "Chest pain or discomfort", urgent: true },
  { id: "shortness-breath", label: "Shortness of breath", urgent: true },
  { id: "palpitations", label: "Heart palpitations or irregular heartbeat", urgent: false },
  { id: "dizziness", label: "Dizziness or lightheadedness", urgent: false },
  { id: "fatigue", label: "Unusual fatigue", urgent: false },
  { id: "swelling", label: "Swelling in legs, ankles, or feet", urgent: false },
  { id: "cough", label: "Persistent cough", urgent: false },
  { id: "nausea", label: "Nausea or loss of appetite", urgent: false },
  { id: "sweating", label: "Cold sweats", urgent: false },
  { id: "pain-radiation", label: "Pain radiating to arm, neck, or jaw", urgent: true },
]

const urgencyLevels = [
  { value: "immediate", label: "Immediate - within hours", description: "Severe symptoms requiring urgent care" },
  { value: "24-hours", label: "Within 24 hours", description: "Moderate symptoms that need prompt attention" },
  { value: "week", label: "Within a week", description: "Mild symptoms for routine evaluation" },
  { value: "routine", label: "Routine check-up", description: "General consultation or preventive care" },
]

export function SymptomTriageForm({ onComplete }: SymptomTriageFormProps) {
  const [selectedSymptoms, setSelectedSymptoms] = useState<string[]>([])
  const [urgencyLevel, setUrgencyLevel] = useState<string>("")
  const [additionalNotes, setAdditionalNotes] = useState("")
  const [hasUrgentSymptoms, setHasUrgentSymptoms] = useState(false)

  const handleSymptomToggle = (symptomId: string) => {
    setSelectedSymptoms(prev => {
      const newSelection = prev.includes(symptomId)
        ? prev.filter(id => id !== symptomId)
        : [...prev, symptomId]
      
      // Check if any urgent symptoms are selected
      const urgentSelected = newSelection.some(id => 
        commonSymptoms.find(s => s.id === id)?.urgent
      )
      setHasUrgentSymptoms(urgentSelected)
      
      return newSelection
    })
  }

  const handleSubmit = () => {
    const symptomLabels = selectedSymptoms.map(id => 
      commonSymptoms.find(s => s.id === id)?.label
    ).filter(Boolean)
    
    const urgencyLabel = urgencyLevels.find(u => u.value === urgencyLevel)?.label
    
    const context = `Symptoms: ${symptomLabels.join(", ")} | Urgency: ${urgencyLabel} | Notes: ${additionalNotes}`
    onComplete(context)
  }

  const canSubmit = selectedSymptoms.length > 0 && urgencyLevel

  return (
    <div className="space-y-8">
      {/* Emergency Warning */}
      {hasUrgentSymptoms && (
        <Card className="border-red-200 bg-red-50 dark:bg-red-950/20 dark:border-red-800 p-4">
          <div className="flex items-start gap-3">
            <AlertTriangle className="h-5 w-5 text-red-600 mt-0.5 flex-shrink-0" />
            <div>
              <h4 className="font-semibold text-red-800 dark:text-red-200 mb-1">
                Urgent Symptoms Detected
              </h4>
              <p className="text-sm text-red-700 dark:text-red-300">
                You've indicated symptoms that may require immediate attention. 
                If symptoms are severe, please call 911 or go to the nearest emergency room.
              </p>
            </div>
          </div>
        </Card>
      )}

      {/* Symptoms Selection */}
      <div className="space-y-4">
        <div className="flex items-center gap-2 mb-2">
          <Heart className="h-5 w-5 text-red-600" />
          <h3 className="text-lg font-semibold">Select your symptoms</h3>
        </div>
        <p className="text-sm text-gray-600 dark:text-gray-300 mb-4">
          Check all that apply to help us understand your needs and schedule appropriately.
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {commonSymptoms.map((symptom) => (
            <div key={symptom.id} className="flex items-start space-x-3 p-3 rounded-lg border border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors">
              <Checkbox
                id={symptom.id}
                checked={selectedSymptoms.includes(symptom.id)}
                onCheckedChange={() => handleSymptomToggle(symptom.id)}
                className="mt-1"
              />
              <div className="flex-1">
                <Label 
                  htmlFor={symptom.id} 
                  className={`text-sm cursor-pointer ${
                    symptom.urgent ? 'font-medium text-red-700 dark:text-red-300' : ''
                  }`}
                >
                  {symptom.label}
                  {symptom.urgent && (
                    <span className="ml-2 text-xs bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-300 px-2 py-0.5 rounded">
                      Urgent
                    </span>
                  )}
                </Label>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Urgency Level */}
      <div className="space-y-4">
        <div className="flex items-center gap-2 mb-2">
          <Clock className="h-5 w-5 text-blue-600" />
          <h3 className="text-lg font-semibold">How soon do you need to be seen?</h3>
        </div>
        
        <RadioGroup value={urgencyLevel} onValueChange={setUrgencyLevel}>
          <div className="space-y-3">
            {urgencyLevels.map((level) => (
              <div key={level.value} className="flex items-start space-x-3 p-3 rounded-lg border border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors">
                <RadioGroupItem value={level.value} id={level.value} className="mt-1" />
                <div className="flex-1">
                  <Label htmlFor={level.value} className="text-sm font-medium cursor-pointer">
                    {level.label}
                  </Label>
                  <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                    {level.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </RadioGroup>
      </div>

      {/* Additional Notes */}
      <div className="space-y-3">
        <div className="flex items-center gap-2">
          <Info className="h-5 w-5 text-gray-600" />
          <h3 className="text-lg font-semibold">Additional Information (Optional)</h3>
        </div>
        <Textarea
          placeholder="Tell us more about your symptoms, medical history, or any other relevant information..."
          value={additionalNotes}
          onChange={(e) => setAdditionalNotes(e.target.value)}
          rows={3}
          className="resize-none"
        />
      </div>

      {/* Submit Button */}
      <div className="pt-6 border-t">
        <Button 
          onClick={handleSubmit}
          disabled={!canSubmit}
          className="w-full h-12 text-lg"
          size="lg"
        >
          Continue
        </Button>
        {!canSubmit && (
          <p className="text-xs text-gray-500 dark:text-gray-400 mt-2 text-center">
            Please select at least one symptom and urgency level to continue.
          </p>
        )}
      </div>

      {/* Disclaimer */}
      <div className="text-xs text-gray-500 dark:text-gray-400 text-center pt-4 border-t">
        This information helps us provide appropriate care. For medical emergencies, call 911 immediately.
      </div>
    </div>
  )
} 