
import React from 'react';
import Image from 'next/image';
import TeamMember from '../components/TeamMember';


function about() {
  return (
    <div className='bg-gradient-custom'>
        <main>
        <h3 className='text-cascade font-extrabold text-center mt-6 text-2xl text-underline bg-white'> About Our project </h3>
 
        <div className='flex bg-gradient-custom p-4'>
  <div className="flex flex-col justify-start w-1/2">
    <p className="text-lg border border-blue-300 border-4 rounded-lg p-4 shadow-md mr-30">
    3D Smart Factory est une entreprise innovante<br/>
          spécialisée dans les technologies 3D. Elle offre<br/>
          des solutions avancées pour la simplification des modèles,<br/>
          la coloration des objets, et la conversion des labels.<br/>
          Leur expertise permet de réduire la complexité des modèles<br/>
          tout en préservant leurs caractéristiques essentielles,<br/>
          optimisant ainsi les modèles pour diverses applications<br/>
          telles que l'impression 3D, les jeux vidéo, et la réalité augmentée.<br/>
          En ajoutant des couleurs et des textures réalistes,   ils améliorent<br/>
         considérablement l'apparence visuelle des objets 3D.
    </p>
  </div>
 
  <div className="flex justify-end w-1/2">
    <Image src="/Im.png" alt="Image Description" width={600} height={200} />
  </div>
</div>
<div> 
   
   
   <div className='mt-10 mb-100'>
          <h1 className='text-cascade font-extrabold text-center mt-6 text-2xl text-underline bg-white'>
            Team Members
          </h1>
          <div className='flex flex-wrap justify-center gap-8 p-4 mb-100'>
            <TeamMember
              name="Ayoub Jarhni"
              role="Élève ingénieur en génie informatique à ENSA KHOURIBGA"
              photoUrl=""
              linkedinUrl="https://www.linkedin.com/in/ayoub-jarhni/"
              githubUrl="https://github.com/ayoub-jarhni"
            />
            <TeamMember
              name="Sophie Dubois"
              role="Développeuse Full Stack"
              photoUrl=""
              linkedinUrl="https://www.linkedin.com/in/sophie-dubois/"
              githubUrl="https://github.com/sophie-dubois"
            />
            <TeamMember
              name="Marc Dupont"
              role="Designer 3D"
              photoUrl=""
              linkedinUrl="https://www.linkedin.com/in/marc-dupont/"
              githubUrl="https://github.com/marc-dupont"
            />
          </div>
        </div>
   </div>
    </main>
    
    </div>
  );
}

export default about;