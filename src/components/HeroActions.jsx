import React from 'react'
import { motion } from 'framer-motion'
import { ArrowRight, MessageSquare, Mail } from 'lucide-react'

// Pixel-perfect SVG icons for brand links
const GithubIcon = ({ className = 'w-4 h-4' }) => (
  <svg className={className} fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
    <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" />
  </svg>
)

const LinkedinIcon = ({ className = 'w-4 h-4' }) => (
  <svg className={className} fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
    <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.88 8.56a1.68 1.68 0 0 0 1.68-1.68c0-.93-.75-1.69-1.68-1.69a1.69 1.69 0 0 0-1.69 1.69c0 .93.76 1.68 1.69 1.68m1.39 9.94v-8.37H5.5v8.37h2.77z" />
  </svg>
)

export default function HeroActions({ isDark }) {
  const socialLinks = [
    { name: 'GitHub', icon: GithubIcon, href: 'https://github.com/hypmax03' },
    { name: 'LinkedIn', icon: LinkedinIcon, href: 'https://linkedin.com' },
    { name: 'Email', icon: Mail, href: 'mailto:manuanandam@gmail.com' },
  ]

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
      className="flex flex-col sm:flex-row items-start sm:items-center gap-4 sm:gap-6 w-full"
    >
      {/* Primary & Secondary Actions */}
      <div className="flex items-center gap-3 w-full sm:w-auto">
        {/* View Projects Button */}
        <motion.a
          href="#projects"
          whileHover={{ y: -2 }}
          whileTap={{ scale: 0.98 }}
          className={`group relative inline-flex items-center justify-center gap-2.5 px-6 py-3 rounded-xl text-sm font-semibold tracking-wide transition-all duration-300 w-full sm:w-auto overflow-hidden ${
            isDark
              ? 'bg-neutral-100 text-neutral-950 hover:bg-white shadow-[0_10px_25px_-5px_rgba(255,255,255,0.1)]'
              : 'bg-neutral-900 text-white hover:bg-neutral-800 shadow-[0_10px_25px_-5px_rgba(0,0,0,0.15)]'
          }`}
        >
          <span className="relative z-10">View Projects</span>
          <ArrowRight className="w-4 h-4 text-teal-600 transition-transform duration-300 group-hover:translate-x-1" />
        </motion.a>

        {/* Let's Talk Button */}
        <motion.a
          href="#contact"
          whileHover={{ y: -2 }}
          whileTap={{ scale: 0.98 }}
          className={`inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl text-sm font-medium tracking-wide glass-button w-full sm:w-auto ${
            isDark
              ? 'text-neutral-300 hover:text-white border-neutral-800 hover:border-neutral-700'
              : 'text-neutral-700 hover:text-neutral-950 border-neutral-200 hover:border-neutral-300'
          }`}
        >
          <MessageSquare className="w-3.5 h-3.5 text-teal-400" />
          <span>Let's Talk</span>
        </motion.a>
      </div>

      {/* Social Links Divider & Icons */}
      <div className="flex items-center gap-2 pt-2 sm:pt-0 sm:border-l sm:pl-6 border-neutral-800/40">
        <span className="text-xs text-neutral-500 mr-1 hidden sm:inline-block font-mono">Connect:</span>
        {socialLinks.map((social) => {
          const Icon = social.icon
          return (
            <motion.a
              key={social.name}
              href={social.href}
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ y: -2 }}
              whileTap={{ scale: 0.95 }}
              aria-label={social.name}
              className={`p-2.5 rounded-lg border transition-all duration-200 ${
                isDark
                  ? 'bg-neutral-900/60 text-neutral-400 border-neutral-800/80 hover:text-teal-400 hover:border-neutral-700'
                  : 'bg-white text-neutral-600 border-neutral-200 hover:text-teal-600 hover:border-neutral-300'
              }`}
            >
              <Icon className="w-4 h-4" />
            </motion.a>
          )
        })}
      </div>
    </motion.div>
  )
}
