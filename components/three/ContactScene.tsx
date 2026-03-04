'use client';

import { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import * as THREE from 'three';

// Lightweight network graph — fewer nodes, simpler geometry
function NetworkGraph() {
    const groupRef = useRef<THREE.Group>(null);

    const nodes = useMemo(() =>
        Array.from({ length: 8 }, (_, i) => ({ // 8 nodes
            id: i,
            position: [(Math.random() - 0.5) * 9, (Math.random() - 0.5) * 6, (Math.random() - 0.5) * 3] as [number, number, number],
            color: i % 3 === 0 ? '#4FACFE' : i % 3 === 1 ? '#C9A227' : '#00D4FF',
            size: 0.12 + Math.random() * 0.2,
            speed: 0.5 + Math.random() * 0.8,
            offset: Math.random() * Math.PI * 2,
        })), []);

    const edges = useMemo(() => {
        const res: { from: number; to: number }[] = [];
        for (let i = 0; i < nodes.length; i++)
            for (let j = i + 1; j < nodes.length; j++)
                if (Math.random() < 0.28) res.push({ from: i, to: j });
        return res;
    }, [nodes]);

    useFrame((s) => {
        if (groupRef.current) {
            groupRef.current.rotation.y = s.clock.elapsedTime * 0.06;
            groupRef.current.rotation.x = Math.sin(s.clock.elapsedTime * 0.04) * 0.08;
        }
    });

    return (
        <group ref={groupRef}>
            {nodes.map((node) => <PulsingNode key={node.id} {...node} />)}
            {edges.map((e, i) => <Edge key={i} from={nodes[e.from].position} to={nodes[e.to].position} index={i} />)}
        </group>
    );
}

function PulsingNode({ position, color, size, speed, offset }: {
    position: [number, number, number]; color: string; size: number; speed: number; offset: number;
}) {
    const ref = useRef<THREE.Mesh>(null);
    useFrame((s) => { if (ref.current) ref.current.scale.setScalar(0.8 + Math.sin(s.clock.elapsedTime * speed + offset) * 0.2); });
    return (
        <mesh ref={ref} position={position}>
            <sphereGeometry args={[size, 6, 6]} />
            <meshStandardMaterial color={color} emissive={color} emissiveIntensity={3.5} transparent opacity={0.9} />
        </mesh>
    );
}

// Static edge — no per-edge useFrame, static opacity is fine visually
function Edge({ from, to, index }: { from: [number, number, number]; to: [number, number, number]; index: number }) {
    const a = new THREE.Vector3(...from), b = new THREE.Vector3(...to);
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
        <mesh position={mid} quaternion={q}>
            <cylinderGeometry args={[0.007, 0.007, len, 3]} />
            <meshStandardMaterial
                color={index % 2 === 0 ? '#4FACFE' : '#C9A227'}
                emissive={index % 2 === 0 ? '#4FACFE' : '#C9A227'}
                emissiveIntensity={1.2}
                transparent opacity={0.2}
            />
        </mesh>
    );
}

export default function ContactScene() {
    return (
        <Canvas
            camera={{ position: [0, 0, 11], fov: 65 }}
            gl={{ antialias: false, alpha: true, powerPreference: 'high-performance' }}
            dpr={1}
            style={{ width: '100%', height: '100%', display: 'block' }}
        >
            <ambientLight intensity={0.2} />
            <pointLight position={[0, 0, 5]} color="#4FACFE" intensity={3.5} />
            <pointLight position={[-4, 4, 5]} color="#C9A227" intensity={2} />
            <NetworkGraph />
            {/* No postprocessing */}
        </Canvas>
    );
}
