import React from 'react'
import { motion, AnimatePresence } from 'framer-motion'

/**
 * EyeBlinkTransition component provides a cinematic human eye blink
 * transition across the viewport during in-page navigation.
 * 
 * Phase lifecycle: 'idle' -> 'closing' -> 'closed' -> 'opening' -> 'idle'
 */
export default function EyeBlinkTransition({ phase }) {
  const isVisible = phase !== 'idle'

  return (
    <AnimatePresence>
      {isVisible && (
        <div
          aria-hidden="true"
          className="fixed inset-0 z-[99999] pointer-events-none overflow-hidden select-none"
        >
          {/* 1. Vignette overlay that simulates human pupil constriction & peripheral focus */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{
              opacity: phase === 'closing' || phase === 'closed' ? 0.95 : 0,
            }}
            transition={{
              duration: phase === 'closing' ? 0.18 : 0.22,
              ease: 'easeInOut',
            }}
            className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_25%,rgba(0,0,0,0.95)_80%)] backdrop-blur-[1px]"
          />

          {/* 2. Upper Eyelid with Organic Convex Downward Curve */}
          <motion.div
            initial={{ y: '-100%' }}
            animate={{
              y: phase === 'closing' || phase === 'closed' ? '0%' : '-100%',
            }}
            transition={
              phase === 'closing'
                ? { duration: 0.19, ease: [0.38, 0.05, 0.2, 1] }
                : { duration: 0.24, ease: [0.16, 1, 0.3, 1] }
            }
            className="absolute top-0 inset-x-0 h-[62vh] origin-top"
          >
            <svg
              viewBox="0 0 1000 620"
              preserveAspectRatio="none"
              className="w-full h-full drop-shadow-[0_12px_32px_rgba(0,0,0,0.98)]"
            >
              <defs>
                <linearGradient id="upperLidGrad" x1="0%" y1="0%" x2="0%" y2="100%">
                  <stop offset="0%" stopColor="#000000" />
                  <stop offset="80%" stopColor="#050505" />
                  <stop offset="100%" stopColor="#0f0f12" />
                </linearGradient>
              </defs>
              {/* Eyelid Main Body */}
              <path
                d="M 0,0 L 1000,0 L 1000,430 Q 500,620 0,430 Z"
                fill="url(#upperLidGrad)"
              />
              {/* Subtle Highlight along the Eyelid Rim */}
              <path
                d="M 0,430 Q 500,620 1000,430"
                fill="none"
                stroke="rgba(255,255,255,0.18)"
                strokeWidth="2.5"
              />
            </svg>
          </motion.div>

          {/* 3. Lower Eyelid with Organic Concave Upward Curve */}
          <motion.div
            initial={{ y: '100%' }}
            animate={{
              y: phase === 'closing' || phase === 'closed' ? '0%' : '100%',
            }}
            transition={
              phase === 'closing'
                ? { duration: 0.19, ease: [0.38, 0.05, 0.2, 1] }
                : { duration: 0.24, ease: [0.16, 1, 0.3, 1] }
            }
            className="absolute bottom-0 inset-x-0 h-[62vh] origin-bottom"
          >
            <svg
              viewBox="0 0 1000 620"
              preserveAspectRatio="none"
              className="w-full h-full drop-shadow-[0_-12px_32px_rgba(0,0,0,0.98)]"
            >
              <defs>
                <linearGradient id="lowerLidGrad" x1="0%" y1="0%" x2="0%" y2="100%">
                  <stop offset="0%" stopColor="#0f0f12" />
                  <stop offset="20%" stopColor="#050505" />
                  <stop offset="100%" stopColor="#000000" />
                </linearGradient>
              </defs>
              {/* Lower Eyelid Main Body */}
              <path
                d="M 0,620 L 1000,620 L 1000,190 Q 500,0 0,190 Z"
                fill="url(#lowerLidGrad)"
              />
              {/* Subtle Highlight along the Lower Rim */}
              <path
                d="M 0,190 Q 500,0 1000,190"
                fill="none"
                stroke="rgba(255,255,255,0.14)"
                strokeWidth="2"
              />
            </svg>
          </motion.div>

          {/* 4. Total Darkness Seal at Full Closure Point */}
          {phase === 'closed' && (
            <div className="absolute inset-0 bg-black -z-0" />
          )}
        </div>
      )}
    </AnimatePresence>
  )
}
