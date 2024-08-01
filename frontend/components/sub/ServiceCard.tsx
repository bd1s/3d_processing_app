import Image from "next/image";
import React from "react";

interface Props {
  src: string;
  title: string;
  description: string;
}

const ServiceCard = ({ src, title, description }: Props) => {
  return (
    <div className="relative overflow-hidden rounded-lg shadow-lg border border-[#2A0E61] p-4">
      <div className="flex items-center gap-4">
        <div className="flex-shrink-0">
          <Image
            src={src}
            alt={title}
            width={200}  // Ajustez la largeur selon vos préférences
            height={200} // Ajustez la hauteur selon vos préférences
            className="object-contain"
          />
        </div>
        <div className="flex-grow">
          <h1 className="text-2xl font-semibold text-white">{title}</h1>
          <p className="mt-2 text-gray-300">{description}</p>
        </div>
      </div>
    </div>
  );
};

export default ServiceCard;
