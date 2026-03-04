'use client';

import { useEffect, useRef, useState, useCallback } from 'react';
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';
import dynamic from 'next/dynamic';
import { TypeAnimation } from 'react-type-animation';

const HeroScene = dynamic(() => import('@/components/three/HeroScene'), {
    ssr: false,
    loading: () => null,
});

// ─── Mini animated hex/binary stream decorating the left panel ────────────────
function MatrixColumn({ x, delay }: { x: number; delay: number }) {
    const chars = '01アイウエオカキク ZERO-GAP //SEC';
    const col = useRef<HTMLDivElement>(null);
    useEffect(() => {
        let frame = 0;
        let raf: number;
        const el = col.current;
        if (!el) return;
        const tick = () => {
            frame++;
            if (frame % 6 === 0) {
                el.innerText = Array.from({ length: 14 }, () => chars[Math.floor(Math.random() * chars.length)]).join('\n');
            }
            raf = requestAnimationFrame(tick);
        };
        const timeout = setTimeout(() => { raf = requestAnimationFrame(tick); }, delay);
        return () => { clearTimeout(timeout); cancelAnimationFrame(raf); };
    }, [delay]);

    return (
        <div
            ref={col}
            style={{
                position: 'absolute',
                top: 0,
                left: x,
                fontSize: '0.55rem',
                lineHeight: '1.7',
                fontFamily: 'Orbitron, monospace',
                color: 'rgba(79,172,254,0.18)',
                userSelect: 'none',
                pointerEvents: 'none',
                whiteSpace: 'pre',
            }}
        />
    );
}

// ─── Threat level status bar ───────────────────────────────────────────────────
function ThreatBar() {
    const [level, setLevel] = useState(72);
    useEffect(() => {
        const id = setInterval(() => setLevel(60 + Math.floor(Math.random() * 35)), 2200);
        return () => clearInterval(id);
    }, []);
    const color = level > 85 ? '#FF4444' : level > 65 ? '#C9A227' : '#4FACFE';
    return (
        <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 6 }}>
            <span style={{ fontFamily: 'Rajdhani, sans-serif', fontSize: '0.6rem', letterSpacing: '0.3em', color: 'rgba(122,144,196,0.8)', textTransform: 'uppercase', whiteSpace: 'nowrap' }}>
                THREAT LEVEL
            </span>
            <div style={{ flex: 1, height: 2, background: 'rgba(30,86,232,0.25)', borderRadius: 2, overflow: 'hidden', maxWidth: 90 }}>
                <motion.div
                    animate={{ width: `${level}%` }}
                    transition={{ duration: 1.2, ease: 'easeInOut' }}
                    style={{ height: '100%', background: color, boxShadow: `0 0 8px ${color}` }}
                />
            </div>
            <span style={{ fontFamily: 'Orbitron, monospace', fontSize: '0.55rem', color, minWidth: 28 }}>{level}%</span>
        </div>
    );
}

// ─── Scrolling hex readout ─────────────────────────────────────────────────────
function HexReadout() {
    const [lines, setLines] = useState<string[]>([]);
    const generate = useCallback(() =>
        `[${Date.now().toString(16).toUpperCase()}] SYS::${Math.floor(Math.random() * 0xFFFF).toString(16).toUpperCase().padStart(4, '0')} → ${Math.random() < 0.5 ? 'AUTH_OK' : 'PKT_SCAN'}`,
        []
    );
    useEffect(() => {
        setLines([generate(), generate(), generate()]);
        const id = setInterval(() => {
            setLines(prev => [...prev.slice(-2), generate()]);
        }, 1800);
        return () => clearInterval(id);
    }, [generate]);

    return (
        <div style={{
            fontFamily: 'Orbitron, monospace',
            fontSize: '0.48rem',
            color: 'rgba(79,172,254,0.5)',
            letterSpacing: '0.06em',
            lineHeight: 1.9,
            minHeight: 52,
            marginBottom: 20,
        }}>
            {lines.map((l, i) => (
                <div key={i} style={{ opacity: i === lines.length - 1 ? 1 : 0.5 }}>{l}</div>
            ))}
        </div>
    );
}

// ─── Main hero ─────────────────────────────────────────────────────────────────
export default function HeroSection() {
    const containerRef = useRef<HTMLDivElement>(null);
    const { scrollY } = useScroll();
    const contentOpacity = useTransform(scrollY, [0, 400], [1, 0]);
    const contentY = useTransform(scrollY, [0, 400], [0, -60]);

    return (
        <section
            id="hero"
            ref={containerRef}
            className="hero-layout"
            style={{
                position: 'relative',
                width: '100%',
                height: '100vh',
                minHeight: 600,
                overflow: 'hidden',
                background: 'radial-gradient(ellipse 90% 80% at 75% 50%, #071C3F 0%, #040D1E 45%, #020810 100%)',
                display: 'flex',
                alignItems: 'stretch',
            }}
        >
            {/* ── FULL-SECTION 3D background canvas ─────────────────────── */}
            <div style={{ position: 'absolute', inset: 0, zIndex: 0, pointerEvents: 'none' }}>
                <HeroScene />
            </div>

            {/* Subtle grid overlay — entire section */}
            <div style={{
                position: 'absolute', inset: 0, zIndex: 1, pointerEvents: 'none',
                backgroundImage: 'linear-gradient(rgba(30,86,232,0.035) 1px, transparent 1px), linear-gradient(90deg, rgba(30,86,232,0.035) 1px, transparent 1px)',
                backgroundSize: '56px 56px',
            }} />

            {/* Scanline */}
            <div className="scanline" />

            {/* Top edge glow */}
            <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 1, background: 'linear-gradient(90deg, transparent 0%, #4FACFE 40%, #C9A227 60%, transparent 100%)', opacity: 0.6, zIndex: 5 }} />

            {/* Bottom fade */}
            <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, height: 220, background: 'linear-gradient(to top, #04091A, transparent)', zIndex: 4, pointerEvents: 'none' }} />


            {/* ── LEFT PANEL — text content ─────────────────────────────── */}
            <motion.div
                className="hero-left"
                style={{
                    position: 'relative',
                    zIndex: 10,
                    flex: '0 0 56%',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center',
                    padding: 'clamp(32px, 5vw, 80px) clamp(24px, 4vw, 60px)',
                    paddingLeft: 'clamp(40px, 6vw, 90px)',
                    opacity: contentOpacity,
                    y: contentY,
                    overflow: 'hidden',
                }}
            >
                {/* Matrix rain columns — decorative */}
                {[18, 55, 92, 135, 175].map((x, i) => (
                    <MatrixColumn key={i} x={x} delay={i * 400} />
                ))}

                {/* Status bar */}
                <motion.div
                    initial={{ opacity: 0, x: -30 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.9, delay: 0.4 }}
                    style={{
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: 10,
                        marginBottom: 12,
                        background: 'rgba(30,86,232,0.08)',
                        border: '1px solid rgba(79,172,254,0.2)',
                        borderRadius: 3,
                        padding: '6px 14px',
                        backdropFilter: 'blur(12px)',
                        alignSelf: 'flex-start',
                    }}
                >
                    {/* Pulsing green dot */}
                    <motion.div
                        animate={{ scale: [1, 1.5, 1], opacity: [1, 0.5, 1] }}
                        transition={{ duration: 1.6, repeat: Infinity }}
                        style={{ width: 6, height: 6, borderRadius: '50%', background: '#00FF88', boxShadow: '0 0 8px #00FF88' }}
                    />
                    <span style={{ fontFamily: 'Rajdhani, sans-serif', fontSize: '0.62rem', letterSpacing: '0.45em', textTransform: 'uppercase', color: '#4FACFE' }}>
                        TEAM ZERO-GAP // SECURITY OPERATIONS
                    </span>
                </motion.div>

                {/* ZULKIFL */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1.1, delay: 0.7, ease: [0.16, 1, 0.3, 1] }}
                >
                    <h1 style={{
                        fontFamily: 'Orbitron, monospace',
                        fontWeight: 900,
                        fontSize: 'clamp(2.6rem, 5.5vw, 5.8rem)',
                        lineHeight: 1.0,
                        letterSpacing: '-0.01em',
                        margin: 0,
                        padding: 0,
                    }}>
                        <span style={{
                            display: 'block',
                            background: 'linear-gradient(100deg, #E8EEFF 0%, #A8C8FF 55%, #4FACFE 100%)',
                            WebkitBackgroundClip: 'text',
                            WebkitTextFillColor: 'transparent',
                            backgroundClip: 'text',
                            filter: 'drop-shadow(0 0 30px rgba(79,172,254,0.55))',
                        }}>
                            ZULKIFL
                        </span>
                        <span style={{
                            display: 'block',
                            background: 'linear-gradient(100deg, #FFE066 0%, #C9A227 55%, #A07510 100%)',
                            WebkitBackgroundClip: 'text',
                            WebkitTextFillColor: 'transparent',
                            backgroundClip: 'text',
                            filter: 'drop-shadow(0 0 30px rgba(201,162,39,0.6))',
                        }}>
                            QAZI
                        </span>
                    </h1>
                </motion.div>

                {/* Glowing divider */}
                <motion.div
                    initial={{ scaleX: 0 }}
                    animate={{ scaleX: 1 }}
                    transition={{ duration: 1, delay: 1.2 }}
                    style={{ height: 1, width: '60%', maxWidth: 340, background: 'linear-gradient(90deg, #4FACFE, #C9A227, transparent)', margin: '16px 0', transformOrigin: 'left' }}
                />

                {/* Founder label */}
                <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 1.4 }}
                    style={{
                        fontFamily: 'Rajdhani, sans-serif',
                        fontSize: 'clamp(0.85rem, 1.6vw, 1.1rem)',
                        fontWeight: 500,
                        letterSpacing: '0.3em',
                        textTransform: 'uppercase',
                        color: '#B0C4E8',
                        marginBottom: 6,
                    }}
                >
                    Founder —{' '}
                    <span style={{ color: '#C9A227', fontWeight: 700 }}>Team Zero-Gap</span>
                </motion.p>

                {/* Typewriter role */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 1.7 }}
                    style={{
                        fontFamily: 'Orbitron, monospace',
                        fontSize: 'clamp(0.65rem, 1.3vw, 0.9rem)',
                        color: '#4FACFE',
                        letterSpacing: '0.18em',
                        minHeight: 26,
                        marginBottom: 14,
                    }}
                >
                    <span style={{ color: 'rgba(79,172,254,0.5)' }}>{'> '}</span>
                    <TypeAnimation
                        sequence={[
                            'SOC Operations Engineer', 2200,
                            'SIEM Architecture Specialist', 2200,
                            'Compliance Automation Engineer', 2200,
                            'DFIR Practitioner', 2200,
                            'Threat Detection Expert', 2200,
                            'Zero Trust Network Architect', 2200,
                        ]}
                        repeat={Infinity}
                        speed={55}
                        deletionSpeed={75}
                    />
                </motion.div>

                {/* Hex readout */}
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 2.0 }}>
                    <ThreatBar />
                    <HexReadout />
                </motion.div>

                {/* Role tags */}
                <motion.div
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 2.2 }}
                    style={{ display: 'flex', flexWrap: 'wrap', gap: 8, marginBottom: 36 }}
                >
                    {['SOC', 'SIEM', 'Compliance', 'Threat Detection', 'DFIR', 'ZTNA'].map((tag) => (
                        <span
                            key={tag}
                            style={{
                                fontFamily: 'Rajdhani, sans-serif',
                                fontSize: '0.65rem',
                                fontWeight: 700,
                                letterSpacing: '0.2em',
                                textTransform: 'uppercase',
                                padding: '4px 12px',
                                borderRadius: 2,
                                background: 'rgba(30,86,232,0.12)',
                                border: '1px solid rgba(79,172,254,0.28)',
                                color: '#C8DCFF',
                                backdropFilter: 'blur(10px)',
                                transition: 'all 0.25s',
                            }}
                        >
                            {tag}
                        </span>
                    ))}
                </motion.div>

                {/* CTA */}
                <motion.div
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 2.5 }}
                    style={{ display: 'flex', gap: 14, flexWrap: 'wrap' }}
                >
                    <a
                        href="#projects"
                        className="btn-royal"
                        onClick={(e) => { e.preventDefault(); document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' }); }}
                    >
                        View Projects
                        <svg width="13" height="13" viewBox="0 0 13 13" fill="none">
                            <path d="M2 6.5h9M7 3L10.5 6.5 7 10" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                    </a>
                    <a
                        href="#contact"
                        className="btn-outline"
                        onClick={(e) => { e.preventDefault(); document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' }); }}
                    >
                        Contact Me
                    </a>
                </motion.div>
            </motion.div>


            {/* ── RIGHT PANEL — HUD overlay only (3D canvas is full-bg) ──── */}
            <div
                className="hero-right"
                style={{
                    position: 'relative',
                    flex: '1 1 44%',
                    zIndex: 6,
                    overflow: 'hidden',
                    pointerEvents: 'none',
                }}
            >
                {/* Nebula glow vignette behind globe */}
                <div style={{
                    position: 'absolute',
                    top: '50%', left: '50%',
                    transform: 'translate(-50%, -50%)',
                    width: '120%', height: '120%',
                    background: 'radial-gradient(ellipse 65% 60% at 50% 50%, rgba(0,180,255,0.13) 0%, rgba(30,86,232,0.07) 40%, transparent 70%)',
                    pointerEvents: 'none',
                    zIndex: 2,
                }} />
            </div>


            {/* Scroll indicator */}
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 3.5 }}
                style={{
                    position: 'absolute',
                    bottom: 28,
                    left: '28%',
                    transform: 'translateX(-50%)',
                    zIndex: 10,
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    gap: 6,
                }}
            >
                <span style={{ fontFamily: 'Rajdhani, sans-serif', fontSize: '0.6rem', letterSpacing: '0.45em', textTransform: 'uppercase', color: 'rgba(122,144,196,0.6)' }}>
                    Scroll
                </span>
                <motion.div
                    style={{ width: 1, height: 44, background: 'linear-gradient(to bottom, #4FACFE, transparent)' }}
                    animate={{ scaleY: [1, 0.35, 1], opacity: [1, 0.3, 1] }}
                    transition={{ duration: 2.2, repeat: Infinity }}
                />
            </motion.div>
        </section>
    );
}
