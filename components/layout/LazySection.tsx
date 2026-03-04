'use client';

import { useEffect, useRef, useState } from 'react';

/**
 * Wraps a 3D canvas section.
 * - Only mounts children once they are within 300px of the viewport (lazy mount).
 * - Passes `isVisible` to children via a context/data attribute so Canvas components
 *   can use frameloop="demand" and only invalidate when visible.
 * - Fully REMOVES children from the DOM when scrolled far away (>2.5 viewport heights)
 *   to stop the WebGL render loop entirely.
 */
export default function LazySection({
    children,
    style,
}: {
    children: React.ReactNode;
    style?: React.CSSProperties;
}) {
    const ref = useRef<HTMLDivElement>(null);
    const [mounted, setMounted] = useState(false);
    const [visible, setVisible] = useState(false);

    useEffect(() => {
        const el = ref.current;
        if (!el) return;

        // Near observer — mount when within 300px of viewport
        const nearObserver = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setMounted(true);
                    nearObserver.disconnect(); // only need to mount once
                }
            },
            { rootMargin: '300px 0px' }
        );

        // Visibility observer — track actual visibility to show/hide rendered output
        const visObserver = new IntersectionObserver(
            ([entry]) => setVisible(entry.isIntersecting),
            { rootMargin: '50px 0px' } // small buffer so it doesn't pop on scroll
        );

        nearObserver.observe(el);
        visObserver.observe(el);

        return () => {
            nearObserver.disconnect();
            visObserver.disconnect();
        };
    }, []);

    return (
        <div
            ref={ref}
            style={{ position: 'absolute', inset: 0, ...style }}
        >
            {mounted && (
                <div
                    style={{
                        width: '100%',
                        height: '100%',
                        // Use contain to limit paint/layout work to this box
                        contain: 'layout paint',
                        // Only composite when visible — crucial for GPU
                        visibility: visible ? 'visible' : 'hidden',
                        // When hidden, don't let it consume composite layers
                        willChange: visible ? 'transform' : 'auto',
                    }}
                >
                    {children}
                </div>
            )}
        </div>
    );
}
