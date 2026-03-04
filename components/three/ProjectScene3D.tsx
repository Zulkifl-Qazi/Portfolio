'use client';

import { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import * as THREE from 'three';

// Simplified project card mesh — no postprocessing
function ProjectCardMesh({ position, color, isHovered }: {
    position: [number, number, number]; color: string; isHovered: boolean;
}) {
    const mesh = useRef<THREE.Mesh>(null);
    // Stable Vector3 — NOT inside useFrame to avoid GC alloc every frame
    const targetScale = useRef(new THREE.Vector3(1, 1, 1));

    useFrame((s) => {
        if (!mesh.current) return;
        const t = s.clock.elapsedTime * 0.6;
        mesh.current.position.y = position[1] + Math.sin(t + position[0]) * 0.12;
        const ts = isHovered ? 1.08 : 1;
        targetScale.current.set(ts, ts, ts);
        mesh.current.scale.lerp(targetScale.current, 0.08);
        (mesh.current.material as THREE.MeshStandardMaterial).emissiveIntensity = isHovered
            ? 1.2 + Math.sin(s.clock.elapsedTime * 3) * 0.4
            : 0.2;
    });

    return (
        <mesh ref={mesh} position={position}>
            <boxGeometry args={[2, 1.25, 0.07]} />
            <meshStandardMaterial
                color={isHovered ? color : '#080F28'}
                emissive={color}
                emissiveIntensity={isHovered ? 1.2 : 0.2}
                transparent opacity={0.8}
                metalness={0.9} roughness={0.1}
            />
        </mesh>
    );
}

// Simple orbiting shapes
function BackgroundShapes() {
    const group = useRef<THREE.Group>(null);
    useFrame((s) => { if (group.current) group.current.rotation.y = s.clock.elapsedTime * 0.04; });

    return (
        <group ref={group}>
            {Array.from({ length: 6 }).map((_, i) => {
                const angle = (i / 6) * Math.PI * 2;
                return (
                    <mesh key={i} position={[Math.cos(angle) * 7, (Math.random() - 0.5) * 3, Math.sin(angle) * 7]}>
                        <octahedronGeometry args={[0.25, 0]} />
                        <meshStandardMaterial
                            color={i % 2 === 0 ? '#4FACFE' : '#C9A227'}
                            emissive={i % 2 === 0 ? '#4FACFE' : '#C9A227'}
                            emissiveIntensity={1.8}
                            wireframe transparent opacity={0.5}
                        />
                    </mesh>
                );
            })}
        </group>
    );
}

interface ProjectScene3DProps {
    hoveredProject: number | null;
    onProjectHover: (id: number | null) => void;
    onProjectClick: (id: number) => void;
    projectCount: number;
    projectColors: string[];
}

const cardPositions: [number, number, number][] = [
    [-3.3, 2, 0], [0, 2, 0], [3.3, 2, 0],
    [-3.3, -0.5, 0], [0, -0.5, 0], [3.3, -0.5, 0],
    [0, -3, 0],
];

export default function ProjectScene3D({ hoveredProject, onProjectHover, onProjectClick, projectCount, projectColors }: ProjectScene3DProps) {
    return (
        <Canvas
            camera={{ position: [0, 0, 10], fov: 65 }}
            gl={{ antialias: false, alpha: true, powerPreference: 'high-performance' }}
            dpr={1}
            style={{ width: '100%', height: '100%', display: 'block' }}
        >
            <ambientLight intensity={0.2} />
            <pointLight position={[0, 4, 5]} color="#4FACFE" intensity={3} />
            <pointLight position={[-4, -4, 5]} color="#C9A227" intensity={2} />

            {cardPositions.slice(0, projectCount).map((pos, i) => (
                <ProjectCardMesh
                    key={i}
                    position={pos}
                    color={projectColors[i] || '#4FACFE'}
                    isHovered={hoveredProject === i}
                />
            ))}
            <BackgroundShapes />
            {/* No postprocessing */}
        </Canvas>
    );
}
