// ThreeDViewer.js
import React  from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, useGLTF } from '@react-three/drei';

const Model = ({ url }) => {
  const { scene } = useGLTF(url);
  return <primitive object={scene} />;
};

const ThreeDViewer = ({ modelUrl }) => {
  return (
    <Canvas>
      <ambientLight />
      <pointLight position={[10, 10, 10]} />
      <OrbitControls />
      <Model url={modelUrl} />
    </Canvas>
  );
};

export default ThreeDViewer;
