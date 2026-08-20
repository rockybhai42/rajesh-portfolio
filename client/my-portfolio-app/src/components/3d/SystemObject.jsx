import { useMemo, useRef } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import { RoundedBox, Line } from "@react-three/drei";
import * as THREE from "three";

/**
 * A small "software system" object: a central UI node connected to
 * three satellite nodes (React / API / Database). Represents the
 * actual architecture this portfolio's projects are built on, not a
 * decorative shape.
 */
function SystemObject({ accentColor, interactive }) {
  const groupRef = useRef(null);
  const { viewport } = useThree();

  const satellites = useMemo(
    () => [
      { position: [-1.6, -0.9, 0.4], scale: 0.42 },
      { position: [1.6, -0.9, -0.2], scale: 0.42 },
      { position: [0, -1.9, 0.6], scale: 0.42 },
    ],
    []
  );

  useFrame((state, delta) => {
    if (!groupRef.current) return;

    // gentle continuous rotation
    groupRef.current.rotation.y += delta * 0.15;

    if (interactive) {
      const targetX = state.pointer.y * 0.15;
      const targetZ = -state.pointer.x * 0.15;

      groupRef.current.rotation.x = THREE.MathUtils.lerp(
        groupRef.current.rotation.x,
        targetX,
        0.04
      );
      groupRef.current.rotation.z = THREE.MathUtils.lerp(
        groupRef.current.rotation.z,
        targetZ,
        0.04
      );
    }
  });

  const nodeMaterialProps = {
    color: accentColor,
    roughness: 0.35,
    metalness: 0.2,
    emissive: accentColor,
    emissiveIntensity: 0.25,
  };

  return (
    <group ref={groupRef} scale={Math.min(viewport.width / 6, 1.1)}>
      {/* central UI node */}
      <RoundedBox args={[1.1, 1.1, 1.1]} radius={0.18} smoothness={4}>
        <meshStandardMaterial {...nodeMaterialProps} />
      </RoundedBox>

      {satellites.map((node, i) => (
        <group key={i}>
          <Line
            points={[[0, 0, 0], node.position]}
            color={accentColor}
            transparent
            opacity={0.35}
            lineWidth={1}
          />
          <mesh position={node.position} scale={node.scale}>
            <octahedronGeometry args={[1, 0]} />
            <meshStandardMaterial {...nodeMaterialProps} />
          </mesh>
        </group>
      ))}
    </group>
  );
}

export default SystemObject;
