"use client"

import { useEffect, useRef } from 'react'

interface HeaderAnimationProps {
  type: 'pulse-wave' | 'floating-geometric' | 'particle-flow' | 'gradient-flow' | 'ripple-heartbeat' | 'breathing-data' | 'vanishing-point'
  intensity?: 'low' | 'medium' | 'high'
  colorScheme?: 'blue' | 'red' | 'green' | 'gray'
  responsive?: boolean
}

export function HeaderAnimation({ 
  type = 'pulse-wave', 
  intensity = 'medium', 
  colorScheme = 'red',
  responsive = true 
}: HeaderAnimationProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    if (type === 'pulse-wave') {
      if (!canvasRef.current) return

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

      // Wave configuration - four lines
      const waves = [
        { frequency: 0.2, amplitude: 0.3, phase: 0, color: '#dc2626', opacity: 0.9 },      // Bright red
        { frequency: 0.2, amplitude: 0.5, phase: Math.PI / 8, color: '#991b1b', opacity: 0.7 }, // Dark red
        { frequency: 0.2, amplitude: 0.7, phase: Math.PI / 2, color: '#d1d5db', opacity: 0.3 }, // Grey (thinner)
        { frequency: 0.2, amplitude: 0.6, phase: Math.PI * 3 / 4, color: '#d1d5db', opacity: 0.2 }     // Additional grey
      ]

      const animate = () => {
        const rect = canvas.getBoundingClientRect()
        const width = rect.width
        const height = rect.height

        // Clear canvas with transparent background
        ctx.clearRect(0, 0, width, height)
        
        // Draw each wave
        waves.forEach((wave, index) => {
          ctx.strokeStyle = wave.color
          ctx.globalAlpha = wave.opacity
          ctx.lineWidth = 1 + (index * 0.2)
          ctx.lineCap = 'round'
          ctx.lineJoin = 'round'

          // Create smooth curve path
          ctx.beginPath()
          let firstPoint = true
          
          for (let x = 0; x <= width; x += 1) {
            // Add fluctuating amplitude and frequency
            const fluctuation = Math.sin(x * 0.005 + time * 0.3) * 0.3
            const dynamicAmplitude = wave.amplitude * (1 + fluctuation)
            const dynamicFrequency = wave.frequency * (1 + Math.sin(x * 0.003 + time * 0.2) * 0.2)
            
            // Combine primary and secondary wave patterns for more complex shapes
            const primaryWave = Math.sin(x * 0.01 * dynamicFrequency + time * 0.5 + wave.phase)
            const secondaryWave = Math.sin(x * 0.02 * dynamicFrequency * 2 + time * 0.3 + wave.phase) * 0.3
            const combinedWave = primaryWave + secondaryWave
            
            const y = height * 0.7 + 
              combinedWave * height * 0.3 * dynamicAmplitude

            if (firstPoint) {
              ctx.moveTo(x, y)
              firstPoint = false
            } else {
              ctx.lineTo(x, y)
            }
          }

          ctx.stroke()
          
          // Add subtle glow effect
          ctx.shadowColor = wave.color
          ctx.shadowBlur = 3
          ctx.stroke()
          ctx.shadowBlur = 0
        })
        
        time += 0.00125
        animationId = requestAnimationFrame(animate)
      }

      animate()

      return () => {
        window.removeEventListener('resize', resizeCanvas)
        cancelAnimationFrame(animationId)
      }
    } else if (type === 'floating-geometric') {
      if (!canvasRef.current) return

      const canvas = canvasRef.current
      const ctx = canvas.getContext('2d')
      if (!ctx) return

      const resizeCanvas = () => {
        const rect = canvas.getBoundingClientRect()
        canvas.width = rect.width * (responsive ? window.devicePixelRatio : 1)
        canvas.height = rect.height * (responsive ? window.devicePixelRatio : 1)
        ctx.scale(responsive ? window.devicePixelRatio : 1, responsive ? window.devicePixelRatio : 1)
      }

      resizeCanvas()
      window.addEventListener('resize', resizeCanvas)

      // Rectangle configuration - aligned to proper grid
      const gridSize = 120 // Base grid unit
              const rectangles = [
          { baseSize: 80, gridX: 4, gridY: 2, growthRate: 1.0, opacity: 0.9, color: '#dc2626' },
          { baseSize: 80, gridX: 8, gridY: 2, growthRate: 1.3, opacity: 0.7, color: '#b91c1c' },
          { baseSize: 80, gridX: 6, gridY: 4, growthRate: 1.6, opacity: 0.5, color: '#991b1b' },
          { baseSize: 80, gridX: 10, gridY: 4, growthRate: 2.0, opacity: 0.3, color: '#6b7280' },
          // Additional smaller rectangles on the left side
          { baseSize: 40, gridX: 1, gridY: 1, growthRate: 1.2, opacity: 0.15, color: '#dc2626' },
          { baseSize: 50, gridX: 2, gridY: 1, growthRate: 1.1, opacity: 0.12, color: '#b91c1c' },
          { baseSize: 35, gridX: 1, gridY: 3, growthRate: 1.3, opacity: 0.1, color: '#991b1b' },
          { baseSize: 45, gridX: 2, gridY: 3, growthRate: 1.0, opacity: 0.08, color: '#6b7280' },
          { baseSize: 30, gridX: 0, gridY: 2, growthRate: 1.4, opacity: 0.06, color: '#dc2626' },
          { baseSize: 55, gridX: 3, gridY: 0, growthRate: 1.2, opacity: 0.14, color: '#b91c1c' }
        ]

      let time = 0
      let animationId: number

      const animate = () => {
        const rect = canvas.getBoundingClientRect()
        const width = rect.width
        const height = rect.height

        // Clear canvas
        ctx.clearRect(0, 0, width, height)

        // Calculate center offset to center the animation
        const totalGridWidth = 10 * gridSize  // 10 grid units wide
        const totalGridHeight = 6 * gridSize   // 6 grid units tall
        const centerOffsetX = (width - totalGridWidth) / 2
        const centerOffsetY = (height - totalGridHeight) / 2

        // Draw each rectangle
        rectangles.forEach((rect, index) => {
          // Calculate dynamic properties - monotonic growth only
          const growthProgress = Math.abs(Math.sin(time * 0.055 + index * 0.5)) // 10% faster animation
          const growthScale = 1 + growthProgress * 0.25 // Scale from 1.0 to 1.25 (25% growth)
          const currentSize = rect.baseSize * rect.growthRate
          const rectWidth = currentSize * 16 / 9  // 16:9 aspect ratio
          const rectHeight = currentSize
          const x = rect.gridX * gridSize + centerOffsetX  // Centered grid position
          const y = rect.gridY * gridSize + centerOffsetY  // Centered grid position

          // Save context
          ctx.save()

          // Apply transformations (no rotation, just scaling)
          ctx.translate(x + rectWidth / 2, y + rectHeight / 2)
          ctx.scale(growthScale, growthScale)

          // Draw rectangle with stroke instead of fill
          ctx.strokeStyle = rect.color
          ctx.lineWidth = 2
          ctx.globalAlpha = rect.opacity
          ctx.strokeRect(-rectWidth / 2, -rectHeight / 2, rectWidth, rectHeight)

          // Restore context
          ctx.restore()
        })

        time += 0.02
        animationId = requestAnimationFrame(animate)
      }

      animate()

      return () => {
        window.removeEventListener('resize', resizeCanvas)
        cancelAnimationFrame(animationId)
      }
    } else if (type === 'gradient-flow') {
      if (!canvasRef.current) return

      const canvas = canvasRef.current
      const ctx = canvas.getContext('2d')
      if (!ctx) return

      const resizeCanvas = () => {
        const rect = canvas.getBoundingClientRect()
        canvas.width = rect.width * (responsive ? window.devicePixelRatio : 1)
        canvas.height = rect.height * (responsive ? window.devicePixelRatio : 1)
        ctx.scale(responsive ? window.devicePixelRatio : 1, responsive ? window.devicePixelRatio : 1)
      }

      resizeCanvas()
      window.addEventListener('resize', resizeCanvas)

      // Simplified stroke configuration - just two layers
      const strokes = [
        { 
          color: '#dc2626', // Crimson red
          angle: 0, 
          opacity: 0.6, 
          scale: 1.0,
          rotationSpeed: 0.08, // Slower, more subtle
          lineWidth: 2
        },
        { 
          color: '#d1d5db', // Light gray
          angle: 90, 
          opacity: 0.3, 
          scale: 1.1,
          rotationSpeed: 0.05, // Slower, more subtle
          lineWidth: 1.5
        }
      ]

      let time = 0
      let animationId: number

      const animate = () => {
        const rect = canvas.getBoundingClientRect()
        const width = rect.width
        const height = rect.height

        // Clear canvas
        ctx.clearRect(0, 0, width, height)

        // Draw each stroke layer
        strokes.forEach((stroke, index) => {
          // Calculate current rotation and scaling
          const currentRotation = stroke.angle + time * stroke.rotationSpeed
          const breathingScale = stroke.scale * (1 + Math.sin(time * 0.05 + index) * 0.05) // Much slower and subtler
          
          // Calculate center point
          const centerX = width / 2
          const centerY = height / 2
          
          // Save context for transformations
          ctx.save()
          
          // Apply transformations
          ctx.translate(centerX, centerY)
          ctx.rotate(currentRotation * Math.PI / 180)
          ctx.scale(breathingScale, breathingScale)
          
          // Draw stroke rectangle
          ctx.strokeStyle = stroke.color
          ctx.lineWidth = stroke.lineWidth
          ctx.globalAlpha = stroke.opacity
          ctx.strokeRect(-width/2, -height/2, width, height)
          
          // Restore context
          ctx.restore()
        })

        time += 0.003 // Slower overall animation
        animationId = requestAnimationFrame(animate)
      }

      animate()

      return () => {
        window.removeEventListener('resize', resizeCanvas)
        cancelAnimationFrame(animationId)
      }
    } else if (type === 'particle-flow') {
      if (!canvasRef.current) return

      const canvas = canvasRef.current
      const ctx = canvas.getContext('2d')
      if (!ctx) return

      const resizeCanvas = () => {
        const rect = canvas.getBoundingClientRect()
        canvas.width = rect.width * (responsive ? window.devicePixelRatio : 1)
        canvas.height = rect.height * (responsive ? window.devicePixelRatio : 1)
        ctx.scale(responsive ? window.devicePixelRatio : 1, responsive ? window.devicePixelRatio : 1)
      }

      resizeCanvas()
      window.addEventListener('resize', resizeCanvas)

      // Node configuration - service pathway nodes (header positioned)
      const nodes = [
        { x: 0.1, y: 0.3, connections: [1, 2], pulse: 0 },
        { x: 0.25, y: 0.2, connections: [2, 3], pulse: 0 },
        { x: 0.25, y: 0.4, connections: [3, 4], pulse: 0 },
        { x: 0.4, y: 0.3, connections: [4, 5], pulse: 0 },
        { x: 0.55, y: 0.2, connections: [5, 6], pulse: 0 },
        { x: 0.55, y: 0.4, connections: [6, 7], pulse: 0 },
        { x: 0.7, y: 0.3, connections: [7, 8], pulse: 0 },
        { x: 0.85, y: 0.3, connections: [], pulse: 0 }
      ]

      // Particle configuration
      const particles = []
      for (let i = 0; i < 18; i++) {
        particles.push({
          x: -50,
          y: Math.random() * 0.8 + 0.1, // Increased range from 0.6 + 0.2 to 0.8 + 0.1 to fill more height
          vx: (Math.random() * 0.5 + 0.5) * 2,
          vy: (Math.random() - 0.5) * 0.5,
          size: Math.random() * 3 + 2,
          color: '#3b82f6',
          trail: [],
          nodeIndex: 0,
          pathProgress: 0
        })
      }

      let time = 0
      let animationId: number

      const animate = () => {
        const rect = canvas.getBoundingClientRect()
        const width = rect.width
        const height = rect.height

        // Clear canvas
        ctx.clearRect(0, 0, width, height)

        // Update and draw nodes
        nodes.forEach((node, index) => {
          // Update node pulse
          node.pulse = Math.sin(time * 2 + index) * 0.5 + 0.5
          
          // Draw node
          const nodeX = node.x * width
          const nodeY = node.y * height
          const nodeSize = 4 + node.pulse * 2 // Reduced from 8 + pulse * 4 to 4 + pulse * 2
          
          ctx.beginPath()
          ctx.arc(nodeX, nodeY, nodeSize, 0, Math.PI * 2)
          ctx.fillStyle = '#6b7280'
          ctx.globalAlpha = 0.8
          ctx.fill()
          
          // Draw node glow
          ctx.beginPath()
          ctx.arc(nodeX, nodeY, nodeSize + 2, 0, Math.PI * 2) // Reduced glow from +4 to +2
          ctx.strokeStyle = '#6b7280'
          ctx.lineWidth = 1 // Reduced from 2 to 1
          ctx.globalAlpha = 0.3
          ctx.stroke()
        })

        // Draw connection lines
        nodes.forEach((node, index) => {
          node.connections.forEach(connectionIndex => {
            const targetNode = nodes[connectionIndex]
            if (targetNode) { // Check if target node exists
              const pulseIntensity = Math.sin(time * 3 + index) * 0.5 + 0.5
              
              ctx.beginPath()
              ctx.moveTo(node.x * width, node.y * height)
              ctx.lineTo(targetNode.x * width, targetNode.y * height)
              ctx.strokeStyle = '#9ca3af'
              ctx.lineWidth = 2
              ctx.globalAlpha = 0.4 + pulseIntensity * 0.3
              ctx.stroke()
            }
          })
        })

        // Update and draw particles
        particles.forEach((particle, index) => {
          // Update particle position
          particle.x += particle.vx
          particle.y += particle.vy
          
          // Update trail
          particle.trail.push({ x: particle.x, y: particle.y })
          if (particle.trail.length > 10) {
            particle.trail.shift()
          }
          
          // Particle size pulsing
          const pulseSize = Math.sin(time * 4 + index) * 0.5 + 1
          
          // Draw particle trail
          particle.trail.forEach((trailPoint, trailIndex) => {
            const alpha = trailIndex / particle.trail.length
            ctx.beginPath()
            ctx.arc(trailPoint.x, trailPoint.y * height, particle.size * pulseSize * alpha, 0, Math.PI * 2)
            ctx.fillStyle = particle.color
            ctx.globalAlpha = alpha * 0.6
            ctx.fill()
          })
          
          // Draw main particle
          ctx.beginPath()
          ctx.arc(particle.x, particle.y * height, particle.size * pulseSize, 0, Math.PI * 2)
          ctx.fillStyle = particle.color
          ctx.globalAlpha = 0.9
          ctx.fill()
          
          // Particle glow
          ctx.beginPath()
          ctx.arc(particle.x, particle.y * height, particle.size * pulseSize + 3, 0, Math.PI * 2)
          ctx.strokeStyle = particle.color
          ctx.lineWidth = 1
          ctx.globalAlpha = 0.4
          ctx.stroke()
          
          // Reset particle if it goes off screen
          if (particle.x > width + 50) {
            particle.x = -50
            particle.y = Math.random() * 0.8 + 0.1 // Match the initial distribution
            particle.vx = (Math.random() * 0.5 + 0.5) * 2
            particle.vy = (Math.random() - 0.5) * 0.5
          }
        })

        time += 0.02
        animationId = requestAnimationFrame(animate)
      }

      animate()

      return () => {
        window.removeEventListener('resize', resizeCanvas)
        cancelAnimationFrame(animationId)
      }
    } else if (type === 'ripple-heartbeat') {
      if (!canvasRef.current) return

      const canvas = canvasRef.current
      const ctx = canvas.getContext('2d', { alpha: true, desynchronized: true })
      if (!ctx) return

      // Enable canvas optimizations
      ctx.imageSmoothingEnabled = true
      ctx.imageSmoothingQuality = 'high'

      const resizeCanvas = () => {
        const rect = canvas.getBoundingClientRect()
        const dpr = responsive ? window.devicePixelRatio : 1
        canvas.width = rect.width * dpr
        canvas.height = rect.height * dpr
        ctx.scale(dpr, dpr)
      }

      resizeCanvas()
      window.addEventListener('resize', resizeCanvas)

      // Ripple configuration
      const ripples: Array<{
        x: number
        y: number
        radius: number
        maxRadius: number
        opacity: number
        startTime: number
        color: string
      }> = []

      let time = 0
      let animationId: number
      let lastPulseTime = -3.3 // Start immediately on load
      let lastFrameTime = 0

      const animate = (currentTime: number) => {
        // Calculate delta time for smooth animation
        const deltaTime = currentTime - lastFrameTime
        lastFrameTime = currentTime
        
        // Cap delta time to prevent large jumps
        const clampedDeltaTime = Math.min(deltaTime, 32) // Max 32ms (30fps minimum)
        time += clampedDeltaTime / 1000 // Convert to seconds

        const rect = canvas.getBoundingClientRect()
        const width = rect.width
        const height = rect.height
        const centerX = width / 2
        const centerY = height / 2

        // Clear canvas efficiently
        ctx.clearRect(0, 0, width, height)

        // Create new ripple every 1.2 seconds (0.8s expansion + 0.4s gap) - faster heartbeat
        if (time - lastPulseTime >= 1.2) {
          ripples.push({
            x: centerX,
            y: centerY,
            radius: 0,
            maxRadius: Math.min(width, height) * 0.4,
            opacity: 1.0,
            startTime: time,
            color: '#dc2626' // Crimson red center
          })
          lastPulseTime = time
        }

        // Batch similar drawing operations
        ctx.lineCap = 'round'
        ctx.lineJoin = 'round'

        // Update and draw ripples
        for (let i = ripples.length - 1; i >= 0; i--) {
          const ripple = ripples[i]
          const age = time - ripple.startTime
          const progress = age / 0.8 // 0.8-second expansion cycle - faster heartbeat

          if (progress >= 1.0) {
            // Remove expired ripples
            ripples.splice(i, 1)
            continue
          }

          // Calculate current radius and opacity
          ripple.radius = ripple.maxRadius * progress
          ripple.opacity = 1.0 - progress

          // Draw main ripple ring
          ctx.beginPath()
          ctx.arc(ripple.x, ripple.y, ripple.radius, 0, Math.PI * 2)
          ctx.strokeStyle = ripple.color
          ctx.lineWidth = 2
          ctx.globalAlpha = ripple.opacity * 0.8
          ctx.stroke()

          // Add glow effect
          ctx.beginPath()
          ctx.arc(ripple.x, ripple.y, ripple.radius + 2, 0, Math.PI * 2)
          ctx.strokeStyle = ripple.color
          ctx.lineWidth = 1
          ctx.globalAlpha = ripple.opacity * 0.3
          ctx.stroke()

          // Draw additional rings with different colors
          if (progress > 0.2) {
            // Darker red ring
            ctx.beginPath()
            ctx.arc(ripple.x, ripple.y, ripple.radius * 0.8, 0, Math.PI * 2)
            ctx.strokeStyle = '#991b1b'
            ctx.lineWidth = 1.5
            ctx.globalAlpha = ripple.opacity * 0.6
            ctx.stroke()
          }

          if (progress > 0.4) {
            // Light red ring
            ctx.beginPath()
            ctx.arc(ripple.x, ripple.y, ripple.radius * 0.6, 0, Math.PI * 2)
            ctx.strokeStyle = '#fca5a5'
            ctx.lineWidth = 1
            ctx.globalAlpha = ripple.opacity * 0.4
            ctx.stroke()
          }
        }

        animationId = requestAnimationFrame(animate)
      }

      animate(0)

      return () => {
        window.removeEventListener('resize', resizeCanvas)
        cancelAnimationFrame(animationId)
      }
    } else if (type === 'vanishing-point') {
      if (!canvasRef.current) return

      const canvas = canvasRef.current
      const ctx = canvas.getContext('2d')
      if (!ctx) return

      const resizeCanvas = () => {
        const rect = canvas.getBoundingClientRect()
        canvas.width = rect.width * (responsive ? window.devicePixelRatio : 1)
        canvas.height = rect.height * (responsive ? window.devicePixelRatio : 1)
        ctx.scale(responsive ? window.devicePixelRatio : 1, responsive ? window.devicePixelRatio : 1)
      }

      resizeCanvas()
      window.addEventListener('resize', resizeCanvas)

      // Line configuration - perspective lines converging to vanishing point
      const lines: Array<{
        startX: number
        startY: number
        endX: number
        endY: number
        opacity: number
        width: number
        color: string
      }> = []
      
      const numLines = 8
      const vanishingPointX = 0.8 // Right side of screen (80%)
      const vanishingPointY = 0.3 // Above center for perspective
      const colors = ['#dc2626', '#b91c1c', '#991b1b', '#d1d5db'] // Crimson, red, dark red, light gray
      
      for (let i = 0; i < numLines; i++) {
        const angle = (i * Math.PI * 2) / numLines
        const startX = Math.cos(angle) * 1.5 // Extend beyond screen edges
        const startY = Math.sin(angle) * 1.5
        
        lines.push({
          startX: startX,
          startY: startY,
          endX: vanishingPointX,
          endY: vanishingPointY,
          opacity: 0.9 - (i * 0.06), // Varying opacity
          width: 1, // Fixed 1 pixel width
          color: colors[i % colors.length]
        })
      }

      let time = 0
      let animationId: number

      const animate = () => {
        const rect = canvas.getBoundingClientRect()
        const width = rect.width
        const height = rect.height
        const centerX = width / 2
        const centerY = height / 2
        const maxRadius = Math.min(width, height) * 0.4

        // Clear canvas
        ctx.clearRect(0, 0, width, height)

        // Draw each line
        lines.forEach((line, index) => {
          // Calculate rotation (320-second full rotation - 50% slower than previous)
          const rotationSpeed = (Math.PI * 2) / 320 // 320 seconds for full rotation
          const rotationAngle = time * rotationSpeed
          
          // Apply rotation to start points around the vanishing point
          const cosRot = Math.cos(rotationAngle)
          const sinRot = Math.sin(rotationAngle)
          const rotatedStartX = (line.startX - line.endX) * cosRot - (line.startY - line.endY) * sinRot + line.endX
          const rotatedStartY = (line.startX - line.endX) * sinRot + (line.startY - line.endY) * cosRot + line.endY

          // Convert to screen coordinates
          const startX = rotatedStartX * width
          const startY = rotatedStartY * height
          const endX = line.endX * width
          const endY = line.endY * height

          // Draw line with fade effect
          ctx.beginPath()
          ctx.moveTo(startX, startY)
          ctx.lineTo(endX, endY)
          ctx.strokeStyle = line.color
          ctx.lineWidth = line.width
          ctx.globalAlpha = line.opacity
          ctx.stroke()

          // Add subtle glow effect
          ctx.beginPath()
          ctx.moveTo(startX, startY)
          ctx.lineTo(endX, endY)
          ctx.strokeStyle = line.color
          ctx.lineWidth = line.width + 1
          ctx.globalAlpha = line.opacity * 0.3
          ctx.stroke()
        })

        time += 0.016 // ~60fps
        animationId = requestAnimationFrame(animate)
      }

      animate()

      return () => {
        window.removeEventListener('resize', resizeCanvas)
        cancelAnimationFrame(animationId)
      }
    }
  }, [type, intensity, colorScheme, responsive])

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full pointer-events-none"
      style={{ zIndex: 1 }}
    />
  )
} 