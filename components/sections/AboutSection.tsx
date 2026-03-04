'use client';

import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import dynamic from 'next/dynamic';
import { profile, certifications, skills, education } from '@/data/profile';

const AboutScene = dynamic(() => import('@/components/three/AboutScene'), { ssr: false, loading: () => null });

export default function AboutSection() {
    const ref = useRef(null);
    const inView = useInView(ref, { once: true, margin: '-60px' });

    return (
        <section
            id="about"
            style={{
                position: 'relative',
                minHeight: '100vh',
                padding: '100px 0 80px',
                overflowX: 'hidden', /* Only hide horizontal overflow — not vertical, which clips content */
                background: 'linear-gradient(180deg, #04091A 0%, #071135 50%, #04091A 100%)',
            }}
        >
            {/* 3D Background */}
            <div style={{ position: 'absolute', inset: 0, opacity: 0.22, zIndex: 0 }}>
                <AboutScene />
            </div>

            {/* Top/bottom fade */}
            <div style={{
                position: 'absolute', inset: 0, zIndex: 1, pointerEvents: 'none',
                background: 'linear-gradient(to bottom, #04091A 0%, transparent 15%, transparent 85%, #04091A 100%)',
            }} />

            {/* Content */}
            <div ref={ref} style={{ position: 'relative', zIndex: 10, maxWidth: 1180, margin: '0 auto', padding: '0 24px' }}>

                {/* Section header */}
                <motion.div
                    initial={{ opacity: 0, y: 28 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.6 }}
                    style={{ textAlign: 'center', marginBottom: 60 }}
                >
                    <p style={{ fontFamily: 'Rajdhani, sans-serif', fontSize: '0.7rem', letterSpacing: '0.5em', textTransform: 'uppercase', color: '#4FACFE', marginBottom: 12 }}>
            // 01 — About
                    </p>
                    <h2 style={{ fontFamily: 'Orbitron, monospace', fontWeight: 800, fontSize: 'clamp(2rem, 5vw, 3.5rem)', color: '#E8EEFF', marginBottom: 12 }}>
                        WHO I AM
                    </h2>
                    <p style={{ fontFamily: 'Space Grotesk, sans-serif', color: '#7A90C4', fontSize: '0.95rem' }}>
                        Engineering the zero-gap between threat and response
                    </p>
                    <div style={{ height: 1, width: 140, margin: '18px auto 0', background: 'linear-gradient(90deg, transparent, #4FACFE, transparent)' }} />
                </motion.div>

                {/* Two-column grid — stacks to single column on small screens */}
                <div style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 380px), 1fr))',
                    gap: 28,
                    alignItems: 'start',
                }}>
                    {/* ─── LEFT COLUMN ─── */}
                    <motion.div
                        initial={{ opacity: 0, x: -30 }} animate={inView ? { opacity: 1, x: 0 } : {}} transition={{ duration: 0.6, delay: 0.15 }}
                        style={{ display: 'flex', flexDirection: 'column', gap: 20 }}
                    >
                        {/* Bio */}
                        <div className="glass" style={{ padding: 24, borderColor: 'rgba(79,172,254,0.28)' }}>
                            <Pill color="#4FACFE" label="Profile" />
                            <p style={{ fontFamily: 'Space Grotesk, sans-serif', fontSize: '0.875rem', color: '#B8C8E8', lineHeight: 1.75, marginTop: 14 }}>
                                {profile.bio}
                            </p>
                        </div>

                        {/* Education */}
                        <div className="glass" style={{ padding: 24, borderColor: 'rgba(201,162,39,0.28)' }}>
                            <Pill color="#C9A227" label="Education" />
                            <div style={{ marginTop: 14, display: 'flex', flexDirection: 'column', gap: 12 }}>
                                {education.map((e, i) => (
                                    <div key={i} style={{ borderLeft: '2px solid #C9A227', paddingLeft: 14 }}>
                                        <p style={{ fontFamily: 'Rajdhani, sans-serif', fontWeight: 600, fontSize: '0.95rem', color: '#E8EEFF' }}>{e.degree}</p>
                                        <p style={{ fontFamily: 'Space Grotesk, sans-serif', fontSize: '0.73rem', color: '#7A90C4', marginTop: 3 }}>{e.institution} · {e.period}</p>
                                        <p style={{ fontFamily: 'Space Grotesk, sans-serif', fontSize: '0.73rem', color: '#C9A227', marginTop: 2 }}>{e.focus}</p>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Certifications */}
                        <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                            <p style={{ fontFamily: 'Orbitron, monospace', fontSize: '0.65rem', fontWeight: 700, letterSpacing: '0.3em', textTransform: 'uppercase', color: '#E8EEFF', marginBottom: 2 }}>
                                Certifications
                            </p>
                            {certifications.map((cert, i) => (
                                <motion.div
                                    key={i}
                                    initial={{ opacity: 0, x: -16 }} animate={inView ? { opacity: 1, x: 0 } : {}} transition={{ delay: 0.3 + i * 0.1 }}
                                    whileHover={{ x: 4, scale: 1.015 }}
                                    className="glass"
                                    style={{ padding: '12px 16px', display: 'flex', alignItems: 'center', gap: 12, borderColor: `${cert.color}40`, cursor: 'default' }}
                                >
                                    <div style={{ width: 40, height: 40, borderRadius: 8, display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: 'Orbitron, monospace', fontWeight: 900, fontSize: '0.7rem', background: `${cert.color}18`, border: `1px solid ${cert.color}55`, color: cert.color, flexShrink: 0 }}>
                                        {cert.icon}
                                    </div>
                                    <div style={{ minWidth: 0, flex: 1 }}>
                                        <p style={{ fontFamily: 'Rajdhani, sans-serif', fontWeight: 600, fontSize: '0.88rem', color: '#E8EEFF', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{cert.name}</p>
                                        <p style={{ fontFamily: 'Space Grotesk, sans-serif', fontSize: '0.68rem', color: '#7A90C4', marginTop: 2 }}>{cert.issuer} · {cert.year}</p>
                                    </div>
                                    <div style={{ width: 8, height: 8, borderRadius: '50%', background: cert.color, boxShadow: `0 0 8px ${cert.color}`, flexShrink: 0 }} />
                                </motion.div>
                            ))}
                        </div>
                    </motion.div>

                    {/* ─── RIGHT COLUMN ─── */}
                    <motion.div
                        initial={{ opacity: 0, x: 30 }} animate={inView ? { opacity: 1, x: 0 } : {}} transition={{ duration: 0.6, delay: 0.3 }}
                        style={{ display: 'flex', flexDirection: 'column', gap: 20 }}
                    >
                        {/* Skills card */}
                        <div className="glass" style={{ padding: 24, borderColor: 'rgba(79,172,254,0.18)' }}>
                            <Pill color="#00D4FF" label="Arsenal" />
                            <div style={{ display: 'flex', flexDirection: 'column', gap: 20, marginTop: 18 }}>
                                {[
                                    { label: 'SIEM & Monitoring', items: skills.siem, color: '#4FACFE' },
                                    { label: 'Offensive Security', items: skills.offensive, color: '#C9A227' },
                                    { label: 'Digital Forensics', items: skills.forensics, color: '#00D4FF' },
                                    { label: 'Development', items: skills.development, color: '#4FACFE' },
                                    { label: 'Frameworks', items: skills.frameworks, color: '#C9A227' },
                                    { label: 'Platforms', items: skills.platforms, color: '#7A90C4' },
                                ].map((cat) => (
                                    <div key={cat.label}>
                                        <p style={{ fontFamily: 'Rajdhani, sans-serif', fontSize: '0.62rem', letterSpacing: '0.3em', textTransform: 'uppercase', color: cat.color, marginBottom: 8 }}>
                                            {cat.label}
                                        </p>
                                        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
                                            {cat.items.map((s) => (
                                                <motion.span
                                                    key={s}
                                                    whileHover={{ scale: 1.07 }}
                                                    style={{
                                                        fontFamily: 'Rajdhani, sans-serif', fontSize: '0.68rem', fontWeight: 600,
                                                        letterSpacing: '0.07em', textTransform: 'uppercase',
                                                        padding: '3px 10px', borderRadius: 16,
                                                        background: `${cat.color}16`, border: `1px solid ${cat.color}38`, color: '#C8D8F0',
                                                        cursor: 'default',
                                                    }}
                                                >
                                                    {s}
                                                </motion.span>
                                            ))}
                                        </div>
                                        <div style={{ height: 1, background: 'linear-gradient(90deg, transparent, rgba(79,172,254,0.12), transparent)', marginTop: 14 }} />
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Stats row */}
                        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 12 }}>
                            {[
                                { v: '7+', l: 'Projects', c: '#4FACFE' },
                                { v: '3+', l: 'Certs', c: '#C9A227' },
                                { v: '∞', l: 'Drive', c: '#00D4FF' },
                            ].map((s, i) => (
                                <motion.div
                                    key={i}
                                    initial={{ opacity: 0, scale: 0.85 }} animate={inView ? { opacity: 1, scale: 1 } : {}} transition={{ delay: 0.5 + i * 0.1 }}
                                    className="glass"
                                    style={{ padding: '18px 8px', textAlign: 'center', borderColor: `${s.c}28` }}
                                >
                                    <p style={{ fontFamily: 'Orbitron, monospace', fontWeight: 900, fontSize: '1.8rem', color: s.c, lineHeight: 1 }}>{s.v}</p>
                                    <p style={{ fontFamily: 'Rajdhani, sans-serif', fontSize: '0.6rem', letterSpacing: '0.3em', textTransform: 'uppercase', color: '#7A90C4', marginTop: 6 }}>{s.l}</p>
                                </motion.div>
                            ))}
                        </div>
                    </motion.div>
                </div>
            </div>
        </section>
    );
}

// Small helper
function Pill({ color, label }: { color: string; label: string }) {
    return (
        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
            <div style={{ width: 3, height: 24, background: color, borderRadius: 2 }} />
            <span style={{ fontFamily: 'Orbitron, monospace', fontSize: '0.65rem', fontWeight: 700, letterSpacing: '0.3em', textTransform: 'uppercase', color }}>{label}</span>
        </div>
    );
}
