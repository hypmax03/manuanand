import React, { useState, useEffect, useRef } from 'react'
import { motion, useInView, useReducedMotion } from 'framer-motion'
import {
  ArrowUp,
  ArrowUpRight,
  Mail,
  Copy,
  Check,
  Clock,
} from 'lucide-react'

// Pixel-perfect SVG icons for brand links matching HeroActions.jsx
const GithubIcon = ({ className = 'w-4 h-4' }) => (
  <svg className={className} fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
    <path
      fillRule="evenodd"
      d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"
      clipRule="evenodd"
    />
  </svg>
)

const LinkedinIcon = ({ className = 'w-4 h-4' }) => (
  <svg className={className} fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
    <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.88 8.56a1.68 1.68 0 0 0 1.68-1.68c0-.93-.75-1.69-1.68-1.69a1.69 1.69 0 0 0-1.69 1.69c0 .93.76 1.68 1.69 1.68m1.39 9.94v-8.37H5.5v8.37h2.77z" />
  </svg>
)

const InstagramIcon = ({ className = 'w-4 h-4' }) => (
  <svg className={className} fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
  </svg>
)

export default function Footer({ isDark = true, onOpenContact }) {
  const footerRef = useRef(null)
  const isInView = useInView(footerRef, { once: true, amount: 0.15 })
  const shouldReduceMotion = useReducedMotion()

  const [copied, setCopied] = useState(false)
  const [localTime, setLocalTime] = useState('')

  // Live Kerala (Asia/Kolkata, IST) Clock
  useEffect(() => {
    const updateTime = () => {
      try {
        const now = new Date()
        const timeStr = now.toLocaleTimeString('en-US', {
          timeZone: 'Asia/Kolkata',
          hour: '2-digit',
          minute: '2-digit',
          hour12: true,
        })
        setLocalTime(timeStr)
      } catch {
        setLocalTime('07:30 PM')
      }
    }
    updateTime()
    const timer = setInterval(updateTime, 10000)
    return () => clearInterval(timer)
  }, [])

  const handleCopyEmail = async () => {
    try {
      if (typeof navigator !== 'undefined' && navigator.clipboard) {
        await navigator.clipboard.writeText('manuanandam@gmail.com')
        setCopied(true)
        setTimeout(() => setCopied(false), 2200)
      }
    } catch {
      // Fallback
    }
  }

  const scrollToTop = () => {
    if (typeof window !== 'undefined') {
      window.scrollTo({ top: 0, behavior: 'smooth' })
    }
  }

  const socialLinks = [
    { name: 'GitHub', icon: GithubIcon, href: 'https://github.com/hypmax03', handle: '@hypmax03' },
    { name: 'LinkedIn', icon: LinkedinIcon, href: 'https://linkedin.com', handle: '/in/manuanand' },
    { name: 'Instagram', icon: InstagramIcon, href: 'https://instagram.com/manu_x03', handle: '@manu_x03' },
    { name: 'Email', icon: Mail, href: 'mailto:manuanandam@gmail.com', handle: 'manuanandam@gmail.com' },
  ]

  return (
    <footer
      id="contact"
      ref={footerRef}
      className={`relative w-full overflow-hidden transition-colors duration-500 selection:bg-white/20 selection:text-white pt-16 sm:pt-24 pb-12 sm:pb-16 border-t ${
        isDark ? 'border-white/[0.08]' : 'border-slate-200'
      } ${
        isDark ? 'bg-black text-[#F4F4F6]' : 'bg-[#F8FAFC] text-slate-900'
      }`}
    >
      {/* 1. Atmospheric Studio Lighting (Dark mode ambient lighting) */}
      <div className="absolute inset-0 pointer-events-none -z-10 select-none overflow-hidden">
        {isDark && (
          <>
            <div className="absolute top-0 inset-x-0 h-[450px] bg-[radial-gradient(ellipse_at_50%_0%,_rgba(255,255,255,0.07)_0%,_transparent_65%)]" />
            <div className="absolute bottom-1/4 left-1/2 -translate-x-1/2 w-[900px] sm:w-[1200px] h-[550px] rounded-full blur-[110px] bg-[radial-gradient(circle_at_center,_rgba(255,255,255,0.07)_0%,_rgba(255,255,255,0.015)_40%,_transparent_70%)]" />
          </>
        )}
        <div className="absolute inset-0 bg-grain opacity-[0.02]" />
      </div>

      <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-12">
  
        <div className="mb-14 sm:mb-20 text-center">
          <motion.div
            initial={{ opacity: 0, y: shouldReduceMotion ? 0 : 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            className="flex flex-col items-center text-center"
          >
            <button
              type="button"
              onClick={onOpenContact}
              className="group text-center cursor-pointer outline-none block w-full mx-auto"
              aria-label="Open contact panel"
            >
              <h2
                className={`font-serif dm-serif-display text-3xl xs:text-4xl sm:text-6xl md:text-7xl lg:text-[5.5rem] xl:text-[6.2rem] tracking-tight leading-[1.03] mb-6 select-none transition-all duration-300 text-center ${
                  isDark
                    ? 'text-[#F4F4F6] drop-shadow-[0_15px_40px_rgba(0,0,0,0.9)] group-hover:text-white group-hover:drop-shadow-[0_0_35px_rgba(255,255,255,0.7)]'
                    : 'text-slate-900 drop-shadow-[0_10px_25px_rgba(255,255,255,0.95)] group-hover:text-slate-950'
                }`}
              >
                Let's grow your next idea.
              </h2>
            </button>

            <div className="flex flex-col items-center justify-center gap-6 pt-2 max-w-2xl mx-auto">
              <p
                className={`text-sm sm:text-base leading-relaxed font-sans text-center transition-colors duration-300 ${
                  isDark ? 'text-neutral-400' : 'text-slate-600'
                }`}
              >
                From early architecture to refined user experiences, I build products that earn
                trust, move quickly, and scale. Have a project in mind or want to explore opportunities?
              </p>

              {/* Action Buttons to open the Contact Drawer or Copy Email */}
              <div className="flex flex-wrap items-center justify-center gap-3">
                <button
                  type="button"
                  onClick={onOpenContact}
                  className={`inline-flex items-center gap-2 px-6 py-3 rounded-full text-xs sm:text-sm font-semibold tracking-wide uppercase transition-all duration-300 cursor-pointer ${
                    isDark
                      ? 'bg-white text-black hover:bg-neutral-200 hover:shadow-[0_0_25px_rgba(255,255,255,0.4)] active:scale-95'
                      : 'bg-slate-900 text-white hover:bg-slate-800 shadow-[0_8px_20px_rgba(15,23,42,0.22)] active:scale-95'
                  }`}
                >
                  <span>Get In Touch</span>
                  <ArrowUpRight className="w-4 h-4" />
                </button>

                <button
                  type="button"
                  onClick={handleCopyEmail}
                  className={`flex items-center gap-2 px-4 py-3 rounded-full border text-xs font-mono transition-all duration-200 cursor-pointer ${
                    isDark
                      ? 'border-white/10 bg-white/[0.04] text-neutral-300 hover:bg-white/[0.1] hover:text-white'
                      : 'border-slate-200/90 bg-white text-slate-800 hover:bg-slate-50 shadow-sm'
                  }`}
                  aria-label="Copy email address"
                  title="Copy email address"
                >
                  {copied ? (
                    <>
                      <Check className="w-3.5 h-3.5 text-emerald-400" />
                      <span>Copied!</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3.5 h-3.5 text-neutral-400" />
                      <span>manuanandam@gmail.com</span>
                    </>
                  )}
                </button>

                {/* Live IST clock */}
                <div
                  className={`flex items-center gap-2 px-3.5 py-3 rounded-full border text-xs font-mono ${
                    isDark
                      ? 'border-white/5 bg-white/[0.02] text-neutral-400'
                      : 'border-slate-200/80 bg-white/80 text-slate-600 shadow-xs'
                  }`}
                >
                  <Clock className="w-3.5 h-3.5 text-neutral-500" />
                  <span>IST {localTime || 'Active'}</span>
                </div>
              </div>
            </div>
          </motion.div>
        </div>

        {/* ==================================================================== */}
        {/* BOTTOM FOOTER BAR (Credits & Social Links) */}
        {/* ==================================================================== */}
        <div
          className={`pt-8 pb-4 border-t transition-colors duration-300 flex flex-col sm:flex-row items-center justify-between gap-5 text-xs font-mono ${
            isDark ? 'border-white/[0.08]' : 'border-slate-200'
          }`}
        >
          {/* Left: Designer / Developer Credit */}
          <div
            className={`tracking-wide text-center sm:text-left ${
              isDark ? 'text-neutral-400' : 'text-slate-600'
            }`}
          >
            Designed & Built by{' '}
            <span className={`font-semibold ${isDark ? 'text-white' : 'text-slate-900'}`}>
              Manu Anand
            </span>{' '}
            · Kerala, India @2026
          </div>

          {/* Right: Text-based Social Links & Back to Top */}
          <div className="flex flex-wrap items-center justify-center sm:justify-end gap-4 sm:gap-6 w-full sm:w-auto">
            <nav aria-label="Social Profiles" className="flex flex-wrap items-center justify-center gap-3.5 sm:gap-5">
              {socialLinks.map((social) => {
                const Icon = social.icon
                return (
                  <a
                    key={social.name}
                    href={social.href}
                    target="_blank"
                    rel="noreferrer"
                    className={`group inline-flex items-center gap-1.5 transition-all duration-200 outline-none ${
                      isDark
                        ? 'text-neutral-400 hover:text-white'
                        : 'text-slate-600 hover:text-slate-950'
                    }`}
                  >
                    <Icon className="w-3.5 h-3.5" />
                    <span>{social.name}</span>
                    <ArrowUpRight className="w-3 h-3 opacity-60 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:opacity-100" />
                  </a>
                )
              })}
            </nav>

            {/* Back to Top Button */}
            <button
              onClick={scrollToTop}
              className={`p-2 rounded-xl border transition-all duration-200 flex items-center justify-center group cursor-pointer ${
                isDark
                  ? 'border-white/10 bg-white/[0.03] text-neutral-400 hover:text-white hover:border-white/30 hover:bg-white/[0.08]'
                  : 'border-slate-200/90 bg-white text-slate-700 hover:text-slate-950 hover:bg-slate-50 shadow-sm'
              }`}
              aria-label="Scroll back to top"
            >
              <ArrowUp className="w-3.5 h-3.5 transition-transform duration-200 group-hover:-translate-y-0.5" />
            </button>
          </div>
        </div>
      </div>
    </footer>
  )
}
