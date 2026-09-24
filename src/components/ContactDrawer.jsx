import React, { useEffect, useRef } from 'react'
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion'
import { X, Mail, MapPin, Send, ArrowUpRight } from 'lucide-react'

export default function ContactDrawer({ isOpen, onClose, isDark = true }) {
  const shouldReduceMotion = useReducedMotion()
  const firstInputRef = useRef(null)

  // Close on Escape key & lock background body scroll
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        onClose()
      }
    }

    if (isOpen) {
      window.addEventListener('keydown', handleKeyDown)
      document.body.style.overflow = 'hidden'
      // Focus first input after animation begins
      setTimeout(() => {
        firstInputRef.current?.focus()
      }, 150)
    }

    return () => {
      window.removeEventListener('keydown', handleKeyDown)
      document.body.style.overflow = ''
    }
  }, [isOpen, onClose])

  const drawerVariants = {
    closed: {
      x: '100%',
      opacity: shouldReduceMotion ? 0 : 1,
      transition: shouldReduceMotion
        ? { duration: 0.2 }
        : { type: 'spring', damping: 32, stiffness: 320, mass: 0.75 },
    },
    open: {
      x: '0%',
      opacity: 1,
      transition: shouldReduceMotion
        ? { duration: 0.25 }
        : { type: 'spring', damping: 30, stiffness: 300, mass: 0.8 },
    },
  }

  const backdropVariants = {
    closed: { opacity: 0 },
    open: { opacity: 1, transition: { duration: 0.25 } },
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex justify-end" role="dialog" aria-modal="true" aria-label="Contact Drawer">
          {/* Dimmed & Blurred Backdrop */}
          <motion.div
            key="drawer-backdrop"
            variants={backdropVariants}
            initial="closed"
            animate="open"
            exit="closed"
            onClick={onClose}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm cursor-pointer"
            aria-hidden="true"
          />

          {/* Slide-over Drawer Panel */}
          <motion.aside
            key="drawer-panel"
            variants={drawerVariants}
            initial="closed"
            animate="open"
            exit="closed"
            className={`relative z-10 w-full sm:max-w-lg md:max-w-xl h-full flex flex-col justify-between border-l backdrop-blur-2xl shadow-2xl overflow-y-auto ${
              isDark
                ? 'bg-neutral-950/95 border-neutral-800/90 text-[#F4F4F6]'
                : 'bg-white/95 border-slate-200/90 text-slate-900 shadow-[0_0_60px_rgba(0,0,0,0.18)]'
            }`}
            style={{
              paddingTop: 'env(safe-area-inset-top, 24px)',
              paddingBottom: 'env(safe-area-inset-bottom, 24px)',
            }}
          >
            {/* Top Bar with Badge, Title, and Close Button */}
            <div>
              <div className="p-6 sm:p-8 pb-4 flex items-start justify-between border-b border-white/[0.08] dark:border-white/[0.08]">
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <span
                      className={`text-[11px] font-mono uppercase tracking-wider px-2.5 py-0.5 rounded-full border ${
                        isDark
                          ? 'border-white/10 bg-white/[0.03] text-neutral-300'
                          : 'border-slate-300 bg-slate-100 text-slate-700'
                      }`}
                    >
                      Contact
                    </span>
                    <span className="flex h-2 w-2 relative">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                      <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                    </span>
                    <span className="text-[11px] font-mono text-neutral-500">Available</span>
                  </div>

                  <h2 className="font-serif dm-serif-display text-2xl sm:text-3xl tracking-tight">
                    Let's start a conversation.
                  </h2>
                </div>

                {/* Close Button */}
                <button
                  onClick={onClose}
                  aria-label="Close Contact Panel"
                  className={`p-2.5 rounded-full border transition-all duration-200 cursor-pointer active:scale-95 group ${
                    isDark
                      ? 'border-white/10 bg-white/5 hover:bg-white/15 text-neutral-300 hover:text-white'
                      : 'border-slate-300 bg-slate-100 hover:bg-slate-200 text-slate-600 hover:text-slate-950'
                  }`}
                >
                  <X className="w-5 h-5 transition-transform duration-200 group-hover:rotate-90" />
                </button>
              </div>

              {/* Subtitle & Introduction */}
              <div className="px-6 sm:px-8 pt-5 pb-2">
                <p
                  className={`text-xs sm:text-sm leading-relaxed ${
                    isDark ? 'text-neutral-400' : 'text-slate-600'
                  }`}
                >
                  Have an exciting project, an engineering opportunity, or just want to chat about web technology and design? Send a message below and I'll reply promptly.
                </p>
              </div>

              {/* Formspree Form Component */}
              <div className="px-6 sm:px-8 py-4">
                <form action="https://formspree.io/f/mzdlakzq" method="POST">
                  {/* Name Input */}
                  <div className="mb-4">
                    <label
                      htmlFor="drawer-name"
                      className="block text-xs font-mono uppercase tracking-wider text-neutral-400 dark:text-neutral-400 mb-1.5"
                    >
                      Your Name
                    </label>
                    <input
                      ref={firstInputRef}
                      id="drawer-name"
                      name="name"
                      type="text"
                      required
                      className={`w-full border border-gray-300 rounded px-4 py-2.5 text-sm transition-all focus:outline-none focus:ring-2 ${
                        isDark
                          ? 'border-white/10 bg-neutral-900/90 text-white placeholder-neutral-500 focus:border-white/40 focus:ring-white/20'
                          : 'border-slate-300 bg-white text-slate-900 placeholder-slate-400 focus:border-slate-500 focus:ring-slate-300'
                      }`}
                      placeholder="Your Name"
                    />
                  </div>

                  {/* Email Input */}
                  <div className="mb-4">
                    <label
                      htmlFor="drawer-email"
                      className="block text-xs font-mono uppercase tracking-wider text-neutral-400 dark:text-neutral-400 mb-1.5"
                    >
                      Your Email
                    </label>
                    <input
                      id="drawer-email"
                      name="email"
                      type="email"
                      required
                      className={`w-full border border-gray-300 rounded px-4 py-2.5 text-sm transition-all focus:outline-none focus:ring-2 ${
                        isDark
                          ? 'border-white/10 bg-neutral-900/90 text-white placeholder-neutral-500 focus:border-white/40 focus:ring-white/20'
                          : 'border-slate-300 bg-white text-slate-900 placeholder-slate-400 focus:border-slate-500 focus:ring-slate-300'
                      }`}
                      placeholder="Your Email"
                    />
                  </div>

                  {/* Message Textarea */}
                  <div className="mb-5">
                    <label
                      htmlFor="drawer-message"
                      className="block text-xs font-mono uppercase tracking-wider text-neutral-400 dark:text-neutral-400 mb-1.5"
                    >
                      Your Message
                    </label>
                    <textarea
                      id="drawer-message"
                      name="message"
                      required
                      rows={5}
                      className={`w-full border border-gray-300 rounded px-4 py-2.5 text-sm transition-all focus:outline-none focus:ring-2 resize-none ${
                        isDark
                          ? 'border-white/10 bg-neutral-900/90 text-white placeholder-neutral-500 focus:border-white/40 focus:ring-white/20'
                          : 'border-slate-300 bg-white text-slate-900 placeholder-slate-400 focus:border-slate-500 focus:ring-slate-300'
                      }`}
                      placeholder="Your Message"
                    ></textarea>
                  </div>

                  {/* Submit Button */}
                  <button
                    id="send-btn"
                    type="submit"
                    className={`w-full bg-black text-white px-6 py-3 rounded-xl font-medium text-sm transition-all duration-300 cursor-pointer shadow-md active:scale-[0.99] flex items-center justify-center gap-2 group ${
                      isDark
                        ? 'border border-white/20 hover:border-white hover:bg-white hover:text-black hover:shadow-[0_0_20px_rgba(255,255,255,0.35)]'
                        : 'hover:bg-slate-800 hover:shadow-[0_4px_14px_rgba(0,0,0,0.25)]'
                    }`}
                  >
                    <span>Send Message</span>
                    <Send className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                  </button>
                </form>
              </div>
            </div>

            {/* Bottom Quick Contact & Socials Bar */}
            <div className="p-6 sm:p-8 pt-4 border-t border-white/[0.08] dark:border-white/[0.08] space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                {/* Email Info */}
                <a
                  href="mailto:manuanandam@gmail.com"
                  className={`flex items-center gap-2.5 p-3 rounded-xl border transition-all ${
                    isDark
                      ? 'border-white/5 bg-white/[0.02] hover:bg-white/5 text-neutral-300 hover:text-white'
                      : 'border-slate-200 bg-slate-50 hover:bg-slate-100 text-slate-700 hover:text-slate-900'
                  }`}
                >
                  <Mail className="w-3.5 h-3.5 text-neutral-400" />
                  <span className="truncate font-mono">manuanandam@gmail.com</span>
                </a>

                {/* Location Info */}
                <div
                  className={`flex items-center gap-2.5 p-3 rounded-xl border ${
                    isDark
                      ? 'border-white/5 bg-white/[0.02] text-neutral-300'
                      : 'border-slate-200 bg-slate-50 text-slate-700'
                  }`}
                >
                  <MapPin className="w-3.5 h-3.5 text-neutral-400" />
                  <span className="truncate font-mono">Kerala, India</span>
                </div>
              </div>

              <div className={`flex items-center justify-between text-xs font-mono pt-1 ${
                isDark ? 'text-neutral-400' : 'text-slate-500'
              }`}>
                <span>Connect:</span>
                <div className="flex items-center gap-4">
                  <a
                    href="https://linkedin.com"
                    target="_blank"
                    rel="noreferrer"
                    className={`transition-colors inline-flex items-center gap-0.5 ${
                      isDark ? 'hover:text-white' : 'hover:text-slate-900'
                    }`}
                  >
                    LinkedIn <ArrowUpRight className="w-3 h-3" />
                  </a>
                  <a
                    href="https://github.com/hypmax03"
                    target="_blank"
                    rel="noreferrer"
                    className={`transition-colors inline-flex items-center gap-0.5 ${
                      isDark ? 'hover:text-white' : 'hover:text-slate-900'
                    }`}
                  >
                    GitHub <ArrowUpRight className="w-3 h-3" />
                  </a>
                  <a
                    href="https://instagram.com/manu_x03"
                    target="_blank"
                    rel="noreferrer"
                    className={`transition-colors inline-flex items-center gap-0.5 ${
                      isDark ? 'hover:text-white' : 'hover:text-slate-900'
                    }`}
                  >
                    Instagram <ArrowUpRight className="w-3 h-3" />
                  </a>
                </div>
              </div>
            </div>
          </motion.aside>
        </div>
      )}
    </AnimatePresence>
  )
}
