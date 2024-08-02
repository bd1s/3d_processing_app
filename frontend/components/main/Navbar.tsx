// components/main/Navbar.tsx
import Link from 'next/link';
import Image from 'next/image';
import '../../app/globals.css';
import React from "react";

const Navbar: React.FC = () => {
  return (
    <nav className="bg-[#d0d0d0] p-4 shadow-md">
      <div className="container mx-auto flex justify-between items-center">
        {/* Logo et texte */}
        <div className="flex items-center space-x-4">
          <Image
            src="/logo1.png" 
            alt="Dentify3D Logo"
            width={32}
            height={32}
            className="w-8 h-8" 
          />
          <div className="text-gray-800 text-lg font-bold font-playfair">
            <Link href="/">Dentify3D</Link>
          </div>
        </div>

        {/* Menu */}
        <div className="flex space-x-8 items-center">
          <a href="#hero" className="text-gray-800 hover:text-gray-600">Home</a>
          <a href="#services" className="cursor-pointer">
          Services</a>
          <a href="#contact" className="text-gray-800 hover:text-gray-600">Contact</a>
          <Link href="/logout">
            <span className="bg-[#65ceb9] text-white px-4 py-2 rounded hover:bg-[#4da5a0]">
              Logout
            </span>
          </Link>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
