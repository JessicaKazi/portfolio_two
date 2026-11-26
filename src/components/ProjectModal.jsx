import { AnimatePresence, motion } from 'framer-motion'
import { ArrowUpRight, X } from 'lucide-react'

export default function ProjectModal({ project, onClose }) {
  return (
    <AnimatePresence>
      {project && (
        <motion.div className="modal-backdrop" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onMouseDown={onClose}>
          <motion.section
            className="project-modal"
            role="dialog"
            aria-modal="true"
            aria-labelledby="modal-title"
            initial={{ opacity: 0, y: 24, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 18, scale: 0.98 }}
            transition={{ duration: 0.25 }}
            onMouseDown={(event) => event.stopPropagation()}
          >
            <div className="modal-topline">
              <span className="eyebrow">PROJECT FILE / {project.number}</span>
              <button className="icon-button" onClick={onClose} aria-label="Close project details"><X size={19} /></button>
            </div>
            <div className={`project-art art-${project.visual} modal-art`}>
              <span className="art-kicker">{project.category}</span>
              <strong>{project.title}</strong>
              <span className="art-index">KF—{project.number}</span>
            </div>
            <div className="modal-content">
              <div>
                <p className="eyebrow">{project.year} · {project.status}</p>
                <img src={project.image} alt={project.title} />
                <h2 id="modal-title">{project.title}</h2>
                <p className="modal-description">{project.description}</p>
              </div>
              <div className="modal-meta">
                <div><span className="eyebrow">MY ROLE</span><p>{project.role}</p></div>
                <div><span className="eyebrow">TOOLS / FOCUS</span><div className="tag-list">{project.stack.map((item) => <span className="tag" key={item}>{item}</span>)}</div></div>
              </div>
              <p className="modal-note"><ArrowUpRight size={15} /> Replace this concept artwork with real screenshots, links and final project details as each project is ready to publish.</p>
            </div>
          </motion.section>
        </motion.div>
      )}
    </AnimatePresence>
  )
}