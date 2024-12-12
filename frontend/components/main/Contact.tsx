// components/Contact.tsx
import React from 'react';

const Contact: React.FC = () => {
  return (
    <section id="contact" className="py-12 text-center">
      <h2 className="text-3xl font-bold mb-6">Contact Us</h2>
      <p className="text-lg mb-4">Feel free to reach out to us anytime!</p>
      <a 
        href="mailto:info@example.com" 
        className="bg-white text-blue-500 py-2 px-4 rounded hover:bg-gray-200"
      >
        info@example.com
      </a>
    </section>
  );
};

export default Contact;
