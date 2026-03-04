'use client';

import dynamic from 'next/dynamic';

// This is a Client Component wrapper so layout.tsx (Server Component)
// can safely include GlobalCursor without the ssr:false restriction
const GlobalCursor = dynamic(() => import('@/components/ui/GlobalCursor'), { ssr: false });

export default function CursorWrapper() {
    return <GlobalCursor />;
}
