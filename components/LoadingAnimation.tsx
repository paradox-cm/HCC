"use client"

import { useEffect, useRef } from 'react'

interface LoadingAnimationProps {
  size?: 'sm' | 'md' | 'lg'
  color?: 'primary' | 'secondary' | 'muted'
  className?: string
}

export function LoadingAnimation({ 
  size = 'md', 
  color = 'primary',
  className = '' 
}: LoadingAnimationProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    if (!canvasRef.current) return

    const canvas = canvasRef.current
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    // Set canvas size based on size prop
    const sizeMap = {
      sm: 32,
      md: 48,
      lg: 64
    }
    const canvasSize = sizeMap[size]
    
    canvas.width = canvasSize * window.devicePixelRatio
    canvas.height = canvasSize * window.devicePixelRatio
    ctx.scale(window.devicePixelRatio, window.devicePixelRatio)

    // Color mapping
    const colorMap = {
      primary: '#dc2626', // Crimson red
      secondary: '#6b7280', // Gray
      muted: '#9ca3af' // Light gray
    }
    const strokeColor = colorMap[color]

    let time = 0
    let animationId: number

    const animate = () => {
      const centerX = canvasSize / 2
      const centerY = canvasSize / 2
      const radius = canvasSize * 0.3

      // Clear canvas
      ctx.clearRect(0, 0, canvasSize, canvasSize)

      // Draw pulsing heart shape
      const pulseScale = 1 + Math.sin(time * 3) * 0.1
      
      ctx.save()
      ctx.translate(centerX, centerY)
      ctx.scale(pulseScale, pulseScale)

      // Draw heart shape
      ctx.beginPath()
      ctx.strokeStyle = strokeColor
      ctx.lineWidth = 2
      ctx.globalAlpha = 0.8

      // Heart curve
      const heartSize = radius * 0.8
      ctx.moveTo(0, heartSize * 0.3)
      
      // Left curve
      ctx.bezierCurveTo(
        -heartSize * 0.5, -heartSize * 0.2,
        -heartSize * 0.8, heartSize * 0.3,
        0, heartSize * 0.8
      )
      
      // Right curve
      ctx.bezierCurveTo(
        heartSize * 0.8, heartSize * 0.3,
        heartSize * 0.5, -heartSize * 0.2,
        0, heartSize * 0.3
      )

      ctx.stroke()

      // Draw rotating dots around the heart
      for (let i = 0; i < 6; i++) {
        const angle = (time * 2 + (i * Math.PI * 2) / 6) % (Math.PI * 2)
        const dotRadius = radius * 0.6
        const dotX = Math.cos(angle) * dotRadius
        const dotY = Math.sin(angle) * dotRadius
        
        ctx.beginPath()
        ctx.arc(dotX, dotY, 2, 0, Math.PI * 2)
        ctx.fillStyle = strokeColor
        ctx.globalAlpha = 0.6 - (i * 0.1)
        ctx.fill()
      }

      ctx.restore()

      time += 0.02
      animationId = requestAnimationFrame(animate)
    }

    animate()

    return () => {
      cancelAnimationFrame(animationId)
    }
  }, [size, color])

  return (
    <div className={`flex items-center justify-center ${className}`}>
      <canvas
        ref={canvasRef}
        className="block"
        style={{
          width: size === 'sm' ? '32px' : size === 'md' ? '48px' : '64px',
          height: size === 'sm' ? '32px' : size === 'md' ? '48px' : '64px'
        }}
      />
    </div>
  )
} 