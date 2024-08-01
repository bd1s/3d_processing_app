"use client";

import React, { useRef, useEffect } from 'react';
import * as THREE from 'three';

const TransformationIcon: React.FC = () => {
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

    const createArrow = (color: string, positionX: number) => {
      const arrowGeometry = new THREE.ConeGeometry(1, 3, 4); // Creating a more defined arrow
      const arrowMaterial = new THREE.MeshBasicMaterial({ color });
      const arrow = new THREE.Mesh(arrowGeometry, arrowMaterial);
      arrow.rotation.x = Math.PI / 2;
      arrow.position.x = positionX;
      return arrow;
    };

    // Create arrows for exchange
    const arrow1 = createArrow('#65c7bf', -2); // Downy color
    const arrow2 = createArrow('#9a5d94', 2);  // Strikemaster color

    // Position the arrows to create a bi-directional exchange effect
    arrow1.rotation.y = Math.PI; // Rotate arrow 1 to face left
    arrow2.rotation.y = 0;      // Arrow 2 faces right

    scene.add(arrow1);
    scene.add(arrow2);

    camera.position.z = 5;

    const animate = () => {
      requestAnimationFrame(animate);
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

export default TransformationIcon;
