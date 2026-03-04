'use client';

import { useRef, useState } from 'react';
import { motion, useInView, AnimatePresence } from 'framer-motion';
import dynamic from 'next/dynamic';
import { projects } from '@/data/projects';

const ProjectScene3D = dynamic(() => import('@/components/three/ProjectScene3D'), { ssr: false, loading: () => null });

export default function ProjectsSection() {
    const ref = useRef(null);
    const inView = useInView(ref, { once: true, margin: '-80px' });
    const [hovered, setHovered] = useState<number | null>(null);
    const [selected, setSelected] = useState<number | null>(null);

    const selectedData = selected !== null ? projects[selected] : null;

    return (
        <section id="projects" style={{
            position: 'relative',
            minHeight: '100vh',
            padding: '100px 0',
            overflowX: 'hidden',
            background: 'linear-gradient(180deg, #04091A 0%, #071135 50%, #04091A 100%)',
        }} ref={ref}>
            <div style={{ position: 'absolute', inset: 0, zIndex: 0 }}>
                <ProjectScene3D
                    hoveredProject={hovered}
                    onProjectHover={setHovered}
                    onProjectClick={setSelected}
                    projectCount={projects.length}
                    projectColors={projects.map(p => p.color)}
                />
            </div>
            <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(180deg, #04091A, rgba(4,9,26,0.7) 20%, rgba(4,9,26,0.7) 80%, #04091A)', zIndex: 1, pointerEvents: 'none' }} />

            <div style={{ position: 'relative', zIndex: 10, maxWidth: 1280, margin: '0 auto', padding: '0 24px' }}>
                <motion.div initial={{ opacity: 0, y: 30 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.7 }} style={{ textAlign: 'center', marginBottom: 64 }}>
                    <p style={{ fontFamily: 'Rajdhani, sans-serif', fontSize: '0.7rem', letterSpacing: '0.5em', textTransform: 'uppercase', color: '#C9A227', marginBottom: 12 }}>// 03 — Projects</p>
                    <h2 style={{ fontFamily: 'Orbitron, monospace', fontWeight: 800, fontSize: 'clamp(2rem, 5vw, 3.2rem)', color: '#E8EEFF', marginBottom: 12 }}>MISSION ARCHIVE</h2>
                    <p style={{ color: '#7A90C4', fontFamily: 'Space Grotesk, sans-serif' }}>Real-world cybersecurity engineering — click any card to expand</p>
                    <div style={{ height: 1, width: 160, margin: '20px auto 0', background: 'linear-gradient(90deg, transparent, #C9A227, transparent)' }} />
                </motion.div>

                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: 20 }}>
                    {projects.map((project, i) => (
                        <motion.div
                            key={project.id}
                            initial={{ opacity: 0, y: 40 }}
                            animate={inView ? { opacity: 1, y: 0 } : {}}
                            transition={{ duration: 0.6, delay: 0.1 * i }}
                            onHoverStart={() => setHovered(i)}
                            onHoverEnd={() => setHovered(null)}
                            onClick={() => setSelected(i)}
                            whileHover={{ y: -10 }}
                            style={{ cursor: 'pointer' }}
                        >
                            <div
                                className="glass"
                                style={{
                                    padding: 24,
                                    height: '100%',
                                    borderColor: hovered === i ? `${project.color}88` : `${project.color}22`,
                                    background: hovered === i ? `${project.color}08` : 'rgba(7,17,53,0.6)',
                                    transition: 'all 0.3s ease',
                                    position: 'relative',
                                    overflow: 'hidden',
                                }}
                            >
                                {/* Top glow line */}
                                <div style={{
                                    position: 'absolute', top: 0, left: 0, right: 0, height: 2,
                                    background: `linear-gradient(90deg, transparent, ${project.color}, transparent)`,
                                    opacity: hovered === i ? 1 : 0.3,
                                    transition: 'opacity 0.3s',
                                }} />

                                {/* Header */}
                                <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: 16 }}>
                                    <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                                        <span style={{ fontSize: '1.6rem' }}>{project.icon}</span>
                                        <span style={{ fontFamily: 'Rajdhani, sans-serif', fontSize: '0.62rem', letterSpacing: '0.3em', textTransform: 'uppercase', padding: '3px 10px', borderRadius: 12, background: `${project.color}20`, border: `1px solid ${project.color}44`, color: project.color }}>{project.category}</span>
                                    </div>
                                    {project.featured && (
                                        <span style={{ display: 'flex', alignItems: 'center', gap: 4, fontFamily: 'Rajdhani, sans-serif', fontSize: '0.6rem', letterSpacing: '0.2em', color: '#C9A227' }}>
                                            <span style={{ width: 6, height: 6, borderRadius: '50%', background: '#C9A227', display: 'inline-block', animation: 'pulse 2s ease infinite' }} />
                                            FEATURED
                                        </span>
                                    )}
                                </div>

                                <h3 style={{ fontFamily: 'Orbitron, monospace', fontWeight: 700, fontSize: '1rem', color: hovered === i ? project.color : '#E8EEFF', marginBottom: 4, transition: 'color 0.3s' }}>{project.title}</h3>
                                <p style={{ fontFamily: 'Rajdhani, sans-serif', fontWeight: 600, fontSize: '0.8rem', color: project.color, marginBottom: 12 }}>{project.subtitle}</p>
                                <p style={{ fontFamily: 'Space Grotesk, sans-serif', fontSize: '0.78rem', color: '#7A90C4', lineHeight: 1.7, marginBottom: 16 }}>{project.description}</p>

                                {/* Tech */}
                                <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6, marginBottom: 18 }}>
                                    {project.tech.map(t => (
                                        <span key={t} style={{ fontFamily: 'Rajdhani, sans-serif', fontSize: '0.62rem', letterSpacing: '0.1em', textTransform: 'uppercase', padding: '2px 10px', borderRadius: 10, background: `${project.color}15`, border: `1px solid ${project.color}33`, color: '#B8C8E8' }}>{t}</span>
                                    ))}
                                </div>

                                {/* GitHub link */}
                                <a
                                    href={project.github} target="_blank" rel="noopener noreferrer"
                                    onClick={e => e.stopPropagation()}
                                    style={{ display: 'flex', alignItems: 'center', gap: 6, fontFamily: 'Rajdhani, sans-serif', fontWeight: 600, fontSize: '0.7rem', letterSpacing: '0.2em', textTransform: 'uppercase', color: project.color, textDecoration: 'none' }}
                                >
                                    <svg width="13" height="13" viewBox="0 0 24 24" fill="currentColor"><path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" /></svg>
                                    View Repository →
                                </a>

                                {/* Corner */}
                                <div style={{ position: 'absolute', bottom: 0, right: 0, width: 20, height: 20, borderBottom: `2px solid ${project.color}`, borderRight: `2px solid ${project.color}`, opacity: hovered === i ? 1 : 0.3, transition: 'opacity 0.3s' }} />
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>

            {/* Modal */}
            <AnimatePresence>
                {selectedData && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={() => setSelected(null)}
                        style={{ position: 'fixed', inset: 0, zIndex: 100, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 24, background: 'rgba(4,9,26,0.92)', backdropFilter: 'blur(24px)' }}
                    >
                        <motion.div
                            initial={{ scale: 0.9, y: 30 }}
                            animate={{ scale: 1, y: 0 }}
                            exit={{ scale: 0.9, y: 30 }}
                            onClick={e => e.stopPropagation()}
                            className="glass"
                            style={{ maxWidth: 600, width: '100%', padding: 40, position: 'relative', borderColor: `${selectedData.color}55` }}
                        >
                            <button onClick={() => setSelected(null)} style={{ position: 'absolute', top: 16, right: 16, background: 'none', border: 'none', color: '#7A90C4', cursor: 'pointer', fontSize: '1.2rem' }}>✕</button>
                            <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 8 }}>
                                <span style={{ fontSize: '2rem' }}>{selectedData.icon}</span>
                                <span style={{ fontFamily: 'Rajdhani, sans-serif', fontSize: '0.65rem', letterSpacing: '0.3em', textTransform: 'uppercase', padding: '4px 12px', borderRadius: 12, background: `${selectedData.color}20`, border: `1px solid ${selectedData.color}55`, color: selectedData.color }}>{selectedData.category}</span>
                            </div>
                            <h2 style={{ fontFamily: 'Orbitron, monospace', fontWeight: 800, fontSize: '1.5rem', color: '#E8EEFF', marginBottom: 4 }}>{selectedData.title}</h2>
                            <p style={{ fontFamily: 'Rajdhani, sans-serif', fontWeight: 600, fontSize: '0.9rem', color: selectedData.color, marginBottom: 16 }}>{selectedData.subtitle}</p>
                            <p style={{ fontFamily: 'Space Grotesk, sans-serif', fontSize: '0.875rem', color: '#B8C8E8', lineHeight: 1.75, marginBottom: 24 }}>{selectedData.description}</p>
                            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, marginBottom: 28 }}>
                                {selectedData.tech.map(t => <span key={t} style={{ fontFamily: 'Rajdhani, sans-serif', fontSize: '0.7rem', letterSpacing: '0.1em', textTransform: 'uppercase', padding: '4px 12px', borderRadius: 12, background: `${selectedData.color}20`, border: `1px solid ${selectedData.color}44`, color: selectedData.color }}>{t}</span>)}
                            </div>
                            <a href={selectedData.github} target="_blank" rel="noopener noreferrer" className="btn-royal" style={{ textDecoration: 'none' }}>View on GitHub →</a>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </section>
    );
}
