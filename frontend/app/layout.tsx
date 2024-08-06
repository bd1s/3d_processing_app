import '../styles/globals.css'; // Assurez-vous d'importer vos styles globaux ici
import { ReactNode } from 'react';

export const metadata = {
  title: 'Votre Titre de Page',
  description: 'Votre description de page',
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="fr"> {/* Spécifiez la langue si nécessaire */}
      <body>
        {children} {/* Le contenu de vos pages sera rendu ici */}
      </body>
    </html>
  );
}
