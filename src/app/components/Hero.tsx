"use client";

import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";

const Hero = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center px-6 overflow-hidden">
      {/* 🔹 Background Video */}
      <video
        className="absolute top-0 left-0 w-full h-full object-cover -z-10"
        autoPlay
        loop
        muted
        playsInline
      >
        <source src="/drone.mp4" type="video/mp4" />
        Your browser does not support the video tag.
      </video>

      {/* 🔹 Overlay (dark gradient for readability) */}
      <div className="absolute inset-0 bg-gradient-to-r from-slate-900/80 to-slate-700/80 -z-10" />

      <div className="text-center max-w-3xl relative z-10">
        {/* Logo */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <Image
            className="mx-auto mb-8"
            src="/uas.png"
            width={120}
            height={60}
            alt="logo"
            priority
          />
        </motion.div>

        {/* Title */}
        <motion.h1
          className="text-white text-4xl md:text-6xl font-extrabold leading-tight drop-shadow-lg"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.7 }}
        >
          <span className="text-[#d4af37]">BRIECH</span> UAS FPV DRONE PILOT RECORDS
        </motion.h1>

        {/* Buttons */}
        <motion.div
          className="flex flex-wrap justify-center gap-5 mt-10"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.6 }}
        >
          <button className="bg-[#d4af37] cursor-pointer hover:bg-[#b8902d] transition-colors py-3 px-8 font-semibold rounded-xl text-white shadow-lg">
            Create Record
          </button>
          <button className="border border-[#d4af37] cursor-pointer hover:bg-[#d4af37]/10 transition-colors font-semibold text-white py-3 px-8 rounded-xl shadow-lg">
            View Records
          </button>
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;
