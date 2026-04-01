import { OrbitControls, Text } from "@react-three/drei";
import { Canvas, useFrame } from "@react-three/fiber";
import { useMemo, useRef } from "react";
import * as THREE from "three";

function RosePetal({ initialPos }: { initialPos: [number, number, number] }) {
  const mesh = useRef<THREE.Mesh>(null);
  const speed = useMemo(() => 0.2 + Math.random() * 0.3, []);
  const rotSpeed = useMemo(() => (Math.random() - 0.5) * 2, []);
  const swayAmp = useMemo(() => 0.3 + Math.random() * 0.5, []);
  const swayFreq = useMemo(() => 0.5 + Math.random() * 1.0, []);
  const offset = useMemo(() => Math.random() * Math.PI * 2, []);
  const color = useMemo(() => {
    const colors = ["#9B1C2D", "#B12B3A", "#C23A4A", "#8B1525", "#D44060"];
    return colors[Math.floor(Math.random() * colors.length)];
  }, []);

  useFrame((state) => {
    if (!mesh.current) return;
    mesh.current.position.y -= speed * 0.01;
    mesh.current.rotation.z += rotSpeed * 0.01;
    mesh.current.rotation.x += 0.005;
    mesh.current.position.x =
      initialPos[0] +
      Math.sin(state.clock.elapsedTime * swayFreq + offset) * swayAmp;
    if (mesh.current.position.y < -8) {
      mesh.current.position.y = 8;
    }
  });

  return (
    <mesh
      ref={mesh}
      position={initialPos}
      rotation={[Math.random(), Math.random(), Math.random()]}
    >
      <planeGeometry args={[0.25, 0.18]} />
      <meshStandardMaterial
        color={color}
        side={THREE.DoubleSide}
        roughness={0.6}
        metalness={0.1}
        transparent
        opacity={0.85}
      />
    </mesh>
  );
}

function Sparkle({ pos }: { pos: [number, number, number] }) {
  const mesh = useRef<THREE.Mesh>(null);
  const phase = useMemo(() => Math.random() * Math.PI * 2, []);
  const freq = useMemo(() => 1.5 + Math.random() * 2.5, []);
  const isGold = useMemo(() => Math.random() > 0.4, []);

  useFrame((state) => {
    if (!mesh.current) return;
    const s =
      0.3 + 0.7 * Math.abs(Math.sin(state.clock.elapsedTime * freq + phase));
    mesh.current.scale.setScalar(s);
  });

  return (
    <mesh ref={mesh} position={pos}>
      <sphereGeometry args={[0.04, 6, 6]} />
      <meshStandardMaterial
        color={isGold ? "#D4AF37" : "#CFCFD3"}
        emissive={isGold ? "#D4AF37" : "#aaaaaa"}
        emissiveIntensity={0.8}
        metalness={1}
        roughness={0.1}
      />
    </mesh>
  );
}

function WeddingRings() {
  const groupRef = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (!groupRef.current) return;
    groupRef.current.rotation.y = state.clock.elapsedTime * 0.4;
    groupRef.current.position.y =
      -1.2 + Math.sin(state.clock.elapsedTime * 0.8) * 0.15;
  });

  return (
    <group ref={groupRef} position={[0, -1.2, 0]}>
      <mesh position={[-0.5, 0, 0]} rotation={[Math.PI / 2, 0, 0.3]}>
        <torusGeometry args={[0.7, 0.09, 16, 60]} />
        <meshStandardMaterial color="#D4AF37" metalness={1} roughness={0.05} />
      </mesh>
      <mesh position={[0.5, 0, 0]} rotation={[Math.PI / 2, 0, -0.3]}>
        <torusGeometry args={[0.7, 0.09, 16, 60]} />
        <meshStandardMaterial color="#CFCFD3" metalness={1} roughness={0.05} />
      </mesh>
    </group>
  );
}

function Anniversary25() {
  const textRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (!textRef.current) return;
    textRef.current.position.y =
      1.5 + Math.sin(state.clock.elapsedTime * 0.9) * 0.18;
    textRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.3) * 0.1;
  });

  return (
    <Text
      ref={textRef as React.Ref<THREE.Mesh>}
      position={[0, 1.5, 0]}
      fontSize={3.5}
      anchorX="center"
      anchorY="middle"
      letterSpacing={0.05}
    >
      25
      <meshStandardMaterial
        color="#D4AF37"
        metalness={0.9}
        roughness={0.1}
        emissive="#8B6914"
        emissiveIntensity={0.3}
      />
    </Text>
  );
}

function Scene() {
  const petalPositions = useMemo<[number, number, number][]>(
    () =>
      Array.from({ length: 35 }, () => [
        (Math.random() - 0.5) * 18,
        (Math.random() - 0.5) * 16,
        (Math.random() - 0.5) * 4 - 1,
      ]),
    [],
  );

  const sparklePositions = useMemo<[number, number, number][]>(
    () =>
      Array.from({ length: 220 }, () => [
        (Math.random() - 0.5) * 20,
        (Math.random() - 0.5) * 14,
        (Math.random() - 0.5) * 6 - 2,
      ]),
    [],
  );

  return (
    <>
      <color attach="background" args={["#2C0613"]} />
      <fog attach="fog" args={["#1a020b", 12, 30]} />
      <ambientLight intensity={0.4} />
      <pointLight position={[10, 10, 10]} intensity={1.2} color="#fff8e0" />
      <pointLight position={[-5, 5, 5]} intensity={1.5} color="#D4AF37" />
      <pointLight position={[0, -3, 5]} intensity={0.8} color="#9B1C2D" />
      <spotLight
        position={[0, 8, 2]}
        angle={0.4}
        penumbra={0.5}
        intensity={2}
        color="#FFF4B2"
        castShadow
      />
      <Anniversary25 />
      <WeddingRings />
      {petalPositions.map((pos, i) => (
        // biome-ignore lint/suspicious/noArrayIndexKey: stable particle array
        <RosePetal key={i} initialPos={pos} />
      ))}
      {sparklePositions.map((pos, i) => (
        // biome-ignore lint/suspicious/noArrayIndexKey: stable particle array
        <Sparkle key={i} pos={pos} />
      ))}
      <OrbitControls
        enableZoom={false}
        autoRotate
        autoRotateSpeed={0.4}
        enablePan={false}
        maxPolarAngle={Math.PI / 1.8}
        minPolarAngle={Math.PI / 3}
      />
    </>
  );
}

export default function HeroScene() {
  return (
    <Canvas
      style={{ position: "absolute", inset: 0, width: "100%", height: "100%" }}
      camera={{ position: [0, 0, 10], fov: 55 }}
      dpr={[1, 2]}
    >
      <Scene />
    </Canvas>
  );
}
