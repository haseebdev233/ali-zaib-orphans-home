# Add Fade-In Animations to All Components

## Components Needing Fade-In Animations
- [x] Hero.jsx - Add fade-in for title and description with slide-in effect
- [x] ExecutiveDirectorMessage.jsx - Add fade-in for entire section
- [x] Footer.jsx - Add fade-in for footer content
- [x] About.jsx - Add fade-in for all sections with stagger
- [x] Navbar.jsx - Add fade-in for navbar
- [x] Contact.jsx - Add fade-in for sections
- [x] Privacy.jsx - Add fade-in for sections
- [x] Terms.jsx - Add fade-in for sections
- [x] CampusAmbassador.jsx - Add fade-in for container/sections
- [x] Update TODO.md - Mark all as completed

## Implementation Steps
1. Import motion from framer-motion where needed
2. Wrap elements with motion.div or motion.section
3. Add initial={{ opacity: 0 }}, animate={{ opacity: 1 }}, transition={{ duration: 0.8 }}
4. Stagger animations with delays where appropriate
5. Test animations by running the app
