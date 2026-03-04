'use client';

import { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import * as THREE from 'three';

// NO EffectComposer / Bloom — background scene only
function HexGrid() {
    const groupRef = useRef<THREE.Group>(null);
    useFrame((s) => { if (groupRef.current) groupRef.current.rotation.y = s.clock.elapsedTime * 0.12; });

    const positions = useMemo(() => {
        const pts: [number, number, number][] = [];
        for (let x = -3; x <= 3; x++)
            for (let y = -2; y <= 2; y++)
                pts.push([x * 1.8, y * 1.5, 0]);
        return pts;
    }, []);

    return (
        <group ref={groupRef}>
            {positions.map((pos, i) => <HexNode key={i} position={pos} index={i} />)}
        </group>
    );
}

function HexNode({ position, index }: { position: [number, number, number]; index: number }) {
    const ref = useRef<THREE.Mesh>(null);
    const color = index % 3 === 0 ? '#4FACFE' : index % 3 === 1 ? '#1E56E8' : '#C9A227';
    useFrame((s) => {
        if (!ref.current) return;
        const t = s.clock.elapsedTime + index * 0.35;
        ref.current.scale.setScalar(0.28 + Math.sin(t) * 0.12);
        (ref.current.material as THREE.MeshStandardMaterial).opacity = 0.2 + Math.sin(t * 1.4) * 0.12;
    });
    return (
        <mesh ref={ref} position={position}>
            <cylinderGeometry args={[0.55, 0.55, 0.04, 6]} />
            <meshStandardMaterial color={color} emissive={color} emissiveIntensity={2} transparent opacity={0.28} />
        </mesh>
    );
}

// Fewer, faster data streams
function DataStreams() {
    const streams = useMemo(() =>
        Array.from({ length: 12 }, () => ({
            position: [(Math.random() - 0.5) * 16, (Math.random() - 0.5) * 10, (Math.random() - 0.5) * 4] as [number, number, number],
            color: Math.random() > 0.5 ? '#4FACFE' : '#C9A227',
            speed: 0.8 + Math.random() * 2,
            length: 0.4 + Math.random() * 1.5,
        })), []);
    return <>{streams.map((s, i) => <DataStream key={i} {...s} />)}</>;
}

function DataStream({ position, color, speed, length }: {
    position: [number, number, number]; color: string; speed: number; length: number;
}) {
    const ref = useRef<THREE.Mesh>(null);
    useFrame((s) => {
        if (!ref.current) return;
        ref.current.position.y = position[1] + ((s.clock.elapsedTime * speed) % 12) - 6;
        (ref.current.material as THREE.MeshStandardMaterial).opacity =
            Math.max(0, 0.85 - Math.abs(ref.current.position.y - position[1]) / 6);
    });
    return (
        <mesh ref={ref} position={position}>
            <boxGeometry args={[0.02, length, 0.02]} />
            <meshStandardMaterial color={color} emissive={color} emissiveIntensity={4} transparent opacity={0.7} />
        </mesh>
    );
}

export default function AboutScene() {
    return (
        <Canvas
            camera={{ position: [0, 0, 10], fov: 60 }}
            gl={{ antialias: false, alpha: true, powerPreference: 'high-performance' }}
            dpr={1}
            style={{ width: '100%', height: '100%', display: 'block' }}
        >
            <ambientLight intensity={0.2} />
            <pointLight position={[5, 5, 5]} color="#4FACFE" intensity={3} />
            <pointLight position={[-5, -5, 5]} color="#C9A227" intensity={2} />
            <HexGrid />
            <DataStreams />
            {/* No postprocessing on background scene */}
        </Canvas>
    );
}
