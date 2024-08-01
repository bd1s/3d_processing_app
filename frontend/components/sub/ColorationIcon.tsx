"use client";

import React, { useRef, useEffect } from 'react';
import * as THREE from 'three';

const ColorationIcon: React.FC = () => {
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

    const createTooth = (color: string, positionX: number) => {
      const geometry = new THREE.ConeGeometry(1, 2, 32);
      const material = new THREE.MeshBasicMaterial({ color });
      const tooth = new THREE.Mesh(geometry, material);
      tooth.position.x = positionX;
      return tooth;
    };

    const tooth1 = createTooth('#65c7bf', -2); // downy color
    const tooth2 = createTooth('#9a5d94', 0);  // strikemaster color
    const tooth3 = createTooth('#94b0b2', 2);  // cascade color
    scene.add(tooth1);
    scene.add(tooth2);
    scene.add(tooth3);

    camera.position.z = 5;

    const animate = () => {
      requestAnimationFrame(animate);
      tooth1.rotation.y += 0.01;
      tooth2.rotation.y += 0.01;
      tooth3.rotation.y += 0.01;
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

export default ColorationIcon;
