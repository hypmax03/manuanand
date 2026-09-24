import React from 'react'

export default function AboutMe({ isDark = true }) {
  return (
    <section
      id="about"
      className={`relative w-full py-20 sm:py-28 lg:py-36 overflow-visible transition-colors duration-500 border-t ${
        isDark
          ? 'border-white/[0.08] text-[#F4F4F6]'
          : 'border-slate-200 text-slate-900'
      }`}
    >
      <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16 items-start">
          {/* Left Column: Eyebrow + Large Serif Heading */}
          <div className="lg:col-span-6 flex flex-col items-start">

            <h2
              className={`font-serif dm-serif-display text-3xl xs:text-4xl sm:text-6xl lg:text-7xl xl:text-8xl tracking-tight leading-[0.98] select-none transition-all duration-300 ${isDark
                  ? 'text-[#F4F4F6] hover:text-white hover:drop-shadow-[0_0_35px_rgba(255,255,255,0.4)]'
                  : 'text-slate-900 hover:text-slate-950'
                }`}
            >
              A little more <br />
              about me.
            </h2>
          </div>

          {/* Right Column: Genuine Human Intro */}
          <div className="lg:col-span-6 lg:pt-8 flex flex-col gap-6 text-base sm:text-lg lg:text-xl font-sans font-light leading-relaxed">
            <p className={isDark ? 'text-neutral-300' : 'text-slate-700'}>
              I'm{' '}
              <strong className={isDark ? 'text-white font-medium' : 'text-slate-950 font-semibold'}>
                Manu Anand
              </strong>
              , a MERN Stack Developer with a background in Computer Engineering. I enjoy building
              modern web experiences, experimenting with new technologies, and constantly learning
              through hands-on projects.
            </p>
            <p className={isDark ? 'text-neutral-400' : 'text-slate-600'}>
              When I'm away from the editor, I usually end up somewhere between football, cricket,
              movies, and gaming.
            </p>
          </div>
        </div>
      </div>
    </section>
    
  )
}
