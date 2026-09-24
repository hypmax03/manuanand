import React, { useState, useRef } from 'react'
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion'
import { Check, Copy, Terminal, Code2, Sparkles } from 'lucide-react'

export default function CodeCard({ isDark }) {
  const [copied, setCopied] = useState(false)
  const cardRef = useRef(null)

  // 3D Perspective Tilt Physics via Framer Motion
  const x = useMotionValue(0)
  const y = useMotionValue(0)

  const mouseXSpring = useSpring(x, { stiffness: 220, damping: 25 })
  const mouseYSpring = useSpring(y, { stiffness: 220, damping: 25 })

  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ['7deg', '-7deg'])
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ['-7deg', '7deg'])

  const handleMouseMove = (e) => {
    if (!cardRef.current) return
    const rect = cardRef.current.getBoundingClientRect()
    const width = rect.width
    const height = rect.height
    const mouseX = e.clientX - rect.left
    const mouseY = e.clientY - rect.top
    const xPct = mouseX / width - 0.5
    const yPct = mouseY / height - 0.5
    x.set(xPct)
    y.set(yPct)
  }

  const handleMouseLeave = () => {
    x.set(0)
    y.set(0)
  }

  const rawCode = `const developer = {
  name: "Manu Anand",
  role: "MERN Stack Developer",
  stack: ["React", "Next.js", "Node.js", "MongoDB"],
  focus: "Building for the web",
  location: "Kerala, India",
  available: true
};`

  const handleCopy = () => {
    navigator.clipboard.writeText(rawCode)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <motion.div
      initial={{ opacity: 0, x: 30 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.8, delay: 0.35, ease: [0.16, 1, 0.3, 1] }}
      className="relative w-full max-w-lg mx-auto lg:max-w-none perspective-1000"
    >
      {/* Subtle background glow beneath the card */}
      <div className="absolute -inset-1.5 bg-gradient-to-r from-teal-500/10 via-neutral-500/5 to-teal-500/10 rounded-2xl blur-xl opacity-50 pointer-events-none" />

      {/* Floating Wrapper with continuous subtle ambient drift */}
      <motion.div
        animate={{
          y: [0, -6, 0],
        }}
        transition={{
          duration: 6,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
      >
        {/* Interactive 3D Tilt Card */}
        <motion.div
          ref={cardRef}
          onMouseMove={handleMouseMove}
          onMouseLeave={handleMouseLeave}
          style={{
            rotateX,
            rotateY,
            transformStyle: 'preserve-3d',
          }}
          className={`relative rounded-2xl border backdrop-blur-xl transition-colors duration-300 shadow-[0_20px_50px_rgba(0,0,0,0.3)] overflow-hidden ${
            isDark
              ? 'bg-neutral-900/80 border-neutral-800/90 text-neutral-200'
              : 'bg-white/85 border-neutral-200/90 text-neutral-800 shadow-[0_20px_50px_rgba(0,0,0,0.08)]'
          }`}
        >
          {/* Card Top Window Bar */}
          <div className={`px-4 py-3 border-b flex items-center justify-between text-xs transition-colors ${
            isDark ? 'border-neutral-800/80 bg-neutral-950/40' : 'border-neutral-200/80 bg-neutral-100/50'
          }`}>
            {/* Window Controls */}
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-red-500/80 border border-red-600/30 inline-block" />
              <span className="w-2.5 h-2.5 rounded-full bg-amber-500/80 border border-amber-600/30 inline-block" />
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-500/80 border border-emerald-600/30 inline-block" />
            </div>

            {/* Active Tab */}
            <div className={`flex items-center gap-1.5 px-3 py-1 rounded-md font-mono text-[11px] border ${
              isDark
                ? 'bg-neutral-900/90 border-neutral-800 text-neutral-300'
                : 'bg-white border-neutral-200 text-neutral-700'
            }`}>
              <Code2 className="w-3 h-3 text-teal-400" />
              <span>developer.ts</span>
            </div>

            {/* Copy Button */}
            <button
              onClick={handleCopy}
              aria-label="Copy snippet"
              className={`p-1.5 rounded-md border transition-all duration-200 focus:outline-none ${
                copied
                  ? 'bg-teal-500/20 text-teal-400 border-teal-500/30'
                  : isDark
                  ? 'bg-neutral-800/50 text-neutral-400 border-neutral-700/50 hover:text-white hover:border-neutral-600'
                  : 'bg-neutral-200/60 text-neutral-600 border-neutral-300 hover:text-neutral-900'
              }`}
            >
              {copied ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
            </button>
          </div>

          {/* Code Content Area with Line Numbers and Syntax Highlighting */}
          <div className="p-5 font-mono text-xs leading-relaxed overflow-x-auto">
            <pre className="flex gap-4">
              {/* Line numbers */}
              <div className="select-none text-neutral-600 flex flex-col text-right font-light">
                <span>1</span>
                <span>2</span>
                <span>3</span>
                <span>4</span>
                <span>5</span>
                <span>6</span>
                <span>7</span>
                <span>8</span>
              </div>

              {/* Code lines */}
              <div className="flex flex-col text-left">
                <div>
                  <span className="text-teal-400 font-semibold">const</span>{' '}
                  <span className="text-neutral-100 dark:text-neutral-100">developer</span>{' '}
                  <span className="text-neutral-400">=</span>{' '}
                  <span className="text-neutral-300">{'{'}</span>
                </div>
                <div className="pl-4">
                  <span className="text-neutral-400">name:</span>{' '}
                  <span className="text-teal-300">"Manu Anand"</span>
                  <span className="text-neutral-400">,</span>
                </div>
                <div className="pl-4">
                  <span className="text-neutral-400">role:</span>{' '}
                  <span className="text-teal-300">"MERN Stack Developer"</span>
                  <span className="text-neutral-400">,</span>
                </div>
                <div className="pl-4">
                  <span className="text-neutral-400">stack:</span>{' '}
                  <span className="text-neutral-400">[</span>
                  <span className="text-emerald-300">"React"</span>
                  <span className="text-neutral-400">, </span>
                  <span className="text-emerald-300">"Next.js"</span>
                  <span className="text-neutral-400">, </span>
                  <span className="text-emerald-300">"Node.js"</span>
                  <span className="text-neutral-400">, </span>
                  <span className="text-emerald-300">"MongoDB"</span>
                  <span className="text-neutral-400">],</span>
                </div>
                <div className="pl-4">
                  <span className="text-neutral-400">focus:</span>{' '}
                  <span className="text-teal-300">"Building for the web"</span>
                  <span className="text-neutral-400">,</span>
                </div>
                <div className="pl-4">
                  <span className="text-neutral-400">location:</span>{' '}
                  <span className="text-teal-300">"Kerala, India"</span>
                  <span className="text-neutral-400">,</span>
                </div>
                <div className="pl-4">
                  <span className="text-neutral-400">available:</span>{' '}
                  <span className="text-amber-400">true</span>
                </div>
                <div>
                  <span className="text-neutral-300">{'}'}</span>
                  <span className="text-neutral-400">;</span>
                </div>
              </div>
            </pre>
          </div>

          {/* Card Bottom Status Bar */}
          <div className={`px-4 py-2.5 border-t flex items-center justify-between text-[11px] font-mono transition-colors ${
            isDark ? 'border-neutral-800/80 bg-neutral-950/40 text-neutral-400' : 'border-neutral-200/80 bg-neutral-100/50 text-neutral-600'
          }`}>
            <div className="flex items-center gap-2">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-teal-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-teal-500"></span>
              </span>
              <span>Ready to collaborate</span>
            </div>
            <span className="text-neutral-500 text-[10px]">TypeScript • UTF-8</span>
          </div>
        </motion.div>
      </motion.div>
    </motion.div>
  )
}
