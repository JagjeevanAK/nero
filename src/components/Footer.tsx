import React from 'react';
import { Instagram, Twitter, Facebook, Linkedin } from 'lucide-react';

const Footer: React.FC = () => (
  <footer className="relative py-14 px-4 mt-20 bg-gradient-to-t from-blue-950/80 via-indigo-900/60 to-transparent overflow-hidden">
    {/* Decorative blurred accent */}
    <div className="absolute left-0 top-0 w-72 h-72 bg-gradient-to-br from-blue-600/30 via-fuchsia-500/20 to-indigo-700/20 rounded-full blur-3xl opacity-60 -z-10"></div>
    <div className="max-w-6xl mx-auto text-center relative z-10">
      <div className="flex justify-center space-x-6 mb-8">
        <a href="https://instagram.com/" target="_blank" rel="noopener noreferrer" aria-label="Instagram" className="hover:scale-110 transition-transform duration-300 text-pink-400 hover:text-pink-300">
          <Instagram className="w-7 h-7" />
        </a>
        <a href="https://twitter.com/" target="_blank" rel="noopener noreferrer" aria-label="Twitter" className="hover:scale-110 transition-transform duration-300 text-sky-400 hover:text-sky-300">
          <Twitter className="w-7 h-7" />
        </a>
        <a href="https://facebook.com/" target="_blank" rel="noopener noreferrer" aria-label="Facebook" className="hover:scale-110 transition-transform duration-300 text-blue-500 hover:text-blue-400">
          <Facebook className="w-7 h-7" />
        </a>
        <a href="https://linkedin.com/" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn" className="hover:scale-110 transition-transform duration-300 text-blue-300 hover:text-blue-200">
          <Linkedin className="w-7 h-7" />
        </a>
      </div>
      <div className="mb-4 flex flex-col items-center gap-2">
        <img src="/logo.png" alt="Neuroverse Logo" className="w-14 h-14 rounded-full shadow-lg mb-2" />
        <span className="text-lg font-bold gradient-title-neuroverse">Neuroverse 2K25</span>
      </div>
      <p className="theme-text-secondary mb-2 text-base">Contact: <a href="mailto:neuroverse2025@gmail.com" className="underline hover:text-blue-400">neuroverse2025@gmail.com</a></p>
      <p className="theme-text-secondary opacity-60 text-sm">© 2k25 Neuroverse | Department of Artificial Intelligence and Data Science</p>
      <p className="theme-text-secondary opacity-70 text-xs mt-2 py-1">Website by </p>
      <p className='theme-text-secondary opacity-70 text-xs mt-2 py-1'>Jagjeevan Kashid | Yashraj Salunkhe | Prabhu Badkar | Rakesh Yadav</p>
    </div>
  </footer>
);

export default Footer;