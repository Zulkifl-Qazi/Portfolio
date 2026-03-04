'use client';

import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

function LoadingScreen({ onDone }: { onDone: () => void }) {
    const [progress, setProgress] = useState(0);

    useEffect(() => {
        const iv = setInterval(() => {
            setProgress(p => {
                if (p >= 100) { clearInterval(iv); setTimeout(onDone, 300); return 100; }
                return p + Math.random() * 9 + 3;
            });
        }, 55);
        return () => clearInterval(iv);
    }, [onDone]);

    const pct = Math.min(Math.floor(progress), 100);

    return (
        <motion.div
            initial={{ opacity: 1 }}
            exit={{ opacity: 0, scale: 1.02 }}
            transition={{ duration: 0.6 }}
            style={{
                position: 'fixed', inset: 0, zIndex: 99990,
                background: '#04091A',
                display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
                overflow: 'hidden',
            }}
        >
            {/* Grid bg */}
            <div style={{
                position: 'absolute', inset: 0, opacity: 0.06,
                backgroundImage: 'linear-gradient(rgba(79,172,254,1) 1px, transparent 1px), linear-gradient(90deg, rgba(79,172,254,1) 1px, transparent 1px)',
                backgroundSize: '50px 50px',
                pointerEvents: 'none',
            }} />

            {/* Glow blob */}
            <div style={{
                position: 'absolute', width: 400, height: 400, borderRadius: '50%',
                background: 'radial-gradient(ellipse, rgba(30,86,232,0.3) 0%, transparent 70%)',
                filter: 'blur(60px)', pointerEvents: 'none',
            }} />

            {/* Logo */}
            <div style={{ position: 'relative', marginBottom: 32, textAlign: 'center', zIndex: 1 }}>
                <p style={{
                    fontFamily: 'Orbitron, monospace', fontWeight: 900, fontSize: '3rem', letterSpacing: '0.1em',
                    background: 'linear-gradient(135deg, #4FACFE, #C9A227)',
                    WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text',
                }}>ZERO-GAP</p>
                <p style={{ fontFamily: 'Rajdhani, sans-serif', fontSize: '0.65rem', letterSpacing: '0.6em', textTransform: 'uppercase', color: '#4FACFE', marginTop: 4 }}>
                    Initializing Security Console
                </p>
            </div>

            {/* Progress bar */}
            <div style={{ position: 'relative', zIndex: 1, width: 280, height: 2, background: 'rgba(79,172,254,0.1)', borderRadius: 2, marginBottom: 12, overflow: 'hidden' }}>
                <motion.div
                    style={{ height: '100%', borderRadius: 2, background: 'linear-gradient(90deg, #1E56E8, #4FACFE, #C9A227)' }}
                    animate={{ width: `${pct}%` }}
                    transition={{ ease: 'linear', duration: 0.05 }}
                />
            </div>

            <p style={{ position: 'relative', zIndex: 1, fontFamily: 'Orbitron, monospace', fontSize: '0.7rem', color: '#4FACFE' }}>{pct}%</p>
        </motion.div>
    );
}

export default function PageWrapper({ children }: { children: React.ReactNode }) {
    const [loaded, setLoaded] = useState(false);

    return (
        <>
            {/* Scan line — below cursor z-index */}
            <div style={{
                position: 'fixed', top: 0, left: 0, right: 0, height: 2,
                background: 'linear-gradient(90deg, transparent, rgba(0,212,255,0.18), transparent)',
                pointerEvents: 'none', zIndex: 100,
                animation: 'scanline 10s linear infinite',
            }} />

            <AnimatePresence>
                {!loaded && <LoadingScreen key="loader" onDone={() => setLoaded(true)} />}
            </AnimatePresence>

            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: loaded ? 1 : 0 }}
                transition={{ duration: 0.6 }}
                style={{ background: '#04091A' }}
            >
                {children}
            </motion.div>
        </>
    );
}
