/* 
"use client";
import React from 'react';
import SimplificationIcon from '../sub/SimplificationIcon';
import ColorationIcon from '../sub/ColorationIcon';
import TransformationIcon from'../sub/TransformationIcon';

const Services: React.FC = () => {
  return (
    <div
      className="flex flex-col items-center justify-center py-20"
      id="services"
    >
      <h1 className="text-[40px] font-semibold text-transparent bg-clip-text bg-gradient-to-r from-purple-500 to-cyan-500 py-20">
        Services Offerts
      </h1>
      <div className="h-full w-full flex flex-col md:flex-row gap-10 px-10">
        <div className="relative overflow-hidden rounded-lg shadow-lg border border-[#2A0E61] p-4">
          <SimplificationIcon />
          <h1 className="text-2xl font-semibold text-white">Simplification des Modèles Dentaires 3D</h1>
          <p className="mt-2 text-gray-300">Réduction de la complexité des modèles 3D dentaires tout en conservant les détails essentiels pour une analyse précise.</p>
        </div>
        <div className="relative overflow-hidden rounded-lg shadow-lg border border-[#2A0E61] p-4">
          <TransformationIcon />
          <h1 className="text-2xl font-semibold text-white">Conversion de Labels</h1>
          <p className="mt-2 text-gray-300">Transformation des labels de données pour une compatibilité optimale avec les systèmes de traitement 3D dentaires.</p>
        </div>
        <div className="relative overflow-hidden rounded-lg shadow-lg border border-[#2A0E61] p-4">
          <ColorationIcon />
          <h1 className="text-2xl font-semibold text-white">Coloration des Modèles 3D</h1>
          <p className="mt-2 text-gray-300">Application de colorations spécifiques pour améliorer la visualisation et l'analyse des modèles dentaires 3D.</p>
        </div>
      </div>
    </div>
  );
};

export default Services
 */
"use client";
import React from 'react';
import Image from 'next/image';

const Services: React.FC = () => {
  return (
    <div>
      {/* Section des services */}
      <div
        className="flex flex-col items-center justify-center py-20"
        id="services"
      >
        <h1 className="text-[40px] font-semibold text-transparent bg-clip-text bg-gradient-to-r from-[#65c7bf] to-[#94b0b2] py-20">
          Services Offerts
        </h1>
        <div className="h-full w-full flex flex-col md:flex-row gap-10 px-10">
          <div className="relative overflow-hidden rounded-lg shadow-lg border border-[#2A0E61] p-4 flex items-center">
            <div className="flex-shrink-0 mr-4">
              <Image
                src='/images/SimplificationIcon.png'
                alt="Simplification des Modèles Dentaires 3D"
                width={100}
                height={100}
                className="object-contain"
              />
            </div>
            <div>
              <h1 className="text-2xl font-semibold text-[#39353e]">Simplification des Modèles Dentaires 3D</h1>
              <p className="mt-2 text-[#39353e]">Réduction de la complexité des modèles 3D dentaires tout en conservant les détails essentiels pour une analyse précise.</p>
            </div>
          </div>
          <div className="relative overflow-hidden rounded-lg shadow-lg border border-[#2A0E61] p-4 flex items-center">
            <div className="flex-shrink-0 mr-4">
              <Image
                src='/images/TransformationIcon.png'
                alt="Conversion de Labels"
                width={100}
                height={100}
                className="object-contain"
              />
            </div>
            <div>
              <h1 className="text-2xl font-semibold text-[#39353e]">Conversion de Labels</h1>
              <p className="mt-2 text-[#39353e]">Transformation des labels de données pour une compatibilité optimale avec les systèmes de traitement 3D dentaires.</p>
            </div>
          </div>
          <div className="relative overflow-hidden rounded-lg shadow-lg border border-[#2A0E61] p-4 flex items-center">
            <div className="flex-shrink-0 mr-4">
              <Image
                src='/images/ColorationIcon.png'
                alt="Coloration des Modèles 3D"
                width={100}
                height={100}
                className="object-contain"
              />
            </div>
            <div>
              <h1 className="text-2xl font-semibold text-[#39353e]">Coloration des Modèles 3D</h1>
              <p className="mt-2 text-[#39353e]">Application de colorations spécifiques pour améliorer la visualisation et l'analyse des modèles dentaires 3D.</p>
            </div>
          </div>
        </div>
      </div>

      {/* Section du tutoriel vidéo */}
      <div
        className="flex flex-col items-center justify-center py-20 bg-[#f3f9f9]"
        id="tutorial"
      >
        <h1 className="text-[40px] font-semibold text-transparent bg-clip-text bg-gradient-to-r from-[#65c7bf] to-[#94b0b2] py-20">
          Tutoriel Vidéo
        </h1>
        <div className="w-full max-w-4xl p-4">
        <div className="w-full max-w-4xl p-4 flex justify-center">
        <iframe
          width="1000"
          height="400"
          src="https://www.youtube.com/embed/p8lSgSHA8n0?si=6Un4edLV1FczRU9k"
          title="YouTube video player"
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          referrerPolicy="strict-origin-when-cross-origin"
          allowFullScreen
        />
      </div>
        </div>
      </div>
    </div>
  );
};

export default Services;
