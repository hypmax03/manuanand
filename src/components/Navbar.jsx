import React, { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence, useScroll, useReducedMotion } from 'framer-motion'

export default function Navbar({ isDark = true, currentPath = '/', onNavigate, onOpenContact }) {
  const navLinks =
    currentPath === '/'
      ? [
          { name: 'About', href: '#about' },
          { name: 'Projects', href: '#projects' },
          { name: 'PlayGround', href: '/playground' },
          { name: 'Contact', href: '#contact' },
        ]
      : [
          { name: 'Home', href: '/' },
          { name: 'About', href: '/#about' },
          { name: 'Projects', href: '/#projects' },
          { name: 'PlayGround', href: '/playground',disabled },
          { name: 'Contact', href: '#contact' },
        ]
  const { scrollY } = useScroll()
  const shouldReduceMotion = useReducedMotion()
  const [isScrolled, setIsScrolled] = useState(false)
  const [isHovered, setIsHovered] = useState(false)
  const [hoveredNav, setHoveredNav] = useState(null)
  const hoverTimeoutRef = useRef(null)

  useEffect(() => {
    const unsubscribe = scrollY.on('change', (latest) => {
      setIsScrolled(latest > 60)
    })
    return () => unsubscribe()
  }, [scrollY])

  const handleMouseEnter = () => {
    if (hoverTimeoutRef.current) clearTimeout(hoverTimeoutRef.current)
    setIsHovered(true)
  }

  const handleMouseLeave = () => {
    hoverTimeoutRef.current = setTimeout(() => {
      setIsHovered(false)
    }, 200)
    setHoveredNav(null)
  }

  // Morph into compact status pill when scrolled down, unless hovered
  const isCollapsed = isScrolled && !isHovered

  // High-fidelity spring configuration for organic, buttery-smooth pill morphing
  const springConfig = shouldReduceMotion
    ? { duration: 0.2 }
    : {
        type: 'spring',
        stiffness: 340,
        damping: 28,
        mass: 0.7,
      }

  return (
    <motion.header
      initial={{ y: 24, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
      className="fixed bottom-4 sm:bottom-7 inset-x-0 z-50 flex justify-center pointer-events-none px-2 sm:px-4"
      style={{
        paddingBottom: 'env(safe-area-inset-bottom, 0px)',
      }}
    >
      <motion.div
        layout
        whileHover={shouldReduceMotion ? {} : { y: -3, scale: 1.015 }}
        whileTap={shouldReduceMotion ? {} : { scale: 0.985 }}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        transition={{
          layout: springConfig,
          y: { type: 'spring', stiffness: 400, damping: 25 },
          scale: { type: 'spring', stiffness: 400, damping: 25 },
        }}
        className={`pointer-events-auto origin-bottom rounded-full px-2 xs:px-3 sm:px-5 py-1.5 sm:py-2.5 flex items-center justify-center border transition-colors duration-300 backdrop-blur-2xl max-w-[calc(100vw-1rem)] sm:max-w-none overflow-hidden ${
          isDark
            ? 'bg-neutral-900/85 border-neutral-800/90 text-neutral-200 hover:border-neutral-700 hover:bg-neutral-900/95'
            : 'bg-white/85 border-slate-200/90 text-slate-800 hover:border-slate-300 hover:bg-white/95 shadow-[0_20px_50px_-10px_rgba(15,23,42,0.1),0_4px_16px_rgba(15,23,42,0.04)]'
        }`}
        style={{
          boxShadow: isDark
            ? '0 14px 40px -5px rgba(0,0,0,0.75), 0 0 25px rgba(255,255,255,0.04), inset 0 0 0 1px rgba(255,255,255,0.08)'
            : undefined,
        }}
      >
        {/* Silky Smooth Morphing between Full Nav Links and "Available for work" */}
        <AnimatePresence mode="popLayout" initial={false}>
          {!isCollapsed ? (
            /* STATE 1: Full Navigation Links with Sliding Pill Highlight on Hover */
            <motion.nav
              key="expanded-links"
              initial={{ opacity: 0, y: 6, filter: 'blur(4px)' }}
              animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
              exit={{ opacity: 0, y: -6, filter: 'blur(4px)' }}
              transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
              onMouseLeave={() => setHoveredNav(null)}
              className="relative flex items-center gap-0.5 xs:gap-1 sm:gap-1.5 whitespace-nowrap overflow-x-auto no-scrollbar"
            >
              {navLinks.map((link) => {
                const isLinkActive =
                  (link.href === '/' && currentPath === '/') ||
                  (link.href === '/about' && currentPath === '/about') ||
                  (link.href === '/playground' && currentPath === '/playground')

                return (
                  <a
                    key={link.name}
                    href={link.href}
                    onMouseEnter={() => setHoveredNav(link.name)}
                    onClick={(e) => {
                      e.preventDefault()
                      if (link.name === 'Contact' && onOpenContact) {
                        onOpenContact()
                        return
                      }
                      if (onNavigate) {
                        onNavigate(link.href)
                      }
                    }}
                    className={`relative px-2.5 xs:px-3 sm:px-4 py-1 sm:py-1.5 rounded-full text-[11px] xs:text-xs sm:text-sm font-semibold tracking-normal xs:tracking-wider uppercase transition-colors duration-200 outline-none select-none z-10 ${
                      isDark
                        ? hoveredNav === link.name
                          ? 'text-white'
                          : 'text-neutral-300 hover:text-white'
                        : hoveredNav === link.name
                          ? 'text-slate-950'
                          : 'text-slate-700 hover:text-slate-950'
                    }`}
                  >
                    {/* Floating Sliding Pill Background on Hover */}
                    {hoveredNav === link.name && (
                      <motion.span
                        layoutId="nav-pill-hover"
                        transition={{
                          type: 'spring',
                          stiffness: 420,
                          damping: 30,
                        }}
                        className={`absolute inset-0 rounded-full -z-10 border ${
                          isDark
                            ? 'bg-white/[0.12] border-white/20 shadow-[0_0_15px_rgba(255,255,255,0.12)]'
                            : 'bg-slate-100 border-slate-200/90 shadow-xs'
                        }`}
                      />
                    )}

                    <span className="relative z-10 flex items-center gap-1 xs:gap-1.5">
                      {link.name}
                      {link.name === 'PlayGround' && (
                        <span className="inline-flex items-center gap-0.5 xs:gap-1 px-1 xs:px-1.5 py-0.5 rounded-full text-[8px] xs:text-[9px] font-mono tracking-wider uppercase border border-amber-400/40 bg-amber-400/10 text-amber-500 dark:text-amber-300">
                          <span className="w-1 h-1 rounded-full bg-amber-400 animate-pulse" />
                          WIP
                        </span>
                      )}
                      {isLinkActive && (
                        <span
                          className={`w-1 h-1 rounded-full ${
                            isDark
                              ? 'bg-white shadow-[0_0_6px_rgba(255,255,255,0.9)]'
                              : 'bg-slate-900'
                          }`}
                        />
                      )}
                    </span>
                  </a>
                )
              })}
            </motion.nav>
          ) : (
            /* STATE 2: Collapsed "Available for work" status pill with glowing dot */
            <motion.div
              key="collapsed-status"
              initial={{ opacity: 0, y: 6, filter: 'blur(4px)' }}
              animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
              exit={{ opacity: 0, y: -6, filter: 'blur(4px)' }}
              transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
              whileHover={{ scale: 1.02 }}
              className="flex items-center gap-3 sm:gap-3.5 cursor-pointer select-none px-1 whitespace-nowrap"
              onClick={() => setIsHovered(true)}
            >
              <span
                className={`text-xs sm:text-sm font-medium tracking-normal whitespace-nowrap transition-colors duration-200 ${
                  isDark ? 'text-[#F4F4F6]' : 'text-slate-900'
                }`}
              >
                Available for work
              </span>

              {/* Status Indicator */}
              <div className="flex items-center justify-center">
                <span className={`relative flex h-4 w-4 sm:h-5 sm:w-5 items-center justify-center rounded-full border ${
                  isDark ? 'border-white/80 bg-white/10' : 'border-slate-300 bg-slate-100'
                }`}>
                  <span className={`w-2 h-2 sm:w-2.5 sm:h-2.5 rounded-full ${
                    isDark ? 'bg-white shadow-[0_0_8px_rgba(255,255,255,0.95)]' : 'bg-slate-900 shadow-[0_0_6px_rgba(15,23,42,0.25)]'
                  } animate-pulse`} />
                </span>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </motion.header>
  )
}
