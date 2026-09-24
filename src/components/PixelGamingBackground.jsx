import React from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'

/**
 * Subtle Ambient Tech Grid & Glow Background
 * Provides deep, refined ambient lighting and a subtle technical dot matrix grid
 * without any intrusive gaming sprites or icons.
 * Automatically hidden in the Hero section and smoothly reveals on scroll or in sub-routes.
 */
export default function PixelGamingBackground({ isDark = true, currentPath = '/' }) {
  const { scrollY } = useScroll()

  // On the home page, remain completely invisible during the Hero section
  // and smoothly fade in as the user scrolls into WhatIDo (200px - 500px scroll)
  const homeScrollOpacity = useTransform(scrollY, [200, 500], [0, 1])
  const activeOpacity = currentPath === '/' ? homeScrollOpacity : 1

  return (
    <motion.div
      aria-hidden="true"
      style={{ opacity: activeOpacity }}
      className="fixed inset-0 pointer-events-none z-0 overflow-hidden select-none"
    >
      {/* 1. Subtle Radial Dot Matrix Grid */}
      <div
        className="absolute inset-0 transition-opacity duration-700"
        style={{
          backgroundImage: isDark
            ? 'radial-gradient(rgba(45, 212, 191, 0.12) 1px, transparent 1px)'
            : 'radial-gradient(rgba(0, 0, 0, 0.06) 1px, transparent 1px)',
          backgroundSize: '32px 32px',
          opacity: isDark ? 0.7 : 0.4,
          maskImage: 'radial-gradient(ellipse at 50% 50%, black 40%, transparent 95%)',
          WebkitMaskImage: 'radial-gradient(ellipse at 50% 50%, black 40%, transparent 95%)',
        }}
      />

      {/* 2. Ambient Glow Lights (Dark mode only) */}
      {isDark && (
        <>
          {/* Subtle Electric Teal ambient glow on the top-left */}
          <div className="absolute top-[20%] -left-[10%] w-[550px] h-[550px] rounded-full bg-[radial-gradient(circle_at_center,rgba(45,212,191,0.06)_0%,rgba(56,189,248,0.02)_45%,transparent_70%)] blur-[100px]" />

          {/* Gentle Neon Violet/Purple ambient glow on the bottom-right */}
          <div className="absolute top-[65%] -right-[10%] w-[600px] h-[600px] rounded-full bg-[radial-gradient(circle_at_center,rgba(168,85,247,0.05)_0%,rgba(232,121,249,0.015)_45%,transparent_70%)] blur-[110px]" />

          {/* Faint Cyber Blue accent near middle */}
          <div className="absolute top-[45%] left-[25%] w-[450px] h-[450px] rounded-full bg-[radial-gradient(circle_at_center,rgba(56,189,248,0.035)_0%,transparent_70%)] blur-[120px]" />
        </>
      )}

      {/* 3. Subtle ambient fine micro-accents (pure minimalist aesthetic) */}
      <div
        className="absolute inset-0"
        style={{
          backgroundImage: isDark
            ? 'linear-gradient(to right, rgba(255,255,255,0.015) 1px, transparent 1px), linear-gradient(to bottom, rgba(255,255,255,0.015) 1px, transparent 1px)'
            : 'linear-gradient(to right, rgba(0,0,0,0.015) 1px, transparent 1px), linear-gradient(to bottom, rgba(0,0,0,0.015) 1px, transparent 1px)',
          backgroundSize: '96px 96px',
          opacity: 0.5,
          maskImage: 'radial-gradient(ellipse at 50% 60%, black 30%, transparent 85%)',
          WebkitMaskImage: 'radial-gradient(ellipse at 50% 60%, black 30%, transparent 85%)',
        }}
      />
    </motion.div>
  )
}
