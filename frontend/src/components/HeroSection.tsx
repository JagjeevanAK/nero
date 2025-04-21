import React from "react";
import { motion } from "framer-motion";

const HeroSection: React.FC = () => (
  <>
    {/* Caution Message */}
    <div className="fixed w-140 top-4 right-4 bg-red-600 text-white text-sm font-bold px-4 py-2 rounded-lg shadow-lg z-50">
      ⚠️ Caution: Don't register yet, the website is under maintenance!
      Registrations start soon!!
    </div>

    <header className="min-h-screen flex items-center justify-center text-center relative overflow-hidden">
      {/* Video background */}
      <video
        className="absolute inset-0 w-full h-full object-cover opacity-60 z-0"
        src="/hoth-ice-planet-star-wars-moewalls-com.mp4"
        autoPlay
        loop
        muted
        playsInline
      />
      <div className="relative z-10 px-4 flex flex-col items-center mt-[-60px] md:mt-[-100px]">
        <img
          src="/logo.png"
          alt="Neuroverse Logo"
          className="mx-auto mb-0 w-48 h-48 object-contain drop-shadow-lg"
        />
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-4xl p-4 md:text-7xl font-bold mb-4 gradient-title-neuroverse font-mokoto"
        >
          NEUROVERSE 2K25
        </motion.h1>
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-2xl md:text-3xl mb-8 theme-text-secondary font-mokoto"
        >
          Run The Mind
        </motion.h2>
        <motion.a
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          href="#main-event"
          className="inline-flex items-center mb-4 rounded-3xl px-6 py-3 text-white font-medium transition-all duration-300 shadow-lg"
          style={{
            background: "linear-gradient(to right,  #3f45f2, #ff28a9)",
          }}
        >
          Explore Events
        </motion.a>
      </div>
    </header>
  </>
);

export default HeroSection;
