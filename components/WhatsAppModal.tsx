"use client"

import { useState } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import WhatsappFillIcon from 'remixicon-react/WhatsappFillIcon'

interface WhatsAppModalProps {
  open: boolean
  onClose: () => void
  context?: string
}

export function WhatsAppModal({ open, onClose, context }: WhatsAppModalProps) {
  const [name, setName] = useState("")
  const [message, setMessage] = useState("")
  const [error, setError] = useState("")

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!name.trim() || !message.trim()) {
      setError("Please enter your name and message.")
      return
    }
    setError("")
    
    const phone = "17134644140" // WhatsApp number, no + or dashes
    const fullMessage = context 
      ? `Context: ${context}\nName: ${name}\nMessage: ${message}`
      : `Name: ${name}\nMessage: ${message}`
    
    const url = `https://wa.me/${phone}?text=${encodeURIComponent(fullMessage)}`
    window.open(url, '_blank')
    onClose()
    setName("")
    setMessage("")
  }

  const handleClose = () => {
    onClose()
    setName("")
    setMessage("")
    setError("")
  }

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2 pr-8">
            <WhatsappFillIcon className="h-5 w-5 text-green-600" />
            Message us on WhatsApp
          </DialogTitle>
        </DialogHeader>
        
        {context && (
          <div className="bg-blue-50 dark:bg-blue-950/20 border border-blue-200 dark:border-blue-800 rounded-lg p-3 mb-4">
            <p className="text-sm text-blue-800 dark:text-blue-200">
              <strong>Context:</strong> {context}
            </p>
          </div>
        )}
        
        <form className="space-y-4" onSubmit={handleSubmit}>
          <div>
            <label className="block text-xs font-medium mb-1">Your Name</label>
            <Input 
              value={name} 
              onChange={e => setName(e.target.value)} 
              required 
              autoFocus 
              placeholder="Enter your full name"
            />
          </div>
          
          <div>
            <label className="block text-xs font-medium mb-1">Your Message</label>
            <Textarea 
              value={message} 
              onChange={e => setMessage(e.target.value)} 
              rows={3} 
              required 
              placeholder="Tell us how we can help you..."
            />
          </div>
          
          {error && (
            <div className="text-xs text-red-600 bg-red-50 dark:bg-red-950/20 p-2 rounded">
              {error}
            </div>
          )}
          
          <Button type="submit" className="w-full bg-green-600 hover:bg-green-700">
            <WhatsappFillIcon className="mr-2 h-4 w-4" />
            Send via WhatsApp
          </Button>
        </form>
        
        <div className="text-xs text-gray-500 dark:text-gray-400 mt-3 text-center">
          You'll be redirected to WhatsApp to complete your message.
        </div>
      </DialogContent>
    </Dialog>
  )
} 