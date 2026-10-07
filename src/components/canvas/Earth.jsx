import { Suspense } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, Preload, useGLTF } from "@react-three/drei";
import ConvasLoader from "../Loader";

const Earth = () => {
  const earth = useGLTF("./planet/scene.gltf");
  return (
    <primitive object={earth.scene} scale={2.7} position-y={0} rotation-y={0} />
  );
};

const EarthCanvas = () => {
  return (
    <Canvas
      shadows
      frameloop="always"
      dpr={[1, 2]}
      gl={{ preserveDrawingBuffer: true }}
      camera={{
        fov: 45,
        near: 0.1,
        far: 200,
        position: [-4, 3, 6],
      }}
    >
      {/* Lighting — keeps the globe evenly lit so the dark/night side never
          faces the camera as an unlit blob. Accent lights match the brand. */}
      <ambientLight intensity={1.1} />
      <hemisphereLight skyColor="#b9a8ff" groundColor="#0b0b14" intensity={1.2} />
      <directionalLight position={[5, 3, 5]} intensity={2.2} color="#ffffff" />
      <pointLight position={[-6, -2, -4]} intensity={30} color="#7c5cff" />
      <pointLight position={[6, 4, 2]} intensity={18} color="#4ff0c5" />

      <Suspense fallback={<ConvasLoader />}>
        <OrbitControls
          autoRotate
          autoRotateSpeed={0.8}
          enableZoom={false}
          maxPolarAngle={Math.PI / 2}
          minPolarAngle={Math.PI / 2}
        />
        <Earth />
        <Preload all />
      </Suspense>
    </Canvas>
  );
};

export default EarthCanvas;
