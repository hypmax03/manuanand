import React, { useRef } from 'react'
import { motion, useScroll, useTransform, useReducedMotion } from 'framer-motion'
import { Code2, Sparkles, Terminal } from 'lucide-react'

export default function WhatIDo({ isDark = true }) {
  const sectionRef = useRef(null)
  const shouldReduceMotion = useReducedMotion()

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start'],
  })
  const decorParallaxX = useTransform(
    scrollYProgress,
    [0, 1],
    shouldReduceMotion ? [0, 0] : [-30, 30]
  )

  const capabilities = [
    {
      id: '01',
      title: 'Frontend & UI',
      icon: Sparkles,
      description:
        'Building responsive, interactive web interfaces with React, Next.js, and Tailwind CSS. Focused on fluid motion and clean component systems.',
      tags: ['React', 'Next.js', 'Tailwind', 'Framer Motion'],
    },
    {
      id: '02',
      title: 'Backend & APIs',
      icon: Terminal,
      description:
        'Developing secure, structured REST APIs and server architectures with Node.js and Express. Clean routing, auth flows, and maintainable logic.',
      tags: ['Node.js', 'Express.js', 'REST APIs', 'JWT'],
    },
    {
      id: '03',
      title: 'Database & Full-Stack',
      icon: Code2,
      description:
        'Connecting frontend applications with MongoDB schemas. Designing efficient data models, state handling, and end-to-end full-stack integration.',
      tags: ['MongoDB', 'Mongoose', 'Full-Stack', 'Data Flow'],
    },
  ]

  const technologies = [
    { label: 'React.js', category: 'Frontend' },
    { label: 'Next.js', category: 'Frontend' },
    { label: 'JavaScript (ES6+)', category: 'Core' },
    { label: 'Tailwind CSS', category: 'Styling' },
    { label: 'Framer Motion', category: 'Animation' },
    { label: 'Node.js', category: 'Backend' },
    { label: 'Express.js', category: 'Backend' },
    { label: 'MongoDB', category: 'Database' },
    { label: 'REST APIs', category: 'Architecture' },
    { label: 'Git / GitHub', category: 'Tools' },
  ]

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.1,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 16, filter: 'blur(4px)' },
    visible: {
      opacity: 1,
      y: 0,
      filter: 'blur(0px)',
      transition: {
        duration: 0.6,
        ease: [0.16, 1, 0.3, 1],
      },
    },
  }

  return (
    <section
      id="what-i-do"
      ref={sectionRef}
      className={`relative w-full py-16 sm:py-24 lg:py-28 overflow-hidden selection:bg-white/20 selection:text-white transition-colors duration-500 ${
        isDark ? 'bg-transparent text-[#F4F4F6]' : 'bg-transparent text-slate-900'
      }`}
    >

      {/* Ambient Background Lighting */}
      <div className="absolute inset-0 pointer-events-none -z-10 select-none overflow-hidden">
        {/* Ambient Top Lighting */}
        {isDark ? (
          <div className="absolute top-0 inset-x-0 h-80 bg-[radial-gradient(ellipse_at_50%_0%,_rgba(255,255,255,0.05)_0%,_transparent_70%)]" />
        ) : (
          <div className="absolute top-0 inset-x-0 h-80 bg-[radial-gradient(ellipse_at_50%_0%,_rgba(255,255,255,0.85)_0%,_rgba(241,245,249,0.35)_50%,_transparent_70%)]" />
        )}
        <motion.div
          style={{ x: decorParallaxX }}
          className={`absolute top-12 left-0 w-full h-[1px] bg-gradient-to-r from-transparent ${
            isDark ? 'via-white/[0.08]' : 'via-slate-300/80'
          } to-transparent`}
        />
        <div className="absolute inset-0 bg-grain opacity-[0.02]" />
      </div>

      <div className="relative max-w-7xl mx-auto w-full px-5 sm:px-8 lg:px-12">
        {/* Section Header */}
        <div
          className={`flex flex-col md:flex-row md:items-end justify-between gap-4 border-b pb-6 sm:pb-8 mb-12 sm:mb-16 ${
            isDark ? 'border-white/[0.08]' : 'border-slate-300/80'
          }`}
        >
          <div>
            <motion.h2
              initial={shouldReduceMotion ? { opacity: 1 } : { opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
              className={`text-3xl sm:text-5xl lg:text-6xl font-serif dm-serif-display uppercase tracking-tight leading-none select-none transition-all duration-300 ${
                isDark
                  ? 'text-[#F4F4F6] hover:text-white hover:drop-shadow-[0_0_25px_rgba(255,255,255,0.6)]'
                  : 'text-slate-900 hover:text-slate-950'
              }`}
            >
              CRAFT & STACK
            </motion.h2>
          </div>

          <motion.p
            initial={shouldReduceMotion ? { opacity: 1 } : { opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1], delay: 0.15 }}
            className={`text-xs sm:text-sm font-mono uppercase tracking-wider max-w-md md:text-right ${
              isDark ? 'text-neutral-400' : 'text-slate-600'
            }`}
          >
            Computer Engineer building responsive, full-stack web applications across the modern JavaScript ecosystem.
          </motion.p>
        </div>

        {/* 1. What I Do: Compact 3-Pillar Cards */}
        <div className="mb-12 sm:mb-16">
          <div className="flex items-center gap-3 mb-6">
            <span
              className={`text-[11px] font-mono uppercase tracking-wider px-3 py-0.5 rounded-full border backdrop-blur-xl ${
                isDark
                  ? 'border-white/10 bg-white/[0.02] text-neutral-300'
                  : 'border-slate-200/90 bg-white/85 shadow-sm text-slate-800'
              }`}
            >
              What I Do
            </span>
            <div className={`h-[1px] flex-1 ${isDark ? 'bg-white/[0.06]' : 'bg-slate-300/80'}`} />
          </div>

          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            className="grid grid-cols-1 md:grid-cols-3 gap-5"
          >
            {capabilities.map((cap) => {
              const IconComp = cap.icon
              return (
                <motion.div
                  key={cap.id}
                  variants={itemVariants}
                  whileHover={{ y: -4 }}
                  transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
                  className={`p-5 sm:p-6 rounded-2xl border backdrop-blur-2xl transition-all duration-300 ${
                    isDark
                      ? 'bg-neutral-900/40 border-white/[0.08] hover:border-white/20 hover:bg-neutral-900/70 hover:shadow-[0_12px_30px_rgba(0,0,0,0.5)]'
                      : 'bg-white/85 border-slate-200/90 shadow-[0_10px_30px_-4px_rgba(15,23,42,0.05),0_2px_8px_rgba(15,23,42,0.02)] hover:bg-white hover:border-slate-300 hover:shadow-[0_20px_45px_-6px_rgba(15,23,42,0.08)]'
                  }`}
                >
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-[11px] font-mono text-neutral-500 tracking-widest">{cap.id}</span>
                    <div
                      className={`p-2 rounded-xl border backdrop-blur-md ${
                        isDark
                          ? 'border-white/10 bg-white/[0.03] text-neutral-300'
                          : 'border-slate-200/90 bg-slate-50 text-slate-900 shadow-sm'
                      }`}
                    >
                      <IconComp className="w-4 h-4" />
                    </div>
                  </div>

                  <h3
                    className={`text-lg font-bold tracking-tight mb-2 ${
                      isDark ? 'text-white' : 'text-slate-900'
                    }`}
                  >
                    {cap.title}
                  </h3>

                  <p
                    className={`text-xs sm:text-sm leading-relaxed mb-4 ${
                      isDark ? 'text-neutral-400' : 'text-slate-600'
                    }`}
                  >
                    {cap.description}
                  </p>

                  <div
                    className={`flex flex-wrap gap-1.5 pt-3 border-t ${
                      isDark ? 'border-white/[0.06]' : 'border-slate-200/80'
                    }`}
                  >
                    {cap.tags.map((t) => (
                      <span
                        key={t}
                        className={`text-[10px] font-mono px-2 py-0.5 rounded border backdrop-blur-md ${
                          isDark
                            ? 'border-white/5 bg-white/[0.02] text-neutral-400'
                            : 'border-slate-200/80 bg-slate-100/80 text-slate-700'
                        }`}
                      >
                        {t}
                      </span>
                    ))}
                  </div>
                </motion.div>
              )
            })}
          </motion.div>
        </div>

        {/* 2. What I Use: Compact Integrated Tech Arsenal */}
        <motion.div
          initial={shouldReduceMotion ? { opacity: 1 } : { opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className={`p-5 sm:p-7 rounded-2xl border backdrop-blur-2xl transition-all duration-300 ${
            isDark
              ? 'bg-neutral-900/30 border-white/[0.08]'
              : 'bg-white/85 border-slate-200/90 shadow-[0_10px_30px_-4px_rgba(15,23,42,0.05),0_2px_8px_rgba(15,23,42,0.02)]'
          }`}
        >
          <div className="flex items-center justify-between gap-4 mb-4">
            <span
              className={`text-[11px] font-mono uppercase tracking-wider ${
                isDark ? 'text-neutral-400' : 'text-slate-600'
              }`}
            >
              What I Use // Primary Stack
            </span>
            <span className="text-[11px] font-mono text-neutral-500">MERN Ecosystem</span>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            {technologies.map((tech) => (
              <span
                key={tech.label}
                className={`px-3.5 py-1.5 text-xs font-medium rounded-full border transition-all duration-200 cursor-default backdrop-blur-md ${
                  isDark
                    ? 'border-white/10 bg-white/[0.03] text-neutral-300 hover:bg-white hover:text-black hover:border-white hover:shadow-[0_0_15px_rgba(255,255,255,0.45)]'
                    : 'border-slate-200/90 bg-white/90 text-slate-800 shadow-sm hover:bg-white hover:border-slate-300 hover:text-slate-950 hover:shadow-md'
                }`}
              >
                {tech.label}
              </span>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  )
}
