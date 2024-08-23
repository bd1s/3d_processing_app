"use client";
import { useState, useEffect, ChangeEvent } from "react";
import ThreeDViewer from './ThreeDViewer';
import Footer from "@/components/main/Footer";
import Navbar2 from "@/components/main/Navbar2";

const Traitement3D: React.FC = () => {
  const [displayedText, setDisplayedText] = useState<string>('');
  const fullText: string = "Veuillez importer le fichier que vous voulez traiter";
  const typingSpeed: number = 10;

  useEffect(() => {
    let index: number = 0;
    const interval = setInterval(() => {
      setDisplayedText((prev) => prev + fullText[index]);
      index++;
      if (index === fullText.length - 1) {
        clearInterval(interval);
      }
    }, typingSpeed);
    return () => clearInterval(interval);
  }, []);

  const [file, setFile] = useState<File | null>(null);
  const [fileUrl, setFileUrl] = useState<string | null>(null);
  const [showViewer, setShowViewer] = useState<boolean>(false);
  const [downloadUrl, setDownloadUrl] = useState<string | null>(null);

  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setFile(file);
      const url = URL.createObjectURL(file);
      setFileUrl(url);
      setShowViewer(false);
    } else {
      setFile(null);
      setFileUrl(null);
      setShowViewer(false);
    }
  };

  const handleVisualiserClick = () => {
    if (fileUrl) {
      setShowViewer(true);
    }
  };

  const handleSimplifierClick = async () => {
    if (file) {
      const formData = new FormData();
      formData.append('file', file);

      const response = await fetch('/api/simplify3d/', {
        method: 'POST',
        body: formData,
      });

      if (response.ok) {
        const data = await response.json();
        setDownloadUrl(data.downloadUrl);
      } else {
        console.error('Failed to simplify the file');
      }
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-green">
      <Navbar2 />
      <main className="flex flex-col items-center justify-center flex-1 p-4">
        <h2 className="text-4xl font-extrabold mb-6 text-custom-grey shadow-md p-2 rounded-md">
          {displayedText}
        </h2>
        <div className="flex items-center space-x-4 my-14 w-150">
          <label htmlFor="file-upload" className="bg-custom-green w-40 text-white text-center px-4 py-2 shadow-md rounded-lg cursor-pointer">
            Choose file
          </label>
          <input
            id="file-upload"
            type="file"
            accept=".stl,.obj" // Ajoute les types de fichiers acceptés ici
            className="hidden border-3 border-black rounded-20 p-2 mb-4"
            onChange={handleFileChange}
          />
          <span className="border border-black text-center shadow-md px-4 py-2 rounded-md text-black-900 w-80">
            {file ? file.name : 'No file chosen'}
          </span>
        </div>

        <div className="flex space-x-14 mt-10 mb-20">
          <button className="bg-custom-green text-white px-6 py-4 rounded hover:bg-blue-600" onClick={handleVisualiserClick}>Visualiser</button>
          <button className="bg-custom-green text-white px-6 py-4 rounded hover:bg-green-600" onClick={handleSimplifierClick}>Simplifier</button>
        </div>

        {showViewer && fileUrl && (
          <div className="w-full max-w-4xl mt-10 p-4 border border-gray-300 rounded-md shadow-lg bg-beige">
            <h3 className="text-xl font-semibold mb-4 text-center">3D Model Preview</h3>
            <div className="w-full h-[500px]">
              <ThreeDViewer modelUrl={fileUrl} />
            </div>
          </div>
        )}

        {downloadUrl && (
          <div className="mt-10">
            <a href={downloadUrl} className="bg-custom-green text-white px-6 py-4 rounded hover:bg-yellow-600" download>Download Simplified Model</a>
          </div>
        )}
      </main>
      <Footer />
    </div>
  );
};

export default Traitement3D;
