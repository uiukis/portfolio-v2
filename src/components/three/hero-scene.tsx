"use client";

import { useRef, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Points, PointMaterial } from "@react-three/drei";
import * as THREE from "three";
import { useInView } from "framer-motion";
import { useMobile } from "@/hooks/use-mobile";
import { useReducedMotion } from "@/hooks/use-reduced-motion";

const NODE_COUNT = 56;

function ConnectionLines({
  positions,
  connections,
}: {
  positions: Float32Array;
  connections: [number, number][];
}) {
  const linePositions = useMemo(() => {
    const arr = new Float32Array(connections.length * 6);
    for (let i = 0; i < connections.length; i++) {
      const [a, b] = connections[i];
      arr[i * 6] = positions[a * 3];
      arr[i * 6 + 1] = positions[a * 3 + 1];
      arr[i * 6 + 2] = positions[a * 3 + 2];
      arr[i * 6 + 3] = positions[b * 3];
      arr[i * 6 + 4] = positions[b * 3 + 1];
      arr[i * 6 + 5] = positions[b * 3 + 2];
    }
    return arr;
  }, [positions, connections]);

  return (
    <lineSegments frustumCulled>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          args={[linePositions, 3]}
        />
      </bufferGeometry>
      <lineBasicMaterial color="#8b5cf6" transparent opacity={0.08} />
    </lineSegments>
  );
}

function NeuralNetwork() {
  const ref = useRef<THREE.Points>(null);

  const [positions, connections] = useMemo(() => {
    const pos = new Float32Array(NODE_COUNT * 3);
    const conn: [number, number][] = [];

    for (let i = 0; i < NODE_COUNT; i++) {
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);
      const r = 2.5 + Math.random() * 1.5;

      pos[i * 3] = r * Math.sin(phi) * Math.cos(theta);
      pos[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta);
      pos[i * 3 + 2] = r * Math.cos(phi);
    }

    for (let i = 0; i < NODE_COUNT; i++) {
      const target = (i + 1 + Math.floor(Math.random() * 3)) % NODE_COUNT;
      conn.push([i, target]);
    }

    return [pos, conn] as const;
  }, []);

  useFrame((state) => {
    if (!ref.current) return;
    ref.current.rotation.y = state.clock.elapsedTime * 0.04;
    ref.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.025) * 0.08;
  });

  return (
    <group>
      <Points ref={ref} positions={positions} stride={3} frustumCulled>
        <PointMaterial
          transparent
          color="#00d4aa"
          size={0.022}
          sizeAttenuation
          depthWrite={false}
          opacity={0.75}
        />
      </Points>
      <ConnectionLines positions={positions} connections={connections} />
    </group>
  );
}

function StaticFallback() {
  return (
    <div
      className="absolute inset-0 bg-gradient-to-b from-accent/5 via-transparent to-transparent"
      aria-hidden="true"
    />
  );
}

export function HeroScene() {
  const reducedMotion = useReducedMotion();
  const mobile = useMobile();
  const containerRef = useRef<HTMLDivElement>(null);
  const inView = useInView(containerRef, { margin: "200px" });

  if (reducedMotion || mobile) {
    return <StaticFallback />;
  }

  return (
    <div ref={containerRef} className="absolute inset-0 -z-10" aria-hidden="true">
      {inView && (
        <Canvas
          camera={{ position: [0, 0, 6], fov: 60 }}
          dpr={[1, 1.25]}
          gl={{ antialias: false, alpha: true, powerPreference: "low-power" }}
          style={{ background: "transparent" }}
        >
          <ambientLight intensity={0.2} />
          <NeuralNetwork />
        </Canvas>
      )}
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-background/20 via-background/60 to-background" />
    </div>
  );
}
