import React, { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence, useReducedMotion, useInView } from 'framer-motion'
import { ArrowUpRight } from 'lucide-react'

const GithubIcon = ({ className = 'w-3.5 h-3.5' }) => (
  <svg className={className} fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
    <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" />
  </svg>
)

// Featured Projects Data
export const PROJECTS_DATA = [
  {
    number: '01',
    id: 'expense-flow',
    title: 'Expense Flow',
    tagline: 'Personal Finance & Budget Intelligence',
    description:
      'A full-stack expense management application for tracking income, expenses and personal finances with structured analytics, category breakdowns, and real-time transaction synchronization.',
    technologies: ['Next.js', 'React', 'Node.js', 'MongoDB', 'Tailwind CSS'],
    image: '/projects/expense-manager.jpg',
    github: 'https://github.com/hypmax03/ExpenseManager.git',
    live: 'https://expenseflow-ten-rho.vercel.app/',
    featuredMetrics: 'Real-time Analytics · JWT Auth · Spend Forecasting',
  },
  {
    number: '02',
    id: 'worldforge-ai',
    title: 'WorldForge AI',
    tagline: 'Generative Worldbuilding Studio',
    inProgress: true,
    description:
      'An AI-powered world-building experience designed to generate and organize creative ideas, procedural continent maps, and interconnected lore nodes into an immersive digital environment. Currently under active development.',
    technologies: ['React', 'Next.js', 'Node.js', 'AI APIs', 'Tailwind CSS'],
    image: '/projects/worldforge-ai.jpg',
    github: 'https://github.com/hypmax03',
    live: 'https://worldforge.ai',
    featuredMetrics: 'In Progress · Procedural Maps · Lore Graphs',
  },
]

/**
 * ProjectsHeader Component
 * Clean editorial header with animated reveal on viewport enter, matching Hero styling
 */
function ProjectsHeader({ isDark, shouldReduceMotion }) {
  const headerRef = useRef(null)
  const isInView = useInView(headerRef, { once: true, amount: 0.3 })

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.12,
        delayChildren: 0.05,
      },
    },
  }

  const childVariants = {
    hidden: { opacity: 0, y: shouldReduceMotion ? 0 : 24, filter: shouldReduceMotion ? 'none' : 'blur(8px)' },
    visible: {
      opacity: 1,
      y: 0,
      filter: 'blur(0px)',
      transition: {
        duration: 0.8,
        ease: [0.16, 1, 0.3, 1],
      },
    },
  }

  return (
    <motion.div
      ref={headerRef}
      variants={containerVariants}
      initial="hidden"
      animate={isInView ? 'visible' : 'hidden'}
      className={`max-w-7xl mx-auto px-5 sm:px-8 lg:px-12 pt-16 sm:pt-24 lg:pt-32 pb-12 sm:pb-16 border-b transition-colors duration-300 ${
        isDark ? 'border-white/[0.08]' : 'border-slate-200'
      }`}
    >
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div>
          {/* Small Section Label with Hero Status Pill Style */}
 

          {/* Large Editorial Heading */}
          <motion.h2
            variants={childVariants}
            className={`text-3xl xs:text-4xl sm:text-6xl lg:text-7xl font-serif dm-serif-display uppercase tracking-tight leading-none select-none transition-all duration-300 ${
              isDark
                ? 'text-[#F4F4F6]/95 drop-shadow-[0_15px_45px_rgba(0,0,0,0.95)] hover:text-white hover:drop-shadow-[0_0_35px_rgba(255,255,255,0.7)]'
                : 'text-slate-900 drop-shadow-[0_12px_30px_rgba(255,255,255,0.95)] hover:text-slate-950'
            }`}
          >
            Things I've built.
          </motion.h2>
        </div>

        {/* Supporting Editorial Paragraph */}
        <motion.p
          variants={childVariants}
          className={`max-w-md text-sm sm:text-base leading-relaxed font-sans transition-colors duration-300 ${
            isDark ? 'text-neutral-400' : 'text-slate-600'
          }`}
        >
          A collection of projects where I experiment, learn, and turn ideas into working digital experiences.
        </motion.p>
      </div>
    </motion.div>
  )
}

/**
 * Individual Project Story (Desktop Left Column & Mobile Item)
 */
function ProjectInfo({
  project,
  index,
  total,
  isDark,
  isActive,
  onActivate,
  shouldReduceMotion,
}) {
  const rowRef = useRef(null)
  const isInView = useInView(rowRef, {
    amount: 0.5,
    margin: '-15% 0px -15% 0px',
  })

  // Synchronize active project on scroll
  useEffect(() => {
    if (isInView) {
      onActivate(index)
    }
  }, [isInView, index, onActivate])

  return (
    <div
      ref={rowRef}
      id={`project-story-${project.id}`}
      className={`relative min-h-[70vh] lg:min-h-[85vh] flex flex-col justify-center py-12 lg:py-20 transition-opacity duration-500 ${
        isActive ? 'opacity-100' : 'opacity-40 lg:opacity-35 hover:opacity-75'
      }`}
    >
      <div className="max-w-xl">
        {/* Project Number & Category Eyebrow */}
        <div className="flex flex-wrap items-center gap-2 sm:gap-3 mb-4 sm:mb-6">
          <span
            className={`text-2xl sm:text-3xl font-mono tracking-tight transition-all duration-300 ${
              isActive
                ? isDark
                  ? 'text-white font-medium drop-shadow-[0_0_20px_rgba(255,255,255,0.9)]'
                  : 'text-slate-900 font-bold drop-shadow-[0_0_12px_rgba(255,255,255,0.9)]'
                : isDark
                ? 'text-neutral-500 font-light'
                : 'text-slate-400 font-light'
            }`}
          >
            {project.number}
          </span>
          <span
            className={`h-px w-8 transition-colors duration-300 ${
              isActive
                ? isDark
                  ? 'bg-white/40'
                  : 'bg-slate-400'
                : isDark
                ? 'bg-white/10'
                : 'bg-slate-300'
            }`}
          />
          <span
            className={`text-xs font-mono uppercase tracking-widest transition-colors duration-300 ${
              isActive
                ? isDark
                  ? 'text-neutral-200'
                  : 'text-slate-900'
                : isDark
                ? 'text-neutral-500'
                : 'text-slate-500'
            }`}
          >
            {project.tagline}
          </span>
          {project.inProgress && (
            <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[10px] font-mono tracking-wider uppercase border border-amber-400/40 bg-amber-400/10 text-amber-300 shadow-[0_0_12px_rgba(251,191,36,0.15)]">
              <span className="w-1.5 h-1.5 rounded-full bg-amber-400 animate-pulse" />
              In Progress
            </span>
          )}
        </div>

        {/* Project Title */}
        <h3
          className={`text-3xl xs:text-4xl sm:text-5xl lg:text-6xl font-serif dm-serif-display uppercase tracking-tight leading-none mb-5 sm:mb-6 transition-all duration-300 ${
            isActive
              ? isDark
                ? 'text-[#F4F4F6] drop-shadow-[0_15px_35px_rgba(0,0,0,0.95)]'
                : 'text-slate-900 drop-shadow-[0_10px_25px_rgba(255,255,255,0.95)]'
              : isDark
              ? 'text-neutral-400'
              : 'text-slate-600'
          }`}
        >
          {project.title}
        </h3>

        {/* Mobile-Only Project Image */}
        <div className="block lg:hidden my-6">
          <ProjectImage
            project={project}
            isDark={isDark}
            shouldReduceMotion={shouldReduceMotion}
            isMobileView
          />
        </div>

        {/* Project Description */}
        <p
          className={`text-sm sm:text-base leading-relaxed mb-6 sm:mb-8 font-sans transition-colors duration-300 ${
            isDark ? 'text-neutral-400' : 'text-slate-600'
          }`}
        >
          {project.description}
        </p>

        {/* Minimal Tech Stack with slash separators */}
        <div
          className={`mb-8 pt-4 border-t transition-colors duration-300 ${
            isDark ? 'border-white/[0.08]' : 'border-slate-300/80'
          }`}
        >
          <div className="flex flex-wrap items-center gap-x-2 gap-y-1.5 text-xs sm:text-sm font-mono tracking-wide">
            {project.technologies.map((tech, idx) => (
              <React.Fragment key={tech}>
                <span
                  className={`transition-all duration-200 cursor-default ${
                    isDark
                      ? 'text-neutral-400 hover:text-white hover:drop-shadow-[0_0_10px_rgba(255,255,255,0.8)]'
                      : 'text-slate-600 hover:text-slate-950 hover:drop-shadow-[0_0_8px_rgba(255,255,255,0.9)]'
                  }`}
                >
                  {tech}
                </span>
                {idx < project.technologies.length - 1 && (
                  <span
                    className={
                      isDark ? 'text-neutral-600 select-none' : 'text-slate-400 select-none'
                    }
                  >
                    /
                  </span>
                )}
              </React.Fragment>
            ))}
          </div>
        </div>

        {/* Hero-styled CTA Buttons with High-Contrast Inversion Physics */}
        <div className="flex items-center flex-wrap sm:flex-nowrap gap-3 pt-2">
          {/* Primary Action: Live Demo or In Progress indicator */}
          {project.inProgress ? (
            <div
              className={`inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-full text-xs font-semibold cursor-default border backdrop-blur-xl ${
                isDark
                  ? 'bg-amber-400/10 text-amber-300 border-amber-400/30 shadow-[0_0_20px_rgba(251,191,36,0.15)]'
                  : 'bg-amber-50 text-amber-900 border-amber-300 shadow-sm'
              }`}
            >
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-400 opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-amber-400" />
              </span>
              <span>In Progress · Coming Soon</span>
            </div>
          ) : (
            <a
              href={project.live}
              target="_blank"
              rel="noreferrer"
              className={`inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-full text-xs font-semibold active:scale-95 transition-all duration-300 group ${
                isDark
                  ? 'bg-white text-black border border-white hover:bg-black hover:text-white hover:border-white hover:shadow-[0_0_25px_rgba(255,255,255,0.6)]'
                  : 'bg-slate-900 text-white border border-slate-900 shadow-[0_8px_20px_rgba(15,23,42,0.22)] hover:bg-slate-800 hover:shadow-[0_12px_28px_rgba(15,23,42,0.3)]'
              }`}
              aria-label={`${project.title} Live Demo (opens in new tab)`}
            >
              <span>Live Demo</span>
              <ArrowUpRight className="w-3.5 h-3.5 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </a>
          )}

          {/* Secondary Action: Source Code */}
          <a
            href={project.github}
            target="_blank"
            rel="noreferrer"
            className={`inline-flex items-center justify-center gap-2 px-4.5 py-2.5 rounded-full text-xs font-medium active:scale-95 transition-all duration-300 group ${
              isDark
                ? 'bg-neutral-900/80 text-neutral-200 border border-neutral-700 hover:bg-white hover:text-black hover:border-white hover:shadow-[0_0_25px_rgba(255,255,255,0.5)]'
                : 'bg-white/85 text-slate-800 border border-slate-200/90 shadow-[0_4px_16px_-2px_rgba(15,23,42,0.05),inset_0_1px_1px_rgba(255,255,255,1)] hover:bg-white hover:border-slate-300 hover:text-slate-950 hover:shadow-[0_8px_24px_rgba(15,23,42,0.1)]'
            }`}
            aria-label={`${project.title} GitHub repository (opens in new tab)`}
          >
            <GithubIcon className="w-3.5 h-3.5 transition-colors duration-300" />
            <span>GitHub</span>
          </a>
        </div>
      </div>
    </div>
  )
}

/**
 * Interactive Project Image with 3D Tilt and Cursor Hover Overlay
 */
function ProjectImage({ project, isDark, shouldReduceMotion, isMobileView = false }) {
  const containerRef = useRef(null)
  const [isHovered, setIsHovered] = useState(false)
  const [rotate, setRotate] = useState({ x: 0, y: 0 })
  const [cursorPos, setCursorPos] = useState({ x: 0, y: 0 })

  const handleMouseMove = (e) => {
    if (shouldReduceMotion || isMobileView) return
    const el = containerRef.current
    if (!el) return
    const rect = el.getBoundingClientRect()
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top

    // Calculate subtle 3D tilt angles (-4.5 deg to +4.5 deg)
    const rotateY = ((x - rect.width / 2) / (rect.width / 2)) * 4.5
    const rotateX = -((y - rect.height / 2) / (rect.height / 2)) * 4.5

    setRotate({ x: rotateX, y: rotateY })
    setCursorPos({ x, y })
  }

  const handleMouseEnter = () => {
    setIsHovered(true)
  }

  const handleMouseLeave = () => {
    setIsHovered(false)
    setRotate({ x: 0, y: 0 })
  }

  return (
    <a
      href={project.inProgress ? undefined : project.live}
      target={project.inProgress ? undefined : '_blank'}
      rel={project.inProgress ? undefined : 'noreferrer'}
      onClick={(e) => {
        if (project.inProgress) {
          e.preventDefault()
        }
      }}
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className={`group relative block w-full rounded-2xl sm:rounded-3xl overflow-hidden border ${
        project.inProgress ? 'cursor-default' : 'cursor-pointer'
      } outline-none select-none transition-all duration-500 ${
        isDark
          ? 'border-white/10 bg-neutral-950/80 shadow-[0_20px_60px_rgba(0,0,0,0.8)] hover:border-white/30'
          : 'border-slate-200/90 bg-white shadow-[0_20px_50px_-10px_rgba(15,23,42,0.08),0_4px_12px_rgba(15,23,42,0.03)] hover:border-slate-300 hover:shadow-[0_25px_60px_-10px_rgba(15,23,42,0.12)]'
      }`}
      style={{
        perspective: 1000,
      }}
      aria-label={project.inProgress ? `${project.title} - Currently in progress` : `Open live preview of ${project.title}`}
    >
      <motion.div
        animate={
          shouldReduceMotion
            ? {}
            : {
                rotateX: rotate.x,
                rotateY: rotate.y,
                scale: isHovered ? 1.02 : 1,
              }
        }
        transition={{
          type: 'spring',
          stiffness: 300,
          damping: 24,
          mass: 0.8,
        }}
        className="relative w-full aspect-[16/10] sm:aspect-[16/9] overflow-hidden"
      >
        {/* Project Image */}
        <img
          src={project.image}
          alt={`Preview of ${project.title} project`}
          loading="lazy"
          className="w-full h-full object-cover object-top transition-transform duration-700 ease-out group-hover:scale-105"
        />

        {/* Subtle Dark Vignette & Frame */}
        <div
          className={`absolute inset-0 pointer-events-none transition-opacity duration-300 ${
            isDark
              ? 'bg-gradient-to-t from-black/80 via-black/20 to-transparent'
              : 'bg-gradient-to-t from-slate-900/40 via-transparent to-transparent'
          }`}
        />

        {/* Ambient Top Frame Border */}
        <div className="absolute inset-0 rounded-2xl sm:rounded-3xl ring-1 ring-inset ring-white/10 pointer-events-none" />

        {/* Corner Project Index Stamp matching Hero badge */}
        <div className="absolute top-3 left-3 sm:top-4 sm:left-4 z-10 flex flex-wrap items-center gap-1.5 sm:gap-2 max-w-[calc(100%-1.5rem)] sm:max-w-[calc(100%-2rem)]">
          <span
            className={`px-2.5 xs:px-3 py-1 xs:py-1.5 rounded-full border backdrop-blur-xl text-[10px] xs:text-[11px] font-mono tracking-wider transition-all duration-300 ${
              isDark
                ? 'border-white/15 bg-black/75 text-neutral-200'
                : 'border-slate-200/90 bg-white/90 text-slate-900 shadow-sm'
            }`}
          >
            {project.number} · {project.title}
          </span>
          {project.inProgress && (
            <span className="px-2.5 xs:px-3 py-1 xs:py-1.5 rounded-full border backdrop-blur-xl text-[10px] xs:text-[11px] font-mono tracking-wider border-amber-400/50 bg-black/80 text-amber-300 flex items-center gap-1.5 shadow-[0_0_15px_rgba(251,191,36,0.25)]">
              <span className="w-1.5 h-1.5 rounded-full bg-amber-400 animate-pulse" />
              In Progress
            </span>
          )}
        </div>

        {/* Hover Overlay: Center Inversion Badge */}
        <div
          className={`absolute inset-0 flex items-center justify-center pointer-events-none transition-all duration-300 ${
            isHovered ? 'opacity-100 backdrop-blur-[2px] bg-black/40' : 'opacity-0'
          }`}
        >
          <div
            className={`flex items-center gap-2.5 px-5 py-2.5 rounded-full border text-xs font-mono uppercase tracking-wider font-semibold shadow-2xl transition-all duration-300 ${
              project.inProgress
                ? 'bg-amber-400 text-black border-amber-300 shadow-[0_0_25px_rgba(251,191,36,0.6)]'
                : isDark
                ? 'bg-white text-black border-white shadow-[0_0_25px_rgba(255,255,255,0.8)]'
                : 'bg-slate-900 text-white border-white/40 shadow-[0_8px_25px_rgba(15,23,42,0.4)]'
            }`}
          >
            <span className="relative flex h-2 w-2">
              <span
                className={`animate-ping absolute inline-flex h-full w-full rounded-full opacity-75 ${
                  project.inProgress ? 'bg-black' : isDark ? 'bg-black' : 'bg-white'
                }`}
              />
              <span
                className={`relative inline-flex rounded-full h-2 w-2 ${
                  project.inProgress ? 'bg-black' : isDark ? 'bg-black' : 'bg-white'
                }`}
              />
            </span>
            <span>{project.inProgress ? 'IN PROGRESS (WIP)' : 'VIEW PROJECT'}</span>
            {!project.inProgress && (
              <ArrowUpRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            )}
          </div>
        </div>

        {/* Floating Custom Cursor Pill (Desktop Only) */}
        {!isMobileView && isHovered && !shouldReduceMotion && (
          <motion.div
            className={`hidden md:flex pointer-events-none absolute z-30 items-center gap-2 px-3.5 py-1.5 rounded-full text-[11px] font-mono font-semibold tracking-wider uppercase transition-colors ${
              isDark
                ? 'bg-white text-black shadow-[0_0_25px_rgba(255,255,255,0.8)]'
                : 'bg-slate-900 text-white shadow-[0_8px_20px_rgba(15,23,42,0.4)]'
            }`}
            style={{
              left: cursorPos.x + 16,
              top: cursorPos.y + 16,
            }}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            transition={{ duration: 0.15 }}
          >
            <span>Live</span>
            <ArrowUpRight className="w-3.5 h-3.5" />
          </motion.div>
        )}
      </motion.div>
    </a>
  )
}

/**
 * Main Projects Section Component
 */
export default function Projects({ isDark = true }) {
  const [activeProjectIndex, setActiveProjectIndex] = useState(0)
  const shouldReduceMotion = useReducedMotion()
  const sectionRef = useRef(null)

  const activeProject = PROJECTS_DATA[activeProjectIndex] || PROJECTS_DATA[0]

  return (
    <section
      id="projects"
      ref={sectionRef}
      className={`relative w-full transition-colors duration-500 overflow-hidden ${
        isDark ? 'bg-black text-[#F4F4F6]' : 'bg-[#F8FAFC] text-slate-900'
      }`}
    >
      {/* 1. Studio Lighting matching Hero page */}
      <div className="absolute inset-0 pointer-events-none -z-10 select-none overflow-hidden">
        {isDark ? (
          <>
            <div className="absolute top-0 inset-x-0 h-[480px] bg-[radial-gradient(ellipse_at_50%_0%,_rgba(255,255,255,0.06)_0%,_transparent_65%)]" />
            <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] sm:w-[1100px] h-[550px] rounded-full blur-[90px] bg-[radial-gradient(circle_at_center,_rgba(255,255,255,0.08)_0%,_rgba(255,255,255,0.02)_35%,_transparent_70%)]" />
          </>
        ) : (
          <>
            <div className="absolute top-0 inset-x-0 h-[500px] bg-[radial-gradient(ellipse_at_50%_0%,_rgba(255,255,255,0.85)_0%,_rgba(248,250,252,0.3)_50%,_transparent_70%)]" />
            <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] sm:w-[1100px] h-[550px] rounded-full blur-[95px] bg-[radial-gradient(circle_at_center,_rgba(224,242,254,0.35)_0%,_rgba(241,245,249,0.3)_35%,_transparent_70%)]" />
          </>
        )}
        {/* Micro-Grain Texture */}
        <div className="absolute inset-0 bg-grain opacity-[0.02]" />
      </div>

      {/* 2. Editorial Section Header */}
      <ProjectsHeader isDark={isDark} shouldReduceMotion={shouldReduceMotion} />

      {/* 3. Sticky Storytelling Project Showcase */}
      <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-14 relative">
          {/* LEFT COLUMN: Project Narrative Stories */}
          <div className="lg:col-span-6 flex flex-col">
            {PROJECTS_DATA.map((project, index) => (
              <ProjectInfo
                key={project.id}
                project={project}
                index={index}
                total={PROJECTS_DATA.length}
                isDark={isDark}
                isActive={activeProjectIndex === index}
                onActivate={(idx) => setActiveProjectIndex(idx)}
                shouldReduceMotion={shouldReduceMotion}
              />
            ))}
          </div>

          {/* RIGHT COLUMN: Sticky Desktop Project Preview */}
          <div className="hidden lg:block lg:col-span-6 relative">
            <div className="sticky top-28 xl:top-36 h-[calc(100vh-12rem)] max-h-[640px] flex items-center justify-center pointer-events-auto">
              {/* Active Project Image Transition Container */}
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeProject.id}
                  initial={
                    shouldReduceMotion
                      ? { opacity: 0 }
                      : {
                          opacity: 0,
                          scale: 0.94,
                          x: 24,
                          rotateY: -3,
                          filter: 'blur(8px)',
                        }
                  }
                  animate={{
                    opacity: 1,
                    scale: 1,
                    x: 0,
                    rotateY: 0,
                    filter: 'blur(0px)',
                  }}
                  exit={
                    shouldReduceMotion
                      ? { opacity: 0 }
                      : {
                          opacity: 0,
                          scale: 0.96,
                          x: -20,
                          rotateY: 2,
                          filter: 'blur(6px)',
                        }
                  }
                  transition={{
                    duration: 0.65,
                    ease: [0.16, 1, 0.3, 1],
                  }}
                  className="w-full"
                >
                  <ProjectImage
                    project={activeProject}
                    isDark={isDark}
                    shouldReduceMotion={shouldReduceMotion}
                  />

                  {/* Active Indicator & Quick Jump Dots */}
                  <div className="mt-5 flex items-center justify-between px-2">
                    <div className="flex items-center gap-2">
                      {PROJECTS_DATA.map((p, idx) => (
                        <button
                          key={p.id}
                          onClick={() => {
                            setActiveProjectIndex(idx)
                            const el = document.getElementById(`project-story-${p.id}`)
                            if (el) el.scrollIntoView({ behavior: 'smooth', block: 'center' })
                          }}
                          className={`h-1.5 transition-all duration-300 rounded-full outline-none cursor-pointer ${
                            activeProjectIndex === idx
                              ? isDark
                                ? 'w-8 bg-white shadow-[0_0_12px_rgba(255,255,255,0.9)]'
                                : 'w-8 bg-slate-900 shadow-[0_0_8px_rgba(15,23,42,0.6)]'
                              : isDark
                              ? 'w-2 bg-neutral-700 hover:bg-white/80'
                              : 'w-2 bg-slate-300 hover:bg-slate-600'
                          }`}
                          aria-label={`Jump to project ${p.number}: ${p.title}`}
                        />
                      ))}
                    </div>

                    <div
                      className={`text-[11px] font-mono flex items-center gap-2 ${
                        isDark ? 'text-neutral-500' : 'text-slate-500'
                      }`}
                    >
                      <span>{activeProject.featuredMetrics}</span>
                    </div>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
