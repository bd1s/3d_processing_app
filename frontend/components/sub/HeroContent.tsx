"use client";

import React from "react";
import { motion } from "framer-motion";
import {
  slideInFromLeft,
  slideInFromRight,
  slideInFromTop,
} from "@/utils/motion";
import { SparklesIcon } from "@heroicons/react/24/solid";

const HeroContent = () => {
  return (
    <motion.div
    
      initial="hidden"
      animate="visible"
      className="flex flex-row items-center justify-center px-20 mt-40 w-full z-[20]"
    >
      <div className="h-full w-full flex flex-col gap-5 justify-center m-auto text-start">
        <motion.div
          variants={slideInFromTop}
          className="Welcome-box py-[8px] px-[7px] border border-[#9a5d94] opacity-[0.9]"  // Strikemaster
        >
          <SparklesIcon className="text-[#94b0b2] mr-[10px] h-5 w-5" />  {/* Cascade */}
          <h1 className="Welcome-text text-[13px]">
            Bienvenue sur notre plateforme!
          </h1>
        </motion.div>

        <motion.div
          variants={slideInFromLeft(0.5)}
          className="flex flex-col gap-6 mt-6 text-6xl font-bold text-white max-w-[600px] w-auto h-auto"
        >
          <span>
            <span className="text-[#39353e]"> {/* Ship Gray */}
              Offrant{" "}
            </span>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#65c7bf] to-[#94b0b2]"> {/* Downy to Cascade */}
              {" "}
              des solutions 3D{" "}
            </span>
            <span className="text-[#39353e]"> {/* Ship Gray */}
              {" "} avancées pour les dentistes
            </span>
          </span>
        </motion.div>

        <motion.p
          variants={slideInFromLeft(0.8)}
          className="text-lg text-gray-400 my-5 max-w-[600px]"
        >
          Nous sommes spécialisés dans le traitement et la modélisation 3D d'objets dentaires. Explorez nos solutions innovantes pour améliorer vos pratiques cliniques et offrir des soins de qualité supérieure à vos patients.
        </motion.p>
        <motion.a
          variants={slideInFromLeft(1)}
          className="py-2 button-primary text-center text-white cursor-pointer rounded-lg max-w-[200px]"
        >
          Se connecter 
        </motion.a>
      </div>

      <motion.div
        variants={slideInFromRight(0.8)}
        className="w-full h-full flex justify-center items-center"
      >
        <video
  src="/videos/animation.mp4"
  autoPlay
          loop
          muted
          playsInline
          className="w-full h-auto max-w-[650px]" // Ajustez la taille selon vos besoins
        />
      </motion.div>
    </motion.div>
  );
};

export default HeroContent;
