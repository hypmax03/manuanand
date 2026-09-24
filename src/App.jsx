import React, { useState, useEffect, useRef } from 'react'
import Navbar from './components/Navbar'
import Hero from './sections/Hero'
import AboutMe from './sections/AboutMe'
import WhatIDo from './sections/WhatIDo'
import Projects from './sections/Projects'
import PlayGround from './sections/PlayGround'
import Footer from './sections/Footer'
import EyeBlinkTransition from './components/EyeBlinkTransition'
import PixelGamingBackground from './components/PixelGamingBackground'
import ContactDrawer from './components/ContactDrawer'
import PhysicsBallEasterEgg from './components/PhysicsBallEasterEgg'

export default function App() {
  const [isDark, setIsDark] = useState(true)
  const [isContactOpen, setIsContactOpen] = useState(false)
  const [blinkPhase, setBlinkPhase] = useState('idle') // 'idle' | 'closing' | 'closed' | 'opening'
  const isBlinkingRef = useRef(false)

  // Route state: '/' (Main page), or '/playground' (Dedicated Playground page)
  const [currentPath, setCurrentPath] = useState(() => {
    if (typeof window !== 'undefined') {
      const p = window.location.pathname
      const h = window.location.hash
      if (p === '/playground' || h === '#/playground' || h === '#playground') {
        return '/playground'
      }
    }
    return '/'
  })

  useEffect(() => {
    if (isDark) {
      document.documentElement.classList.add('dark')
      document.documentElement.classList.remove('light')
    } else {
      document.documentElement.classList.remove('dark')
      document.documentElement.classList.add('light')
    }
  }, [isDark])

  // Support browser back/forward buttons & URL hash changes
  useEffect(() => {
    const handlePopState = () => {
      const p = window.location.pathname
      const h = window.location.hash
      if (p === '/about' || h === '#/about' || h === '#about') {
        setCurrentPath('/')
        setTimeout(() => {
          const el = document.getElementById('about')
          if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' })
        }, 100)
      } else if (p === '/playground' || h === '#/playground' || h === '#playground') {
        setCurrentPath('/playground')
      } else {
        setCurrentPath('/')
        if (h && h !== '#/' && h !== '#playground') {
          if (h === '#contact') {
            setIsContactOpen(true)
            return
          }
          const targetId = h.replace('#', '')
          setTimeout(() => {
            const el = document.getElementById(targetId)
            if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' })
          }, 100)
        }
      }
    }

    window.addEventListener('popstate', handlePopState)
    window.addEventListener('hashchange', handlePopState)
    return () => {
      window.removeEventListener('popstate', handlePopState)
      window.removeEventListener('hashchange', handlePopState)
    }
  }, [])

  // Cinematic eye-blink navigation & route redirect transition
  const handleNavigate = (dest) => {
    if (isBlinkingRef.current) return
    isBlinkingRef.current = true

    // Case Contact: open the slide-over drawer immediately from the right
    if (dest === '#contact' || dest === 'contact') {
      setIsContactOpen(true)
      return
    }

    // Phase 1: Eyelids sweep shut
    setBlinkPhase('closing')

    // Phase 2: At 200ms, eyelids are completely closed
    setTimeout(() => {
      setBlinkPhase('closed')

      // Case A: About Me section anchor (on main landing page)
      if (dest === '/about' || dest === '#about' || dest === '/#about') {
        if (currentPath !== '/') {
          setCurrentPath('/')
          window.history.pushState(null, '', '/#about')
          setTimeout(() => {
            const el = document.getElementById('about')
            if (el) el.scrollIntoView({ behavior: 'instant', block: 'start' })
          }, 35)
        } else {
          const el = document.getElementById('about')
          if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' })
          window.history.pushState(null, '', '#about')
        }
      }
      // Case B: Redirect to dedicated Playground page
      else if (dest === '/playground' || dest === '#playground') {
        setCurrentPath('/playground')
        window.history.pushState(null, '', '/playground')
        window.scrollTo({ top: 0, behavior: 'instant' })
      }
      // Case C: Redirect to Main Home page
      else if (dest === '/' || dest === '#home') {
        setCurrentPath('/')
        window.history.pushState(null, '', '/')
        window.scrollTo({ top: 0, behavior: 'instant' })
      }
      // Case D: In-page anchor link (e.g. #projects)
      else if (dest.startsWith('#')) {
        const targetId = dest.replace('#', '')
        if (currentPath !== '/') {
          setCurrentPath('/')
          window.history.pushState(null, '', dest)
          // Allow home DOM elements to mount before scrolling
          setTimeout(() => {
            const el = document.getElementById(targetId) || (targetId === 'projects' ? document.getElementById('what-i-do') : null)
            if (el) el.scrollIntoView({ behavior: 'instant', block: 'start' })
          }, 25)
        } else {
          const el = document.getElementById(targetId) || (targetId === 'projects' ? document.getElementById('what-i-do') : null)
          if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' })
          window.history.pushState(null, '', dest)
        }
      }

      // Phase 3: Hold shut for 40ms, then trigger eyelid opening
      setTimeout(() => {
        setBlinkPhase('opening')

        // Phase 4: Settle back to idle once eyelids are fully open
        setTimeout(() => {
          setBlinkPhase('idle')
          isBlinkingRef.current = false
        }, 250)
      }, 40)
    }, 200)
  }

  return (
    <main
      className={`min-h-screen transition-colors duration-500 relative ${
        isDark
          ? 'bg-black text-[#F4F4F6]'
          : 'bg-[#F8FAFC] text-slate-900'
      }`}
    >
      {/* Subtle Ambient Background Lighting & Grid */}
      <PixelGamingBackground isDark={isDark} currentPath={currentPath} />

      {/* Cinematic Eye Blink Page Transition Overlay */}
      <EyeBlinkTransition phase={blinkPhase} />

      {/* Slide-over Contact Drawer from the right side */}
      <ContactDrawer
        isOpen={isContactOpen}
        onClose={() => setIsContactOpen(false)}
        isDark={isDark}
      />

      {/* Interactive Physics Ball Easter Egg (Trigger: type 'ball') */}
      <PhysicsBallEasterEgg isDark={isDark} />

      {/* Floating Bottom Navigation Dock (Visible on all pages) */}
      <Navbar
        isDark={isDark}
        currentPath={currentPath}
        onNavigate={handleNavigate}
        onOpenContact={() => setIsContactOpen(true)}
      />

      {/* Conditional Rendering: Main Page (with AboutMe above Footer) vs Dedicated Playground Page */}
      {currentPath === '/playground' ? (
        <PlayGround isDark={isDark} onNavigate={handleNavigate} onOpenContact={() => setIsContactOpen(true)} />
      ) : (
        <>
          <Hero isDark={isDark} />
          <WhatIDo isDark={isDark} />
          <Projects isDark={isDark} />
          <AboutMe isDark={isDark} />
          <Footer isDark={isDark} onOpenContact={() => setIsContactOpen(true)} />
        </>
      )}
    </main>
  )
}