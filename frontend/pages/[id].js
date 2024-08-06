import React from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import { OBJLoader } from 'three/examples/jsm/loaders/OBJLoader';
import { useLoader } from '@react-three/fiber';

// Composant pour charger et afficher le modèle
const Model = ({ url }) => {
  const extension = url.split('.').pop();
  
  let loader;
  if (extension === 'glb' || extension === 'gltf') {
    loader = GLTFLoader;
  } else if (extension === 'obj') {
    loader = OBJLoader;
  } else {
    return null;
  }

  const model = useLoader(loader, url);

  return <primitive object={model.scene || model} />;
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

const Page = ({ modelUrl }) => {
  return (
    <div className="min-h-screen flex flex-col">
      <main className="flex flex-col items-center justify-center flex-1 p-4">
        <h1 className="text-4xl font-bold mb-6">3D Model Viewer</h1>
        <div className="w-full max-w-4xl mt-10 p-4 border border-gray-300 rounded-md shadow-lg bg-white">
          <ThreeDViewer modelUrl={modelUrl} />
        </div>
      </main>
    </div>
  );
};

// Fonction pour obtenir les chemins dynamiques
export async function getStaticPaths() {
  // Définir les chemins dynamiques à générer à la construction
  // Exemple de chemins statiques
  const paths = [
    { params: { id: 'model1' } },
    { params: { id: 'model2' } },
  ];

  return {
    paths,
    fallback: false, // Peut être true ou 'blocking' si vous souhaitez gérer les chemins non définis
  };
}

// Fonction pour obtenir les props de la page
export async function getStaticProps({ params }) {
  // Déterminer l'URL du modèle basé sur les paramètres
  const modelUrl = `URL_DE_VOTRE_MODELE_${params.id}`; // Remplacez par la logique réelle pour obtenir l'URL

  return {
    props: {
      modelUrl,
    },
  };
}

export default Page;
