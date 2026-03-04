'use client';

import { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import * as THREE from 'three';

// No postprocessing — optimized for background use
function TimelineSpine() {
    const ref = useRef<THREE.Mesh>(null);
    useFrame((s) => {
        if (!ref.current) return;
        (ref.current.material as THREE.MeshStandardMaterial).emissiveIntensity = 1.5 + Math.sin(s.clock.elapsedTime * 1.8) * 0.8;
    });
    return (
        <mesh ref={ref}>
            <cylinderGeometry args={[0.01, 0.01, 7, 6]} />
            <meshStandardMaterial color="#4FACFE" emissive="#4FACFE" emissiveIntensity={1.5} transparent opacity={0.6} />
        </mesh>
    );
}

function TimelineNode({ position, color, index }: { position: [number, number, number]; color: string; index: number }) {
    const core = useRef<THREE.Mesh>(null);
    const ring = useRef<THREE.Mesh>(null);
    useFrame((s) => {
        const t = s.clock.elapsedTime + index;
        if (core.current) core.current.scale.setScalar(0.85 + Math.sin(t * 1.3) * 0.15);
        if (ring.current) {
            ring.current.rotation.z = t * 0.7;
            ring.current.scale.setScalar(1.1 + Math.sin(t * 0.7) * 0.25);
            (ring.current.material as THREE.MeshStandardMaterial).opacity = 0.25 + Math.sin(t) * 0.15;
        }
    });
    return (
        <group position={position}>
            <mesh ref={core}>
                <sphereGeometry args={[0.28, 10, 10]} />
                <meshStandardMaterial color={color} emissive={color} emissiveIntensity={3} />
            </mesh>
            <mesh ref={ring}>
                <torusGeometry args={[0.55, 0.035, 6, 24]} />
                <meshStandardMaterial color={color} emissive={color} emissiveIntensity={2} transparent opacity={0.4} />
            </mesh>
        </group>
    );
}

// Fewer, simpler cubes
function Cubes() {
    const cubes = useMemo(() =>
        Array.from({ length: 10 }, (_, i) => ({
            pos: [(Math.random() - 0.5) * 10, (Math.random() - 0.5) * 8, (Math.random() - 0.5) * 3 - 2] as [number, number, number],
            rx: Math.random() * Math.PI, ry: Math.random() * Math.PI,
            color: i % 2 === 0 ? '#4FACFE' : '#C9A227',
            size: 0.06 + Math.random() * 0.16,
            speed: 0.3 + Math.random() * 0.7,
        })), []);
    return <>{cubes.map((c, i) => <Cube key={i} {...c} />)}</>;
}

function Cube({ pos, rx, ry, color, size, speed }: {
    pos: [number, number, number]; rx: number; ry: number; color: string; size: number; speed: number;
}) {
    const ref = useRef<THREE.Mesh>(null);
    useFrame((s) => {
        if (!ref.current) return;
        const t = s.clock.elapsedTime * speed;
        ref.current.rotation.x = rx + t;
        ref.current.rotation.y = ry + t * 0.6;
        ref.current.position.y = pos[1] + Math.sin(t) * 0.25;
    });
    return (
        <mesh ref={ref} position={pos}>
            <boxGeometry args={[size, size, size]} />
            <meshStandardMaterial color={color} emissive={color} emissiveIntensity={1.8} transparent opacity={0.55} wireframe />
        </mesh>
    );
}

// Lightweight particles
function MiniParticles() {
    const ref = useRef<THREE.Points>(null);
    const positions = useMemo(() => {
        const arr = new Float32Array(500 * 3);
        for (let i = 0; i < 500; i++) {
            arr[i * 3] = (Math.random() - 0.5) * 14;
            arr[i * 3 + 1] = (Math.random() - 0.5) * 10;
            arr[i * 3 + 2] = (Math.random() - 0.5) * 4 - 3;
        }
        return arr;
    }, []);
    useFrame((s) => { if (ref.current) ref.current.rotation.y = s.clock.elapsedTime * 0.03; });
    return (
        <points ref={ref}>
            <bufferGeometry>
                <bufferAttribute attach="attributes-position" args={[positions, 3]} />
            </bufferGeometry>
            <pointsMaterial size={0.04} color="#4FACFE" transparent opacity={0.35} sizeAttenuation />
        </points>
    );
}

export default function TimelineScene() {
    return (
        <Canvas
            camera={{ position: [0, 0, 8], fov: 60 }}
            gl={{ antialias: false, alpha: true, powerPreference: 'high-performance' }}
            dpr={1}
            style={{ width: '100%', height: '100%', display: 'block' }}
        >
            <ambientLight intensity={0.2} />
            <pointLight position={[4, 0, 5]} color="#4FACFE" intensity={3} />
            <pointLight position={[-4, 0, 5]} color="#C9A227" intensity={2} />
            <TimelineSpine />
            {[
                { position: [0, 2.5, 0] as [number, number, number], color: '#4FACFE' },
                { position: [0, 0, 0] as [number, number, number], color: '#C9A227' },
                { position: [0, -2.5, 0] as [number, number, number], color: '#00D4FF' },
            ].map((n, i) => <TimelineNode key={i} {...n} index={i} />)}
            <Cubes />
            <MiniParticles />
        </Canvas>
    );
}
