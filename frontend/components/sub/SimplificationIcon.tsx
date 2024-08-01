"use client";

import React, { useRef, useEffect } from 'react';
import * as THREE from 'three';

const SimplificationIcon: React.FC = () => {
  const mountRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, 150 / 150, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(150, 150);
    renderer.setClearColor(0x000000, 0); // Transparent background
    if (mountRef.current) {
      mountRef.current.appendChild(renderer.domElement);
    }

    const geometry = new THREE.ConeGeometry(1, 2, 32); // Simplified cone as a placeholder for a tooth
    const material = new THREE.MeshBasicMaterial({ color: '#94b0b2' }); // cascade color
    const tooth = new THREE.Mesh(geometry, material);
    scene.add(tooth);

    camera.position.z = 5;

    const animate = () => {
      requestAnimationFrame(animate);
      tooth.rotation.x += 0.01;
      tooth.rotation.y += 0.01;
      renderer.render(scene, camera);
    };
    animate();

    return () => {
      if (mountRef.current) {
        mountRef.current.removeChild(renderer.domElement);
      }
    };
  }, []);

  return <div ref={mountRef} />;
};

export default SimplificationIcon;
