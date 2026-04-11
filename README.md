<<<<<<< HEAD
# Architectural Blueprint | Portfolio V.2
## Prathmesh Rikame - Software Engineer

A premium, high-performance React portfolio designed with an editorial, architectural aesthetic. This site features advanced scroll-linked 3D visuals, high-fidelity animations, and a dual-backend contact system.

---

## ⚡ Core Technologies
- **Framework**: React 19 + Vite
- **Animations**: Framer Motion (Scroll & Physics), GSAP (ScrollTrigger), Anime.js
- **Styling**: Vanilla CSS (Global Design System)
- **Icons**: Lucide React, Simple Icons (Brand Icons)
- **API**: GitHub REST API (Dynamic Repo Sync)
- **Contact**: Dual Support (Formspree & EmailJS)

---

## 🏗️ Folder Structure

```
portfolio/
├── src/
│   ├── components/       # Reusable Global Components
│   │   ├── HeroVisual    # The "Neural Hub" 3D Core
│   │   ├── Navbar        # Glassmorphic Navigation
│   │   ├── Footer        # Architectural status & links
│   │   └── ResumeButton  # Fixed CTA Portal
│   ├── sections/         # Feature-specific Page Sections
│   │   ├── Hero          # Identity reveal & Entrance
│   │   ├── Skills        # 3D Tilt Badge grid
│   │   ├── Experience    # Vertical Career Timeline
│   │   ├── Projects      # GitHub API Integrated Gallery
│   │   └── Contact       # Integrated Handshake Portal
│   ├── index.css         # Global Design System (Tokens)
│   └── App.jsx           # Main Orchestrator
├── public/               # Static Graphics & Icons
└── portfolio.zip         # Full Project Backup
```

---

## 🚀 Getting Started

### 1. Installation
Install the required dependencies:
```bash
npm install
```

### 2. Development
Launch the local development server:
```bash
npm run dev
```

### 3. Contact Form Setup
The portal is currently using **Formspree** for instant reliable messaging.
- To use your own Formspree endpoint, update line 22 in `src/sections/Contact.jsx`.
- To switch to **EmailJS** (for free Auto-Replies), follow the commented instructions in `src/sections/Contact.jsx`.

---

## 🔥 Key Features
- **Neural Hub Journey**: A CSS-3D visual that travels and docks into specific sections as you scroll.
- **Dynamic Projects**: Automatically fetches your latest 6 GitHub repositories.
- **Architectural Journey**: A high-end vertical timeline of your professional career.
- **Optimized Physics**: High-stiffness springs for an instant, responsive user feel.

---

## 🛠️ Personalization Keys
- **GitHub Handle**: `rikprathmesh`
- **Identity**: Prathmesh Rikame
- **Title**: Software Engineer

---

=======
# portfolio
High-performance React portfolio with 3D visuals, scroll animations, and GitHub API integration.
>>>>>>> cc93295ebac7aa1273f3937eb340c67af98e6b80
