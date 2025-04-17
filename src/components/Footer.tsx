import React from 'react';
import { Instagram, Twitter, Facebook, Linkedin } from 'lucide-react';

const Footer: React.FC = () => (
  <footer className="py-12 px-4 glass-card mt-20">
    <div className="max-w-6xl mx-auto text-center">
      <div className="flex justify-center space-x-6 mb-6">
        <a href="#" className="text-blue-500 hover:text-blue-400 transition-colors duration-300">
          <Instagram className="w-6 h-6" />
        </a>
        <a href="#" className="text-blue-500 hover:text-blue-400 transition-colors duration-300">
          <Twitter className="w-6 h-6" />
        </a>
        <a href="#" className="text-blue-500 hover:text-blue-400 transition-colors duration-300">
          <Facebook className="w-6 h-6" />
        </a>
        <a href="#" className="text-blue-500 hover:text-blue-400 transition-colors duration-300">
          <Linkedin className="w-6 h-6" />
        </a>
      </div>
      <p className="theme-text-secondary mb-2">Contact: neuroverse2025@gmail.com</p>
      <p className="theme-text-secondary opacity-60">© 2k25 Neuroverse | Department of Artificial Intelligence and Data Science</p>
    </div>
  </footer>
);

export default Footer;