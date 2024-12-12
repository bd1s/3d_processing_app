"use client";
import React from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, useGLTF } from '@react-three/drei';

interface ModelProps {
  url: string;
}

const Model: React.FC<ModelProps> = ({ url }) => {
  const { scene } = useGLTF(url);
  return <primitive object={scene} />;
};

interface ThreeDViewerProps {
  modelUrl: string;
}

const ThreeDViewer: React.FC<ThreeDViewerProps> = ({ modelUrl }) => {
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

