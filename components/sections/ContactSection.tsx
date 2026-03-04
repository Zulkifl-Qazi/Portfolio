'use client';

import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import dynamic from 'next/dynamic';
import { profile } from '@/data/profile';

const ContactScene = dynamic(() => import('@/components/three/ContactScene'), { ssr: false, loading: () => null });

const links = [
    {
        label: 'GitHub',
        value: '@Zulkifl-Qazi',
        href: 'https://github.com/Zulkifl-Qazi',
        icon: <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor"><path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" /></svg>,
        color: '#E8EEFF',
    },
    {
        label: 'LinkedIn',
        value: 'zulkifl-qazi',
        href: 'https://www.linkedin.com/in/zulkifl-qazi-161786284',
        icon: <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" /></svg>,
        color: '#4FACFE',
    },
    {
        label: 'Email',
        value: profile.email,
        href: `mailto:${profile.email}`,
        icon: <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" /><path d="M22 6l-10 7L2 6" /></svg>,
        color: '#C9A227',
    },
];

export default function ContactSection() {
    const ref = useRef(null);
    const inView = useInView(ref, { once: true, margin: '-80px' });

    return (
        <section id="contact" style={{
            position: 'relative',
            minHeight: '100vh',
            padding: '100px 0 60px',
            overflowX: 'hidden',
            background: 'linear-gradient(180deg, #04091A 0%, #071135 60%, #04091A 100%)',
        }} ref={ref}>
            <div style={{ position: 'absolute', inset: 0, zIndex: 0 }}><ContactScene /></div>
            <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(180deg, #04091A, rgba(4,9,26,0.78) 20%, rgba(4,9,26,0.78) 80%, #04091A)', zIndex: 1, pointerEvents: 'none' }} />

            <div style={{ position: 'relative', zIndex: 10, maxWidth: 900, margin: '0 auto', padding: '0 24px' }}>
                {/* Header */}
                <motion.div initial={{ opacity: 0, y: 30 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.7 }} style={{ textAlign: 'center', marginBottom: 56 }}>
                    <p style={{ fontFamily: 'Rajdhani, sans-serif', fontSize: '0.7rem', letterSpacing: '0.5em', textTransform: 'uppercase', color: '#4FACFE', marginBottom: 12 }}>// 05 — Contact</p>
                    <h2 style={{ fontFamily: 'Orbitron, monospace', fontWeight: 800, fontSize: 'clamp(2rem, 5vw, 3.2rem)', color: '#E8EEFF', marginBottom: 12 }}>INITIATE CONTACT</h2>
                    <p style={{ color: '#7A90C4', fontFamily: 'Space Grotesk, sans-serif' }}>Open to collaboration, consulting and strategic partnerships</p>
                    <div style={{ height: 1, width: 160, margin: '20px auto 0', background: 'linear-gradient(90deg, transparent, #4FACFE, transparent)' }} />
                </motion.div>

                {/* Big CTA */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={inView ? { opacity: 1, y: 0 } : {}}
                    transition={{ delay: 0.3 }}
                    className="glass"
                    style={{ padding: 48, textAlign: 'center', marginBottom: 40, borderColor: 'rgba(79,172,254,0.35)', position: 'relative', overflow: 'hidden' }}
                >
                    <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(135deg, rgba(30,86,232,0.08), rgba(201,162,39,0.04), rgba(0,212,255,0.06))', backgroundSize: '300% 300%', animation: 'holo 5s ease infinite', pointerEvents: 'none' }} />
                    <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 2, background: 'linear-gradient(90deg, #1E56E8, #C9A227, #4FACFE, #00D4FF, #1E56E8)', backgroundSize: '200% 100%' }} />

                    <p style={{ fontFamily: 'Rajdhani, sans-serif', fontSize: '0.7rem', letterSpacing: '0.5em', textTransform: 'uppercase', color: '#C9A227', marginBottom: 16 }}>Ready to engage</p>
                    <h3 style={{ fontFamily: 'Orbitron, monospace', fontWeight: 900, fontSize: 'clamp(1.2rem, 3vw, 1.8rem)', color: '#E8EEFF', marginBottom: 16, position: 'relative' }}>
                        LET&apos;S BUILD SECURE SYSTEMS TOGETHER
                    </h3>
                    <p style={{ fontFamily: 'Space Grotesk, sans-serif', color: '#7A90C4', maxWidth: 480, margin: '0 auto 32px', lineHeight: 1.7, fontSize: '0.875rem' }}>
                        Whether you need a SOC buildout, compliance automation, threat detection tuning, or security architecture review — Team Zero-Gap is ready.
                    </p>
                    <div style={{ display: 'flex', gap: 16, justifyContent: 'center', flexWrap: 'wrap' }}>
                        <a href={`mailto:${profile.email}`} className="btn-royal" style={{ textDecoration: 'none' }}>
                            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" /><path d="M22 6l-10 7L2 6" /></svg>
                            Send Email
                        </a>
                        <a href="/cv/CV-V2.pdf" download className="btn-outline" style={{ textDecoration: 'none' }}>
                            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M12 15V3m0 12l-4-4m4 4l4-4" /><path d="M2 17l.621 2.485A2 2 0 004.561 21h14.878a2 2 0 001.94-1.515L22 17" /></svg>
                            Download CV
                        </a>
                    </div>
                </motion.div>

                {/* Social links */}
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 16 }}>
                    {links.map((link, i) => (
                        <motion.a
                            key={i}
                            href={link.href}
                            target={link.href.startsWith('http') ? '_blank' : undefined}
                            rel={link.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                            initial={{ opacity: 0, y: 20 }}
                            animate={inView ? { opacity: 1, y: 0 } : {}}
                            transition={{ delay: 0.5 + i * 0.15 }}
                            whileHover={{ y: -8, scale: 1.03 }}
                            className="glass"
                            style={{
                                display: 'flex',
                                flexDirection: 'column',
                                alignItems: 'center',
                                gap: 12,
                                padding: 24,
                                textDecoration: 'none',
                                borderColor: `${link.color}30`,
                                position: 'relative',
                                overflow: 'hidden',
                                cursor: 'pointer',
                            }}
                        >
                            <div style={{ width: 52, height: 52, borderRadius: 12, display: 'flex', alignItems: 'center', justifyContent: 'center', background: `${link.color}18`, border: `1px solid ${link.color}40`, color: link.color }}>
                                {link.icon}
                            </div>
                            <div style={{ textAlign: 'center' }}>
                                <p style={{ fontFamily: 'Orbitron, monospace', fontWeight: 700, fontSize: '0.8rem', color: '#E8EEFF', marginBottom: 4 }}>{link.label}</p>
                                <p style={{ fontFamily: 'Space Grotesk, sans-serif', fontSize: '0.7rem', color: '#7A90C4', wordBreak: 'break-all' }}>{link.value}</p>
                            </div>
                            <span style={{ fontFamily: 'Rajdhani, sans-serif', fontSize: '0.65rem', fontWeight: 600, letterSpacing: '0.2em', textTransform: 'uppercase', color: link.color }}>Connect →</span>
                            <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 1, background: `linear-gradient(90deg, transparent, ${link.color}, transparent)`, opacity: 0.4 }} />
                        </motion.a>
                    ))}
                </div>

                {/* Footer */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={inView ? { opacity: 1 } : {}}
                    transition={{ delay: 1.2 }}
                    style={{ textAlign: 'center', marginTop: 64, paddingTop: 32, borderTop: '1px solid rgba(79,172,254,0.1)' }}
                >
                    <p style={{ fontFamily: 'Orbitron, monospace', fontSize: '0.65rem', letterSpacing: '0.5em', textTransform: 'uppercase', color: '#7A90C4' }}>
                        © 2025 · <span style={{ color: '#4FACFE' }}>Zulkifl Qazi</span> · <span style={{ color: '#C9A227' }}>Team Zero-Gap</span>
                    </p>
                    <p style={{ fontFamily: 'Space Grotesk, sans-serif', fontSize: '0.7rem', color: '#3A4A6A', marginTop: 6 }}>
                        Engineering the zero-gap between threat and response
                    </p>
                </motion.div>
            </div>
        </section>
    );
}
