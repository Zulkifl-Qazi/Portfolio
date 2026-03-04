'use client';

import { useRef, useMemo, useEffect } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { EffectComposer, Bloom } from '@react-three/postprocessing';
import { Stars } from '@react-three/drei';
import * as THREE from 'three';
import { BlendFunction } from 'postprocessing';

// ─── Dot Globe (GitHub-style) ──────────────────────────────────────────────────
function DotGlobe({ radius = 2.8 }: { radius?: number }) {
    const groupRef = useRef<THREE.Group>(null);
    const scanRef = useRef<THREE.Group>(null);

    // Generate lat/lon grid dots
    const dotPositions = useMemo(() => {
        const positions: number[] = [];
        const latRows = 22;
        const lonCols = 44;
        for (let lat = 0; lat <= latRows; lat++) {
            const phi = (lat / latRows) * Math.PI;
            const circumference = Math.sin(phi);
            const dotsOnRow = Math.max(1, Math.round(lonCols * circumference));
            for (let lon = 0; lon < dotsOnRow; lon++) {
                const theta = (lon / dotsOnRow) * Math.PI * 2;
                positions.push(
                    radius * Math.sin(phi) * Math.cos(theta),
                    radius * Math.cos(phi),
                    radius * Math.sin(phi) * Math.sin(theta),
                );
            }
        }
        return new Float32Array(positions);
    }, [radius]);

    // Threat nodes on surface
    const threatNodes = useMemo(() => {
        const pts: THREE.Vector3[] = [];
        const rawPos = [
            [0.6, 0.5, 0.6],
            [-0.7, 0.3, 0.7],
            [0.3, -0.5, 0.8],
            [-0.2, 0.7, -0.7],
            [0.85, -0.4, -0.3],
            [-0.5, -0.6, -0.6],
            [0.5, 0.7, -0.5],
            [-0.85, 0.1, -0.5],
            [0.2, 0.85, -0.5],
            [0.5, -0.75, -0.5],
        ];
        rawPos.forEach(p => {
            const v = new THREE.Vector3(p[0], p[1], p[2]).normalize().multiplyScalar(radius);
            pts.push(v);
        });
        return pts;
    }, [radius]);

    // Connection lines
    const connectionGeo = useMemo(() => {
        const points: number[] = [];
        for (let i = 0; i < threatNodes.length; i++) {
            for (let j = i + 1; j < threatNodes.length; j++) {
                const d = threatNodes[i].distanceTo(threatNodes[j]);
                if (d < 3.8) {
                    points.push(
                        threatNodes[i].x, threatNodes[i].y, threatNodes[i].z,
                        threatNodes[j].x, threatNodes[j].y, threatNodes[j].z,
                    );
                }
            }
        }
        const geo = new THREE.BufferGeometry();
        geo.setAttribute('position', new THREE.BufferAttribute(new Float32Array(points), 3));
        return geo;
    }, [threatNodes]);

    const connectionLines = useMemo(() => {
        const mat = new THREE.LineBasicMaterial({ color: '#00D4FF', transparent: true, opacity: 0.22 });
        return new THREE.LineSegments(connectionGeo, mat);
    }, [connectionGeo]);

    useFrame((s) => {
        const t = s.clock.elapsedTime;
        if (groupRef.current) {
            groupRef.current.rotation.y = t * 0.16;
        }
        if (scanRef.current) {
            scanRef.current.rotation.y = t * 2.2; // fast sweep
        }
        // Pulse connection opacity
        if (connectionLines.material) {
            (connectionLines.material as THREE.LineBasicMaterial).opacity = 0.12 + Math.abs(Math.sin(t * 1.0)) * 0.25;
        }
    });

    return (
        <group ref={groupRef}>
            {/* Dot cloud (the globe surface) */}
            <points>
                <bufferGeometry>
                    <bufferAttribute attach="attributes-position" args={[dotPositions, 3]} />
                </bufferGeometry>
                <pointsMaterial
                    size={0.038}
                    color="#4FACFE"
                    transparent
                    opacity={0.7}
                    sizeAttenuation
                />
            </points>

            {/* Dark interior fill so dots look like a surface */}
            <mesh>
                <sphereGeometry args={[radius - 0.05, 32, 32]} />
                <meshStandardMaterial
                    color="#010B1A"
                    transparent
                    opacity={0.96}
                    side={THREE.BackSide}
                />
            </mesh>

            {/* Atmosphere layer 1 — cyan haze only, removed layer 2 */}
            <mesh>
                <sphereGeometry args={[radius + 0.22, 16, 16]} />
                <meshStandardMaterial
                    color="#00D4FF"
                    emissive="#00D4FF"
                    emissiveIntensity={1.6}
                    transparent
                    opacity={0.05}
                    side={THREE.BackSide}
                />
            </mesh>

            {/* Pulsing core */}
            <GlobeCore />

            {/* Threat nodes */}
            {threatNodes.map((pos, i) => (
                <ThreatNode key={i} position={pos} index={i} />
            ))}

            {/* Animated connection lines */}
            <primitive object={connectionLines} />

            {/* Green scan ring — sweeps the globe */}
            <group ref={scanRef}>
                <mesh rotation={[Math.PI / 2, 0, 0]}>
                    <torusGeometry args={[radius + 0.02, 0.018, 3, 80]} />
                    <meshStandardMaterial
                        color="#00FF88"
                        emissive="#00FF88"
                        emissiveIntensity={6}
                        transparent
                        opacity={0.9}
                    />
                </mesh>
                {/* Trailing glow */}
                <mesh rotation={[Math.PI / 2, 0, 0]}>
                    <torusGeometry args={[radius + 0.04, 0.05, 3, 80, Math.PI * 0.35]} />
                    <meshStandardMaterial
                        color="#00FF88"
                        emissive="#00FF88"
                        emissiveIntensity={2}
                        transparent
                        opacity={0.18}
                    />
                </mesh>
            </group>

            {/* Outer gold orbit ring */}
            <mesh rotation={[Math.PI / 2, 0, 0]}>
                <torusGeometry args={[radius + 0.7, 0.016, 3, 80]} />
                <meshStandardMaterial
                    color="#C9A227"
                    emissive="#C9A227"
                    emissiveIntensity={2.5}
                    transparent
                    opacity={0.65}
                />
            </mesh>

            {/* Tilted blue orbit ring */}
            <mesh rotation={[Math.PI / 3.2, Math.PI / 5, 0]}>
                <torusGeometry args={[radius + 1.1, 0.013, 3, 80]} />
                <meshStandardMaterial
                    color="#4FACFE"
                    emissive="#4FACFE"
                    emissiveIntensity={2}
                    transparent
                    opacity={0.5}
                />
            </mesh>
        </group>
    );
}

// ─── Pulsing globe core ────────────────────────────────────────────────────────
function GlobeCore() {
    const coreRef = useRef<THREE.Mesh>(null);
    const haloRef = useRef<THREE.Mesh>(null);
    useFrame((s) => {
        const t = s.clock.elapsedTime;
        if (coreRef.current) coreRef.current.scale.setScalar(1 + Math.sin(t * 4.4) * 0.1);
        if (haloRef.current) haloRef.current.scale.setScalar(1 + Math.sin(t * 2.8 + 0.8) * 0.15);
    });
    return (
        <>
            <mesh ref={coreRef}>
                <sphereGeometry args={[0.22, 16, 16]} />
                <meshStandardMaterial color="#FFFFFF" emissive="#FFD700" emissiveIntensity={10} metalness={1} roughness={0} />
            </mesh>
            <mesh ref={haloRef}>
                <sphereGeometry args={[0.44, 16, 16]} />
                <meshStandardMaterial color="#FFD700" emissive="#FFD700" emissiveIntensity={3} transparent opacity={0.18} />
            </mesh>
        </>
    );
}

// ─── Threat node ───────────────────────────────────────────────────────────────
function ThreatNode({ position, index }: { position: THREE.Vector3; index: number }) {
    const ref = useRef<THREE.Mesh>(null);
    const ringRef = useRef<THREE.Mesh>(null);
    const color = index % 4 === 0 ? '#00FF88' : index % 4 === 1 ? '#FF4444' : index % 4 === 2 ? '#00D4FF' : '#C9A227';
    const pos: [number, number, number] = [position.x, position.y, position.z];

    useFrame((s) => {
        const t = s.clock.elapsedTime + index * 0.8;
        if (ref.current) ref.current.scale.setScalar(1 + Math.sin(t * 5.0) * 0.35);
        if (ringRef.current) {
            ringRef.current.scale.setScalar(1 + Math.sin(t * 3.0) * 0.5);
            (ringRef.current.material as THREE.MeshStandardMaterial).opacity = 0.4 - Math.sin(t * 3.0) * 0.3;
        }
    });
    return (
        <group position={pos}>
            <mesh ref={ref}>
                <sphereGeometry args={[0.065, 8, 8]} />
                <meshStandardMaterial color={color} emissive={color} emissiveIntensity={6} />
            </mesh>
            {/* Pulse ring */}
            <mesh ref={ringRef}>
                <ringGeometry args={[0.1, 0.14, 16]} />
                <meshStandardMaterial color={color} emissive={color} emissiveIntensity={3} transparent opacity={0.3} side={THREE.DoubleSide} />
            </mesh>
        </group>
    );
}

// ─── Space debris ring (wide outer ring with particles) ────────────────────────
function DebrisRing() {
    const ref = useRef<THREE.Points>(null);
    const positions = useMemo(() => {
        const pts = new Float32Array(280 * 3);
        for (let i = 0; i < 280; i++) {
            const angle = Math.random() * Math.PI * 2;
            const r = 5.5 + (Math.random() - 0.5) * 2.5;
            const tilt = (Math.random() - 0.5) * 0.4;
            pts[i * 3] = Math.cos(angle) * r;
            pts[i * 3 + 1] = tilt + Math.random() * 0.3 - 0.15;
            pts[i * 3 + 2] = Math.sin(angle) * r;
        }
        return pts;
    }, []);

    useFrame((s) => {
        if (ref.current) ref.current.rotation.y = s.clock.elapsedTime * 0.10;
    });

    return (
        <points ref={ref}>
            <bufferGeometry>
                <bufferAttribute attach="attributes-position" args={[positions, 3]} />
            </bufferGeometry>
            <pointsMaterial size={0.04} color="#4FACFE" transparent opacity={0.5} sizeAttenuation />
        </points>
    );
}

// ─── Dense nebula particle field ───────────────────────────────────────────────
function NebulaField({ count = 700 }: { count?: number }) {
    const ref = useRef<THREE.Points>(null);
    const [positions, colors] = useMemo(() => {
        const pos = new Float32Array(count * 3);
        const col = new Float32Array(count * 3);
        const palettes = [
            new THREE.Color('#4FACFE'),
            new THREE.Color('#00D4FF'),
            new THREE.Color('#1E56E8'),
            new THREE.Color('#C9A227'),
            new THREE.Color('#00FF88'),
        ];
        for (let i = 0; i < count; i++) {
            const theta = Math.random() * Math.PI * 2;
            const phi = Math.acos(2 * Math.random() - 1);
            const r = 8 + Math.random() * 14;
            pos[i * 3] = r * Math.sin(phi) * Math.cos(theta);
            pos[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta);
            pos[i * 3 + 2] = r * Math.cos(phi);
            const c = palettes[Math.floor(Math.random() * palettes.length)];
            col[i * 3] = c.r; col[i * 3 + 1] = c.g; col[i * 3 + 2] = c.b;
        }
        return [pos, col];
    }, [count]);

    useFrame((s) => {
        if (ref.current) {
            ref.current.rotation.y = s.clock.elapsedTime * 0.024;
            ref.current.rotation.x = Math.sin(s.clock.elapsedTime * 0.014) * 0.05;
        }
    });

    return (
        <points ref={ref}>
            <bufferGeometry>
                <bufferAttribute attach="attributes-position" args={[positions, 3]} />
                <bufferAttribute attach="attributes-color" args={[colors, 3]} />
            </bufferGeometry>
            <pointsMaterial size={0.05} vertexColors transparent opacity={0.65} sizeAttenuation />
        </points>
    );
}

// ─── Mouse parallax camera ─────────────────────────────────────────────────────
function Camera() {
    const { camera } = useThree();
    const mouse = useRef({ x: 0, y: 0 });
    useEffect(() => {
        const h = (e: MouseEvent) => {
            mouse.current.x = (e.clientX / window.innerWidth - 0.5) * 2;
            mouse.current.y = -(e.clientY / window.innerHeight - 0.5) * 2;
        };
        window.addEventListener('mousemove', h, { passive: true });
        return () => window.removeEventListener('mousemove', h);
    }, []);
    useFrame((s) => {
        const t = s.clock.elapsedTime;
        camera.position.x += (mouse.current.x * 1.2 + Math.sin(t * 0.10) * 0.4 - camera.position.x) * 0.05;
        camera.position.y += (mouse.current.y * 0.8 + Math.cos(t * 0.08) * 0.3 - camera.position.y) * 0.05;
        camera.position.z = 11.5 + Math.sin(t * 0.04) * 0.6;
        camera.lookAt(0, 0, 0);
    });
    return null;
}

// ─── Main export ───────────────────────────────────────────────────────────────
export default function HeroScene() {
    return (
        <Canvas
            camera={{ position: [0, 0, 11.5], fov: 55 }}
            gl={{ antialias: false, alpha: true, powerPreference: 'high-performance' }}
            dpr={Math.min(1.25, typeof window !== 'undefined' ? window.devicePixelRatio : 1)}
            style={{ width: '100%', height: '100%', display: 'block' }}
        >
            {/* Fewer, more targeted lights */}
            <ambientLight intensity={0.1} />
            <pointLight position={[0, 0, 0]} color="#00D4FF" intensity={10} distance={20} />
            <pointLight position={[7, 5, 5]} color="#1E56E8" intensity={5} distance={20} />
            <pointLight position={[-7, -4, 2]} color="#C9A227" intensity={3.5} distance={18} />

            <Camera />
            <DotGlobe radius={2.8} />
            <DebrisRing />
            <NebulaField count={700} />
            <Stars radius={100} depth={80} count={1500} factor={2.5} saturation={0.4} fade speed={0.1} />

            <EffectComposer multisampling={0}>
                <Bloom
                    intensity={2.2}
                    luminanceThreshold={0.15}
                    luminanceSmoothing={0.85}
                    blendFunction={BlendFunction.ADD}
                />
            </EffectComposer>
        </Canvas>
    );
}
