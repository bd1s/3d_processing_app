import Image from 'next/image';
import { FaLinkedin, FaFacebook, FaInstagram } from 'react-icons/fa';

const Footer1 = () => {
  return (
    <div className=' bg-downy h-30 p-4'>
      <div className='flex flex-row items-center mb-4'>
        <Image src="/logo.png" alt="Logo" width={30} height={10} />
        <div className='ml-2'>
          <span className="text-xl font-bold">Denty3D</span>
        </div>
      
      <p className='font-bold mb-4 ml-20'>© 2024 Dentify3D - All Rights Reserved by 3DSF Interns</p>
      </div>
      <div className="flex justify-end space-x-4 mt-4 mr-4">
        <a href="https://www.linkedin.com" target="_blank" rel="noopener noreferrer" className="hover:text-[#65ceb9]">
          <FaLinkedin size={24} />
        </a>
        <a href="https://www.facebook.com" target="_blank" rel="noopener noreferrer" className="hover:text-[#65ceb9]">
          <FaFacebook size={24} />
        </a>
        <a href="https://www.instagram.com" target="_blank" rel="noopener noreferrer" className="hover:text-[#65ceb9]">
          <FaInstagram size={24} />
        </a>
      </div>
    </div>
  );
};

export default Footer;
