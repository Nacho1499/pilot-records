"use client"

import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";

const Hero = () => {
  return (
    <section className="min-h-screen flex items-center justify-center bg-gradient-to-r from-slate-900 to-slate-700 px-6">
      <div className="text-center max-w-3xl">
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
          className="text-white text-4xl md:text-6xl font-extrabold leading-tight"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.7 }}
        >
          <span className="text-[#d4af37]">BRIECH</span> UAS DRONE PILOT RECORDS
        </motion.h1>

        {/* Buttons */}
        <motion.div
          className="flex flex-wrap justify-center gap-5 mt-10"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.6 }}
        >
          <button className="bg-[#d4af37] cursor-pointer hover:bg-[#b8902d] transition-colors py-3 px-8 font-semibold rounded-xl text-white shadow-md">
            Create Record
          </button>
          <button className="border border-[#d4af37] cursor-pointer hover:bg-[#d4af37]/10 transition-colors font-semibold text-white py-3 px-8 rounded-xl shadow-md">
            View Records
          </button>
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;
