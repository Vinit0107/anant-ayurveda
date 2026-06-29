'use client';

import { motion } from 'framer-motion';
import { ChevronDown } from 'lucide-react';

/**
 * Animated scroll-down indicator for the hero section.
 * Bounces to invite the user to scroll.
 */
export default function ScrollDown() {
  return (
    <motion.div
      className="flex justify-center pb-8"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 1.5, duration: 0.8 }}
    >
      <motion.a
        href="#about"
        className="text-gray-400 hover:text-white transition-colors"
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
      >
        <ChevronDown size={28} />
      </motion.a>
    </motion.div>
  );
}
