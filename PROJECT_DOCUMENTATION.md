# Manu Anand Portfolio Project Documentation

## 1. Project Overview

This project is a personal portfolio website for Manu Anand, built as a modern React + Vite landing page with cinematic motion, dark/light themes, a polished editorial design, and a playground section for experiments.

The site is designed as a single-page portfolio experience with:

- a hero section with oversized typography and portrait image
- service/capability cards
- featured projects section
- about me section
- contact/footer area
- a separate playground route for experimental work
- animated transitions, theme switching, and interactive UI details

The project is intended to serve as a personal brand site, developer portfolio, and contact portal for professional opportunities.

---

## 2. Project Identity

- Project name: `manuanand`
- App type: Portfolio / personal website
- Primary audience: recruiters, clients, collaborators, and visitors interested in work samples
- Core emphasis: MERN stack development, UI craft, full-stack engineering, and creative product thinking

---

## 3. Tech Stack

### Frontend
- React 19
- Vite 8
- JavaScript (ES modules)
- CSS with Tailwind CSS v4

### UI / Motion
- Framer Motion
- Lucide React for icons

### Build / Tooling
- Vite plugin React
- Tailwind Vite plugin
- Babel plugin setup for React Compiler
- Oxlint for linting

### Runtime notes
- The app uses modern React patterns and animations.
- It is not TypeScript-based in the current setup.
- The project is configured for fast local development and production builds.

---

## 4. Core Scripts

From `package.json`:

- `npm run dev` → starts the Vite dev server
- `npm run build` → creates production build
- `npm run lint` → runs oxlint linting
- `npm run preview` → previews the production build locally

---

## 5. Application Structure

### Root files
- `package.json` — project metadata, dependencies, and scripts
- `vite.config.js` — Vite config with React, Tailwind, and Babel
- `index.html` — static HTML entry for the Vite app
- `README.md` — default starter README, not yet customized for the portfolio

### Main source tree
- `src/main.jsx` — app bootstrap
- `src/App.jsx` — main application orchestrator and route logic
- `src/index.css` — base styling, theme tokens, custom utilities, and animations
- `src/assets/` — images and static media
- `src/components/` — reusable UI pieces
- `src/sections/` — page/section components

---

## 6. App-Level Architecture

### Main app flow
The central logic is in `src/App.jsx`.

It manages:

- theme mode (`isDark`)
- contact drawer visibility
- route state for home vs playground
- eye-blink transition animation between routes
- dynamic hash navigation and browser history behavior

### Theme handling
The app sets the HTML root classes based on the `isDark` state:

- `dark` class for dark mode
- `light` class for light mode

This allows theme-specific design changes at the global level while maintaining section-level overrides.

### Route handling
There are two primary app states:

1. Main portfolio route (`/`)
2. Playground route (`/playground`)

The app also supports in-page hash navigation like:

- `#about`
- `#projects`
- `#contact`

It listens to `popstate` and `hashchange` events to maintain smooth navigation behavior.

---

## 7. Navigation and UX Pattern

### Navbar
`src/components/Navbar.jsx` renders a floating, bottom-fixed navigation dock.

Features:

- collapses into a compact status pill when scrolling
- supports hover interaction with a sliding highlight pill
- includes home/about/projects/contact links
- marks the active section in the nav
- allows contact drawer opening from the nav

### Contact drawer
The contact experience is handled through a slide-over panel rather than a standard modal.

The drawer is opened from:

- navbar links
- footer CTA
- app-level navigation logic

This supports a more immersive, portfolio-like interaction pattern.

---

## 8. Transition System

### Eye-blink transition
`src/components/EyeBlinkTransition.jsx` creates a cinematic full-page transition effect using a blinking-eyes metaphor.

The `App.jsx` logic controls phases:

- `idle`
- `closing`
- `closed`
- `opening`

This is triggered when navigation changes between sections or routes.

### Animation library
Framer Motion is used extensively for:

- hero text reveals
- parallax motion
- hover spring effects
- card entrance transitions
- section animations
- route transitions

The code also checks `useReducedMotion()` to respect accessibility preferences.

---

## 9. Hero Section

### Main file
`src/sections/Hero.jsx`

This is the star of the portfolio. It includes:

- a top status badge with live availability info
- oversized editorial typography spelling “MANU ANAND”
- animated rotating words like “builds”, “solves”, “deploys”, “codes”
- floating hero portrait image
- layered ambient lighting / glow effects
- responsive layout with large type and photogenic composition
- dark/light mode adaptation

### Hero image
The main portrait is imported from:

- `src/assets/Heroimg.png`

The image is styled with a bottom fade mask and layered shadows to fit the premium visual direction.

### Mobile behavior
The hero image placement is carefully controlled for responsiveness using Tailwind classes and transforms. On larger screens it sits lower, while on smaller screens it shifts upward for better framing.

---

## 10. What I Do Section

### Main file
`src/sections/WhatIDo.jsx`

This section presents the developer capabilities and primary technical stack.

It includes:

- 3 capability cards for frontend, backend, and full-stack work
- a compact technology grid
- ambient glow background treatment
- motion-based reveal transitions

The technologies represented include:

- React.js
- Next.js
- JavaScript
- Tailwind CSS
- Framer Motion
- Node.js
- Express.js
- MongoDB
- REST API design
- Git / GitHub

---

## 11. Projects Section

### Main file
`src/sections/Projects.jsx`

This section is built around featured project storytelling.

The project data includes:

- project number
- unique ID
- project title and tagline
- description
- technologies used
- image path
- GitHub link
- live URL
- “in progress” status indicator

Current featured project examples:

1. Expense Flow
   - personal finance and budget tracking app
   - analytics, tracking, and real-time finance workflow

2. WorldForge AI
   - AI-assisted creative worldbuilding tool
   - currently in active development

The section also includes interactive project cards and motion-triggered active states as the user scrolls into the content.

---

## 12. About Me Section

### Main file
`src/sections/AboutMe.jsx`

This section introduces Manu as:

- a MERN Stack Developer
- a Computer Engineering background holder
- someone who enjoys building modern digital experiences and experimenting with new technologies

It also includes a personal note about interests outside development such as football, cricket, movies, and gaming.

---

## 13. Playground Section

### Main file
`src/sections/PlayGround.jsx`

This is a dedicated experimental area for future projects and creative experiments.

Current behavior:

- placeholder data is empty or staged
- there is a “Lab Under Construction” status
- upcoming experiments are represented in commented-out or empty structures
- section contains a live IST clock and return-to-portfolio UX

This indicates the playground is either intentionally reserved for future work or still being built out.

---

## 14. Footer and Contact Area

### Main file
`src/sections/Footer.jsx`

This is the final CTA area for the portfolio.

Includes:

- large call-to-action phrase: “Let’s grow your next idea.”
- contact button
- email copy button
- social link buttons
- time display in IST
- attribution and personal credit footer bar

Social links present in the code include:

- GitHub
- LinkedIn
- Instagram
- Email

---

## 15. Global Styling System

### Main file
`src/index.css`

The stylesheet defines:

- Tailwind import
- smooth scrolling for HTML
- overflow handling
- custom font helpers and display font classes
- dark and light theme tokens
- glassmorphism utilities
- card styling
- grain texture background pattern
- interactive bouncing-letter effect

### Visual themes
The app uses a polished editorial styling system with:

- dark mode: near-black backgrounds, soft white typography, subtle glow effects
- light mode: warm off-white surfaces and slate typography

This is applied through CSS classes like:

- `.light`
- `.glass-panel`
- `.glass-button`
- `.silver-card`
- `.silver-pill`
- `.bg-grain`

---

## 16. App-Level State Summary

The app contains these main state values in `App.jsx`:

- `isDark`: toggles the app theme
- `isContactOpen`: controls the slide-over contact panel
- `blinkPhase`: manages eye transition animation stages
- `currentPath`: stores the active route (`/` or `/playground`)

This is a fairly custom single-page app architecture rather than a traditional multi-page React app.

---

## 17. Assets and Media

### Image assets
The project stores visual assets under:

- `src/assets/`
- `public/`

The main hero image is in `src/assets/Heroimg.png`.

Project images are also stored under `public/projects/` and referenced by relative paths.

---

## 18. Design Philosophy

This portfolio follows a premium editorial aesthetic with:

- large serif display typography
- minimalist spacing systems
- cinematic gradients and glows
- dark luxury mood in dark mode
- smooth interactions and micro-animations
- deliberate use of motion to create a memorable brand experience

The product feels more like a creative portfolio website than a standard corporate landing page.

---

## 19. Notable User Experience Features

- cinematic route transitions with eye-blink effect
- motion-based content reveals
- custom hover interactions for large typography
- live IST clock in the playground/footer
- contact drawer instead of a standard modal
- responsive layout for mobile and desktop
- custom navigation pill and scroll-state behavior

---

## 20. Current Project Status

This project is in a polished portfolio stage with working sections and modern UI treatment. Some areas appear intentionally prepared for future expansion, especially:

- the playground section
- upcoming experiments area
- project content can be extended as more work is added

The codebase is organized and modular enough to support adding more features or sections later.

---

## 21. How to Run the Project

From the project root:

```bash
npm install
npm run dev
```

Then open the local Vite URL in the browser.

To create a production build:

```bash
npm run build
```

To preview the production build:

```bash
npm run preview
```

---

## 22. Summary

This is a visually rich personal portfolio website built with React + Vite and enhanced with Tailwind and Framer Motion. It combines a premium dark aesthetic, interactive motion system, route transitions, animated typography, and strong portfolio structure for presenting work, skills, and personal brand identity.

The project is best understood as:

- a personal portfolio landing page
- a polished developer brand site
- a custom React single-page app with unique motion design
- a flexible foundation for future projects and experiments

---

## 23. Main Files to Reference

- `src/App.jsx` — app logic and route orchestration
- `src/sections/Hero.jsx` — hero experience and motion design
- `src/sections/WhatIDo.jsx` — capabilities and stack section
- `src/sections/Projects.jsx` — featured portfolio items
- `src/sections/AboutMe.jsx` — personal introduction
- `src/sections/PlayGround.jsx` — experimental area
- `src/sections/Footer.jsx` — final CTA and contact panel trigger
- `src/components/Navbar.jsx` — floating navigation
- `src/index.css` — design system, theme, and UX styling
- `package.json` — scripts and dependency overview
