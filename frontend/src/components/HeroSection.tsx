import React from 'react';
import { motion } from 'framer-motion';
import { ChevronDown } from 'lucide-react';

const HeroSection: React.FC = () => (
  <header className="min-h-screen flex items-center justify-center text-center relative overflow-hidden">
    <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=2072')] bg-cover bg-center opacity-30"></div>
    <div className="relative z-10 px-4 flex flex-col items-center">
      <img src="/logo.png" alt="Neuroverse Logo" className="mx-auto mb-8 w-48 h-48 object-contain drop-shadow-lg" />
      <motion.h1
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="text-6xl md:text-7xl font-bold mb-4 gradient-title-neuroverse"
      >
        Neuroverse 2K25
      </motion.h1>
      <motion.h2
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.2 }}
        className="text-2xl md:text-3xl mb-8 theme-text-secondary"
      >
        Unleash Your Inner Genius
      </motion.h2>
      <motion.a
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.4 }}
        href="#events"
        className="btn-primary inline-flex items-center"
      >
        Explore Events <ChevronDown className="ml-2" />
      </motion.a>
    </div>
  </header>
);

export default HeroSection;
