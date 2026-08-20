import { Canvas } from "@react-three/fiber";
import SystemObject from "./SystemObject";

/**
 * Lazy-loaded (see Hero.jsx) so the Canvas/Three.js bundle never
 * blocks the initial paint of the hero text/CTAs.
 */
function HeroScene({ accentColor, capability }) {
  const dpr = capability === "full" ? [1, 1.5] : 1;

  return (
    <Canvas
      dpr={dpr}
      camera={{ position: [0, 0, 6], fov: 45 }}
      gl={{ antialias: capability === "full", alpha: true }}
    >
      <ambientLight intensity={0.6} />
      <directionalLight position={[3, 3, 4]} intensity={1} />
      <pointLight position={[-3, -2, -2]} intensity={0.4} color={accentColor} />

      <SystemObject
        accentColor={accentColor}
        interactive={capability === "full"}
      />
    </Canvas>
  );
}

export default HeroScene;
