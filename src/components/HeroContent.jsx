import React from 'react'
import { motion } from 'framer-motion'
import { MapPin, Sparkles } from 'lucide-react'

export default function HeroContent({ isDark }) {
  return (
    <div className="flex flex-col items-start text-left max-w-2xl">
      {/* Eyebrow badge */}
      <motion.div
        initial={{ opacity: 0, y: 14 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
        className="flex flex-wrap items-center gap-2 mb-6"
      >
        {/* Main Eyebrow */}
        <div className={`inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border text-xs font-mono font-medium tracking-wider transition-colors ${
          isDark 
            ? 'bg-neutral-900/80 text-neutral-300 border-neutral-800 shadow-[0_2px_10px_rgba(0,0,0,0.2)]'
            : 'bg-white/80 text-neutral-700 border-neutral-200 shadow-[0_2px_10px_rgba(0,0,0,0.03)]'
        }`}>
          <span className="inline-block w-1.5 h-1.5 rounded-full bg-white" />
          <span>MERN STACK DEVELOPER</span>
        </div>

        {/* Location / Status tag */}
        <div className={`hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full border text-xs font-medium transition-colors ${
          isDark
            ? 'bg-neutral-900/40 text-neutral-400 border-neutral-800/60'
            : 'bg-neutral-100/70 text-neutral-600 border-neutral-200/60'
        }`}>
          <MapPin className="w-3 h-3 text-neutral-400" />
          <span>Kerala, India</span>
        </div>
      </motion.div>

      {/* Main Heading */}
      <motion.h1
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
        className={`text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight leading-[1.12] sm:leading-[1.1] mb-6 ${
          isDark ? 'text-neutral-50' : 'text-neutral-950'
        }`}
      >
        Building digital experiences{' '}
        <span className="block mt-1 sm:mt-2">
          that feel{' '}
          <span className="relative inline-block text-white">
            simple.
            {/* Very subtle refined underline accent */}
            <span className="absolute -bottom-1 left-0 right-0 h-[2px] bg-white/30 rounded-full" />
          </span>
        </span>
      </motion.h1>

      {/* Supporting Paragraph */}
      <motion.p
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
        className={`text-base sm:text-lg leading-relaxed max-w-xl mb-8 font-normal ${
          isDark ? 'text-neutral-400' : 'text-neutral-600'
        }`}
      >
        I build modern, scalable web applications with React, Next.js, Node.js and MongoDB. Focused on clean architecture, fluid interfaces, and thoughtful user experiences.
      </motion.p>
    </div>
  )
}
