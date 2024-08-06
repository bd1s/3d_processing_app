// components/TeamMember.js
import React from 'react';
import Image from 'next/image';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLinkedin, faGithub } from '@fortawesome/free-brands-svg-icons';

const TeamMember = ({ name, role, photoUrl, linkedinUrl, githubUrl }) => {
  return (
    <div className='flex flex-col items-center border p-4 rounded-lg shadow-lg bg-white w-64 h-80'>
      <div className='relative w-40 h-40'>
        <Image src={photoUrl} alt={`${name}'s photo`} width={700} height={1000} className='rounded-full object-cover' />
      </div>
      <h2 className='mt-4 text-lg font-semibold'>{name}</h2>
      <p className='text-sm text-gray-600'>{role}</p>
      <div className='mt-2 flex space-x-4'>
        {linkedinUrl && (
          <a href={linkedinUrl} target="_blank" rel="noopener noreferrer">
            <FontAwesomeIcon icon={faLinkedin} size="2x" className='text-blue-600 hover:text-blue-800' />
          </a>
        )}
        {githubUrl && (
          <a href={githubUrl} target="_blank" rel="noopener noreferrer">
            <FontAwesomeIcon icon={faGithub} size="2x" className='text-gray-900 hover:text-gray-700' />
          </a>
        )}
      </div>

    </div>
  );
};

export default TeamMember;
