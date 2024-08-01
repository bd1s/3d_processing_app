import React from "react";
import Image from "next/image";

const Navbar = () => {
  return (
    <div className="w-full h-[65px] fixed top-0 shadow-lg shadow-[#39353e]/50 bg-[#65c7bf] backdrop-blur-md z-50 px-10">
      <div className="w-full h-full flex flex-row items-center justify-between m-auto px-[10px]">
        <a
          href="#home"
          className="h-auto w-auto flex flex-row items-center"
        >
          <Image 
            src="/logo1.png" 
            alt="Dentify3D Logo" 
            width={40} 
            height={40} 
            className="mr-[10px]"
          />
          <span className="font-bold hidden md:block text-[#39353e]">
            Dentify3D
          </span>
        </a>

        <div className="w-[500px] h-full flex flex-row items-center justify-between md:mr-20">
          <div className="flex items-center justify-between w-full h-auto border border-[#65c7bf] bg-[#ffffff] mr-[15px] px-[20px] py-[10px] rounded-full text-[#39353e]">
            <a href="#about-us" className="cursor-pointer">
              À propos
            </a>
            <a href="#services" className="cursor-pointer">
              Services
            </a>
            <a href="#contact" className="cursor-pointer">
              Contact
            </a>
          </div>
        </div>

        <div className="flex flex-row gap-5">
          {/* Ajouter d'autres éléments ici si nécessaire */}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
