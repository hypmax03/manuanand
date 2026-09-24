import React, { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence, useReducedMotion, useInView } from 'framer-motion'
import {
  ArrowLeft,
  ArrowUpRight,
  Sparkles,
  Terminal,
  Code2,
  Cpu,
  Globe,
  Layers,
  FlaskConical,
  ExternalLink,
  Flame,
  Clock,
} from 'lucide-react'

const GithubIcon = ({ className = 'w-3.5 h-3.5' }) => (
  <svg className={className} fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
    <path
      fillRule="evenodd"
      d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"
      clipRule="evenodd"
    />
  </svg>
)

const InstagramIcon = ({ className = 'w-3.5 h-3.5' }) => (
  <svg className={className} fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
  </svg>
)

// ============================================================================
// PLAYGROUND SIDE PROJECTS DATA (Currently in progress / staged)
// ============================================================================
export const PLAYGROUND_PROJECTS = []

export const UPCOMING_EXPERIMENTS = [
  // {
  //   id: 'exp-01',
  //   number: '01',
  //   title: 'WebGL Audio Visualizer',
  //   tagline: 'Reactive 3D Frequency Displacement',
  //   description:
  //     'Real-time frequency domain visualizer featuring interactive particle physics, custom GLSL vertex shaders, and beat detection via Web Audio API.',
  //   category: 'creative',
  //   categoryLabel: 'Creative & Canvas',
  //   icon: Sparkles,
  //   stage: 'Calibrating Shaders & FFT Bounds',
  //   progress: 75,
  //   technologies: ['Three.js', 'GLSL', 'Web Audio API', 'React'],
  //   inProgress: true,
  // },

]

// ============================================================================
// PLAYGROUND SPOTLIGHT CARD
// ============================================================================
function PlaygroundSpotlightCard({ children, className = '', isDark = true, onClick }) {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const [isHovered, setIsHovered] = useState(false)

  const handleMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect()
    setMousePosition({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    })
  }

  return (
    <div
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={onClick}
      className={`group relative rounded-3xl border transition-all duration-300 overflow-hidden ${isDark
        ? 'border-white/10 bg-neutral-900/40 backdrop-blur-2xl hover:border-white/30 shadow-[0_10px_35px_rgba(0,0,0,0.6)]'
        : 'border-white/60 bg-white/40 backdrop-blur-2xl hover:border-white/90 shadow-[0_10px_35px_rgba(0,0,0,0.04),inset_0_1px_1px_rgba(255,255,255,0.95)]'
        } ${className}`}
    >
      {/* Dynamic Cursor Spotlight Layer */}
      <div
        className="pointer-events-none absolute -inset-px rounded-3xl transition-opacity duration-300 z-0"
        style={{
          opacity: isHovered ? 1 : 0,
          background: isDark
            ? `radial-gradient(550px circle at ${mousePosition.x}px ${mousePosition.y}px, rgba(255,255,255,0.07), transparent 45%)`
            : `radial-gradient(550px circle at ${mousePosition.x}px ${mousePosition.y}px, rgba(255,255,255,0.65), transparent 45%)`,
        }}
      />
      <div className="relative z-10 w-full h-full flex flex-col">{children}</div>
    </div>
  )
}

// ============================================================================
// MAIN PLAYGROUND SECTION COMPONENT
// ============================================================================
export default function PlayGround({ isDark = true, onNavigate, onOpenContact }) {
  const [activeTab, setActiveTab] = useState('all')
  const [localTime, setLocalTime] = useState('')
  const sectionRef = useRef(null)
  const isInView = useInView(sectionRef, { once: true, amount: 0.15 })
  const shouldReduceMotion = useReducedMotion()

  useEffect(() => {
    const updateTime = () => {
      const now = new Date()
      const formatted = now.toLocaleTimeString('en-US', {
        timeZone: 'Asia/Kolkata',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: true,
      })
      setLocalTime(formatted)
    }
    updateTime()
    const timer = setInterval(updateTime, 1000)
    return () => clearInterval(timer)
  }, [])

  const isPlaygroundInProgress = PLAYGROUND_PROJECTS.length === 0
  const activeProjects = isPlaygroundInProgress ? UPCOMING_EXPERIMENTS : PLAYGROUND_PROJECTS

  const tabs = isPlaygroundInProgress
    ? [
      { key: 'all', label: 'All Experiments (WIP)', count: UPCOMING_EXPERIMENTS.length },
      {
        key: 'creative',
        label: 'Creative & Canvas',
        count: UPCOMING_EXPERIMENTS.filter((p) => p.category === 'creative').length,
      },
      {
        key: 'tools',
        label: 'Tools & Utilities',
        count: UPCOMING_EXPERIMENTS.filter((p) => p.category === 'tools').length,
      },
    ]
    : [
      { key: 'all', label: 'All Experiments', count: PLAYGROUND_PROJECTS.length },
      {
        key: 'tools',
        label: 'Tools & Utilities',
        count: PLAYGROUND_PROJECTS.filter((p) => p.category === 'tools').length,
      },
      {
        key: 'web',
        label: 'Full-Stack Web',
        count: PLAYGROUND_PROJECTS.filter((p) => p.category === 'web').length,
      },
      {
        key: 'creative',
        label: 'Creative & Canvas',
        count: PLAYGROUND_PROJECTS.filter((p) => p.category === 'creative').length,
      },
    ]

  const filteredProjects =
    activeTab === 'all'
      ? activeProjects
      : activeProjects.filter((p) => p.category === activeTab)

  return (
    <section
      id="playground"
      ref={sectionRef}
      className={`relative w-full py-16 sm:py-24 lg:py-32 overflow-hidden selection:bg-white/20 selection:text-white transition-colors duration-500 ${isDark ? 'bg-transparent text-[#F4F4F6]' : 'bg-transparent text-slate-900'
        }`}
    >
      {/* Ambient Radial Glow */}
      <div className="absolute inset-0 pointer-events-none -z-10 select-none overflow-hidden">
        {isDark && (
          <>
            <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[800px] sm:w-[1100px] h-[550px] rounded-full blur-[110px] bg-[radial-gradient(circle_at_center,_rgba(255,255,255,0.045)_0%,_rgba(255,255,255,0.01)_40%,_transparent_70%)]" />
          </>
        )}
        <div className="absolute inset-0 bg-grain opacity-[0.02]" />
      </div>

      <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-12">
        {/* ================================================================== */}
        {/* TOP EDITORIAL STATUS BAR */}
        {/* ================================================================== */}
        <div
          className={`flex items-center justify-between pb-6 mb-10 sm:mb-12 border-b ${isDark ? 'border-white/[0.08]' : 'border-slate-300/80'
            }`}
        >
          <button
            onClick={() => onNavigate?.('/')}
            className={`group inline-flex items-center gap-2.5 px-4 py-2 rounded-full border text-xs font-mono tracking-wider uppercase active:scale-95 transition-all duration-300 cursor-pointer backdrop-blur-xl ${isDark
              ? 'border-white/15 bg-white/[0.03] text-neutral-200 hover:bg-white hover:text-black hover:border-white hover:shadow-[0_0_20px_rgba(255,255,255,0.5)]'
              : 'border-white/50 bg-white/25 shadow-sm text-slate-800 hover:bg-white hover:border-white/90 hover:text-slate-950'
              }`}
          >
            <ArrowLeft className="w-3.5 h-3.5 transition-transform duration-300 group-hover:-translate-x-1" />
            <span>Return to Portfolio</span>
          </button>

          {/* Telemetry Indicator */}
          <div
            className={`flex items-center gap-4 text-xs font-mono tracking-wider ${isDark ? 'text-neutral-400' : 'text-slate-600'
              }`}
          >
            <div className="flex items-center gap-2">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-purple-400 opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-purple-500" />
              </span>
              <span className="hidden sm:inline font-semibold text-purple-400">
                LAB & EXPERIMENTS
              </span>
            </div>

            <span className="hidden md:inline opacity-30">•</span>

            <div className="flex items-center gap-1.5 hidden md:flex">
              <Clock className="w-3.5 h-3.5 opacity-60" />
              <span>IST {localTime || 'Active'}</span>
            </div>

            <span className="hidden sm:inline opacity-30">•</span>
            <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[10px] font-mono tracking-wider uppercase border border-amber-400/40 bg-amber-400/10 text-amber-500 dark:text-amber-300 shadow-[0_0_12px_rgba(251,191,36,0.15)]">
              <span className="w-1.5 h-1.5 rounded-full bg-amber-400 animate-pulse" />
              IN PROGRESS
            </span>
          </div>
        </div>

        {/* ================================================================== */}
        {/* SECTION HEADER */}
        {/* ================================================================== */}
        <div
          className={`pb-12 sm:pb-16 mb-10 sm:mb-12 border-b transition-colors duration-300 ${isDark ? 'border-white/[0.08]' : 'border-slate-300/80'
            }`}
        >
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div>
              {/* Eyebrow Pills */}
              <motion.div
                initial={{ opacity: 0, y: shouldReduceMotion ? 0 : 16 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6 }}
                className="flex flex-wrap items-center gap-2.5 mb-4"
              >


                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-mono tracking-wider uppercase border border-amber-400/40 bg-amber-400/10 text-amber-500 dark:text-amber-300 shadow-[0_0_12px_rgba(251,191,36,0.15)]">
                  <span className="w-1.5 h-1.5 rounded-full bg-amber-400 animate-pulse" />
                  Lab Under Construction
                </span>
              </motion.div>

              {/* Headline */}
              <motion.h2
                initial={{ opacity: 0, y: shouldReduceMotion ? 0 : 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.7, delay: 0.08 }}
                className={`text-3xl xs:text-4xl sm:text-6xl lg:text-7xl font-serif dm-serif-display uppercase tracking-tight leading-none select-none transition-all duration-300 ${isDark
                  ? 'text-[#F4F4F6] drop-shadow-[0_15px_40px_rgba(0,0,0,0.9)] hover:text-white hover:drop-shadow-[0_0_35px_rgba(255,255,255,0.7)]'
                  : 'text-slate-900 drop-shadow-[0_10px_25px_rgba(255,255,255,0.95)] hover:text-slate-950'
                  }`}
              >
                The Playground.
              </motion.h2>
            </div>

            {/* Subtitle */}
            <motion.p
              initial={{ opacity: 0, y: shouldReduceMotion ? 0 : 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7, delay: 0.15 }}
              className={`max-w-md text-sm sm:text-base leading-relaxed font-sans transition-colors duration-300 ${isDark ? 'text-neutral-400' : 'text-slate-600'
                }`}
            >
              A curated sandbox of side projects, developer micro-tools, creative canvas experiments,
              and prototypes built to explore new technologies.
            </motion.p>
          </div>

          {/* Filter Tabs */}
          <div className="mt-8 flex flex-wrap items-center gap-1.5 p-1 rounded-full border border-white/10 bg-white/[0.03] backdrop-blur-xl w-fit">
            {tabs.map((tab) => {
              const isActive = activeTab === tab.key
              return (
                <button
                  key={tab.key}
                  onClick={() => setActiveTab(tab.key)}
                  className={`relative px-4 py-1.5 rounded-full text-xs font-mono tracking-wider transition-all duration-300 cursor-pointer ${isActive
                    ? isDark
                      ? 'text-black font-semibold'
                      : 'text-white font-semibold'
                    : isDark
                      ? 'text-neutral-400 hover:text-white'
                      : 'text-slate-700 hover:text-slate-950'
                    }`}
                >
                  {isActive && (
                    <motion.div
                      layoutId="playground-filter-pill"
                      transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                      className={`absolute inset-0 rounded-full shadow-md ${isDark ? 'bg-white' : 'bg-slate-900'
                        }`}
                    />
                  )}
                  <span className="relative z-10">{tab.label}</span>
                  <span className="relative z-10 ml-1.5 opacity-60 text-[10px]">
                    ({tab.count})
                  </span>
                </button>
              )
            })}
          </div>
        </div>

        {/* ================================================================== */}
        {/* LAB STAGING TERMINAL BANNER */}
        {/* ================================================================== */}
        <PlaygroundSpotlightCard
          isDark={isDark}
          className="p-6 sm:p-8 mb-10 border-amber-400/20 dark:border-amber-400/25"
        >
          <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6">
            <div className="flex items-start gap-4">
              <div
                className={`p-3 rounded-2xl border shrink-0 ${isDark
                  ? 'border-amber-400/30 bg-amber-400/10 text-amber-300 shadow-[0_0_20px_rgba(251,191,36,0.15)]'
                  : 'border-amber-400/40 bg-amber-50 text-amber-600 shadow-sm'
                  }`}
              >
                <Terminal className="w-6 h-6" />
              </div>
              <div>
                <div className="flex flex-wrap items-center gap-2 mb-1.5">
                  <span className="text-xs font-mono uppercase tracking-widest text-amber-500 dark:text-amber-300 font-semibold">
                    [STAGING_ENVIRONMENT // ACTIVE_BUILD]
                  </span>
                  <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[9px] font-mono uppercase border border-amber-400/40 bg-amber-400/10 text-amber-500 dark:text-amber-300">
                    <span className="w-1 h-1 rounded-full bg-amber-400 animate-pulse" />
                    LIVE TELEMETRY
                  </span>
                </div>
                <h3
                  className={`text-xl sm:text-2xl font-serif dm-serif-display uppercase tracking-tight mb-1.5 ${isDark ? 'text-white' : 'text-slate-900'
                    }`}
                >
                  Creative Sandbox & Micro-Tools In Development.
                </h3>
                <p
                  className={`text-xs sm:text-sm font-sans max-w-2xl leading-relaxed ${isDark ? 'text-neutral-400' : 'text-slate-600'
                    }`}
                >
                  Interactive WebGL shaders, zero-latency browser physics simulations, and developer micro-tools are currently being forged in this lab. Dropping soon. Follow real-time updates below.
                </p>
              </div>
            </div>

            {/* Quick Follow Actions */}
            <div className="flex flex-wrap items-center gap-3 shrink-0 w-full sm:w-auto">
              <a
                href="https://instagram.com/manu_x03"
                target="_blank"
                rel="noreferrer"
                className={`flex-1 sm:flex-initial inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-full text-xs font-mono uppercase tracking-wider border transition-all duration-300 ${isDark
                  ? 'border-white/15 bg-white/[0.04] text-neutral-200 hover:bg-white hover:text-black hover:border-white hover:shadow-[0_0_20px_rgba(255,255,255,0.4)]'
                  : 'border-slate-300 bg-white text-slate-800 hover:bg-slate-950 hover:text-white shadow-xs'
                  }`}
              >
                <InstagramIcon className="w-3.5 h-3.5" />
                <span>@manu_x03</span>
              </a>
              <a
                href="https://github.com/hypmax03"
                target="_blank"
                rel="noreferrer"
                className={`flex-1 sm:flex-initial inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-full text-xs font-mono uppercase tracking-wider border transition-all duration-300 ${isDark
                  ? 'border-white/15 bg-white/[0.04] text-neutral-200 hover:bg-white hover:text-black hover:border-white hover:shadow-[0_0_20px_rgba(255,255,255,0.4)]'
                  : 'border-slate-300 bg-white text-slate-800 hover:bg-slate-950 hover:text-white shadow-xs'
                  }`}
              >
                <GithubIcon className="w-3.5 h-3.5" />
                <span>GitHub</span>
              </a>
            </div>
          </div>
        </PlaygroundSpotlightCard>

        {/* ================================================================== */}
        {/* PROJECTS / EXPERIMENTS GRID */}
        {/* ================================================================== */}
        <motion.div
          layout
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-7 mb-16 sm:mb-20"
        >
          <AnimatePresence mode="popLayout">
            {filteredProjects.map((project, index) => {
              const IconComp = project.icon

              return (
                <motion.div
                  key={project.id}
                  layout
                  initial={{ opacity: 0, scale: 0.94 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.94 }}
                  transition={{ duration: 0.3, delay: index * 0.04 }}
                  whileHover={shouldReduceMotion ? {} : { y: -5 }}
                >
                  <PlaygroundSpotlightCard
                    isDark={isDark}
                    className="p-6 sm:p-7 h-full flex flex-col justify-between"
                  >
                    <div>
                      {/* Top Meta Bar */}
                      <div className="flex items-center justify-between pb-4 mb-4 border-b border-white/[0.08]">
                        <div className="flex items-center gap-2">
                          <span
                            className={`text-xs font-mono font-medium ${isDark ? 'text-neutral-500' : 'text-slate-400'
                              }`}
                          >
                            {project.number}
                          </span>
                          <span className="h-px w-4 bg-white/20" />
                          <span
                            className={`text-[11px] font-mono uppercase tracking-wider ${isDark ? 'text-neutral-400' : 'text-slate-600'
                              }`}
                          >
                            {project.categoryLabel}
                          </span>
                        </div>

                        <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[10px] font-mono tracking-wider uppercase border border-amber-400/40 bg-amber-400/10 text-amber-500 dark:text-amber-300 shadow-[0_0_12px_rgba(251,191,36,0.15)]">
                          <span className="w-1.5 h-1.5 rounded-full bg-amber-400 animate-pulse" />
                          In Progress
                        </span>
                      </div>

                      {/* Icon & Title */}
                      <div className="flex items-start gap-3.5 mb-3">
                        <div
                          className={`p-2.5 rounded-2xl border transition-all ${isDark
                            ? 'border-white/10 bg-white/[0.03] text-white group-hover:bg-white group-hover:text-black group-hover:border-white shadow-[0_0_15px_rgba(255,255,255,0.1)]'
                            : 'border-white/70 bg-white/70 text-slate-900 group-hover:bg-slate-900 group-hover:text-white shadow-2xs'
                            }`}
                        >
                          <IconComp className="w-5 h-5" />
                        </div>

                        <div>
                          <h3
                            className={`text-xl font-bold tracking-tight mb-0.5 transition-colors ${isDark
                              ? 'text-white group-hover:text-white'
                              : 'text-slate-900 group-hover:text-slate-950'
                              }`}
                          >
                            {project.title}
                          </h3>
                          <p
                            className={`text-xs font-mono ${isDark ? 'text-neutral-400' : 'text-slate-500'
                              }`}
                          >
                            {project.tagline}
                          </p>
                        </div>
                      </div>

                      {/* Description */}
                      <p
                        className={`text-xs sm:text-sm leading-relaxed mb-5 font-sans ${isDark ? 'text-neutral-300' : 'text-slate-700'
                          }`}
                      >
                        {project.description}
                      </p>

                      {/* Staging Status & Progress Bar */}
                      {project.stage && (
                        <div
                          className={`p-3 rounded-xl border text-[11px] font-mono mb-4 transition-colors ${isDark
                            ? 'border-white/10 bg-white/[0.02] text-neutral-300'
                            : 'border-slate-200 bg-slate-50 text-slate-700'
                            }`}
                        >
                          <div className="flex items-center justify-between mb-1.5">
                            <span className="opacity-70">Lab Stage:</span>
                            <span className="text-amber-500 dark:text-amber-300 font-semibold">
                              {project.stage}
                            </span>
                          </div>
                          <div
                            className={`h-1.5 w-full rounded-full overflow-hidden ${isDark ? 'bg-white/10' : 'bg-slate-200'
                              }`}
                          >
                            <div
                              className="h-full rounded-full bg-gradient-to-r from-amber-400 to-purple-400 transition-all duration-500"
                              style={{ width: `${project.progress || 50}%` }}
                            />
                          </div>
                        </div>
                      )}
                    </div>

                    <div>
                      {/* Tech Stack Chips */}
                      <div className="flex flex-wrap items-center gap-1.5 pt-4 border-t border-white/[0.08] mb-5">
                        {project.technologies.map((tech) => (
                          <span
                            key={tech}
                            className={`px-2.5 py-0.5 rounded-md text-[10px] font-mono border transition-all ${isDark
                              ? 'border-white/10 bg-white/[0.03] text-neutral-300 group-hover:border-white/20'
                              : 'border-white/70 bg-white/60 text-slate-800 shadow-2xs'
                              }`}
                          >
                            {tech}
                          </span>
                        ))}
                      </div>

                      {/* Action Links */}
                      <div className="flex items-center justify-between pt-2 text-xs font-mono">
                        <span className="inline-flex items-center gap-1 text-[11px] opacity-70">
                          <Clock className="w-3.5 h-3.5 text-amber-400" />
                          <span>Dropping Soon</span>
                        </span>

                        <a
                          href="https://instagram.com/manu_x03"
                          target="_blank"
                          rel="noreferrer"
                          className={`inline-flex items-center gap-1 font-semibold group/link transition-colors ${isDark
                            ? 'text-amber-300 hover:text-white'
                            : 'text-amber-600 hover:text-slate-950'
                            }`}
                        >
                          <InstagramIcon className="w-3.5 h-3.5" />
                          <span>Follow Updates</span>
                          <ArrowUpRight className="w-3.5 h-3.5 transition-transform duration-200 group-hover/link:translate-x-0.5 group-hover/link:-translate-y-0.5" />
                        </a>
                      </div>
                    </div>
                  </PlaygroundSpotlightCard>
                </motion.div>
              )
            })}
          </AnimatePresence>
        </motion.div>

        {/* ================================================================== */}
        {/* PLAYGROUND BOTTOM CALLOUT */}
        {/* ================================================================== */}
        <PlaygroundSpotlightCard
          isDark={isDark}
          className="p-6 sm:p-8 md:p-10 flex flex-col lg:flex-row items-center justify-between gap-6 text-center lg:text-left"
        >
          <div className="max-w-xl">
            <span
              className={`text-[11px] font-mono uppercase tracking-widest block mb-2 ${
                isDark ? 'text-neutral-400' : 'text-slate-500'
              }`}
            >
              HAVE A SIDE PROJECT OR OPEN-SOURCE IDEA?
            </span>
            <h3
              className={`text-2xl sm:text-3xl font-serif dm-serif-display uppercase tracking-tight mb-2 ${
                isDark ? 'text-white' : 'text-slate-900'
              }`}
            >
              Let's build something experimental together.
            </h3>
            <p
              className={`text-xs sm:text-sm font-sans ${
                isDark ? 'text-neutral-400' : 'text-slate-600'
              }`}
            >
              Whether it's an interactive web tool, an AI prototype, or an open-source library,
              I'm always excited to explore uncharted code.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-3 shrink-0 w-full sm:w-auto">
            <a
              href="https://instagram.com/manu_x03"
              target="_blank"
              rel="noreferrer"
              className={`w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-3 rounded-full text-xs sm:text-sm font-semibold tracking-wide uppercase transition-all duration-300 border ${
                isDark
                  ? 'border-white/20 bg-white/5 text-neutral-200 hover:bg-white hover:text-black hover:border-white shadow-xs'
                  : 'border-slate-300 bg-white text-slate-800 hover:bg-slate-950 hover:text-white shadow-sm'
              }`}
            >
              <InstagramIcon className="w-4 h-4" />
              <span>@manu_x03</span>
            </a>
            <button
              type="button"
              onClick={onOpenContact}
              className={`w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full text-xs sm:text-sm font-semibold tracking-wide uppercase transition-all duration-300 cursor-pointer ${
                isDark
                  ? 'bg-white text-black hover:bg-neutral-200 hover:shadow-[0_0_25px_rgba(255,255,255,0.4)] active:scale-95'
                  : 'bg-slate-900 text-white hover:bg-slate-800 shadow-md active:scale-95'
              }`}
            >
              <span>Start a Conversation</span>
              <ArrowUpRight className="w-4 h-4" />
            </button>
          </div>
        </PlaygroundSpotlightCard>
      </div>
    </section>
  )
}
