'use client';

import { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import * as THREE from 'three';

// Simplified DNA — fewer nodes, lower complexity
function DNAHelix() {
    const groupRef = useRef<THREE.Group>(null);
    useFrame((s) => { if (groupRef.current) groupRef.current.rotation.y = s.clock.elapsedTime * 0.15; });

    const { left, right, conns } = useMemo(() => {
        const l: [number, number, number][] = [], r: [number, number, number][] = [];
        const c: { a: [number, number, number]; b: [number, number, number] }[] = [];
        for (let i = 0; i < 24; i++) { // 24 instead of 40
            const t = i / 24;
            const angle = t * Math.PI * 6;
            const y = t * 10 - 5;
            const rad = 1.8;
            const lx = Math.cos(angle) * rad, lz = Math.sin(angle) * rad;
            const rx = Math.cos(angle + Math.PI) * rad, rz = Math.sin(angle + Math.PI) * rad;
            l.push([lx, y, lz]); r.push([rx, y, rz]);
            if (i % 4 === 0) c.push({ a: [lx, y, lz], b: [rx, y, rz] });
        }
        return { left: l, right: r, conns: c };
    }, []);

    return (
        <group ref={groupRef}>
            {left.map((pos, i) => (
                <mesh key={`l${i}`} position={pos}>
                    <sphereGeometry args={[0.09, 6, 6]} />
                    <meshStandardMaterial color="#4FACFE" emissive="#4FACFE" emissiveIntensity={3} />
                </mesh>
            ))}
            {right.map((pos, i) => (
                <mesh key={`r${i}`} position={pos}>
                    <sphereGeometry args={[0.09, 6, 6]} />
                    <meshStandardMaterial color="#C9A227" emissive="#C9A227" emissiveIntensity={3} />
                </mesh>
            ))}
            {conns.map((conn, i) => {
                const a = new THREE.Vector3(...conn.a), b = new THREE.Vector3(...conn.b);
                const mid = a.clone().lerp(b, 0.5);
                const len = a.distanceTo(b);
                const dir = b.clone().sub(a).normalize();
                const up = new THREE.Vector3(0, 1, 0);
                const cross = up.clone().cross(dir);
                const angle = Math.acos(Math.max(-1, Math.min(1, up.dot(dir))));
                const q = cross.length() > 0.001
                    ? new THREE.Quaternion().setFromAxisAngle(cross.normalize(), angle)
                    : new THREE.Quaternion();
                return (
                    <mesh key={`c${i}`} position={mid} quaternion={q}>
                        <cylinderGeometry args={[0.035, 0.035, len, 4]} />
                        <meshStandardMaterial color="#7A90C4" emissive="#7A90C4" emissiveIntensity={1.2} transparent opacity={0.6} />
                    </mesh>
                );
            })}
        </group>
    );
}

// Simplified wireframe shield
function Shield() {
    const ref = useRef<THREE.Mesh>(null);
    useFrame((s) => {
        if (!ref.current) return;
        ref.current.rotation.y = s.clock.elapsedTime * 0.2;
        (ref.current.material as THREE.MeshStandardMaterial).opacity = 0.1 + Math.sin(s.clock.elapsedTime) * 0.04;
    });
    return (
        <mesh ref={ref}>
            <sphereGeometry args={[5, 8, 8]} />
            <meshStandardMaterial color="#4FACFE" emissive="#4FACFE" emissiveIntensity={0.4} transparent opacity={0.1} wireframe />
        </mesh>
    );
}

export default function TeamScene() {
    return (
        <Canvas
            camera={{ position: [0, 0, 10], fov: 60 }}
            gl={{ antialias: false, alpha: true, powerPreference: 'high-performance' }}
            dpr={1}
            style={{ width: '100%', height: '100%', display: 'block' }}
        >
            <ambientLight intensity={0.2} />
            <pointLight position={[0, 0, 0]} color="#4FACFE" intensity={4} />
            <pointLight position={[0, 8, 0]} color="#C9A227" intensity={2.5} />
            <DNAHelix />
            <Shield />
            {/* No postprocessing */}
        </Canvas>
    );
}
