import React, { useState, useEffect, useRef, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X, Volume2, VolumeX, Sparkles } from 'lucide-react'

// ============================================================================
// AUDIO SYNTHESIZER (Native Web Audio API — No external assets required)
// ============================================================================
function playThudSound(speed, type) {
  try {
    const AudioCtx = window.AudioContext || window.webkitAudioContext
    if (!AudioCtx) return
    const ctx = new AudioCtx()
    if (ctx.state === 'suspended') {
      ctx.resume()
    }
    const osc = ctx.createOscillator()
    const gain = ctx.createGain()

    // Frequency profile varies slightly by ball type
    const baseFreq = type === 'cricket' ? 180 : type === 'chrome' ? 260 : 130
    const startFreq = Math.min(450, Math.max(70, baseFreq + speed * 8))

    osc.type = type === 'chrome' ? 'triangle' : 'sine'
    osc.frequency.setValueAtTime(startFreq, ctx.currentTime)
    osc.frequency.exponentialRampToValueAtTime(35, ctx.currentTime + 0.07)

    const volume = Math.min(0.25, Math.max(0.02, speed * 0.012))
    gain.gain.setValueAtTime(volume, ctx.currentTime)
    gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.07)

    osc.connect(gain)
    gain.connect(ctx.destination)
    osc.start()
    osc.stop(ctx.currentTime + 0.08)
  } catch {
    // Ignore audio permission restrictions
  }
}

export default function PhysicsBallEasterEgg({ isDark = true }) {
  const [isActive, setIsActive] = useState(false)
  const [ballType, setBallType] = useState('football') // 'football' | 'cricket' | 'chrome'
  const [soundEnabled, setSoundEnabled] = useState(true)

  const canvasRef = useRef(null)
  const animFrameRef = useRef(null)

  // Physics state stored in refs for 60fps canvas loop
  const ballState = useRef({
    x: 200,
    y: 120,
    vx: 8,
    vy: 2,
    radius: 26,
    rotation: 0,
    vRot: 0.05,
    isDragging: false,
    dragStartX: 0,
    dragStartY: 0,
    lastMouseX: 0,
    lastMouseY: 0,
    mouseVelX: 0,
    mouseVelY: 0,
  })

  // Key sequence detector for typing "ball"
  useEffect(() => {
    let keyBuffer = ''
    const handleKeyDown = (e) => {
      // Ignore inputs in text areas or inputs
      if (['INPUT', 'TEXTAREA'].includes(e.target?.tagName)) return

      if (e.key === 'Escape' && isActive) {
        setIsActive(false)
        return
      }

      keyBuffer = (keyBuffer + e.key.toLowerCase()).slice(-8)
      if (keyBuffer.includes('ball')) {
        setIsActive((prev) => !prev)
        keyBuffer = ''
      }
    }

    const handleCustomTrigger = () => setIsActive((prev) => !prev)

    window.addEventListener('keydown', handleKeyDown)
    window.addEventListener('trigger-physics-ball', handleCustomTrigger)
    window.triggerPhysicsBall = () => setIsActive((prev) => !prev)

    return () => {
      window.removeEventListener('keydown', handleKeyDown)
      window.removeEventListener('trigger-physics-ball', handleCustomTrigger)
    }
  }, [isActive])

  // Log console discovery hint
  useEffect(() => {
    console.log(
      '%c⚽ EASTER EGG UNLOCKED:%c Type %cball%c anywhere on the screen to spawn the physics ball!',
      'color: #34d399; font-weight: bold; font-size: 11px; font-family: monospace;',
      'color: #a3a3a3; font-size: 11px; font-family: monospace;',
      'background: #262626; color: #fff; padding: 2px 6px; border-radius: 4px; font-family: monospace;',
      'color: #a3a3a3; font-size: 11px; font-family: monospace;'
    )
  }, [])

  // Canvas size and physics loop
  useEffect(() => {
    if (!isActive) return

    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')

    const resizeCanvas = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }
    resizeCanvas()
    window.addEventListener('resize', resizeCanvas)

    // Reset ball position dropping from top center
    ballState.current.x = window.innerWidth / 2 + (Math.random() * 80 - 40)
    ballState.current.y = 80
    ballState.current.vx = (Math.random() - 0.5) * 8
    ballState.current.vy = 2

    const GRAVITY = 0.42
    const FRICTION = 0.994
    const RESTITUTION = 0.74
    const ROTATION_FRICTION = 0.985

    // Query UI elements that ball will collide with
    const getObstacles = () => {
      const obstacles = []
      // Floating Bottom Navbar
      const navHeader = document.querySelector('header')
      if (navHeader) {
        const rect = navHeader.getBoundingClientRect()
        if (rect.width > 0 && rect.height > 0) {
          obstacles.push({
            x: rect.left,
            y: rect.top,
            w: rect.width,
            h: rect.height,
            isPill: true,
          })
        }
      }

      // Main interactive buttons & headings
      const elements = document.querySelectorAll('h1, h2, a.glass-button, button.rounded-full')
      elements.forEach((el) => {
        const rect = el.getBoundingClientRect()
        // Only include visible elements within screen
        if (
          rect.top < window.innerHeight &&
          rect.bottom > 0 &&
          rect.width > 40 &&
          rect.height > 20 &&
          rect.width < window.innerWidth * 0.95
        ) {
          obstacles.push({
            x: rect.left,
            y: rect.top,
            w: rect.width,
            h: rect.height,
          })
        }
      })
      return obstacles
    }

    let lastTime = performance.now()

    const loop = (currentTime) => {
      const dt = Math.min((currentTime - lastTime) / 16.67, 2)
      lastTime = currentTime

      ctx.clearRect(0, 0, canvas.width, canvas.height)
      const b = ballState.current

      if (b.isDragging) {
        b.x = b.lastMouseX
        b.y = b.lastMouseY
        b.vx = b.mouseVelX
        b.vy = b.mouseVelY
      } else {
        // Apply Physics
        b.vy += GRAVITY * dt
        b.vx *= Math.pow(FRICTION, dt)
        b.vy *= Math.pow(FRICTION, dt)

        b.x += b.vx * dt
        b.y += b.vy * dt

        b.rotation += b.vRot * dt
        b.vRot *= Math.pow(ROTATION_FRICTION, dt)

        // 1. Boundary Collisions (Walls & Floor)
        // Left
        if (b.x - b.radius < 0) {
          b.x = b.radius
          b.vx = -b.vx * RESTITUTION
          b.vRot = b.vy * 0.03
          if (soundEnabled && Math.abs(b.vx) > 1.5) playThudSound(Math.abs(b.vx), ballType)
        }
        // Right
        if (b.x + b.radius > canvas.width) {
          b.x = canvas.width - b.radius
          b.vx = -b.vx * RESTITUTION
          b.vRot = -b.vy * 0.03
          if (soundEnabled && Math.abs(b.vx) > 1.5) playThudSound(Math.abs(b.vx), ballType)
        }
        // Top
        if (b.y - b.radius < 0) {
          b.y = b.radius
          b.vy = -b.vy * RESTITUTION
          if (soundEnabled && Math.abs(b.vy) > 1.5) playThudSound(Math.abs(b.vy), ballType)
        }
        // Floor
        if (b.y + b.radius > canvas.height) {
          b.y = canvas.height - b.radius
          b.vy = -b.vy * RESTITUTION
          b.vRot = b.vx * 0.035
          // Ground rolling friction
          b.vx *= 0.96
          if (soundEnabled && Math.abs(b.vy) > 1.5) playThudSound(Math.abs(b.vy), ballType)
        }

        // 2. Dynamic Collisions with live UI elements
        const obstacles = getObstacles()
        obstacles.forEach((rect) => {
          // Nearest point on rect to ball center
          const nearestX = Math.max(rect.x, Math.min(b.x, rect.x + rect.w))
          const nearestY = Math.max(rect.y, Math.min(b.y, rect.y + rect.h))

          const distX = b.x - nearestX
          const distY = b.y - nearestY
          const distSq = distX * distX + distY * distY

          if (distSq < b.radius * b.radius) {
            const dist = Math.sqrt(distSq) || 0.001
            const normalX = distX / dist
            const normalY = distY / dist

            // Separate
            const overlap = b.radius - dist
            b.x += normalX * overlap
            b.y += normalY * overlap

            // Velocity reflection
            const dot = b.vx * normalX + b.vy * normalY
            if (dot < 0) {
              b.vx = (b.vx - 2 * dot * normalX) * RESTITUTION
              b.vy = (b.vy - 2 * dot * normalY) * RESTITUTION

              // Tangent friction adds spin
              b.vRot += (normalX * b.vy - normalY * b.vx) * 0.015

              const impactSpeed = Math.sqrt(b.vx * b.vx + b.vy * b.vy)
              if (soundEnabled && impactSpeed > 1.5) {
                playThudSound(impactSpeed, ballType)
              }
            }
          }
        })
      }

      // Render the Ball
      renderBall(ctx, b, ballType)

      animFrameRef.current = requestAnimationFrame(loop)
    }

    animFrameRef.current = requestAnimationFrame(loop)

    return () => {
      window.removeEventListener('resize', resizeCanvas)
      if (animFrameRef.current) cancelAnimationFrame(animFrameRef.current)
    }
  }, [isActive, ballType, soundEnabled])

  // Mouse / Drag Handlers
  const handleMouseDown = (e) => {
    const canvas = canvasRef.current
    if (!canvas) return
    const rect = canvas.getBoundingClientRect()
    const mouseX = e.clientX - rect.left
    const mouseY = e.clientY - rect.top

    const b = ballState.current
    const distSq = (mouseX - b.x) * (mouseX - b.x) + (mouseY - b.y) * (mouseY - b.y)

    if (distSq <= (b.radius + 15) * (b.radius + 15)) {
      b.isDragging = true
      b.lastMouseX = mouseX
      b.lastMouseY = mouseY
      b.mouseVelX = 0
      b.mouseVelY = 0
    }
  }

  const handleMouseMove = (e) => {
    const b = ballState.current
    if (!b.isDragging) return
    const canvas = canvasRef.current
    if (!canvas) return
    const rect = canvas.getBoundingClientRect()
    const mouseX = e.clientX - rect.left
    const mouseY = e.clientY - rect.top

    b.mouseVelX = (mouseX - b.lastMouseX) * 0.65
    b.mouseVelY = (mouseY - b.lastMouseY) * 0.65
    b.lastMouseX = mouseX
    b.lastMouseY = mouseY
  }

  const handleMouseUp = () => {
    const b = ballState.current
    if (b.isDragging) {
      b.isDragging = false
      // Cap max release velocity for natural control
      const speed = Math.sqrt(b.vx * b.vx + b.vy * b.vy)
      if (speed > 35) {
        b.vx = (b.vx / speed) * 35
        b.vy = (b.vy / speed) * 35
      }
    }
  }

  // Touch handlers for mobile & tablet screens
  const handleTouchStart = (e) => {
    if (!e.touches || e.touches.length === 0) return
    const touch = e.touches[0]
    handleMouseDown({ clientX: touch.clientX, clientY: touch.clientY })
  }

  const handleTouchMove = (e) => {
    if (!e.touches || e.touches.length === 0) return
    const touch = e.touches[0]
    handleMouseMove({ clientX: touch.clientX, clientY: touch.clientY })
  }

  const handleTouchEnd = () => {
    handleMouseUp()
  }

  // Draw Specific Ball Styles
  const renderBall = (ctx, b, type) => {
    ctx.save()
    ctx.translate(b.x, b.y)
    ctx.rotate(b.rotation)

    // Ball Soft Shadow on ground when low
    ctx.save()
    ctx.shadowColor = 'rgba(0,0,0,0.6)'
    ctx.shadowBlur = 18
    ctx.shadowOffsetY = 8

    ctx.beginPath()
    ctx.arc(0, 0, b.radius, 0, Math.PI * 2)

    if (type === 'football') {
      // Classic Monochrome Football
      const grad = ctx.createRadialGradient(
        -b.radius * 0.35,
        -b.radius * 0.35,
        b.radius * 0.1,
        0,
        0,
        b.radius
      )
      grad.addColorStop(0, '#FFFFFF')
      grad.addColorStop(0.7, '#D4D4D8')
      grad.addColorStop(1, '#71717A')
      ctx.fillStyle = grad
      ctx.fill()
      ctx.restore()

      // Pentagon in center
      ctx.beginPath()
      const pR = b.radius * 0.38
      for (let i = 0; i < 5; i++) {
        const a = (i * 2 * Math.PI) / 5 - Math.PI / 2
        const px = Math.cos(a) * pR
        const py = Math.sin(a) * pR
        if (i === 0) ctx.moveTo(px, py)
        else ctx.lineTo(px, py)
      }
      ctx.closePath()
      ctx.fillStyle = '#18181B'
      ctx.fill()

      // Radial Seams to outer edge
      ctx.strokeStyle = '#27272A'
      ctx.lineWidth = 1.8
      for (let i = 0; i < 5; i++) {
        const a = (i * 2 * Math.PI) / 5 - Math.PI / 2
        ctx.beginPath()
        ctx.moveTo(Math.cos(a) * pR, Math.sin(a) * pR)
        ctx.lineTo(Math.cos(a) * b.radius, Math.sin(a) * b.radius)
        ctx.stroke()
      }

      // Outer rim
      ctx.beginPath()
      ctx.arc(0, 0, b.radius, 0, Math.PI * 2)
      ctx.strokeStyle = '#27272A'
      ctx.lineWidth = 1.2
      ctx.stroke()
    } else if (type === 'cricket') {
      // Crimson Red Leather Cricket Ball
      const grad = ctx.createRadialGradient(
        -b.radius * 0.35,
        -b.radius * 0.35,
        b.radius * 0.05,
        0,
        0,
        b.radius
      )
      grad.addColorStop(0, '#E11D48')
      grad.addColorStop(0.6, '#9F1239')
      grad.addColorStop(1, '#4C0519')
      ctx.fillStyle = grad
      ctx.fill()
      ctx.restore()

      // White Seam Curve across center
      ctx.beginPath()
      ctx.ellipse(0, 0, b.radius * 0.95, b.radius * 0.22, 0, 0, Math.PI * 2)
      ctx.strokeStyle = '#FFFFFF'
      ctx.lineWidth = 2.2
      ctx.setLineDash([3, 2.5])
      ctx.stroke()
      ctx.setLineDash([])

      // Subtle gold maker stamp
      ctx.fillStyle = '#FDE047'
      ctx.font = '8px monospace'
      ctx.textAlign = 'center'
      ctx.textBaseline = 'middle'
      ctx.fillText('KOK', 0, -b.radius * 0.45)
    } else {
      // Liquid Chrome / Molten Mercury Sphere
      const grad = ctx.createRadialGradient(
        -b.radius * 0.4,
        -b.radius * 0.4,
        b.radius * 0.05,
        0,
        0,
        b.radius
      )
      grad.addColorStop(0, '#FFFFFF')
      grad.addColorStop(0.35, '#E2E8F0')
      grad.addColorStop(0.7, '#64748B')
      grad.addColorStop(1, '#0F172A')
      ctx.fillStyle = grad
      ctx.fill()
      ctx.restore()

      // High specular gloss highlight
      ctx.beginPath()
      ctx.ellipse(
        -b.radius * 0.38,
        -b.radius * 0.38,
        b.radius * 0.3,
        b.radius * 0.15,
        Math.PI / 4,
        0,
        Math.PI * 2
      )
      ctx.fillStyle = 'rgba(255, 255, 255, 0.75)'
      ctx.fill()
    }

    ctx.restore()
  }

  return (
    <>
      <AnimatePresence>
        {isActive && (
          <div className="fixed inset-0 z-50 pointer-events-none select-none">
            {/* Interactive Physics Canvas */}
            <canvas
              ref={canvasRef}
              onMouseDown={handleMouseDown}
              onMouseMove={handleMouseMove}
              onMouseUp={handleMouseUp}
              onTouchStart={handleTouchStart}
              onTouchMove={handleTouchMove}
              onTouchEnd={handleTouchEnd}
              className="absolute inset-0 w-full h-full pointer-events-auto cursor-grab active:cursor-grabbing touch-none"
            />

            {/* Sleek Floating Control HUD Pill */}
            <motion.div
              initial={{ y: -30, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: -30, opacity: 0 }}
              transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
              className="fixed top-4 sm:top-5 inset-x-2 sm:inset-x-0 mx-auto w-fit max-w-[calc(100vw-1rem)] z-50 pointer-events-auto flex items-center gap-1.5 xs:gap-2.5 px-2.5 xs:px-4 py-1.5 sm:py-2 rounded-full border shadow-2xl backdrop-blur-2xl text-xs font-mono tracking-wider transition-colors bg-black/85 border-white/20 text-neutral-200 overflow-x-auto no-scrollbar"
            >
              <span className="flex items-center gap-1 xs:gap-1.5 text-emerald-400 font-semibold text-[11px] xs:text-xs shrink-0">
                <Sparkles className="w-3 xs:w-3.5 h-3 xs:h-3.5" />
                <span className="hidden xs:inline">PHYSICS ACTIVE</span>
                <span className="xs:hidden">PHYSICS</span>
              </span>

              <span className="opacity-30">•</span>

              <span className="text-[11px] text-neutral-400 hidden md:inline">
                Drag & Toss the ball!
              </span>

              <span className="opacity-30 hidden md:inline">•</span>

              {/* Ball Selector Options */}
              <div className="flex items-center gap-0.5 xs:gap-1 bg-white/10 p-0.5 rounded-full border border-white/10 shrink-0">
                <button
                  type="button"
                  onClick={() => setBallType('football')}
                  className={`px-2 xs:px-2.5 py-0.5 xs:py-1 rounded-full text-[10px] xs:text-[11px] transition-all cursor-pointer ${
                    ballType === 'football'
                      ? 'bg-white text-black font-semibold'
                      : 'text-neutral-300 hover:text-white'
                  }`}
                >
                  ⚽ <span className="hidden sm:inline">Football</span>
                </button>

                <button
                  type="button"
                  onClick={() => setBallType('cricket')}
                  className={`px-2 xs:px-2.5 py-0.5 xs:py-1 rounded-full text-[10px] xs:text-[11px] transition-all cursor-pointer ${
                    ballType === 'cricket'
                      ? 'bg-white text-black font-semibold'
                      : 'text-neutral-300 hover:text-white'
                  }`}
                >
                  🏏 <span className="hidden sm:inline">Cricket</span>
                </button>

                <button
                  type="button"
                  onClick={() => setBallType('chrome')}
                  className={`px-2 xs:px-2.5 py-0.5 xs:py-1 rounded-full text-[10px] xs:text-[11px] transition-all cursor-pointer ${
                    ballType === 'chrome'
                      ? 'bg-white text-black font-semibold'
                      : 'text-neutral-300 hover:text-white'
                  }`}
                >
                  ⚪ <span className="hidden sm:inline">Chrome</span>
                </button>
              </div>

              {/* Sound Toggle Button */}
              <button
                type="button"
                onClick={() => setSoundEnabled((prev) => !prev)}
                className="p-1 xs:p-1.5 rounded-full border border-white/10 hover:border-white/30 text-neutral-300 hover:text-white transition-all cursor-pointer shrink-0 ml-0.5"
                title={soundEnabled ? 'Mute audio' : 'Enable audio'}
              >
                {soundEnabled ? (
                  <Volume2 className="w-3 xs:w-3.5 h-3 xs:h-3.5 text-emerald-400" />
                ) : (
                  <VolumeX className="w-3 xs:w-3.5 h-3 xs:h-3.5 opacity-50" />
                )}
              </button>

              {/* Close Button */}
              <button
                type="button"
                onClick={() => setIsActive(false)}
                className="p-1 xs:p-1.5 rounded-full border border-white/15 bg-white/10 hover:bg-white hover:text-black text-neutral-300 transition-all cursor-pointer shrink-0 ml-1"
                title="Close physics mode (ESC)"
              >
                <X className="w-3 xs:w-3.5 h-3 xs:h-3.5" />
              </button>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  )
}
