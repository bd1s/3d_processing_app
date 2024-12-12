// components/Footer.tsx
import Image from 'next/image';
import { FaLinkedin, FaFacebook, FaInstagram } from 'react-icons/fa';

const Footer: React.FC = () => {
  return (
    <footer className="bg-[#0b3951] text-white text-center py-4">
      <div className="flex flex-col items-center mb-4">
        {/* Logo and Text */}
        <div className="flex items-center mb-2">
          <Image
            src="/logo1.png" // Remplacez par le chemin correct de votre logo
            alt="Dentify3D Logo"
            width={50} // Ajustez la taille selon vos besoins
            height={50} // Ajustez la taille selon vos besoins
            className="mr-2"
          />
          <p className="text-lg">&copy; 2024 Dentify3D. All rights reserved.</p>
        </div>
        {/* Social Media Icons */}
        <div className="flex space-x-4 mt-2">
          <a 
            href="https://www.linkedin.com" 
            target="_blank" 
            rel="noopener noreferrer" 
            className="hover:text-[#65ceb9]"
          >
            <FaLinkedin size={24} />
          </a>
          <a 
            href="https://www.facebook.com" 
            target="_blank" 
            rel="noopener noreferrer" 
            className="hover:text-[#65ceb9]"
          >
            <FaFacebook size={24} />
          </a>
          <a 
            href="https://www.instagram.com" 
            target="_blank" 
            rel="noopener noreferrer" 
            className="hover:text-[#65ceb9]"
          >
            <FaInstagram size={24} />
          </a>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
