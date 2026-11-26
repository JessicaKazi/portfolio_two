import { useEffect, useState } from 'react'
import { motion, useScroll, useSpring } from 'framer-motion'
import { ArrowDown, ArrowUpRight, Asterisk, Code2, Github, Layers3, Mail, Menu, Palette, Sparkles, X, Check } from 'lucide-react'
import { projects } from './data/projects'
import ProjectModal from './components/ProjectModal'

const BRAND = 'KAZI/FORM' // Temporary brand name — change this when your final name is chosen.
const filters = ['All work', 'Graphic design', 'Development']

function CustomCursor() {
  const [position, setPosition] = useState({ x: -100, y: -100 })
  const [visible, setVisible] = useState(false)
  useEffect(() => {
    const move = (event) => { setPosition({ x: event.clientX, y: event.clientY }); setVisible(true) }
    const leave = () => setVisible(false)
    window.addEventListener('mousemove', move)
    document.addEventListener('mouseleave', leave)
    return () => { window.removeEventListener('mousemove', move); document.removeEventListener('mouseleave', leave) }
  }, [])
  return <div className={`custom-cursor ${visible ? 'is-visible' : ''}`} style={{ transform: `translate3d(${position.x}px, ${position.y}px, 0)` }}><span /></div>
}

const palettes = [
  { id: 'rose', name: 'Rose editorial', colors: ['#f5f0eb', '#29262a', '#c47d9a'] },
  { id: 'sage', name: 'Sage studio', colors: ['#eef0e8', '#27332d', '#78977e'] },
  { id: 'blue', name: 'Cobalt digital', colors: ['#eef0f5', '#202638', '#7892d1'] },
  { id: 'mono', name: 'Monochrome', colors: ['#f1f0ed', '#171717', '#a5a19a'] },
]

function Header({ activePalette, onPaletteChange }) {
  const [menuOpen, setMenuOpen] = useState(false)
  const [paletteOpen, setPaletteOpen] = useState(false)
  const links = [['About', '#about'], ['Selected work', '#work'], ['Capabilities', '#capabilities'], ['Contact', '#contact']]
  return (
    <header className="site-header">
      <a className="wordmark" href="#home" aria-label={`${BRAND} home`}>{BRAND}<span>®</span></a>
      <button className="mobile-menu-button" onClick={() => setMenuOpen(!menuOpen)} aria-label="Toggle navigation">{menuOpen ? <X /> : <Menu />}</button>
      <nav className={menuOpen ? 'nav-links nav-open' : 'nav-links'}>
        {links.map(([label, href]) => <a key={label} href={href} onClick={() => setMenuOpen(false)}>{label}</a>)}
        <div className="palette-control">
          <button className="palette-trigger" onClick={() => setPaletteOpen(!paletteOpen)} aria-expanded={paletteOpen} aria-label="Choose colour palette">
            <Palette size={15} /> <span>Palette</span>
          </button>
          {paletteOpen && <div className="palette-menu">
            <span className="eyebrow">CHOOSE A MOOD</span>
            {palettes.map((palette) => <button key={palette.id} className={activePalette === palette.id ? 'palette-option selected' : 'palette-option'} onClick={() => { onPaletteChange(palette.id); setPaletteOpen(false) }}>
              <span className="palette-swatches">{palette.colors.map((color) => <i key={color} style={{ background: color }} />)}</span>
              <span>{palette.name}</span>
              {activePalette === palette.id && <Check size={14} />}
            </button>)}
          </div>}
        </div>
        <a className="nav-contact" href="#contact" onClick={() => setMenuOpen(false)}>Let's talk <ArrowUpRight size={14} /></a>
      </nav>
    </header>
  )
}

function ProjectCard({ project, onOpen }) {
  return (
    <motion.button className="project-card" onClick={() => onOpen(project)} whileHover={{ y: -7, rotate: project.number % 2 ? -0.5 : 0.5 }} whileTap={{ scale: 0.985 }} layout>
      <div className={`project-art art-${project.visual}`}>
        <span className="art-kicker">{project.category}</span>
        {project.image && (<img src={project.image} alt={project.title} className="project-card-image"/>)}
        <strong>{project.title}</strong>
        <span className="art-index">KF—{project.number}</span>
        <span className="art-cross"><Asterisk size={28} /></span>
      </div>
      <div className="project-card-info">
        <div><span className="project-number">{project.number} / {project.year}</span><h3>{project.title}</h3><p>{project.category}</p></div>
        <span className="project-arrow"><ArrowUpRight size={18} /></span>
      </div>
    </motion.button>
  )
}

function App() {
  const [activeFilter, setActiveFilter] = useState('All work')
  const [activePalette, setActivePalette] = useState('rose')
  const [selectedProject, setSelectedProject] = useState(null)
  const [menuNotice, setMenuNotice] = useState(false)
  const { scrollYProgress } = useScroll()
  const scaleX = useSpring(scrollYProgress, { stiffness: 100, damping: 30, restDelta: 0.001 })
  const visibleProjects = projects.filter((project) => {
    if (activeFilter === 'Graphic design') return project.type === 'design'
    if (activeFilter === 'Development') return project.type === 'development'
    return true
  })

  useEffect(() => {
    document.documentElement.dataset.palette = activePalette
  }, [activePalette])

  useEffect(() => {
    const timer = window.setTimeout(() => setMenuNotice(true), 850)
    return () => window.clearTimeout(timer)
  }, [])

  return (
    <>
      <motion.div className="scroll-progress" style={{ scaleX }} />
      <CustomCursor />
      <Header activePalette={activePalette} onPaletteChange={setActivePalette} />
      <main>
        <section className="hero section-shell" id="home">
          <div className="hero-meta"><span>INDEPENDENT CREATIVE PRACTICE</span><span>DESIGN × TECHNOLOGY · 2026</span></div>
          <div className="hero-main">
            <motion.div className="hero-sticker sticker-one" animate={{ rotate: [8, 15, 8], y: [0, -8, 0] }} transition={{ duration: 6, repeat: Infinity }}><Sparkles size={27} /><span>Curious<br/>by nature</span></motion.div>
            <motion.div className="hero-sticker sticker-two" animate={{ rotate: [-8, -14, -8] }} transition={{ duration: 7, repeat: Infinity }}><span>Ideas into<br/>interfaces</span><Asterisk size={23} /></motion.div>
            <p className="hero-overline"><span className="status-dot" /> OPEN TO CREATIVE OPPORTUNITIES <span className="hero-overline-divider">/</span> JOHANNESBURG, ZA</p>
            <h1>Making<br/><em>ideas</em> feel<br/> <span className="outlined-word">tangible.</span></h1>
            <div className="hero-bottomline">
              <p>I'm Jessica — a designer and developer exploring the space between visual expression and functional technology.</p>
              <a className="round-link" href="#work" aria-label="Explore selected work"><ArrowDown size={21} /></a>
            </div>
          </div>
          <div className="hero-footer"><span>VISUAL DESIGN</span><span className="hero-footer-center"><Asterisk size={15}/> DIGITAL DEVELOPMENT</span><span>INDEPENDENT PRACTICE · 001</span></div>
        </section>

        <section className="intro-strip">
          <p>Thoughtful by design.</p><span>✳</span><p>Made to work beautifully.</p>
        </section>

        <section className="about section-shell section-pad" id="about">
          <div className="section-heading"><span className="eyebrow">01 / A LITTLE INTRODUCTION</span><span className="side-note">THE PERSON BEHIND THE PIXELS</span></div>
          <div className="about-grid">
            <h2>Curiosity is<br/>my <em>creative</em><br/>superpower.</h2>
            <div className="about-copy">
              <p className="lead-copy">I bring together visual thinking and technical problem-solving to create thoughtful digital experiences.</p>
              <p>My interests span graphic design, web development and the details that make digital products feel considered. I enjoy learning by making, experimenting with ideas and turning concepts into working projects.</p>
              <a className="text-link" href="#capabilities">A little more about what I do <ArrowUpRight size={16}/></a>
            </div>
          </div>
          <div className="annotation-note"><span>✳</span> A mix of logic, imagination<br/>and a lot of tabs open.</div>
        </section>

        <section className="work section-shell section-pad" id="work">
          <div className="section-heading"><span className="eyebrow">02 / THE WORK</span><span className="side-note">A GROWING COLLECTION — 2026</span></div>
          <div className="work-title-row"><h2>Selected <em>work.</em></h2><p>A collection of digital builds, visual explorations and ideas in progress.</p></div>
          <div className="filter-row" role="group" aria-label="Filter projects">
            {filters.map((filter) => <button key={filter} className={activeFilter === filter ? 'filter-chip active' : 'filter-chip'} onClick={() => setActiveFilter(filter)}>{filter}</button>)}
            <span className="filter-count">{String(visibleProjects.length).padStart(2, '0')} PROJECTS</span>
          </div>
          <motion.div className="project-grid" layout>
            {visibleProjects.map((project) => <ProjectCard key={project.id} project={project} onOpen={setSelectedProject} />)}
          </motion.div>
          <p className="work-footnote"><Asterisk size={15}/> Project previews are starter artwork. Add your real screenshots and design files before publishing.</p>
        </section>

        <section className="capabilities section-shell section-pad" id="capabilities">
          <div className="section-heading"><span className="eyebrow">03 / WHAT I BRING</span><span className="side-note">CREATIVE THINKING, PRACTICAL MAKING</span></div>
          <h2>Two sides.<br/><em>One curiosity.</em></h2>
          <div className="capability-grid">
            <article className="capability-card design-cap">
              <div className="capability-icon"><Layers3 size={24}/></div><span className="eyebrow">01 — VISUAL EXPRESSION</span>
              <h3>Graphic<br/><em>design.</em></h3>
              <p>Building visual stories through composition, typography, colour and identity.</p>
              <div className="capability-tags"><span>Brand identity</span><span>Poster design</span><span>Visual layouts</span><span>Creative direction</span></div>
            </article>
            <article className="capability-card dev-cap">
              <div className="capability-icon"><Code2 size={24}/></div><span className="eyebrow">02 — DIGITAL BUILDING</span>
              <h3>Web<br/><em>development.</em></h3>
              <p>Turning ideas into responsive, interactive and useful digital experiences.</p>
              <div className="capability-tags"><span>HTML & CSS</span><span>JavaScript</span><span>React</span><span>Responsive UI</span></div>
            </article>
          </div>
          <div className="tools-line"><span className="eyebrow">CURRENT TOOLKIT</span><p>HTML · CSS · JavaScript · React · Vite · Git · GitHub · Visual design tools</p></div>
        </section>

        <section className="contact section-shell section-pad" id="contact">
          <div className="section-heading"><span className="eyebrow">04 / THE NEXT CHAPTER</span><span className="side-note">HAVE SOMETHING IN MIND?</span></div>
          <div className="contact-content">
            <span className="contact-spark"><Asterisk size={42}/></span>
            <h2>Let's make<br/><em>something</em><br/>meaningful.</h2>
            <p>For collaborations, opportunities or a good conversation about design and technology, I'd love to hear from you.</p>
            <a className="contact-button" href="mailto:eugenieekazi@gmail.com"><Mail size={17}/> Start a conversation <ArrowUpRight size={17}/></a>
          </div>
          <footer className="site-footer">
            <a className="wordmark" href="#home">{BRAND}<span>®</span></a>
            <span>DESIGNED WITH CURIOSITY · {new Date().getFullYear()}</span>
            <div className="social-links"><a href="https://github.com/JessicaKazi" target="_blank" rel="noreferrer" aria-label="GitHub"><Github size={17}/></a><a href="mailto:eugenieekazi@gmail.com" aria-label="Email"><Mail size={17}/></a></div>
          </footer>
        </section>
      </main>
      <ProjectModal project={selectedProject} onClose={() => setSelectedProject(null)} />
      {menuNotice && <motion.div className="corner-note" initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }}><span>✳</span><p>Scroll a little.<br/>There's more to explore.</p><button onClick={() => setMenuNotice(false)} aria-label="Dismiss note"><X size={13}/></button></motion.div>}
    </>
  )
}

export default App