'use client';

import { useEffect, useRef } from 'react';

export default function GlobalCursor() {
    const cursorRef = useRef<HTMLDivElement>(null);
    const followerRef = useRef<HTMLDivElement>(null);
    const pos = useRef({ x: -100, y: -100 });
    const fpos = useRef({ x: -100, y: -100 });
    const raf = useRef<number>(0);

    useEffect(() => {
        const onMove = (e: MouseEvent) => {
            pos.current = { x: e.clientX, y: e.clientY };
        };
        window.addEventListener('mousemove', onMove, { passive: true });

        const loop = () => {
            // Move cursor dot INSTANTLY to mouse position
            if (cursorRef.current) {
                cursorRef.current.style.transform = `translate(${pos.current.x - 5}px, ${pos.current.y - 5}px)`;
            }
            // lerp follower ring (smooth lag)
            fpos.current.x += (pos.current.x - fpos.current.x) * 0.12;
            fpos.current.y += (pos.current.y - fpos.current.y) * 0.12;
            if (followerRef.current) {
                followerRef.current.style.transform = `translate(${fpos.current.x - 16}px, ${fpos.current.y - 16}px)`;
            }
            raf.current = requestAnimationFrame(loop);
        };
        raf.current = requestAnimationFrame(loop);

        return () => {
            window.removeEventListener('mousemove', onMove);
            cancelAnimationFrame(raf.current);
        };
    }, []);

    return (
        <>
            {/* Dot */}
            <div
                ref={cursorRef}
                style={{
                    position: 'fixed',
                    top: 0,
                    left: 0,
                    width: 10,
                    height: 10,
                    borderRadius: '50%',
                    background: '#4FACFE',
                    pointerEvents: 'none',
                    zIndex: 2147483647, /* MAX z-index — guaranteed on top of everything */
                    boxShadow: '0 0 8px #4FACFE, 0 0 20px rgba(79,172,254,0.5)',
                    willChange: 'transform',
                }}
            />
            {/* Ring follower */}
            <div
                ref={followerRef}
                style={{
                    position: 'fixed',
                    top: 0,
                    left: 0,
                    width: 32,
                    height: 32,
                    borderRadius: '50%',
                    border: '1.5px solid rgba(79,172,254,0.55)',
                    pointerEvents: 'none',
                    zIndex: 2147483646,
                    willChange: 'transform',
                }}
            />
        </>
    );
}
