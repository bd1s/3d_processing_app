import Link from 'next/link';
import Image from 'next/image';

const Navbart = () => {
  return (
    <nav className="flex justify-start items-center p-4 bg-downy to bg- ziggurat text-white">
      <div className=' flex logo mr-10 '>
      <Image src="/logo.png" alt="Logo" width={50} height={50} />
     
      <div> <span className="text-xl font-bold">Dentify3D</span></div>
      </div>
      <ul className='flex space-x-12'>
        <li>
          <Link href="/home" className='hover:text-gray-300'>
            Home
          </Link>
        </li>
        <li>
          <Link href="/traitement" className='hover:text-gray-300'>
            3D processing
          </Link>
        </li>
        <li>
          <Link href="/about" className='hover:text-gray-300'>
          About
          </Link>
        </li>
        <li>
          <Link href="/contact" className='hover:text-gray-300'>
            Contact
          </Link>
        </li>
      </ul>
    </nav>
  );
};

export default Navbart;