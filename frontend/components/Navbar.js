// components/Navbar.js
import Link from 'next/link';
import '../app/globals.css';

export default function Navbar() {
  return (
    <nav className="bg-[#d0d0d0] p-4 shadow-md">
      <div className="container mx-auto flex justify-between items-center">
        {/* Logo et texte */}
        <div className="flex items-center space-x-4">
          <img 
            src="/logo1.png" 
            alt="Dentify3D Logo"
            className="w-8 h-8" 
          />
          <div className="text-gray-800 text-lg font-bold font-playfair">
            <Link href="/">Dentify3D</Link>
          </div>
        </div>

        {/* Menu */}
        <div className="flex space-x-8 items-center">
          <Link href="/">
            <span className="text-gray-800 hover:text-gray-600">Home</span>
          </Link>
          <Link href="/about">
            <span className="text-gray-800 hover:text-gray-600">About</span>
          </Link>
          <Link href="/contact">
            <span className="text-gray-800 hover:text-gray-600">Contact</span>
          </Link>
          <Link href="/3d-processing">
            <span className="text-gray-800 hover:text-gray-600">3D Processing</span>
          </Link>
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
