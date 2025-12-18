import { OrbitControls, useGLTF } from "@react-three/drei";
import { Canvas, useFrame } from "@react-three/fiber";
import { Suspense, useRef } from "react";
import * as THREE from "three";
import modelGLB from "./assets/particle_ai_brain.glb";

function Model({ glb }) {
  const { scene } = useGLTF(glb);
  const groupRef = useRef();

  // Slightly smaller model
  groupRef.current?.scale.set(2, 2, 2);

  scene.traverse((child) => {
    if (child.isMesh) {
      const gradientColor = new THREE.Color().setHSL(0.6, 0.1, 0.9); // bluish-white
      child.material = new THREE.MeshPhysicalMaterial({
        color: gradientColor,
        metalness: 0.2,
        roughness: 0.4,
        clearcoat: 0.5,
        clearcoatRoughness: 0.2,
        emissive: 0x3F0FA4,       // bluish glow on edges
        emissiveIntensity: 0.3,
        transparent: true,
        opacity: 0.95,            // slightly transparent
      });
    }
  });

  // Slow rotation
  useFrame(() => {
    if (groupRef.current) {
      groupRef.current.rotation.y += 0.003;
      groupRef.current.rotation.x += 0.001;
    }
  });

  return <primitive ref={groupRef} object={scene} dispose={null} />;
}

export default function ThreeScene() {
  return (
    <Canvas
      className="w-full h-[80vh]"
      camera={{ position: [0, 0, 9], fov: 45 }}
      gl={{ antialias: true }}
    >
      {/* Lights for glow and depth */}
      <ambientLight intensity={0.3} />
      <directionalLight intensity={0.8} position={[5, 5, 5]} color={0xfff} />
      <directionalLight intensity={0.6} position={[-5, 5, 5]} color={0xfff} />
      <directionalLight intensity={0.4} position={[0, -5, 5]} color={0x370A99} />

      <Suspense fallback={null}>
        <Model glb={modelGLB} />
      </Suspense>

      <OrbitControls enableZoom={false} enablePan={false} />
    </Canvas>
  );
}
