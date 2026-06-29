'use client';

import { motion } from 'framer-motion';
import heroData from '@/data/hero.json';
import { HeroData } from '@/types';
import ScrollDown from './ScrollDown';

const data = heroData as HeroData;

/** Stagger container for child animations */
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
      delayChildren: 0.3,
    },
  },
} as const;

/** Individual element fade-up animation */
const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, ease: 'easeOut' as const },
  },
};

/**
 * Hero section with large serif heading, subheading, description, and CTA buttons.
 * Full viewport height with dark background.
 */
export default function Hero() {
  return (
    <section
      id="home"
      className="min-h-screen flex flex-col justify-between bg-[#0C0C0C] relative"
    >
      <motion.div
        className="flex-1 flex flex-col justify-center max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full py-20"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {/* Green subheading */}
        <motion.p
          variants={itemVariants}
          className="text-[#1B7A53] text-xs sm:text-sm tracking-[0.3em] uppercase mb-6"
        >
          {data.subheading}
        </motion.p>

        {/* Main heading */}
        <motion.h1
          variants={itemVariants}
          className="font-playfair text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-normal text-white leading-tight"
        >
          {data.heading}
        </motion.h1>

        {/* Italic heading */}
        <motion.h2
          variants={itemVariants}
          className="font-playfair italic text-4xl sm:text-5xl md:text-6xl lg:text-7xl text-[#5a7a62]/70 leading-tight mt-2"
        >
          {data.headingItalic}
        </motion.h2>

        {/* Description */}
        <motion.p
          variants={itemVariants}
          className="text-gray-400 text-sm sm:text-base max-w-md mt-8 leading-relaxed"
        >
          {data.description}
        </motion.p>

        {/* Buttons */}
        <motion.div
          variants={itemVariants}
          className="flex flex-wrap gap-4 mt-10"
        >
          <motion.a
            href={data.primaryButton.href}
            className="bg-[#1B7A53] text-white px-7 py-3 rounded-lg uppercase text-xs sm:text-sm tracking-wider font-semibold hover:bg-[#166040] transition-colors duration-300"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            {data.primaryButton.text}
          </motion.a>
          <motion.a
            href={data.secondaryButton.href}
            className="border border-white/30 text-white px-7 py-3 rounded-lg uppercase text-xs sm:text-sm tracking-wider font-semibold hover:bg-white/10 transition-colors duration-300"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            {data.secondaryButton.text}
          </motion.a>
        </motion.div>
      </motion.div>

      {/* Scroll down indicator */}
      <ScrollDown />
    </section>
  );
}
