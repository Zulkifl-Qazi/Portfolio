'use client';

import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import dynamic from 'next/dynamic';
import { experiences } from '@/data/experience';

const TimelineScene = dynamic(() => import('@/components/three/TimelineScene'), { ssr: false, loading: () => null });

export default function ExperienceSection() {
    const ref = useRef(null);
    const inView = useInView(ref, { once: true, margin: '-80px' });

    return (
        <section id="experience" style={{
            position: 'relative',
            minHeight: '100vh',
            padding: '100px 0',
            overflowX: 'hidden',
            background: 'linear-gradient(180deg, #04091A 0%, #060C20 50%, #04091A 100%)',
        }}>
            <div style={{ position: 'absolute', inset: 0, opacity: 0.3, zIndex: 0 }}><TimelineScene /></div>
            <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to bottom, #04091A, transparent 20%, transparent 80%, #04091A)', zIndex: 1, pointerEvents: 'none' }} />

            <div style={{ position: 'relative', zIndex: 10, maxWidth: 960, margin: '0 auto', padding: '0 24px' }} ref={ref}>
                <motion.div initial={{ opacity: 0, y: 30 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.7 }} style={{ textAlign: 'center', marginBottom: 64 }}>
                    <p style={{ fontFamily: 'Rajdhani, sans-serif', fontSize: '0.7rem', letterSpacing: '0.5em', textTransform: 'uppercase', color: '#4FACFE', marginBottom: 12 }}>// 02 — Experience</p>
                    <h2 style={{ fontFamily: 'Orbitron, monospace', fontWeight: 800, fontSize: 'clamp(2rem, 5vw, 3.2rem)', color: '#E8EEFF', marginBottom: 12 }}>OPERATIONS LOG</h2>
                    <p style={{ color: '#7A90C4', fontFamily: 'Space Grotesk, sans-serif' }}>Mission timeline — roles, responsibilities, and results</p>
                    <div style={{ height: 1, width: 160, margin: '20px auto 0', background: 'linear-gradient(90deg, transparent, #4FACFE, transparent)' }} />
                </motion.div>

                {/* Timeline */}
                <div style={{ position: 'relative' }}>
                    {/* Center spine */}
                    <div className="exp-center-spine" style={{
                        position: 'absolute',
                        left: '50%',
                        top: 0,
                        bottom: 0,
                        width: 1,
                        transform: 'translateX(-50%)',
                        background: 'linear-gradient(to bottom, transparent, #4FACFE 15%, #4FACFE 85%, transparent)',
                    }} />

                    <div style={{ display: 'flex', flexDirection: 'column', gap: 56 }}>
                        {experiences.map((exp, i) => (
                            <motion.div
                                key={exp.id}
                                initial={{ opacity: 0, x: i % 2 === 0 ? -50 : 50 }}
                                animate={inView ? { opacity: 1, x: 0 } : {}}
                                transition={{ duration: 0.7, delay: 0.2 * i }}
                                className="exp-row"
                                style={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: 0,
                                    position: 'relative',
                                }}
                            >
                                {/* Card left side */}
                                <div className={i % 2 === 0 ? 'exp-card-left' : 'exp-card-hidden'} style={{ width: 'calc(50% - 28px)', display: i % 2 === 0 ? 'block' : 'none' }}>
                                    <ExperienceCard exp={exp} align="right" />
                                </div>
                                {i % 2 !== 0 && <div className="exp-card-hidden" style={{ width: 'calc(50% - 28px)' }} />}

                                {/* Center dot */}
                                <div className="exp-dot-col" style={{ width: 56, flexShrink: 0, display: 'flex', justifyContent: 'center', position: 'relative', zIndex: 2 }}>
                                    <div style={{
                                        width: 18,
                                        height: 18,
                                        borderRadius: '50%',
                                        background: exp.color,
                                        boxShadow: `0 0 20px ${exp.color}, 0 0 40px ${exp.color}66`,
                                        border: `2px solid ${exp.color}`,
                                        position: 'relative',
                                    }}>
                                        <div style={{ position: 'absolute', inset: -4, borderRadius: '50%', border: `1px solid ${exp.color}55`, animation: 'pulse 2s ease infinite' }} />
                                    </div>
                                </div>

                                {/* Card right side */}
                                {i % 2 !== 0 && (
                                    <div className="exp-card-right" style={{ width: 'calc(50% - 28px)' }}>
                                        <ExperienceCard exp={exp} align="left" />
                                    </div>
                                )}
                                {i % 2 === 0 && <div className="exp-card-hidden" style={{ width: 'calc(50% - 28px)' }} />}
                            </motion.div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}

function ExperienceCard({ exp, align }: { exp: typeof experiences[0]; align: 'left' | 'right' }) {
    return (
        <motion.div
            whileHover={{ y: -6, scale: 1.015 }}
            className="glass"
            style={{ padding: 24, borderColor: `${exp.color}33`, textAlign: align === 'right' ? 'right' : 'left' }}
        >
            {/* Type + period */}
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 10, justifyContent: align === 'right' ? 'flex-end' : 'flex-start' }}>
                <span style={{ fontFamily: 'Rajdhani, sans-serif', fontSize: '0.65rem', letterSpacing: '0.3em', textTransform: 'uppercase', padding: '3px 10px', borderRadius: 12, background: `${exp.color}20`, border: `1px solid ${exp.color}55`, color: exp.color }}>{exp.type}</span>
                <span style={{ fontFamily: 'Space Grotesk, sans-serif', fontSize: '0.7rem', color: '#7A90C4' }}>{exp.period}</span>
            </div>
            <h3 style={{ fontFamily: 'Orbitron, monospace', fontWeight: 700, fontSize: '0.95rem', color: '#E8EEFF', marginBottom: 4 }}>{exp.role}</h3>
            <p style={{ fontFamily: 'Rajdhani, sans-serif', fontWeight: 600, fontSize: '0.85rem', color: exp.color, marginBottom: 10 }}>{exp.company}</p>
            <p style={{ fontFamily: 'Space Grotesk, sans-serif', fontSize: '0.75rem', color: '#7A90C4', lineHeight: 1.7, marginBottom: 14 }}>{exp.description}</p>
            {/* Highlights */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: 4, marginBottom: 14, alignItems: align === 'right' ? 'flex-end' : 'flex-start' }}>
                {exp.highlights.slice(0, 3).map((h, j) => (
                    <div key={j} style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                        {align === 'right' && <span style={{ fontFamily: 'Space Grotesk, sans-serif', fontSize: '0.72rem', color: '#B8C8E8' }}>{h}</span>}
                        <span style={{ color: exp.color, fontSize: '0.7rem' }}>▸</span>
                        {align === 'left' && <span style={{ fontFamily: 'Space Grotesk, sans-serif', fontSize: '0.72rem', color: '#B8C8E8' }}>{h}</span>}
                    </div>
                ))}
            </div>
            {/* Tech */}
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6, justifyContent: align === 'right' ? 'flex-end' : 'flex-start' }}>
                {exp.tech.map((t) => (
                    <span key={t} style={{ fontFamily: 'Rajdhani, sans-serif', fontSize: '0.65rem', letterSpacing: '0.1em', textTransform: 'uppercase', padding: '2px 8px', borderRadius: 10, background: `${exp.color}15`, border: `1px solid ${exp.color}33`, color: exp.color }}>{t}</span>
                ))}
            </div>
        </motion.div>
    );
}
