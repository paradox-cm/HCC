"use client"

import { useEffect, useRef } from 'react'

interface HeaderAnimationProps {
  type: 'pulse-wave' | 'floating-geometric' | 'particle-flow' | 'gradient-flow' | 'ripple-heartbeat' | 'breathing-data' | 'vanishing-point'
  intensity?: 'low' | 'medium' | 'high'
  colorScheme?: 'blue' | 'red' | 'green' | 'gray'
  responsive?: boolean
}

export function HeaderAnimation({ 
  type, 
  intensity = 'medium', 
  colorScheme = 'blue', 
  responsive = true 
}: HeaderAnimationProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    if (type !== 'pulse-wave' || !canvasRef.current) return

    const canvas = canvasRef.current
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    // Set canvas size
    const resizeCanvas = () => {
      const rect = canvas.getBoundingClientRect()
      canvas.width = rect.width * window.devicePixelRatio
      canvas.height = rect.height * window.devicePixelRatio
      ctx.scale(window.devicePixelRatio, window.devicePixelRatio)
    }

    resizeCanvas()
    window.addEventListener('resize', resizeCanvas)

    // Animation variables
    let animationId: number
    let time = 0

    // Wave configuration
    const waves = [
      { frequency: 0.5, amplitude: 0.2, phase: 0, color: '#1e3a8a', opacity: 0.8 },
      { frequency: 1.0, amplitude: 0.4, phase: Math.PI / 4, color: '#3b82f6', opacity: 0.6 },
      { frequency: 1.5, amplitude: 0.6, phase: Math.PI / 2, color: '#0ea5e9', opacity: 0.4 },
      { frequency: 2.0, amplitude: 0.8, phase: Math.PI, color: '#06b6d4', opacity: 0.2 }
    ]

    const animate = () => {
      const rect = canvas.getBoundingClientRect()
      const width = rect.width
      const height = rect.height

      // Clear canvas
      ctx.clearRect(0, 0, width, height)

      // Draw each wave
      waves.forEach((wave, index) => {
        ctx.beginPath()
        ctx.strokeStyle = wave.color
        ctx.globalAlpha = wave.opacity
        ctx.lineWidth = 2

        for (let x = 0; x <= width; x += 2) {
          const y = height / 2 + 
            Math.sin(x * 0.01 * wave.frequency + time * 0.5 + wave.phase) * 
            height * 0.3 * wave.amplitude

          if (x === 0) {
            ctx.moveTo(x, y)
          } else {
            ctx.lineTo(x, y)
          }
        }

        ctx.stroke()
      })

      time += 0.02
      animationId = requestAnimationFrame(animate)
    }

    animate()

    return () => {
      window.removeEventListener('resize', resizeCanvas)
      cancelAnimationFrame(animationId)
    }
  }, [type, intensity, colorScheme, responsive])

  if (type !== 'pulse-wave') {
    return null // Other animation types will be implemented separately
  }

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      <canvas
        ref={canvasRef}
        className="w-full h-full"
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          zIndex: 0
        }}
      />
    </div>
  )
} 