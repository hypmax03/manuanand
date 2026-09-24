import React from 'react'
import { motion } from 'framer-motion'

export default function BackgroundElements({ isDark }) {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none -z-10 select-none">
      {/* 1. Subtle Dot Grid Background */}
      <div className="absolute inset-0 bg-dot-grid opacity-60" />

      {/* 2. Soft Ambient Radial Gradient behind the Hero */}
      <div
        className={`absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[650px] h-[500px] rounded-full blur-[140px] pointer-events-none transition-opacity duration-700 ${
          isDark
            ? 'bg-gradient-to-tr from-teal-950/20 via-neutral-900/40 to-teal-900/15 opacity-70'
            : 'bg-gradient-to-tr from-teal-100/40 via-neutral-100/50 to-teal-50/30 opacity-60'
        }`}
      />

      {/* 3. Extremely Slow Ambient Floating Orbs (Non-distracting) */}
      <motion.div
        animate={{
          x: [0, 20, -15, 0],
          y: [0, -25, 10, 0],
        }}
        transition={{
          duration: 20,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
        className={`absolute top-1/3 right-1/4 w-80 h-80 rounded-full blur-[120px] pointer-events-none transition-colors duration-500 ${
          isDark ? 'bg-teal-500/5' : 'bg-teal-400/10'
        }`}
      />

      <motion.div
        animate={{
          x: [0, -25, 15, 0],
          y: [0, 20, -15, 0],
        }}
        transition={{
          duration: 24,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
        className={`absolute -bottom-10 left-1/4 w-96 h-96 rounded-full blur-[140px] pointer-events-none transition-colors duration-500 ${
          isDark ? 'bg-neutral-800/20' : 'bg-neutral-200/40'
        }`}
      />

      {/* 4. Subtle Neo-Brutalist Grid Guidelines (Ultra faint border accents) */}
      <div className="absolute inset-x-0 top-24 h-px bg-neutral-800/15 dark:bg-neutral-800/40" />
      <div className="max-w-6xl mx-auto h-full border-x border-neutral-800/10 dark:border-neutral-800/30 hidden lg:block" />

      {/* 5. Micro Grain Texture Overlay */}
      <div className="absolute inset-0 bg-grain pointer-events-none" />
    </div>
  )
}
