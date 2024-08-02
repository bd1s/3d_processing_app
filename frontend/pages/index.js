import Navbar from '../components/Navbar';
import Footer from '../components/footer';
import '../app/globals.css'; // Assurez-vous que le chemin est correct

export default function Home() {
  return (
    <div className="bg-[#f0f0f0] min-h-screen">
      <Navbar />
      <main className="bg-[#f0f0f0]">
        {/* Section Héros */}
        <section 
          className="flex h-screen bg-cover bg-center text-white"
          style={{ 
            backgroundImage: 'url(/path-to-your-background-image.jpg)', // Assurez-vous que le chemin est correct
          }}
        >
          <div className="flex items-center justify-center w-full max-w-7xl mx-auto p-8">
            {/* Texte à gauche */}
            <div className="flex-1 flex flex-col justify-center items-center text-center pr-16">
              <h1 className="text-6xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-[#65ceb9] to-[#1d1f2e] bounce">
                Dentify3D
              </h1>
              <p className="text-xl mb-8 text-[#1d1f2e]">
                Dentify3D revolutionizes your dental practice by simplifying complex 3D models, converting labels with precision, and adding vibrant colors for clear visualization. Elevate your practice with Dentify3D’s intuitive and powerful features.
              </p>
              <a 
                href="#services" 
                className="border border-[#65ceb9] text-[#65ceb9] py-2 px-4 rounded w-32 text-center hover:bg-[#65ceb9] hover:text-white transition duration-300 mt-1"
              >
                Our Services
              </a>
            </div>
            {/* Image à droite */}
            <div className="hidden md:block flex-1">
              <img 
                src="/dentistimg.png" 
                alt="Hero Image"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </section>

        {/* Section Services */}
        <section 
          id="services" 
          className="py-12 bg-[#f0f0f0] text-center"
        >
          <h2 className="text-3xl font-bold mb-6">Our Services</h2>
          <div className="max-w-4xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="bg-white p-6 rounded-lg shadow-md flex flex-col items-center">
              <img 
                src="/simplification-icon.png" // Assurez-vous que le chemin de l'icône est correct
                alt="Simplification Icon"
                className="w-16 h-16 mb-4"
                style={{ filter: 'invert(30%) sepia(100%) saturate(200%) hue-rotate(150deg) brightness(90%) contrast(90%)' }} // Example filter to match the color
              />
              <h3 className="text-2xl font-semibold mb-2">Simplification</h3>
              <p className="text-gray-700">Effortlessly reduce complex 3D models to their essential forms.</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md flex flex-col items-center">
              <img 
                src="/labels-converting-icon.png" // Assurez-vous que le chemin de l'icône est correct
                alt="Labels Converting Icon"
                className="w-16 h-16 mb-4"
                style={{ filter: 'invert(30%) sepia(100%) saturate(200%) hue-rotate(150deg) brightness(90%) contrast(90%)' }} // Example filter to match the color
              />
              <h3 className="text-2xl font-semibold mb-2">Labels Converting</h3>
              <p className="text-gray-700">Precisely transform and standardize labels for clarity and consistency.</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md flex flex-col items-center">
              <img 
                src="/coloring-icon.png" // Assurez-vous que le chemin de l'icône est correct
                alt="Coloring Icon"
                className="w-16 h-16 mb-4"
                style={{ filter: 'invert(30%) sepia(100%) saturate(200%) hue-rotate(150deg) brightness(90%) contrast(90%)' }} // Example filter to match the color
              />
              <h3 className="text-2xl font-semibold mb-2">Coloring</h3>
              <p className="text-gray-700">Enhance visualization with vibrant and informative colorization.</p>
            </div>
          </div>
        </section>

        {/* Section Contact */}
        <section 
          id="contact" 
          className="py-12 bg-[#f0f0f0] text-center"
        >
          <h2 className="text-3xl font-bold mb-6">Contact Us</h2>
          <p className="text-lg mb-4">Feel free to reach out to us anytime!</p>
          <a 
            href="mailto:info@example.com" 
            className="bg-white text-blue-500 py-2 px-4 rounded hover:bg-gray-200"
          >
            info@example.com
          </a>
        </section>
      </main>
      <Footer /> 
    </div>
  );
}
