'use client';

import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import dynamic from 'next/dynamic';

const TeamScene = dynamic(() => import('@/components/three/TeamScene'), { ssr: false, loading: () => null });

const focusAreas = [
    { icon: '⚙️', title: 'Compliance Automation', desc: 'Automated ISO 27001, NIST CSF, CIS benchmark scanning' },
    { icon: '🎯', title: 'Threat Detection', desc: 'Behavioral analytics, IOC correlation & detection rules' },
    { icon: '📡', title: 'Security Monitoring', desc: 'SIEM tuning, dashboards & 24/7 SOC operations' },
    { icon: '🔧', title: 'SOC Tooling', desc: 'Custom tools, automation scripts & integration pipelines' },
    { icon: '🏗️', title: 'Security Architecture', desc: 'Zero-trust design, micro-segmentation, defense-in-depth' },
    { icon: '🔍', title: 'DFIR', desc: 'Forensics, memory analysis, malware triage & IR playbooks' },
];

export default function TeamSection() {
    const ref = useRef(null);
    const inView = useInView(ref, { once: true, margin: '-80px' });

    return (
        <section id="team" style={{
            position: 'relative',
            minHeight: '100vh',
            padding: '100px 0',
            overflow: 'hidden',
            background: 'linear-gradient(180deg, #04091A 0%, #071135 50%, #04091A 100%)',
        }} ref={ref}>
            <div style={{ position: 'absolute', inset: 0, zIndex: 0 }}><TeamScene /></div>
            <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(180deg, #04091A, rgba(4,9,26,0.75) 20%, rgba(4,9,26,0.75) 80%, #04091A)', zIndex: 1, pointerEvents: 'none' }} />

            <div style={{ position: 'relative', zIndex: 10, maxWidth: 1200, margin: '0 auto', padding: '0 24px' }}>
                {/* Header */}
                <motion.div initial={{ opacity: 0, y: 30 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.7 }} style={{ textAlign: 'center', marginBottom: 72 }}>
                    <p style={{ fontFamily: 'Rajdhani, sans-serif', fontSize: '0.7rem', letterSpacing: '0.5em', textTransform: 'uppercase', color: '#4FACFE', marginBottom: 20 }}>// 04 — Team</p>
                    <div style={{ position: 'relative', display: 'inline-block', marginBottom: 20 }}>
                        <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(ellipse, rgba(30,86,232,0.5) 0%, transparent 70%)', filter: 'blur(40px)', zIndex: 0 }} />
                        <h2 style={{
                            fontFamily: 'Orbitron, monospace',
                            fontWeight: 900,
                            fontSize: 'clamp(2.5rem, 7vw, 5.5rem)',
                            letterSpacing: '0.06em',
                            position: 'relative',
                            zIndex: 1,
                            background: 'linear-gradient(135deg, #4FACFE 0%, #C9A227 50%, #4FACFE 100%)',
                            backgroundSize: '200% 200%',
                            WebkitBackgroundClip: 'text',
                            WebkitTextFillColor: 'transparent',
                            backgroundClip: 'text',
                            animation: 'holo 4s ease infinite',
                        }}>
                            TEAM ZERO-GAP
                        </h2>
                    </div>
                    <p style={{ fontFamily: 'Space Grotesk, sans-serif', color: '#B8C8E8', maxWidth: 600, margin: '0 auto 12px', lineHeight: 1.7, fontSize: '0.95rem' }}>
                        A specialized cybersecurity engineering and research team — engineering the zero-gap between threat and response.
                    </p>
                    <div style={{ height: 1, width: 200, margin: '20px auto 0', background: 'linear-gradient(90deg, transparent, #4FACFE, transparent)' }} />
                </motion.div>

                {/* Founder + Mission */}
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: 28, marginBottom: 64 }}>
                    {/* Founder card */}
                    <motion.div initial={{ opacity: 0, x: -50 }} animate={inView ? { opacity: 1, x: 0 } : {}} transition={{ duration: 0.7, delay: 0.3 }}>
                        <motion.div
                            whileHover={{ y: -8 }}
                            className="glass"
                            style={{ padding: 32, borderColor: 'rgba(201,162,39,0.4)', position: 'relative', overflow: 'hidden', height: '100%' }}
                        >
                            <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 3, background: 'linear-gradient(90deg, #1E56E8, #C9A227, #4FACFE)' }} />
                            <div style={{ display: 'flex', alignItems: 'center', gap: 20, marginBottom: 24 }}>
                                <div style={{
                                    width: 72, height: 72, borderRadius: 14, display: 'flex', alignItems: 'center', justifyContent: 'center',
                                    fontFamily: 'Orbitron, monospace', fontWeight: 900, fontSize: '1.2rem', color: '#E8EEFF',
                                    background: 'linear-gradient(135deg, #1E56E8, #071135)',
                                    border: '2px solid rgba(79,172,254,0.6)',
                                    boxShadow: '0 0 30px rgba(79,172,254,0.4)',
                                    flexShrink: 0,
                                }}>ZQ</div>
                                <div>
                                    <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 6 }}>
                                        <span style={{ fontFamily: 'Rajdhani, sans-serif', fontSize: '0.65rem', letterSpacing: '0.3em', textTransform: 'uppercase', padding: '3px 10px', borderRadius: 12, background: 'rgba(201,162,39,0.2)', border: '1px solid rgba(201,162,39,0.5)', color: '#C9A227' }}>Founder</span>
                                        <span style={{ width: 6, height: 6, borderRadius: '50%', background: '#4FACFE', display: 'inline-block', animation: 'pulse 2s ease infinite' }} />
                                        <span style={{ fontFamily: 'Space Grotesk, sans-serif', fontSize: '0.7rem', color: '#4FACFE' }}>Active</span>
                                    </div>
                                    <h3 style={{ fontFamily: 'Orbitron, monospace', fontWeight: 800, fontSize: '1.1rem', color: '#E8EEFF', marginBottom: 2 }}>Zulkifl Qazi</h3>
                                    <p style={{ fontFamily: 'Rajdhani, sans-serif', fontWeight: 600, fontSize: '0.8rem', color: '#C9A227' }}>Lead Security Engineer — Team Zero-Gap</p>
                                </div>
                            </div>
                            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6, marginBottom: 20 }}>
                                {['SOC', 'SIEM', 'DFIR', 'Compliance', 'Architecture'].map(t => (
                                    <span key={t} style={{ fontFamily: 'Rajdhani, sans-serif', fontSize: '0.62rem', letterSpacing: '0.1em', textTransform: 'uppercase', padding: '2px 10px', borderRadius: 10, background: 'rgba(79,172,254,0.12)', border: '1px solid rgba(79,172,254,0.25)', color: '#7A90C4' }}>{t}</span>
                                ))}
                            </div>
                            <div style={{ borderTop: '1px solid rgba(79,172,254,0.15)', paddingTop: 18 }}>
                                <p style={{ fontFamily: 'Space Grotesk, sans-serif', fontSize: '0.82rem', color: '#B8C8E8', lineHeight: 1.75 }}>
                                    Founder and lead engineer of Team Zero-Gap, driving the mission to architect proactive, automated security systems that eliminate the gap between threat actors and defenders.
                                </p>
                            </div>
                            <div style={{ position: 'absolute', bottom: 0, right: 0, width: 24, height: 24, borderBottom: '2px solid rgba(201,162,39,0.6)', borderRight: '2px solid rgba(201,162,39,0.6)' }} />
                        </motion.div>
                    </motion.div>

                    {/* Mission + Philosophy */}
                    <motion.div initial={{ opacity: 0, x: 50 }} animate={inView ? { opacity: 1, x: 0 } : {}} transition={{ duration: 0.7, delay: 0.5 }} style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
                        {[
                            { label: 'Mission', color: '#4FACFE', text: 'To engineer the zero-gap between threat and response — building automated, precision security systems that detect, analyze, and neutralize threats faster than adversaries can adapt.' },
                            { label: 'Philosophy', color: '#C9A227', text: 'Security is not a product — it\'s an engineering discipline. Every system we build is designed to be adaptive, measurable, and operationally resilient under real-world adversarial pressure.' },
                        ].map((item) => (
                            <div key={item.label} className="glass" style={{ padding: 24, borderColor: `${item.color}30`, flex: 1 }}>
                                <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 14 }}>
                                    <div style={{ width: 3, height: 24, background: item.color, borderRadius: 2 }} />
                                    <span style={{ fontFamily: 'Orbitron, monospace', fontSize: '0.65rem', fontWeight: 700, letterSpacing: '0.3em', textTransform: 'uppercase', color: item.color }}>{item.label}</span>
                                </div>
                                <p style={{ fontFamily: 'Space Grotesk, sans-serif', fontSize: '0.82rem', color: '#B8C8E8', lineHeight: 1.75 }}>{item.text}</p>
                            </div>
                        ))}
                    </motion.div>
                </div>

                {/* Focus areas */}
                <motion.div initial={{ opacity: 0, y: 30 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.7, delay: 0.7 }}>
                    <h3 style={{ fontFamily: 'Orbitron, monospace', fontWeight: 700, textAlign: 'center', color: '#E8EEFF', fontSize: '1rem', letterSpacing: '0.15em', textTransform: 'uppercase', marginBottom: 32 }}>FOCUS AREAS</h3>
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))', gap: 16 }}>
                        {focusAreas.map((area, i) => (
                            <motion.div
                                key={i}
                                initial={{ opacity: 0, scale: 0.9 }}
                                animate={inView ? { opacity: 1, scale: 1 } : {}}
                                transition={{ delay: 0.8 + i * 0.08 }}
                                whileHover={{ y: -6, scale: 1.02 }}
                                className="glass"
                                style={{ padding: 22, borderColor: i % 2 === 0 ? 'rgba(79,172,254,0.2)' : 'rgba(201,162,39,0.2)', cursor: 'default', position: 'relative', overflow: 'hidden' }}
                            >
                                <div style={{ fontSize: '1.5rem', marginBottom: 10 }}>{area.icon}</div>
                                <h4 style={{ fontFamily: 'Orbitron, monospace', fontWeight: 700, fontSize: '0.75rem', color: '#E8EEFF', marginBottom: 8, letterSpacing: '0.05em' }}>{area.title}</h4>
                                <p style={{ fontFamily: 'Space Grotesk, sans-serif', fontSize: '0.75rem', color: '#7A90C4', lineHeight: 1.65 }}>{area.desc}</p>
                                <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 1, background: i % 2 === 0 ? 'linear-gradient(90deg, transparent, rgba(79,172,254,0.4), transparent)' : 'linear-gradient(90deg, transparent, rgba(201,162,39,0.4), transparent)' }} />
                            </motion.div>
                        ))}
                    </div>
                </motion.div>
            </div>
        </section>
    );
}
