'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const navItems = [
    { label: 'About', href: 'about' },
    { label: 'Experience', href: 'experience' },
    { label: 'Projects', href: 'projects' },
    { label: 'Team', href: 'team' },
    { label: 'Contact', href: 'contact' },
];

export default function Navbar() {
    const [scrolled, setScrolled] = useState(false);
    const [mobileOpen, setMobileOpen] = useState(false);
    const [active, setActive] = useState('hero');

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 60);
            const ids = ['hero', 'about', 'experience', 'projects', 'team', 'contact'];
            for (const id of [...ids].reverse()) {
                const el = document.getElementById(id);
                if (el && window.scrollY >= el.offsetTop - 200) { setActive(id); break; }
            }
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const scrollTo = (id: string) => {
        document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
        setMobileOpen(false);
    };

    return (
        <>
            <motion.nav
                initial={{ y: -80, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.8, delay: 0.4 }}
                style={{
                    position: 'fixed',
                    top: 0,
                    left: 0,
                    right: 0,
                    zIndex: 50,
                    padding: '14px 32px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    background: scrolled ? 'rgba(4, 9, 26, 0.92)' : 'transparent',
                    backdropFilter: scrolled ? 'blur(20px)' : 'none',
                    borderBottom: scrolled ? '1px solid rgba(79,172,254,0.2)' : 'none',
                    transition: 'all 0.3s ease',
                }}
            >
                {/* Logo */}
                <motion.button
                    whileHover={{ scale: 1.04 }}
                    onClick={() => scrollTo('hero')}
                    style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: 10,
                        background: 'none',
                        border: 'none',
                        cursor: 'pointer',
                    }}
                >
                    <div style={{
                        width: 36,
                        height: 36,
                        borderRadius: 6,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        fontFamily: 'Orbitron, monospace',
                        fontWeight: 900,
                        fontSize: '0.8rem',
                        color: '#fff',
                        background: 'linear-gradient(135deg, #1E56E8, #4FACFE)',
                        boxShadow: '0 0 20px rgba(79,172,254,0.5)',
                    }}>ZG</div>
                    <div>
                        <p style={{ fontFamily: 'Orbitron, monospace', fontWeight: 700, fontSize: '0.7rem', color: '#E8EEFF', lineHeight: 1.2 }}>ZERO-GAP</p>
                        <p style={{ fontFamily: 'Rajdhani, sans-serif', fontSize: '0.6rem', letterSpacing: '0.3em', textTransform: 'uppercase', color: '#4FACFE' }}>Security</p>
                    </div>
                </motion.button>

                {/* Desktop nav */}
                <div className="desktop-nav" style={{ display: 'flex', alignItems: 'center', gap: 32 }}>
                    {navItems.map((item) => (
                        <button
                            key={item.label}
                            onClick={() => scrollTo(item.href)}
                            style={{
                                fontFamily: 'Rajdhani, sans-serif',
                                fontSize: '0.8rem',
                                fontWeight: 600,
                                letterSpacing: '0.2em',
                                textTransform: 'uppercase',
                                color: active === item.href ? '#4FACFE' : '#7A90C4',
                                background: 'none',
                                border: 'none',
                                cursor: 'pointer',
                                position: 'relative',
                                paddingBottom: 4,
                                transition: 'color 0.2s',
                            }}
                        >
                            {item.label}
                            {active === item.href && (
                                <motion.div
                                    layoutId="nav-active"
                                    style={{ position: 'absolute', bottom: 0, left: 0, right: 0, height: 1, background: '#4FACFE' }}
                                />
                            )}
                        </button>
                    ))}
                    <a
                        href="https://github.com/Zulkifl-Qazi"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="btn-royal"
                        style={{ fontSize: '0.65rem', padding: '8px 16px' }}
                    >
                        GitHub
                    </a>
                </div>

                {/* Mobile hamburger */}
                <button
                    onClick={() => setMobileOpen(!mobileOpen)}
                    style={{
                        display: 'none',
                        flexDirection: 'column',
                        gap: 5,
                        background: 'none',
                        border: 'none',
                        cursor: 'pointer',
                    }}
                    className="mobile-hamburger"
                >
                    {[0, 1, 2].map((i) => (
                        <div key={i} style={{ width: 24, height: 1.5, background: '#4FACFE' }} />
                    ))}
                </button>
            </motion.nav>

            {/* Mobile menu */}
            <AnimatePresence>
                {mobileOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        style={{
                            position: 'fixed',
                            top: 64,
                            left: 16,
                            right: 16,
                            zIndex: 40,
                            background: 'rgba(7,17,53,0.97)',
                            border: '1px solid rgba(79,172,254,0.25)',
                            borderRadius: 12,
                            padding: 24,
                            backdropFilter: 'blur(20px)',
                        }}
                    >
                        {navItems.map((item) => (
                            <button
                                key={item.label}
                                onClick={() => scrollTo(item.href)}
                                style={{
                                    display: 'block',
                                    width: '100%',
                                    textAlign: 'left',
                                    padding: '12px 0',
                                    fontFamily: 'Rajdhani, sans-serif',
                                    fontSize: '1rem',
                                    fontWeight: 600,
                                    letterSpacing: '0.2em',
                                    textTransform: 'uppercase',
                                    color: active === item.href ? '#4FACFE' : '#E8EEFF',
                                    background: 'none',
                                    border: 'none',
                                    borderBottom: '1px solid rgba(79,172,254,0.1)',
                                    cursor: 'pointer',
                                }}
                            >
                                {item.label}
                            </button>
                        ))}
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
}
