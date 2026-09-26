import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence, useScroll, useTransform, useReducedMotion } from 'framer-motion'
import Heroimg from '../assets/Heroimg.png'
import { ArrowRight, MessageSquare, Mail } from 'lucide-react'

const GithubIcon = ({ className = 'w-3.5 h-3.5' }) => (
  <svg className={className} fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
    <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" />
  </svg>
)

const LinkedinIcon = ({ className = 'w-3.5 h-3.5' }) => (
  <svg className={className} fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
    <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.88 8.56a1.68 1.68 0 0 0 1.68-1.68c0-.93-.75-1.69-1.68-1.69a1.69 1.69 0 0 0-1.69 1.69c0 .93.76 1.68 1.69 1.68m1.39 9.94v-8.37H5.5v8.37h2.77z" />
  </svg>
)

const InstagramIcon = ({ className = 'w-3.5 h-3.5' }) => (
  <svg className={className} fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
  </svg>
)

export default function Hero({ isDark }) {
  const [nameRevealed, setNameRevealed] = useState(false)
  const shouldReduceMotion = useReducedMotion()
  const { scrollY } = useScroll()

  const rotatingWords = ['builds', 'solves', 'deploys', 'codes']
  const [currentWordIndex, setCurrentWordIndex] = useState(0)
  const [isWordPaused, setIsWordPaused] = useState(false)

  // Automatically cycle through words one by one with smooth vertical scroll animation
  useEffect(() => {
    if (isWordPaused) return
    const interval = setInterval(() => {
      setCurrentWordIndex((prev) => (prev + 1) % rotatingWords.length)
    }, 2200)
    return () => clearInterval(interval)
  }, [isWordPaused, rotatingWords.length])

  // Ensure overflow-visible is unlocked after entrance animation completes
  useEffect(() => {
    const timer = setTimeout(() => setNameRevealed(true), 1400)
    return () => clearTimeout(timer)
  }, [])

  // Subtle scroll parallax for oversized typography and cutout photo
  const nameParallaxY = useTransform(scrollY, [0, 600], [0, shouldReduceMotion ? 0 : 70])
  const nameOpacity = useTransform(scrollY, [0, 450], [1, 0.4])
  const imageParallaxY = useTransform(scrollY, [0, 600], [0, shouldReduceMotion ? 0 : 35])

  const firstWord = ['M', 'A', 'N', 'U']
  const secondWord = ['A', 'N', 'A', 'N', 'D']

  const features = [
    'Full-Stack Architecture',
    'Pixel-Perfect Interfaces',
    'React, Next.js & Node.js',
    'High-Performance Systems',
  ]

  return (
    <section
      className={`relative min-h-[100dvh] w-full flex flex-col justify-between selection:bg-white/20 selection:text-white z-10 transition-colors duration-500 ${
        isDark ? 'bg-black text-[#F4F4F6]' : 'bg-[#F8FAFC] text-slate-900'
      }`}
    >
      {/* 1. Studio Lighting (Dark mode ambient lighting; light mode keeps a pure, crisp backdrop) */}
      <div className="absolute inset-0 pointer-events-none -z-10 select-none overflow-hidden">
        {isDark && (
          <>
            <div className="absolute top-0 inset-x-0 h-[480px] bg-[radial-gradient(ellipse_at_50%_0%,_rgba(255,255,255,0.06)_0%,_transparent_65%)]" />
            <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] sm:w-[1100px] h-[550px] rounded-full blur-[90px] bg-[radial-gradient(circle_at_center,_rgba(255,255,255,0.08)_0%,_rgba(255,255,255,0.02)_35%,_transparent_70%)]" />
          </>
        )}
        {/* Micro-Grain Texture */}
        <div className="absolute inset-0 bg-grain opacity-[0.02]" />
      </div>

      {/* 3. Top Eyebrow Bar (Spacious, Minimal & High-End) */}
      <div className="relative z-30 max-w-7xl mx-auto w-full px-4 sm:px-8 lg:px-10 pt-5 sm:pt-7 md:pt-10 flex items-center justify-between text-xs tracking-widest uppercase">
        {/* Left: Floating Status Badge with Inversion Hover */}
        <motion.div
          animate={shouldReduceMotion ? {} : { y: [0, -4, 0] }}
          transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
          className={`inline-flex items-center gap-2 sm:gap-2.5 px-3 sm:px-3.5 py-1.5 rounded-full border backdrop-blur-xl text-[11px] sm:text-xs cursor-default transition-all duration-300 group ${
            isDark
              ? 'border-white/15 bg-white/[0.03] text-[#F4F4F6] hover:bg-white hover:text-black hover:border-white hover:shadow-[0_0_20px_rgba(255,255,255,0.5)]'
              : 'border-slate-200/90 bg-white/85 shadow-[0_4px_16px_-2px_rgba(15,23,42,0.06),inset_0_1px_1px_rgba(255,255,255,1)] text-slate-800 hover:bg-white hover:border-slate-300 hover:shadow-[0_8px_24px_rgba(15,23,42,0.1)]'
          }`}
        >
          <span className="relative flex h-2 w-2">
            <span
              className={`animate-ping absolute inline-flex h-full w-full rounded-full opacity-75 ${
                isDark ? 'bg-white' : 'bg-slate-900'
              }`}
            />
            <span
              className={`relative inline-flex rounded-full h-2 w-2 ${
                isDark ? 'bg-white' : 'bg-slate-900'
              }`}
            />
          </span>
          <span className="font-medium transition-colors duration-300">
            <span className="sm:hidden">Available</span>
            <span className="hidden sm:inline">Available for Opportunities</span>
          </span>
          <span className="text-neutral-500 hidden sm:inline">•</span>
          <span className="text-neutral-400 group-hover:text-inherit hidden sm:inline text-[11px] transition-colors duration-300">
            Kerala, India
          </span>
        </motion.div>

      </div>

      {/* 4. Large Oversized "MANU ANAND" Typography as Main Visual (Interactive Bouncing Letters on Hover) */}
      <motion.div
        style={{ y: nameParallaxY, opacity: nameOpacity }}
        className="absolute inset-x-0 top-14 sm:top-18 md:top-20 lg:top-24 flex justify-center items-center gap-1.5 xs:gap-3.5 sm:gap-8 md:gap-12 select-none z-20 pointer-events-none px-2 sm:px-4"
      >
        {/* MANU Mask Reveal Container */}
        <div className={`pt-8 sm:pt-16 pb-2 sm:pb-3 -mt-8 sm:-mt-16 transition-[overflow] duration-200 ${nameRevealed ? 'overflow-visible' : 'overflow-hidden'}`}>
          <motion.div
            initial={shouldReduceMotion ? { opacity: 1, y: 0, filter: 'blur(0px)' } : { y: '120%', opacity: 0, filter: 'blur(14px)' }}
            animate={{ y: '0%', opacity: 1, filter: 'blur(0px)' }}
            transition={{
              duration: 1.35,
              ease: [0.16, 1, 0.3, 1],
              delay: 0.15,
            }}
            className={`flex items-center dm-serif-display font-serif text-[clamp(1.9rem,10.2vw,12rem)] leading-none tracking-tight uppercase whitespace-nowrap transition-colors duration-300 ${
              isDark
                ? 'text-[#F4F4F6]/95 drop-shadow-[0_15px_45px_rgba(0,0,0,0.95)]'
                : 'text-slate-900 drop-shadow-[0_12px_30px_rgba(255,255,255,0.95)]'
            }`}
          >
            {firstWord.map((char, index) => (
              <motion.span
                key={`manu-${index}-${char}`}
                whileHover={
                  shouldReduceMotion
                    ? {}
                    : {
                        y: -32,
                        scale: 1.12,
                        transition: {
                          type: 'spring',
                          stiffness: 480,
                          damping: 8,
                          mass: 0.5,
                        },
                      }
                }
                transition={{
                  type: 'spring',
                  stiffness: 380,
                  damping: 14,
                  mass: 0.7,
                }}
                className="bouncing-letter inline-block pointer-events-auto cursor-pointer select-none"
              >
                {char}
              </motion.span>
            ))}
          </motion.div>
        </div>

        {/* ANAND Mask Reveal Container */}
        <div className={`pt-8 sm:pt-16 pb-2 sm:pb-3 -mt-8 sm:-mt-16 transition-[overflow] duration-200 ${nameRevealed ? 'overflow-visible' : 'overflow-hidden'}`}>
          <motion.div
            initial={shouldReduceMotion ? { opacity: 1, y: 0, filter: 'blur(0px)' } : { y: '120%', opacity: 0, filter: 'blur(14px)' }}
            animate={{ y: '0%', opacity: 1, filter: 'blur(0px)' }}
            transition={{
              duration: 1.35,
              ease: [0.16, 1, 0.3, 1],
              delay: 0.28,
            }}
            className={`flex items-center dm-serif-display font-serif text-[clamp(1.9rem,10.2vw,12rem)] leading-none tracking-tight uppercase whitespace-nowrap transition-colors duration-300 ${
              isDark
                ? 'text-[#F4F4F6]/95 drop-shadow-[0_15px_45px_rgba(0,0,0,0.95)]'
                : 'text-slate-900 drop-shadow-[0_12px_30px_rgba(255,255,255,0.95)]'
            }`}
          >
            {secondWord.map((char, index) => (
              <motion.span
                key={`anand-${index}-${char}`}
                whileHover={
                  shouldReduceMotion
                    ? {}
                    : {
                        y: -32,
                        scale: 1.12,
                        transition: {
                          type: 'spring',
                          stiffness: 480,
                          damping: 8,
                          mass: 0.5,
                        },
                      }
                }
                transition={{
                  type: 'spring',
                  stiffness: 380,
                  damping: 14,
                  mass: 0.7,
                }}
                className="bouncing-letter inline-block pointer-events-auto cursor-pointer select-none"
              >
                {char}
              </motion.span>
            ))}
          </motion.div>
        </div>
      </motion.div>

      {/* 4. Main Hero Canvas (Left Content, Foreground Photo, Right Features) */}
      <div className="relative max-w-7xl mx-auto w-full px-5 sm:px-8 lg:px-10 flex-1 flex flex-col justify-end pb-24 sm:pb-28 md:pb-32 pt-6 sm:pt-10 pointer-events-none">
        {/* Cutout Photo of Manu Standing in Foreground with Smooth Entrance & Parallax */}
        <motion.div
          style={{ y: imageParallaxY }}
          className="absolute left-1/2 top-0 sm:top-auto sm:bottom-0 -translate-x-1/2 z-25 pointer-events-none flex justify-center items-start sm:items-end w-full max-w-4xl h-[48vh] xs:h-[54vh] sm:h-[68vh] md:h-[76vh] lg:h-[84vh] min-h-0 sm:min-h-[460px] lg:min-h-[560px] max-h-[920px]"
        >
          <motion.img
            src={Heroimg}
            alt="Manu Anand — MERN Stack Developer"
            fetchpriority="high"
            initial={shouldReduceMotion ? { opacity: 1 } : { opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1], delay: 0.3 }}
            style={{
              maskImage: 'linear-gradient(to bottom, black 82%, transparent 100%)',
              WebkitMaskImage: 'linear-gradient(to bottom, black 82%, transparent 100%)',
            }}
            className={`h-full w-auto object-contain object-top sm:object-bottom scale-100 -translate-y-8 sm:translate-y-0 sm:scale-105 sm:-translate-y-16 lg:scale-115 transform origin-top sm:origin-bottom contrast-[1.04] opacity-85 sm:opacity-95 lg:opacity-100 transition-opacity duration-300 ${
              isDark
                ? 'drop-shadow-[0_25px_60px_rgba(0,0,0,0.95)]'
                : 'drop-shadow-[0_12px_24px_rgba(15,23,42,0.06)]'
            }`}
          />
          {/* Bottom Vignette Gradient (Dark mode only to deepen floor transition) */}
          {isDark && (
            <div className="absolute bottom-0 inset-x-0 h-32 sm:h-44 pointer-events-none bg-gradient-to-t from-black via-black/85 to-transparent" />
          )}
        </motion.div>

        {/* Foreground Content Grid */}
        <div className="relative z-30 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-8 md:gap-6 lg:gap-8 items-end pointer-events-none">
          {/* Left Column: Role Statement with Smooth Fade + Upward Movement */}
          <div className="md:col-span-1 lg:col-span-5 flex flex-col items-start text-left pointer-events-auto">
            {/* Dynamic "Developer who [word]" Statement with Auto-Scrolling Verb Reel */}
            <motion.div
              initial={shouldReduceMotion ? { opacity: 1 } : { opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1], delay: 0.35 }}
              className="flex flex-col items-start mb-6 cursor-default group"
            >
              <div
                className={`flex flex-wrap items-baseline gap-x-2.5 xs:gap-x-3 gap-y-1 text-2xl xs:text-3xl sm:text-4xl lg:text-4xl xl:text-5xl font-extrabold uppercase tracking-tight leading-tight transition-colors duration-300 ${
                  isDark ? 'text-[#F4F4F6]' : 'text-slate-900'
                }`}
              >
                <span className="transition-all duration-300 group-hover:text-inherit">
                  Developer who
                </span>
                <div
                  onMouseEnter={() => setIsWordPaused(true)}
                  onMouseLeave={() => setIsWordPaused(false)}
                  onClick={() => setCurrentWordIndex((prev) => (prev + 1) % rotatingWords.length)}
                  title="Click or hover to pause"
                  className="relative inline-flex h-[1.35em] overflow-hidden items-center align-middle min-w-[125px] xs:min-w-[145px] sm:min-w-[175px] lg:min-w-[210px] cursor-pointer"
                  style={{
                    maskImage: 'linear-gradient(to bottom, transparent 0%, black 25%, black 75%, transparent 100%)',
                    WebkitMaskImage: 'linear-gradient(to bottom, transparent 0%, black 25%, black 75%, transparent 100%)',
                  }}
                >
                  <AnimatePresence mode="popLayout" initial={false}>
                    <motion.span
                      key={rotatingWords[currentWordIndex]}
                      initial={shouldReduceMotion ? { opacity: 1, y: 0 } : { y: '100%', opacity: 0, filter: 'blur(8px)' }}
                      animate={{ y: '0%', opacity: 1, filter: 'blur(0px)' }}
                      exit={shouldReduceMotion ? { opacity: 0 } : { y: '-100%', opacity: 0, filter: 'blur(8px)' }}
                      transition={{
                        y: { type: 'spring', stiffness: 280, damping: 24, mass: 0.8 },
                        opacity: { duration: 0.32 },
                        filter: { duration: 0.28 },
                      }}
                      className={`inline-block dm-serif-display lowercase italic tracking-normal text-2xl xs:text-3xl sm:text-4xl lg:text-5xl xl:text-6xl select-none transition-colors duration-300 ${
                        isDark
                          ? 'text-white drop-shadow-[0_0_28px_rgba(255,255,255,0.9)] underline decoration-white/40 underline-offset-8'
                          : 'text-slate-900 drop-shadow-[0_0_20px_rgba(255,255,255,0.95)] underline decoration-slate-400/60 underline-offset-8'
                      }`}
                    >
                      {rotatingWords[currentWordIndex]}
                    </motion.span>
                  </AnimatePresence>
                </div>
              </div>
            </motion.div>

            {/* CTA Buttons with High-Contrast Inversion Hover */}
            <motion.div
              initial={shouldReduceMotion ? { opacity: 1 } : { opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1], delay: 0.55 }}
              className="flex items-center flex-wrap sm:flex-nowrap gap-2.5 sm:gap-3"
            >
              {/* Primary */}
              <a
                href="#projects"
                className={`inline-flex items-center justify-center gap-2 px-4.5 sm:px-5 py-2.5 rounded-full text-xs font-semibold active:scale-95 transition-all duration-300 group ${
                  isDark
                    ? 'bg-white text-black border border-white hover:bg-black hover:text-white hover:border-white hover:shadow-[0_0_25px_rgba(255,255,255,0.6)]'
                    : 'bg-slate-900 text-white border border-slate-900 shadow-[0_8px_20px_rgba(15,23,42,0.22)] hover:bg-slate-800 hover:shadow-[0_12px_28px_rgba(15,23,42,0.3)]'
                }`}
              >
                <span>View Projects</span>
                <ArrowRight className="w-3.5 h-3.5 transition-transform duration-300 group-hover:translate-x-1" />
              </a>

              {/* Secondary */}
              <a
                href="#contact"
                className={`inline-flex items-center justify-center gap-2 px-3.5 sm:px-4 py-2.5 rounded-full text-xs font-medium active:scale-95 transition-all duration-300 group ${
                  isDark
                    ? 'bg-neutral-900/80 text-neutral-200 border border-neutral-700 hover:bg-white hover:text-black hover:border-white hover:shadow-[0_0_25px_rgba(255,255,255,0.5)]'
                    : 'bg-white/85 text-slate-800 border border-slate-200/90 shadow-[0_4px_16px_-2px_rgba(15,23,42,0.05),inset_0_1px_1px_rgba(255,255,255,1)] hover:bg-white hover:border-slate-300 hover:text-slate-950 hover:shadow-[0_8px_24px_rgba(15,23,42,0.1)]'
                }`}
              >
                <MessageSquare className="w-3.5 h-3.5 transition-colors duration-300" />
                <span>Let's Talk</span>
              </a>
            </motion.div>
          </div>

          {/* Center Spacer for Desktop */}
          <div className="hidden lg:block lg:col-span-3 pointer-events-none" />

          {/* Right Column: Features & Tagline */}
          <div className="md:col-span-1 lg:col-span-4 flex flex-col items-start md:items-end text-left md:text-right pointer-events-auto mt-6 md:mt-0">
            {/* Tagline */}
            <motion.div
              initial={shouldReduceMotion ? { opacity: 1 } : { opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1], delay: 0.38 }}
              className="flex items-start md:justify-end gap-3 max-w-xs mb-4 sm:mb-6 group cursor-default"
            >
              <p
                className={`text-xs sm:text-sm font-medium leading-snug transition-colors duration-300 ${
                  isDark
                    ? 'text-neutral-300 group-hover:text-white group-hover:drop-shadow-[0_0_10px_rgba(255,255,255,0.4)]'
                    : 'text-slate-700 group-hover:text-slate-950 group-hover:drop-shadow-[0_0_10px_rgba(255,255,255,0.8)]'
                }`}
              >
                Turning ideas into refined, scalable digital architecture.
              </p>
            </motion.div>

            {/* Feature List */}
            <motion.ul
              initial={shouldReduceMotion ? { opacity: 1 } : { opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1], delay: 0.46 }}
              className={`flex flex-col gap-2 sm:gap-2.5 max-w-xs text-xs tracking-wide ${
                isDark ? 'text-neutral-400' : 'text-slate-600'
              }`}
            >
              {features.map((feat) => (
                <li key={feat} className="flex items-center md:justify-end gap-2 group cursor-default">
                  <span
                    className={`font-bold text-xs transition-all duration-300 group-hover:scale-125 ${
                      isDark
                        ? 'text-white group-hover:drop-shadow-[0_0_12px_rgba(255,255,255,0.9)]'
                        : 'text-slate-900 group-hover:drop-shadow-[0_0_10px_rgba(255,255,255,1)]'
                    }`}
                  >
                    ✦
                  </span>
                  <span
                    className={`transition-all duration-300 ${
                      isDark
                        ? 'group-hover:text-white group-hover:drop-shadow-[0_0_12px_rgba(255,255,255,0.5)]'
                        : 'group-hover:text-slate-950 group-hover:drop-shadow-[0_0_8px_rgba(255,255,255,0.8)]'
                    }`}
                  >
                    {feat}
                  </span>
                </li>
              ))}
            </motion.ul>

            {/* Social Connect Icons */}
            <motion.div
              initial={shouldReduceMotion ? { opacity: 1 } : { opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1], delay: 0.54 }}
              className={`flex items-center gap-2 mt-4 sm:mt-6 pt-4 sm:pt-5 border-t w-full max-w-xs justify-start md:justify-end ${
                isDark ? 'border-white/10' : 'border-slate-300/80'
              }`}
            >
              <a
                href="https://github.com/hypmax03"
                target="_blank"
                rel="noreferrer"
                className={`p-2 rounded-full border hover:scale-110 active:scale-95 transition-all duration-300 backdrop-blur-xl ${
                  isDark
                    ? 'border-white/10 bg-neutral-900/60 text-neutral-400 hover:bg-white hover:text-black hover:border-white hover:shadow-[0_0_20px_rgba(255,255,255,0.6)]'
                    : 'border-slate-200/90 bg-white/85 shadow-[0_4px_14px_rgba(15,23,42,0.05)] text-slate-700 hover:bg-white hover:border-slate-300 hover:text-slate-950 hover:shadow-[0_6px_20px_rgba(15,23,42,0.08)]'
                }`}
                aria-label="GitHub"
              >
                <GithubIcon className="w-3.5 h-3.5" />
              </a>
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noreferrer"
                className={`p-2 rounded-full border hover:scale-110 active:scale-95 transition-all duration-300 backdrop-blur-xl ${
                  isDark
                    ? 'border-white/10 bg-neutral-900/60 text-neutral-400 hover:bg-white hover:text-black hover:border-white hover:shadow-[0_0_20px_rgba(255,255,255,0.6)]'
                    : 'border-slate-200/90 bg-white/85 shadow-[0_4px_14px_rgba(15,23,42,0.05)] text-slate-700 hover:bg-white hover:border-slate-300 hover:text-slate-950 hover:shadow-[0_6px_20px_rgba(15,23,42,0.08)]'
                }`}
                aria-label="LinkedIn"
              >
                <LinkedinIcon className="w-3.5 h-3.5" />
              </a>
              <a
                href="https://instagram.com/manu_x03"
                target="_blank"
                rel="noreferrer"
                className={`p-2 rounded-full border hover:scale-110 active:scale-95 transition-all duration-300 backdrop-blur-xl ${
                  isDark
                    ? 'border-white/10 bg-neutral-900/60 text-neutral-400 hover:bg-white hover:text-black hover:border-white hover:shadow-[0_0_20px_rgba(255,255,255,0.6)]'
                    : 'border-slate-200/90 bg-white/85 shadow-[0_4px_14px_rgba(15,23,42,0.05)] text-slate-700 hover:bg-white hover:border-slate-300 hover:text-slate-950 hover:shadow-[0_6px_20px_rgba(15,23,42,0.08)]'
                }`}
                aria-label="Instagram"
              >
                <InstagramIcon className="w-3.5 h-3.5" />
              </a>
              <a
                href="mailto:manuanandam@gmail.com"
                className={`p-2 rounded-full border hover:scale-110 active:scale-95 transition-all duration-300 backdrop-blur-xl ${
                  isDark
                    ? 'border-white/10 bg-neutral-900/60 text-neutral-400 hover:bg-white hover:text-black hover:border-white hover:shadow-[0_0_20px_rgba(255,255,255,0.6)]'
                    : 'border-slate-200/90 bg-white/85 shadow-[0_4px_14px_rgba(15,23,42,0.05)] text-slate-700 hover:bg-white hover:border-slate-300 hover:text-slate-950 hover:shadow-[0_6px_20px_rgba(15,23,42,0.08)]'
                }`}
                aria-label="Email"
              >
                <Mail className="w-3.5 h-3.5" />
              </a>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  )
}